import fs from "node:fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the School Policies page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/DSC05425.png",
    filename: "school-policies-hero.png",
    title: "SAIS Dubai students in library discussion",
  },
  cover: {
    path: "/Users/razan/Downloads/Screenshot 2026-04-19 at 08.32.12.png",
    filename: "school-policy-document-cover.png",
    title: "SAIS Dubai school policy document cover",
  },
};

async function uploadImage({ path, filename, title }) {
  if (!fs.existsSync(path)) {
    return null;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt: title,
  };
}

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-text`,
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

function policy(key, title, coverImage) {
  return {
    _key: key,
    _type: "schoolPolicyDocument",
    title,
    ...(coverImage ? { coverImage } : {}),
    downloadLabel: "Download PDF",
  };
}

function updateCommunityCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;

  return cards.map((card) => {
    const isPoliciesCard = card?._key === "school-policies" || card?.title === "School Policies";
    if (!isPoliciesCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/school-policies",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

const existingPage = await client.getDocument("school-policies-page").catch(() => null);
const heroImage = uploadedImages.hero || existingPage?.hero?.image;
const coverImage = uploadedImages.cover;

await client.createOrReplace({
  _id: "school-policies-page",
  _type: "schoolPoliciesPage",
  seo: existingPage?.seo || {
    _type: "seo",
    title: "School Policies | SAIS Dubai",
    description: "Review SAIS Dubai school policies and download policy documents.",
    ...(heroImage ? { image: heroImage } : {}),
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "School\nPolicies",
    },
    ...(heroImage ? { image: heroImage } : {}),
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "A Safe and Supportive Environment",
      description: [
        block(
          "school-policies-intro",
          "Safety and wellbeing of every child is our highest priority. Our policies outline the measures we take to create a secure, respectful, and supportive environment for all students. These guidelines ensure that staff, students, and the wider community share a clear understanding of safeguarding expectations and responsibilities across all aspects of school life."
        ),
      ],
    },
  },
  policies: [
    policy("acceptable-use", "Acceptable Use of Devices\nPolicy 2025-2026", coverImage),
    policy("admission", "Admission Policy\n2025-2026", coverImage),
    policy("child-protection", "Child Protection and\nSafeguarding Policy\n2025-2026", coverImage),
    policy("digital-learning", "Digital Learning Policy\n2025-2026", coverImage),
    policy("fire-evacuation", "Fire Evacuation Policy\n2025-2026", coverImage),
    policy("gifted-talented", "Gifted & Talented Policy\n2025-2026", coverImage),
    policy("inclusion-education", "Inclusion Education\nPolicy 2025-2026", coverImage),
  ],
});

const communityPage = await client.getDocument("our-community-page");
const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded School Policies page and linked the community card.");

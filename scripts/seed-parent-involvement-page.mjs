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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Parent Involvement page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/DSC05652.jpg",
    filename: "parent-involvement-hero.jpg",
    title: "SAIS Dubai students smiling in school",
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

function updateCommunityCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;

  return cards.map((card) => {
    const isParentInvolvementCard = card?._key === "parent-involvement" || card?.title === "Parent Involvement";
    if (!isParentInvolvementCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/parent-involvement",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const relatedContent = await client.fetch(`{
  "parentCard": *[_type == "ourCommunityPage" && _id == "our-community-page"][0].linksSection.cards[_key == "parent-involvement"][0] {
    image
  },
  "videoPoster": *[_type == "studentStaffWellbeingPage" && _id == "student-staff-wellbeing-page"][0].counsellingSection {
    image
  }
}`);

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

const heroImage = uploadedImages.hero || relatedContent?.parentCard?.image || relatedContent?.videoPoster?.image;

await client.createOrReplace({
  _id: "parent-involvement-page",
  _type: "parentInvolvementPage",
  seo: {
    _type: "seo",
    title: "Parent Involvement | SAIS Dubai",
    description: "Learn how SAIS Dubai partners with parents to support student success.",
    ...(heroImage ? { image: heroImage } : {}),
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Parent\nInvolvement",
    },
    ...(heroImage ? { image: heroImage } : {}),
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  introSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Building Success\nThrough Collaboration",
      description: [
        block(
          "parent-involvement-intro-1",
          "Parents are essential partners in our educational community. We actively encourage and value parent engagement in their children's learning and school life."
        ),
        block(
          "parent-involvement-intro-2",
          "As key stakeholders, parents contribute constructively to our holistic education approach, helping to create successful learning experiences for all students."
        ),
        block(
          "parent-involvement-intro-3",
          "Students achieve their highest potential academically, socially, and emotionally when we establish a strong, positive partnership between school, student, and parent."
        ),
      ],
    },
    ...(relatedContent?.parentCard?.image || heroImage
      ? { image: relatedContent?.parentCard?.image || heroImage }
      : {}),
    imagePosition: "left",
    theme: "light",
    backgroundColor: "#ffffff",
    titleColor: "var(--sais-primary)",
    textColor: "#666b70",
    ctas: [],
  },
  videoHeading: {
    _type: "sectionHeading",
    title: "Hear From Our Parents",
  },
  videoSection: {
    _type: "object",
    ...(relatedContent?.videoPoster?.image || heroImage
      ? { poster: relatedContent?.videoPoster?.image || heroImage }
      : {}),
  },
});

const communityPage = await client.getDocument("our-community-page");
const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded Parent Involvement page and linked the community card.");

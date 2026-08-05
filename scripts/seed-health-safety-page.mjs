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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Health & Safety page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/_DEL4482.jpg",
    filename: "health-safety-hero.jpg",
    title: "SAIS Dubai students running safely",
  },
  intro: {
    path: "/Users/razan/Downloads/_NEC6395.png",
    filename: "health-safety-professional-care.png",
    title: "SAIS Dubai professional care",
  },
  approach: {
    path: "/Users/razan/Downloads/Mask Group 2.jpg",
    filename: "health-safety-student-activity.jpg",
    title: "SAIS Dubai student activity",
  },
};

async function uploadImage({ path, filename, title }) {
  if (!fs.existsSync(path)) {
    throw new Error(`Image was not found at ${path}`);
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
    const isHealthSafetyCard = card?._key === "health-safety" || card?.title === "Health & Safety";
    if (!isHealthSafetyCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/health-safety",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const [uploadedImages, existingPage] = await Promise.all([
  Promise.all(Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])),
  client.getDocument("health-safety-page").catch(() => null),
]).then(([images, page]) => [Object.fromEntries(images), page]);

await client.createOrReplace({
  _id: "health-safety-page",
  _type: "healthSafetyPage",
  seo: {
    _type: "seo",
    title: "Health & Safety | SAIS Dubai",
    description: "Learn about health and safety care at SAIS Dubai.",
    image: existingPage?.seo?.image || uploadedImages.hero,
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Health\n& Safety",
    },
    image: uploadedImages.hero,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  introSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Professional Care,\nEvery School Day",
      description: [
        block(
          "health-safety-intro",
          "The school medical includes a licensed and approved Doctor and 2 nurses in a dedicated clinic area as per Knowledge and Human Development Authority requirements (KHDA). The medical staffs are available during school hours to provide assistance and support to students in any medical situation. The medical staff are available will always assess and monitor the condition of the student and make a professional decision about appropriate treatment required."
        ),
      ],
    },
    image: uploadedImages.intro,
    imagePosition: "left",
    theme: "teal",
    ctas: [],
  },
  approachSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Health & Safety Support",
      description: [
        block(
          "health-safety-approach-1",
          "In the event that the medical concern is a minor issue, the staff will provide the appropriate care and return the student to class. In the event that the medical concern is moderate or severe the Doctor will liaise with the school leadership staff to make contact with the family and agree on the best support and treatment for the student."
        ),
        block(
          "health-safety-approach-2",
          "For your child's safety and health please be sure to provide the Coordinator and teacher with any information regarding your child's medical history and any special circumstances that we should be aware and accommodate."
        ),
        block(
          "health-safety-approach-3",
          "Students have regular workshops and assemblies conducted by trained health professionals to raise awareness and teach good health practices for life."
        ),
      ],
    },
    image: uploadedImages.approach,
    imagePosition: "right",
    theme: "teal",
    ctas: [],
  },
});

const communityPage = await client.getDocument("our-community-page");
const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded Health & Safety page and linked the community card.");

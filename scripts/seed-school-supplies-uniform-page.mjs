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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the School Supplies & Uniform page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/DSC05502.JPG",
    filename: "school-supplies-uniform-hero.jpg",
    title: "SAIS Dubai students in school uniform",
  },
  uniform: {
    path: "/Users/razan/Downloads/Mask Group 2.jpg",
    filename: "school-supplies-uniform-students.jpg",
    title: "SAIS Dubai students wearing school uniform",
  },
};

function imageFromAsset(asset, alt) {
  if (!asset?._id) return null;

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt,
  };
}

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

async function uploadOptionalImage(source) {
  if (fs.existsSync(source.path)) {
    return uploadImage(source);
  }

  const existingAsset = await client.fetch(
    `*[_type == "sanity.imageAsset" && (
      originalFilename match "Mask Group 2*" ||
      originalFilename match "school-supplies-uniform-students*"
    )][0]`
  );

  const image = imageFromAsset(existingAsset, source.title);

  if (image) {
    return image;
  }

  console.warn(`Optional image was not found at ${source.path}; using the hero image as a fallback.`);
  return null;
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

function bullet(key, text) {
  return {
    ...block(key, text),
    listItem: "bullet",
    level: 1,
  };
}

function findCommunityCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;
  return cards.find((card) => card?._key === "school-supplies-uniform" || card?.title === "School Supplies & Uniform");
}

function updateCommunityCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;

  return cards.map((card) => {
    const isSuppliesCard = card?._key === "school-supplies-uniform" || card?.title === "School Supplies & Uniform";
    if (!isSuppliesCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/school-supplies-uniform",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const [uploadedImages, existingPage, communityPage] = await Promise.all([
  Promise.all([
    ["hero", await uploadImage(imageSources.hero)],
    ["uniform", await uploadOptionalImage(imageSources.uniform)],
  ]),
  client.getDocument("school-supplies-uniform-page").catch(() => null),
  client.getDocument("our-community-page").catch(() => null),
]).then(([images, page, community]) => [Object.fromEntries(images), page, community]);

const communityCard = findCommunityCard(communityPage);
const uniformImage = uploadedImages.uniform || uploadedImages.hero;
const introImage = communityCard?.image || uniformImage;

await client.createOrReplace({
  _id: "school-supplies-uniform-page",
  _type: "schoolSuppliesUniformPage",
  seo: {
    _type: "seo",
    title: "School Supplies & Uniform | SAIS Dubai",
    description: "Learn about school supplies and uniform at SAIS Dubai.",
    image: existingPage?.seo?.image || uploadedImages.hero,
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "School Supplies\n& Uniform",
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
      title: "Everything You Need,\nMade Simple",
      description: [
        block("school-supplies-intro-1", "Families have convenient options for purchasing school supplies:"),
        bullet("school-supplies-bookstore", "Through our school bookstore at discounted rates"),
        bullet("school-supplies-retailers", "From external retailers of their choice"),
        block(
          "school-supplies-intro-2",
          "We provide a comprehensive booklist annually that details all necessary equipment for the academic year. Students can replace items at the school bookstore throughout the year as needed."
        ),
      ],
    },
    image: introImage,
    imagePosition: "center",
    theme: "teal",
    ctas: [],
  },
  uniformSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "School Uniform",
      description: [
        block(
          "school-uniform-1",
          "All students from KG1 through Grade 12 wear the SAIS-Dubai uniform, which supports our learning-focused environment and reinforces our core values of compassion, excellence, integrity, respect, and responsibility."
        ),
        block(
          "school-uniform-2",
          "Our uniform is thoughtfully designed to respect the cultural context of the United Arab Emirates while promoting personal respect and responsibility among our students."
        ),
        block("school-uniform-3", "We maintain two official uniforms:"),
        bullet("school-uniform-standard", "Standard daily school uniform"),
        bullet("school-uniform-pe", "Physical Education (PE) uniform, worn on days when students have PE classes"),
        block("school-uniform-4", "All uniform garments conform to our division-specific dress code policies."),
      ],
    },
    image: uniformImage,
    imagePosition: "right",
    theme: "teal",
    ctas: [],
  },
});

const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded School Supplies & Uniform page and linked the community card.");

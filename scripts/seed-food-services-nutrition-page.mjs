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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Food Services & Nutrition page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/_DEL4004.jpg",
    filename: "food-services-nutrition-hero.jpg",
    title: "SAIS Dubai campus food nutrition hero",
  },
  intro: {
    path: "/Users/razan/Downloads/DSC05770.jpg",
    filename: "food-services-nutrition-cafeteria.jpg",
    title: "SAIS Dubai school cafeteria",
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

function bullet(key, text) {
  return {
    ...block(key, text),
    listItem: "bullet",
    level: 1,
  };
}

function updateCommunityCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;

  return cards.map((card) => {
    const isFoodServicesCard =
      card?._key === "food-services-nutrition" || card?.title === "Food Services & Nutrition";
    if (!isFoodServicesCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/food-services-nutrition",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const [uploadedImages, existingPage] = await Promise.all([
  Promise.all(Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])),
  client.getDocument("food-services-nutrition-page").catch(() => null),
]).then(([images, page]) => [Object.fromEntries(images), page]);

await client.createOrReplace({
  _id: "food-services-nutrition-page",
  _type: "foodServicesNutritionPage",
  seo: {
    _type: "seo",
    title: "Food Services & Nutrition | SAIS Dubai",
    description: "Learn about food services and nutrition at SAIS Dubai.",
    image: existingPage?.seo?.image || uploadedImages.hero,
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Food\nNutrition",
    },
    image: uploadedImages.hero,
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
      title: "School Cafeteria",
      description: [
        block(
          "food-services-intro-1",
          "Our air-conditioned school cafeteria is operated by a registered food and nutrition company that adheres to strict regulations established by:"
        ),
        bullet("food-services-khda", "Knowledge and Human Development Authority (KHDA)"),
        bullet("food-services-dubai-municipality", "Dubai Municipality"),
        block(
          "food-services-intro-2",
          "We provide students with high-quality, nutritious food options that fully comply with Islamic dietary requirements. The menu is refreshed annually, incorporating student suggestions whenever possible to ensure both nutritional excellence and student satisfaction."
        ),
      ],
    },
    image: uploadedImages.intro,
    imagePosition: "center",
    theme: "blue",
    ctas: [],
  },
});

const communityPage = await client.getDocument("our-community-page");
const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded Food Services & Nutrition page and linked the community card.");

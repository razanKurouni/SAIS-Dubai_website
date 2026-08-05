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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Medical Services page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/_NEC6197.jpg",
    filename: "medical-services-hero.jpg",
    title: "SAIS Dubai campus medical services hero",
  },
  intro: {
    path: "/Users/razan/Downloads/DSC06027.jpg",
    filename: "medical-services-clinic.jpg",
    title: "SAIS Dubai medical clinic care",
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
    const isMedicalServicesCard = card?._key === "medical-services" || card?.title === "Medical Services";
    if (!isMedicalServicesCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/medical-services",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const [uploadedImages, existingPage] = await Promise.all([
  Promise.all(Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])),
  client.getDocument("medical-services-page").catch(() => null),
]).then(([images, page]) => [Object.fromEntries(images), page]);

await client.createOrReplace({
  _id: "medical-services-page",
  _type: "medicalServicesPage",
  seo: {
    _type: "seo",
    title: "Medical Services | SAIS Dubai",
    description: "Learn about medical services at SAIS Dubai.",
    image: existingPage?.seo?.image || uploadedImages.hero,
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Medical\nServices",
    },
    image: uploadedImages.hero,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  introSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Professional Healthcare,\nOn Site Every School Day",
      description: [
        block(
          "medical-services-intro",
          "Our on-campus clinic is staffed by a licensed doctor and three qualified nurses, adhering to Dubai Health Authority standards. The medical team is available during school hours to address student health needs promptly."
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

console.log("Seeded Medical Services page and linked the community card.");

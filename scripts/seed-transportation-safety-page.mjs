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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Transportation Safety Guidelines page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/_DEL4056.JPG",
    filename: "transportation-safety-hero.jpg",
    title: "SAIS Dubai school bus transportation",
  },
  bus: {
    path: "/Users/razan/Downloads/Group 697.png",
    filename: "transportation-safety-bus-icon.png",
    title: "Bus boarding icon",
  },
  cleaning: {
    path: "/Users/razan/Downloads/Group 693.png",
    filename: "transportation-safety-cleaning-icon.png",
    title: "Cleaning and sanitization icon",
  },
  attendance: {
    path: "/Users/razan/Downloads/Group 695.png",
    filename: "transportation-safety-attendance-icon.png",
    title: "Attendance records icon",
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
    const isTransportationCard =
      card?._key === "transportation-safety-guidelines" ||
      card?.title === "Transportation Safety Guidelines";

    if (!isTransportationCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/transportation-safety-guidelines",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const [uploadedImages, existingPage, communityPage] = await Promise.all([
  Promise.all(Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])),
  client.getDocument("transportation-safety-page").catch(() => null),
  client.getDocument("our-community-page").catch(() => null),
]).then(([images, page, community]) => [Object.fromEntries(images), page, community]);

await client.createOrReplace({
  _id: "transportation-safety-page",
  _type: "transportationSafetyPage",
  seo: {
    _type: "seo",
    title: "School Transportation Safety Guidelines | SAIS Dubai",
    description: "Learn about school transportation safety guidelines at SAIS Dubai.",
    image: existingPage?.seo?.image || uploadedImages.hero,
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "School Transportation\nSafety Guidelines",
    },
    image: uploadedImages.hero,
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  guidelinesSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Professional Healthcare,\nOn Site Every School Day",
      description: [
        block(
          "transportation-guidelines-intro",
          "Seating assignments will follow a carefully planned route system that maximizes safety while accommodating capacity requirements. Unavailable seats will be clearly marked."
        ),
      ],
    },
    cards: [
      {
        _key: "boarding",
        _type: "transportationSafetyCard",
        title: "Boarding",
        description:
          "Students will board from the back of the bus to the front to minimize contact between passengers.",
        icon: uploadedImages.bus,
      },
      {
        _key: "afternoon-boarding",
        _type: "transportationSafetyCard",
        title: "Afternoon Boarding",
        description:
          "Afternoon boarding will be organized by drop-off sequence, with students who exit first boarding last and sitting in front seats.",
        icon: uploadedImages.bus,
      },
      {
        _key: "cleaning-sanitization",
        _type: "transportationSafetyCard",
        title: "Cleaning & Sanitization",
        description: "All buses undergo regular cleaning and sanitization procedures.",
        icon: uploadedImages.cleaning,
      },
      {
        _key: "attendance-records",
        _type: "transportationSafetyCard",
        title: "Attendance Records",
        description:
          "Detailed attendance records will be maintained for all bus riders, with absence promptly reported to school administration. Live monitoring systems will be active on all buses.",
        icon: uploadedImages.attendance,
      },
    ],
    backgroundColor: "#216B97",
    titleColor: "#ffffff",
    textColor: "#ffffff",
    cardTextColor: "#216B97",
    cardBorderColor: "#216B97",
    cardHoverBorderColor: "#d97252",
  },
});

const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded Transportation Safety Guidelines page and linked the community card.");

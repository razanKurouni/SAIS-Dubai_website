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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Student & Staff Wellbeing page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/_NEC6197.png",
    filename: "student-staff-wellbeing-hero.png",
    title: "SAIS Dubai building and flags",
  },
  commitment: {
    path: "/Users/razan/Downloads/_DEL4724.png",
    filename: "student-staff-wellbeing-commitment.png",
    title: "SAIS Dubai students smiling in class",
  },
  counselling: {
    path: "/Users/razan/Downloads/DSC05293.png",
    filename: "student-staff-wellbeing-counselling.png",
    title: "SAIS Dubai counselling and support services",
  },
  sel: {
    path: "/Users/razan/Downloads/_DEL5523.png",
    filename: "student-staff-wellbeing-sel.png",
    title: "SAIS Dubai social and emotional learning support",
  },
  eventsIcon: {
    path: "/Users/razan/Downloads/Group 589.png",
    filename: "wellbeing-events-icon.png",
    title: "Events awareness icon",
  },
  sessionsIcon: {
    path: "/Users/razan/Downloads/Group 593.png",
    filename: "wellbeing-sessions-icon.png",
    title: "Wellbeing sessions icon",
  },
  communicationIcon: {
    path: "/Users/razan/Downloads/Group 591.png",
    filename: "wellbeing-communication-icon.png",
    title: "Communication channels icon",
  },
  openDoorIcon: {
    path: "/Users/razan/Downloads/Group 595.png",
    filename: "wellbeing-open-door-icon.png",
    title: "Open door policy icon",
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
    const isWellbeingCard = card?._key === "student-staff-wellbeing" || card?.title === "Student & Staff Wellbeing";
    if (!isWellbeingCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/student-staff-wellbeing",
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

const homepageWhySection = await client.fetch(`*[_type == "homepage"][0] {
  whySection {
    image
  }
}`);

await client.createOrReplace({
  _id: "student-staff-wellbeing-page",
  _type: "studentStaffWellbeingPage",
  seo: {
    _type: "seo",
    title: "Student & Staff Wellbeing | SAIS Dubai",
    description: "Learn about student and staff wellbeing support at SAIS Dubai.",
    image: uploadedImages.hero,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student &\nStaff Wellbeing",
    },
    image: uploadedImages.hero,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  commitment: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Our Commitment",
      description: [
        block(
          "commitment-1",
          "Ensuring the wellbeing of our entire community remains a cornerstone of our educational philosophy. This commitment has taken on even greater significance in challenging times. We are dedicated to supporting the academic, mental, social, emotional, and physical wellbeing of all students and staff members."
        ),
      ],
    },
    image: uploadedImages.commitment,
    imagePosition: "center",
  },
  proactiveApproach: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "A Proactive Approach",
      description: [block("proactive-intro", "Our Wellbeing Team actively promotes wellbeing through:")],
    },
    cards: [
      {
        _key: "events-awareness",
        _type: "wellbeingIconCard",
        description: "Events and school wide targeted awareness campaigns.",
        icon: uploadedImages.eventsIcon,
      },
      {
        _key: "staff-sessions",
        _type: "wellbeingIconCard",
        description: "Wellbeing oriented sessions for staff.",
        icon: uploadedImages.sessionsIcon,
      },
      {
        _key: "communication-channels",
        _type: "wellbeingIconCard",
        description: "Diverse communication channels for wellbeing focused education for students, staff, and parents.",
        icon: uploadedImages.communicationIcon,
      },
      {
        _key: "open-door-policy",
        _type: "wellbeingIconCard",
        description: "Open door policy for wellbeing related concerns for all stakeholders.",
        icon: uploadedImages.openDoorIcon,
      },
    ],
  },
  counsellingSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Counselling and\nSupport Services",
      description: [
        block(
          "counselling-intro",
          "We provide comprehensive support for students and staff who have experienced difficulties:"
        ),
        bullet(
          "counselling-bullet-1",
          "Professional counselling sessions and emotional support from qualified social emotional counselors, wellbeing leads, and guidance counselors."
        ),
        bullet(
          "counselling-bullet-2",
          "Group sessions and workshops for students and staff focused on different wellbeing focused themes."
        ),
        bullet("counselling-bullet-3", "Personalized recovery pathways to restore wellbeing."),
      ],
    },
    image: uploadedImages.counselling,
    imagePosition: "center",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    titleColor: "#ffffff",
    textColor: "#ffffff",
    items: [],
  },
  selSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Social and Emotional\nLearning Program (SEL)",
      description: [
        block("sel-intro", "We implements a comprehensive K-12 social-emotional learning program that:"),
        bullet("sel-bullet-1", "Integrates SEL curriculum into classroom instruction across all grade levels."),
        bullet(
          "sel-bullet-2",
          "Provides teachers with extensive resources through the ATLAS curriculum management system and school wellbeing team."
        ),
        bullet(
          "sel-bullet-3",
          "Ensures consistent implementation through oversight by guidance counselors, curriculum coordinators, wellbeing leads and the pastoral team."
        ),
        bullet("sel-bullet-4", "Empowers teachers to monitor, support, and respond to student wellbeing needs."),
      ],
    },
    image: uploadedImages.sel,
    imagePosition: "center",
  },
  wellbeingFramework: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Wellbeing Framework",
      description: [
        block(
          "wellbeing-framework",
          "Our \"Wellbeing Matters\" initiative aligns with the KHDA's framework, emphasizing the importance of wellbeing in the school community. We aim to create a collaborative culture that prioritizes the mental, emotional, and physical wellbeing of students and staff."
        ),
      ],
    },
    image: homepageWhySection?.whySection?.image || uploadedImages.commitment,
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

console.log("Seeded Student & Staff Wellbeing page and linked the community card.");

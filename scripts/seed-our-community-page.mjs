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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Our Community page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/DSC05293.jpg",
    filename: "our-community-hero.jpg",
    title: "SAIS Dubai community hero",
  },
  support: {
    path: "/Users/razan/Downloads/DSC06001.png",
    filename: "our-community-support.png",
    title: "Supporting every student",
  },
  campus: {
    path: "public/contact-campus-building.jpg",
    filename: "our-community-campus.jpg",
    title: "SAIS Dubai campus",
  },
  wellbeing: {
    path: "/Users/razan/Downloads/DSC05293.jpg",
    filename: "our-community-wellbeing.jpg",
    title: "Student and staff wellbeing",
  },
  inclusion: {
    path: "/Users/razan/Downloads/Screenshot 2025-10-28 at 21.48.52.png",
    filename: "our-community-student-inclusion.png",
    title: "Student inclusion",
  },
  parentInvolvement: {
    path: "/Users/razan/Downloads/DSC06112.png",
    filename: "our-community-parent-involvement.png",
    title: "Parent involvement",
  },
  calendar: {
    path: "/Users/razan/Downloads/DSC06112r.png",
    filename: "our-community-school-calendar.png",
    title: "School calendar",
  },
  policies: {
    path: "/Users/razan/Downloads/DSC06112e.png",
    filename: "our-community-school-policies.png",
    title: "School policies",
  },
  healthSafety: {
    path: "/Users/razan/Downloads/_DEL4482.png",
    filename: "our-community-health-safety.png",
    title: "Health and safety",
  },
  foodServices: {
    path: "/Users/razan/Downloads/Screenshot 2025-10-28 at 21e.48.52.png",
    filename: "our-community-food-services.png",
    title: "Food services and nutrition",
  },
  medicalServices: {
    path: "/Users/razan/Downloads/DSC06112eca.png",
    filename: "our-community-medical-services.png",
    title: "Medical services",
  },
  suppliesUniform: {
    path: "/Users/razan/Downloads/DSC06062.png",
    filename: "our-community-school-supplies-uniform.png",
    title: "School supplies and uniform",
  },
  transportation: {
    path: "/Users/razan/Downloads/_DEL4056.png",
    filename: "our-community-transportation.png",
    title: "Transportation safety guidelines",
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

function cta(label, href) {
  return {
    _type: "cta",
    label,
    href,
    variant: "primary",
    openInNewTab: false,
  };
}

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

const cardData = [
  ["our-campus", "Our Campus", uploadedImages.campus, "blue", "/our-campus"],
  [
    "student-staff-wellbeing",
    "Student & Staff Wellbeing",
    uploadedImages.wellbeing,
    "blue",
    "/student-staff-wellbeing",
  ],
  ["student-inclusion", "Student Inclusion", uploadedImages.inclusion, "blue", "/student-inclusion"],
  ["parent-involvement", "Parent Involvement", uploadedImages.parentInvolvement, "teal", "/parent-involvement"],
  ["school-calendar", "School Calendar", uploadedImages.calendar, "teal", "/school-calendar"],
  ["school-policies", "School Policies", uploadedImages.policies, "teal", "/school-policies"],
  ["health-safety", "Health & Safety", uploadedImages.healthSafety, "gray", "/health-safety"],
  [
    "food-services-nutrition",
    "Food Services & Nutrition",
    uploadedImages.foodServices,
    "gray",
    "/food-services-nutrition",
  ],
  ["medical-services", "Medical Services", uploadedImages.medicalServices, "gray", "/medical-services"],
  [
    "school-supplies-uniform",
    "School Supplies & Uniform",
    uploadedImages.suppliesUniform,
    "orange",
    "/school-supplies-uniform",
  ],
  [
    "transportation-safety-guidelines",
    "Transportation Safety Guidelines",
    uploadedImages.transportation,
    "orange",
    "#transportation-safety-guidelines",
  ],
];

await client.createOrReplace({
  _id: "our-community-page",
  _type: "ourCommunityPage",
  seo: {
    _type: "seo",
    title: "Our Community | SAIS Dubai",
    description:
      "Learn about the SAIS Dubai community, campus, wellbeing, inclusion, services, and school support.",
    image: uploadedImages.hero,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Our\nCommunity",
    },
    image: uploadedImages.hero,
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  supportSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Supporting Every Student,\nEvery Step of the Way",
      description: [
        block(
          "support-paragraph-1",
          "Students at SAIS - Dubai thrive in a dynamic, supportive, and innovative learning community. Each division provides dedicated supervisors who oversee and support every student's wellbeing as well as support services provisions that promote inclusion and holistic health."
        ),
        block(
          "support-paragraph-2",
          "Both staff and students embrace the school values as their collective right and responsibility to themselves and others. The school rules document clearly outlines how staff and parents can effectively support students' social and emotional development."
        ),
      ],
    },
    image: uploadedImages.support,
    imagePosition: "left",
    theme: "blue",
    ctas: [],
  },
  linksSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Learn About Our Community",
    },
    cards: cardData.map(([key, title, image, theme, href]) => ({
      _key: key,
      _type: "featureCard",
      title,
      image,
      cta: cta("See More", href),
      theme,
    })),
  },
});

const fallbackNavigation = [
  { _type: "linkField", _key: "about", label: "About", href: "/about-us#about", openInNewTab: false },
  { _type: "linkField", _key: "academics", label: "Academics", href: "/academics", openInNewTab: false },
  { _type: "linkField", _key: "admissions", label: "Admissions", href: "#admissions", openInNewTab: false },
  { _type: "linkField", _key: "community", label: "Our Community", href: "/our-community", openInNewTab: false },
  { _type: "linkField", _key: "contact", label: "Contact", href: "/contact-us", openInNewTab: false },
];

const header = await client.getDocument("site-header-main");
const navigation = header?.navigation?.length ? [...header.navigation] : fallbackNavigation;
const communityIndex = navigation.findIndex((link) => link.label?.trim().toLowerCase().includes("community"));
const communityLink = {
  _type: "linkField",
  _key: "community",
  label: "Our Community",
  href: "/our-community",
  openInNewTab: false,
};

if (communityIndex >= 0) {
  navigation[communityIndex] = {
    ...navigation[communityIndex],
    label: navigation[communityIndex].label || communityLink.label,
    href: communityLink.href,
    openInNewTab: false,
  };
} else {
  navigation.splice(Math.min(3, navigation.length), 0, communityLink);
}

await client
  .patch("site-header-main")
  .set({ navigation })
  .commit();

console.log("Seeded Our Community page and updated the header Community link.");

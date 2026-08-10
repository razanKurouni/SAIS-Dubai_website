import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Extra Curricular Activities page.");
}

const imageSources = {
  hero: {
    path: path.join(projectRoot, "public/about-values-community.jpg"),
    filename: "extra-curricular-activities-hero.jpg",
    title: "SAIS Dubai extracurricular activities",
  },
  intro: {
    path: path.join(projectRoot, "public/about-values-community.jpg"),
    filename: "extra-curricular-activities-enriching.jpg",
    title: "SAIS Dubai students exploring activities",
  },
  activities: {
    path: path.join(projectRoot, "public/about-values-growth.jpg"),
    filename: "extra-curricular-activities-programs.jpg",
    title: "SAIS Dubai extracurricular program",
  },
};

async function uploadImage({ path: imagePath, filename, title }) {
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image was not found at ${imagePath}`);
  }

  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
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

const uploadedImages = await Promise.all(
  Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)]),
).then(Object.fromEntries);

await client.createOrReplace({
  _id: "extra-curricular-activities-page",
  _type: "extraCurricularActivitiesPage",
  seo: {
    _type: "seo",
    title: "Extra Curricular Activities | SAIS Dubai",
    description: "Explore extracurricular activities at Sharjah American International School Dubai.",
    image: uploadedImages.hero,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Extra Curricular\nActivities",
    },
    image: uploadedImages.hero,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: [
      {
        _key: "student-life",
        label: "Student Life",
        href: "/student-life",
        openInNewTab: false,
      },
      {
        _key: "student-programs",
        label: "Student Programs",
        href: "/student-life#student-programs",
        openInNewTab: false,
      },
      {
        _key: "extra-curricular-activities",
        label: "Extra Curricular Activities",
        href: "/extra-curricular-activities",
        openInNewTab: false,
      },
    ],
    activeHref: "/extra-curricular-activities",
    activeColor: "#216B97",
    inactiveColor: "#d97252",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Student Life page navigation",
  },
  introSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Enriching Every Student Journey",
      description: [
        block(
          "extra-curricular-intro",
          "For our students, learning goes beyond the classroom. Our extracurricular program offers a variety of activities that support students' personal, social, and academic development. Through these experiences, students explore their passions, develop new talents, and build confidence, teamwork, and leadership skills."
        ),
      ],
    },
    image: uploadedImages.intro,
    imagePosition: "left",
    theme: "teal",
    ctas: [],
  },
  activitiesSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Extra Curricular Activities",
      description: [
        bullet(
          "extra-curricular-swimming",
          "Swimming: Students improve swimming techniques and water safety while building confidence, discipline, and teamwork through structured lessons and guided practice."
        ),
        bullet(
          "extra-curricular-badminton",
          "Badminton: Students build coordination, discipline, and confidence through engaging drills and friendly matches in a fun and supportive environment."
        ),
        bullet(
          "extra-curricular-football",
          "Football: Students develop teamwork, discipline, and physical fitness through structured training sessions and friendly matches in a supportive environment."
        ),
        bullet(
          "extra-curricular-volleyball",
          "Volleyball: Students strengthen volleyball skills, improve fitness, and develop communication and collaboration through structured practice and friendly matches."
        ),
      ],
    },
    image: uploadedImages.activities,
    imagePosition: "right",
    theme: "blue",
    ctas: [
      {
        _key: "extra-curricular-download",
        _type: "cta",
        label: "Download",
        href: "#",
        variant: "primary",
        openInNewTab: false,
      },
    ],
  },
});

console.log("Seeded Extra Curricular Activities page.");

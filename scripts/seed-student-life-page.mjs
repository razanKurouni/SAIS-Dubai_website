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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Student Life page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Documents/GitHub/SAIS-Homepage-/public/about-values-community.jpg",
    filename: "student-life-hero.jpg",
    title: "SAIS Dubai students enjoying student life",
  },
  characterFormation: {
    path: "/Users/razan/Downloads/_DEL4709.jpg",
    filename: "student-life-character-formation.jpg",
    title: "SAIS Dubai students building character through school life",
  },
  guidedDevelopment: {
    path: "/Users/razan/Downloads/DSC05043.jpg",
    filename: "student-life-guided-development.jpg",
    title: "SAIS Dubai teacher guiding students",
  },
  comprehensiveLearning: {
    path: "/Users/razan/Downloads/DSC06027.jpg",
    filename: "student-life-comprehensive-learning.jpg",
    title: "SAIS Dubai counselling and learning support",
  },
  socialEthicalFoundations: {
    path: "/Users/razan/Downloads/_DEL4772.jpg",
    filename: "student-life-social-ethical-foundations.jpg",
    title: "SAIS Dubai student exploring sensory learning",
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

function slide({
  key,
  title,
  body,
  image,
  backgroundColor = "#216B97",
  sideColor = "#00A5B2",
  ringColor = "#d97252",
}) {
  return {
    _key: key,
    _type: "object",
    title,
    body,
    ...(image ? { image } : {}),
    backgroundColor,
    sideColor,
    ringColor,
    titleColor: "#ffffff",
    textColor: "#ffffff",
    imagePosition: "center",
  };
}

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

const existingPage = await client.getDocument("student-life-page").catch(() => null);
const heroImage = uploadedImages.hero || existingPage?.hero?.image;

await client.createOrReplace({
  _id: "student-life-page",
  _type: "studentLifePage",
  seo: existingPage?.seo || {
    _type: "seo",
    title: "Student Life | SAIS Dubai",
    description: "Explore student life, programs, and extracurricular opportunities at SAIS Dubai.",
    ...(heroImage ? { image: heroImage } : {}),
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student\nLife",
    },
    ...(heroImage ? { image: heroImage } : {}),
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: [
      { _key: "student-life", _type: "object", label: "Student Life", href: "/student-life", openInNewTab: false },
      { _key: "student-programs", _type: "object", label: "Student Programs", href: "/student-programs", openInNewTab: false },
      {
        _key: "extra-curricular-activities",
        _type: "object",
        label: "Extra Curricular Activities",
        href: "#extra-curricular-activities",
        openInNewTab: false,
      },
    ],
    activeHref: "/student-life",
    activeColor: "#216B97",
    inactiveColor: "#d97252",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Student Life page navigation",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "A Foundation for Growth and Development",
      description: [
        block(
          "student-life-intro",
          "Student life forms the essential foundation for personal and academic development. During this formative period, young people encounter diverse situations that prepare them for future challenges. They develop crucial skills in respect and self-discipline while building relationships with peers and educators."
        ),
      ],
    },
    backgroundColor: "#ffffff",
    titleColor: "#00A5B2",
    textColor: "#216B97",
  },
  learningSliderSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "",
    },
    slides: [
      slide({
        key: "character-formation",
        title: "Character Formation",
        body:
          "School life represents a joyful time when students can explore, form friendships, acquire skills, and embrace experiences without the weight of adult responsibilities. Within the school environment, students learn the importance of punctuality, adherence to rules, and fulfillment of responsibilities while gaining knowledge and developing new capabilities.",
        image: uploadedImages.characterFormation,
      }),
      slide({
        key: "guided-development",
        title: "Guided Development",
        body:
          "The guidance received during student life transforms young people into well-rounded individuals. Teachers and parents provide direction, helping students distinguish between beneficial and detrimental choices. This golden period of development is when children's minds - comparable to clay - are most receptive to positive molding and influence.",
        image: uploadedImages.guidedDevelopment,
      }),
      slide({
        key: "comprehensive-learning",
        title: "Comprehensive Learning",
        body:
          "The school environment facilitates holistic learning beyond academics. Students develop proper manners, positive behaviors, discipline, and punctuality. With appropriate education and guidance, they mature into responsible adults prepared for real-world challenges.",
        image: uploadedImages.comprehensiveLearning,
        backgroundColor: "#d97252",
        sideColor: "#00A5B2",
        ringColor: "#216B97",
      }),
      slide({
        key: "social-ethical-foundations",
        title: "Building Social and Ethical Foundations",
        body:
          "Student life establishes the groundwork for both character development and knowledge acquisition. It teaches children about consistency, obedience, sincerity, and perseverance. Through social interactions, students enhance their interpersonal skills while learning to respect diversity while maintaining their own values and principles.",
        image: uploadedImages.socialEthicalFoundations,
        ringColor: "#00A5B2",
      }),
    ],
  },
});

console.log("Seeded Student Life page.");

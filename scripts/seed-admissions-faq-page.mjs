import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the admissions FAQ page.");
}

const client = createClient({ projectId, dataset, token, apiVersion: "2023-01-01", useCdn: false });

async function uploadImage(path, filename, alt) {
  const asset = await client.assets.upload("image", fs.createReadStream(path), { filename, title: alt });

  return {
    _type: "imageWithAlt",
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    alt,
  };
}

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
  };
}

const heroImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4004 (1).JPG",
  "admissions-faq-campus.jpg",
  "Sharjah American International School Dubai campus",
);
const introImage = await uploadImage(
  "/Users/razan/Downloads/DSC06136.jpg",
  "admissions-faq-family.jpg",
  "SAIS Dubai parent walking with two students",
);

const navigationItems = [
  { _key: "introduction", _type: "linkField", label: "Introduction", href: "/admissions" },
  { _key: "applications", _type: "linkField", label: "Applications", href: "/admissions/applications" },
  { _key: "book-tour", _type: "linkField", label: "Book A Tour", href: "/#tour" },
  { _key: "faqs", _type: "linkField", label: "FAQ's", href: "/admissions/faqs" },
  { _key: "fees", _type: "linkField", label: "Fees", href: "/admissions/fees" },
  { _key: "withdrawal", _type: "linkField", label: "Withdrawal", href: "/admissions/withdrawal" },
];

const faqItems = [
  ["curriculum", "What curriculum does the school follow?", "Our school follows an American curriculum aligned with internationally recognized standards. We focus on academic excellence, critical thinking, and global readiness."],
  ["assessment", "How are students assessed?", "Students are evaluated through quizzes, projects, class participation, exams, and continuous assessments throughout the semester."],
  ["grades", "What grade levels do you offer?", "We offer education from Kindergarten through Grade 12."],
  ["progress", "How can parents monitor student progress?", "Parents can access grades, attendance, and teacher feedback through the school portal."],
  ["hours", "What are the school hours?", "School hours vary by grade level. Detailed timings are shared with parents at the beginning of each academic year and are available on the parent portal."],
  ["reports", "When are report cards issued?", "Report cards are issued at the end of each semester and are available through the parent portal."],
  ["apply", "How can I apply for admission?", "Parents can apply online through the Admissions section of our website. Required documents must be uploaded during the application process."],
  ["attendance", "What is the attendance policy?", "Regular attendance is essential. Students with attendance below the required percentage may receive a warning notice."],
  ["documents", "What documents are required for registration?", "Required documents typically include previous school reports, passport copies, Emirates ID copies, vaccination records, and passport-sized photos."],
  ["absence", "How do I report my child’s absence?", "Parents must notify the school via email or through the parent portal on the same day of absence."],
  ["entrance", "Is there an entrance assessment?", "Yes, students may be required to complete an age-appropriate assessment to determine placement."],
].map(([key, question, answer]) => ({ _key: key, _type: "object", question, answer }));

const page = {
  _id: "admissions-faq-page",
  _type: "admissionsFaqPage",
  seo: {
    _type: "seo",
    title: "Frequently Asked Questions | SAIS Dubai",
    description: "Find answers to frequently asked questions about SAIS Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: { _type: "sectionHeading", title: "Frequently Asked\nQuestions" },
    image: heroImage,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: navigationItems,
    activeHref: "/admissions/faqs",
    activeColor: "#216B97",
    inactiveColor: "#00A5B2",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Admissions navigation",
  },
  introSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Your Questions,\nClearly Answered",
      description: [
        block(
          "faq-intro-1",
          "Welcome to our FAQ section, designed to provide parents and students with clear, helpful information about our school's policies, academics, admissions, attendance, and extra-curricular activities.",
        ),
        block(
          "faq-intro-2",
          "We are committed to transparency and open communication, and this page aims to answer common questions and guide you through everything you need to know about school life. If you require further assistance, our team is always ready to support you.",
        ),
      ],
    },
    image: introImage,
    imagePosition: "center",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    titleColor: "#ffffff",
    textColor: "#ffffff",
  },
  faqSection: {
    _type: "object",
    items: faqItems,
  },
};

await client.createOrReplace(page);
console.log("Seeded admissions-faq-page.");

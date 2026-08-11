import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the admissions page.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2023-01-01",
  useCdn: false,
});

async function uploadImage(path, filename, alt) {
  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title: alt,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
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
  "public/contact-campus-building.jpg",
  "admissions-campus-building.jpg",
  "Sharjah American International School Dubai campus",
);
const introImage = await uploadImage(
  "public/about-intro-students.jpg",
  "admissions-welcome-students.jpg",
  "SAIS Dubai students learning together",
);
const policyImage = await uploadImage(
  "public/about-intro-students.jpg",
  "admissions-policy-students.jpg",
  "SAIS Dubai students taking part in a school activity",
);

const page = {
  _id: "admissions-page",
  _type: "admissionsPage",
  seo: {
    _type: "seo",
    title: "Admissions Introduction | SAIS Dubai",
    description: "Explore the admissions process at Sharjah American International School Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Admissions\nIntroduction",
    },
    image: heroImage,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  innerNavigation: {
    _type: "object",
    activeHref: "/admissions",
    activeColor: "#216B97",
    inactiveColor: "#00A5B2",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Admissions navigation",
    items: [
      { _key: "introduction", _type: "linkField", label: "Introduction", href: "/admissions" },
      { _key: "applications", _type: "linkField", label: "Applications", href: "/admissions/applications" },
      { _key: "book-tour", _type: "linkField", label: "Book A Tour", href: "/#tour" },
      { _key: "faqs", _type: "linkField", label: "FAQ's", href: "/admissions/faqs" },
      { _key: "fees", _type: "linkField", label: "Fees", href: "/admissions/fees" },
      { _key: "withdrawal", _type: "linkField", label: "Withdrawal", href: "/admissions/withdrawal" },
    ],
  },
  introSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Welcome to Admissions",
      description: [
        block(
          "welcome-1",
          "We extend a warm welcome to all visitors and prospective families considering our educational community. Our admissions process is designed to be clear and efficient, fully compliant with the guidelines established by the Knowledge and Human Development Authority of Dubai (KHDA).",
        ),
        block(
          "welcome-2",
          "Our dedicated admissions team and school leadership are committed to providing comprehensive support and guidance throughout your application journey. We strive to ensure that each step of the process is straightforward and accessible for all prospective families.",
        ),
        block(
          "welcome-3",
          "For detailed information regarding admission requirements, procedures, and necessary documentation, please explore the additional resources available in our admissions section.",
        ),
      ],
    },
    image: introImage,
    imagePosition: "center",
    theme: "blue",
  },
  policySection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Admissions Policy",
      description: [
        block(
          "policy-1",
          "We evaluate all applications for admission impartially, without regard to race, color, gender, disability, religion, or national origin.",
        ),
        block(
          "policy-2",
          "The school maintains the discretion to assess each application based on individual merit. In accordance with Knowledge and Human Development Authority (KHDA) regulations, students with persistent behavioral concerns, despite substantial support and intervention, may not receive admission approval for subsequent academic years.",
        ),
        block(
          "policy-3",
          "Priority consideration is extended to Students of Determination who have siblings currently enrolled at SAIS-Dubai.",
        ),
        block(
          "policy-4",
          "For comprehensive information, please refer to the 2025 School Guide.",
        ),
      ],
    },
    image: policyImage,
    imagePosition: "center",
    theme: "teal",
  },
};

await client.createOrReplace(page);
console.log("Seeded admissions-page.");

import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the admissions withdrawal page.");
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
  "admissions-withdrawal-campus.jpg",
  "Sharjah American International School Dubai campus",
);
const introImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4530.jpg",
  "admissions-withdrawal-student.jpg",
  "SAIS Dubai student studying in the classroom",
);

const navigationItems = [
  { _key: "introduction", _type: "linkField", label: "Introduction", href: "/admissions" },
  { _key: "applications", _type: "linkField", label: "Applications", href: "/admissions/applications" },
  { _key: "book-tour", _type: "linkField", label: "Book A Tour", href: "/admissions/book-a-tour" },
  { _key: "faqs", _type: "linkField", label: "FAQ's", href: "/admissions/faqs" },
  { _key: "fees", _type: "linkField", label: "Fees", href: "/admissions/fees" },
  { _key: "withdrawal", _type: "linkField", label: "Withdrawal", href: "/admissions/withdrawal" },
];

const page = {
  _id: "admissions-withdrawal-page",
  _type: "admissionsWithdrawalPage",
  seo: {
    _type: "seo",
    title: "Student Withdrawal Process | SAIS Dubai",
    description: "Learn about the student withdrawal process at SAIS Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: { _type: "sectionHeading", title: "Student Withdrawal\nProcess" },
    image: heroImage,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: navigationItems,
    activeHref: "/admissions/withdrawal",
    activeColor: "#216B97",
    inactiveColor: "#00A5B2",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Admissions navigation",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title:
        "Should your circumstances necessitate relocation or should you decide to transfer your child to another educational institution in Dubai, please contact our Registration Department.",
    },
    image: introImage,
    imagePosition: "center",
    body: [
      block(
        "withdrawal-info-1",
        "Our Registration and Accounts teams will promptly calculate any outstanding or paid school and transportation fees, providing you with detailed information regarding any due payments or eligible refunds.",
      ),
      block(
        "withdrawal-info-2",
        "We value your child’s educational journey with us. If you are considering a transfer due to concerns about your child’s academic progress or well-being, we encourage you to first contact the relevant Supervisor or Head of School who can work collaboratively with you to address and resolve these matters.",
      ),
      block(
        "withdrawal-info-3",
        "If your concerns remain unresolved after consulting with Supervisors and Heads of Department, please schedule an appointment with the Vice Principal or Principal, who are committed to ensuring all student and parent concerns receive appropriate attention and resolution.",
      ),
      block("withdrawal-info-4", "For further information, please contact us at T: 04 280 1111"),
    ],
  },
};

await client.createOrReplace(page);
console.log("Seeded admissions-withdrawal-page.");

import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the admissions book a tour page.");
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
  "/Users/razan/Downloads/_NEC6197.jpg",
  "admissions-book-tour-hero.jpg",
  "Sharjah American International School Dubai entrance and UAE flags",
);
const introImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4004.jpg",
  "admissions-book-tour-campus.jpg",
  "Sharjah American International School Dubai main entrance",
);

const navigationItems = [
  { _key: "introduction", _type: "linkField", label: "Introduction", href: "/admissions" },
  { _key: "applications", _type: "linkField", label: "Applications", href: "/admissions/applications" },
  { _key: "book-tour", _type: "linkField", label: "Book A Tour", href: "/admissions/book-a-tour" },
  { _key: "faqs", _type: "linkField", label: "FAQ's", href: "/admissions/faqs" },
  { _key: "fees", _type: "linkField", label: "Fees", href: "/admissions/fees" },
  { _key: "withdrawal", _type: "linkField", label: "Withdrawal", href: "/admissions/withdrawal" },
];

const formFields = [
  ["name", "Name", "name", "text"],
  ["surname", "Surname", "surname", "text"],
  ["phone", "Phone Number", "phone", "tel"],
  ["email", "Email", "email", "email"],
  ["visit-date", "Preferred Visit Date", "preferredVisitDate", "date"],
  ["time", "Time", "preferredTime", "time"],
  ["message", "Message", "message", "textarea"],
].map(([key, label, name, type]) => ({
  _key: key,
  _type: "object",
  label,
  name,
  type,
  required: true,
}));

const page = {
  _id: "admissions-book-tour-page",
  _type: "admissionsBookTourPage",
  seo: {
    _type: "seo",
    title: "Book a Tour | SAIS Dubai",
    description: "Book a campus tour and experience SAIS Dubai first-hand.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: { _type: "sectionHeading", title: "Book\na Tour" },
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
    activeHref: "/admissions/book-a-tour",
    activeColor: "#216B97",
    inactiveColor: "#00A5B2",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Admissions navigation",
  },
  introSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Experience SAIS-Dubai first-hand by stepping onto our campus and exploring everything we have to offer.",
      description: [
        block(
          "tour-intro-1",
          "Take a closer look at our modern facilities, vibrant learning environments, and welcoming community. You’ll also have the opportunity to meet our team and get a real sense of life at SAIS - Dubai.",
        ),
        block(
          "tour-intro-2",
          "Use the form below to book your campus tour, we look forward to welcoming you.",
        ),
      ],
    },
    image: introImage,
    imagePosition: "left",
    theme: "blue",
  },
  formSection: {
    _type: "object",
    ariaLabel: "Book a campus tour",
    fields: formFields,
    submitLabel: "Submit",
    successMessage: "Thank you. Your tour request has been received.",
  },
};

await client.createOrReplace(page);

const admissionsDocumentIds = [
  "admissions-page",
  "admissions-application-page",
  "admissions-faq-page",
  "admissions-fees-page",
  "admissions-withdrawal-page",
];
const admissionsDocuments = await client.fetch(
  `*[_id in $ids] { _id, innerNavigation }`,
  { ids: admissionsDocumentIds },
);
const transaction = client.transaction();

for (const document of admissionsDocuments) {
  const items = document.innerNavigation?.items?.map((item) =>
    item.label === "Book A Tour" ? { ...item, href: "/admissions/book-a-tour" } : item,
  );

  if (items) {
    transaction.patch(document._id, { set: { "innerNavigation.items": items } });
  }
}

await transaction.commit();
console.log("Seeded admissions-book-tour-page and updated Admissions navigation links.");

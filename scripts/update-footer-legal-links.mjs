import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("SANITY_AUTH_TOKEN is required.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token,
});

const legalLinks = [
  {
    _key: "terms",
    _type: "linkField",
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
    openInNewTab: false,
  },
  {
    _key: "privacy",
    _type: "linkField",
    label: "Privacy Policy",
    href: "/privacy-policy",
    openInNewTab: false,
  },
];

await client.patch("site-footer").set({ legalLinks }).commit();
console.log("Updated footer legal links in Sanity.");

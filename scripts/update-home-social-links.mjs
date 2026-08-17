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

const socialLinks = [
  {
    _key: "instagram",
    _type: "linkField",
    label: "Instagram",
    href: "https://www.instagram.com/saisdubaicampus/",
    openInNewTab: true,
  },
  {
    _key: "facebook",
    _type: "linkField",
    label: "Facebook",
    href: "https://www.facebook.com/SAISDubai/",
    openInNewTab: true,
  },
  {
    _key: "linkedin",
    _type: "linkField",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sais-dubai-174281177/",
    openInNewTab: true,
  },
];

await client.patch("homepage-main").set({ "instagram.socialLinks": socialLinks }).commit();
console.log("Updated homepage social media links in Sanity.");

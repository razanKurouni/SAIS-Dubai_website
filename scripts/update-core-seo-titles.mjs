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

await client
  .transaction()
  .patch("homepage-main", (patch) =>
    patch.set({
      "seo.title": "Sharjah American International School Dubai | SAIS Dubai",
    }),
  )
  .patch("about-page", (patch) =>
    patch.set({
      "seo.title": "About SAIS | SAIS Dubai",
    }),
  )
  .commit();

console.log("Updated the homepage and About SAIS meta titles.");

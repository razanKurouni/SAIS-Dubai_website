import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("SANITY_AUTH_TOKEN is required.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const document = await client.fetch(
  `*[_type == "aboutPage" && _id == "about-page"][0]{_id, "subtitle": values.heading.subtitle, "description": values.heading.description}`,
);

if (!document?._id) throw new Error("About Us document was not found.");

if (!document.subtitle) {
  console.log("Our Values subtitle is already empty; no migration was needed.");
  process.exit(0);
}

const description = document.description?.length
  ? document.description
  : [
      {
        _type: "block",
        _key: "our-values-description",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "our-values-description-text",
            marks: [],
            text: document.subtitle,
          },
        ],
      },
    ];

await client
  .patch(document._id)
  .set({ "values.heading.description": description })
  .unset(["values.heading.subtitle"])
  .commit();

console.log("Moved the Our Values supporting text from Subtitle to Description.");

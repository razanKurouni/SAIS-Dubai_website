import fs from "node:fs";
import { createClient } from "@sanity/client";

const imagePath = "/Users/razan/Downloads/_NEC6369.jpg";
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) throw new Error("SANITY_AUTH_TOKEN is required.");
if (!fs.existsSync(imagePath)) throw new Error(`Image not found: ${imagePath}`);

const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
  filename: "middle-school-learning-phases-elementary.jpg",
  title: "Elementary students in music class",
});

await client
  .patch("academics-middle-school-page")
  .set({
    learningPhasesElementaryImage: {
      _type: "imageWithAlt",
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      alt: "SAIS Dubai elementary students participating in a music class",
    },
  })
  .commit();

console.log("Updated the Middle School Elementary learning-phase image in Sanity.");

import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const files = {
  sectionImage: {
    path: "/Users/razan/Documents/GitHub/SAIS-Homepage-/public/sais-building-futures.png",
    filename: "about-khda-students.png",
    title: "SAIS Dubai students learning in a science lab",
    alt: "SAIS Dubai students learning in a science lab",
  },
  khdaBadge: {
    path: "/Users/razan/Downloads/Image 8.png",
    filename: "about-khda-badge.png",
    title: "Licensed and approved by KHDA",
    alt: "Licensed and approved by KHDA",
  },
};

for (const file of Object.values(files)) {
  if (!fs.existsSync(file.path)) {
    throw new Error(`File was not found at ${file.path}`);
  }
}

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-span`,
        _type: "span",
        marks: [],
        text,
      },
    ],
  };
}

function imageWithAlt(asset, alt) {
  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt,
  };
}

async function uploadImage(file) {
  return client.assets.upload("image", fs.createReadStream(file.path), {
    filename: file.filename,
    title: file.title,
  });
}

const assets = {};

for (const [key, file] of Object.entries(files)) {
  assets[key] = await uploadImage(file);
}

await client.createIfNotExists({
  _id: "about-page",
  _type: "aboutPage",
});

await client
  .patch("about-page")
  .set({
    khdaSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "The Knowledge and Human Development Authority (KHDA)",
        description: [
          block(
            "about-khda-description",
            "The Knowledge and Human Development Authority (KHDA) serves as the government agency responsible for overseeing private education in Dubai, ensuring quality control and high academic standards across all private educational institutions. The KHDA welcomes feedback from Dubai residents regarding private education and assists families in resolving concerns that remain unaddressed at the school level."
          ),
        ],
      },
      image: imageWithAlt(assets.sectionImage, files.sectionImage.alt),
      badge: imageWithAlt(assets.khdaBadge, files.khdaBadge.alt),
      cta: {
        _type: "cta",
        label: "See More",
        href: "https://web.khda.gov.ae/en/",
        variant: "primary",
        openInNewTab: true,
      },
      imagePosition: "center",
      backgroundColor: "#ffffff",
      panelColor: "#27779D",
      accentColor: "#00A5B2",
      titleColor: "#00A5B2",
      textColor: "#ffffff",
    },
  })
  .commit();

console.log("Updated about-page.khdaSection with uploaded Sanity assets.");

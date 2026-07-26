import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const files = {
  abuDhabi: {
    path: "/Users/razan/Downloads/_DEL5629.png",
    filename: "about-branch-abu-dhabi.png",
    title: "SAIS Abu Dhabi campus",
    alt: "SAIS Abu Dhabi campus building",
  },
  sharjah: {
    path: "/Users/razan/Downloads/_DEL2300.png",
    filename: "about-branch-sharjah.png",
    title: "SAIS Sharjah campus",
    alt: "SAIS Sharjah campus building",
  },
  ummAlQuwain: {
    path: "/Users/razan/Downloads/_DEL4846.png",
    filename: "about-branch-umm-al-quwain.png",
    title: "SAIS Umm Al Quwain campus",
    alt: "SAIS Umm Al Quwain campus building",
  },
};

for (const file of Object.values(files)) {
  if (!fs.existsSync(file.path)) {
    throw new Error(`File was not found at ${file.path}`);
  }
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
    branches: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Our Branches",
      },
      cards: [
        {
          _key: "about-branch-abu-dhabi",
          _type: "object",
          name: "SAIS Abu Dhabi",
          established: "2016",
          location: "Abu Dhabi, UAE",
          description:
            "SAIS Abu Dhabi, delivering a high-quality American curriculum aligned with internationally recognised standards. Guided by the California State framework, the school provides a nurturing environment that supports academic excellence.",
          image: imageWithAlt(assets.abuDhabi, files.abuDhabi.alt),
          cta: {
            _type: "cta",
            label: "See More",
            href: "#",
            variant: "primary",
            openInNewTab: false,
          },
          cardColor: "#27779D",
          buttonColor: "#27779D",
          imagePosition: "center",
        },
        {
          _key: "about-branch-sharjah",
          _type: "object",
          name: "SAIS Sharjah",
          established: "1997",
          location: "Al Ramaqiya Area, Sharjah, UAE",
          description:
            "SAIS Sharjah offers a well-established academic environment known for its commitment to excellence, student wellbeing, and continuous improvement. Students benefit from a balanced American curriculum designed to support achievement and personal growth.",
          image: imageWithAlt(assets.sharjah, files.sharjah.alt),
          cta: {
            _type: "cta",
            label: "See More",
            href: "#",
            variant: "primary",
            openInNewTab: false,
          },
          cardColor: "#00A5B2",
          buttonColor: "#00A5B2",
          imagePosition: "center",
        },
        {
          _key: "about-branch-umm-al-quwain",
          _type: "object",
          name: "SAIS Umm Al Quwain",
          established: "2014",
          location: "Umm Al Quwain City, UAE",
          description:
            "SAIS Umm Al Quwain fosters a close-knit and supportive community where personalized learning is a priority. The campus emphasizes strong relationships, ensuring every student is guided toward academic and personal development.",
          image: imageWithAlt(assets.ummAlQuwain, files.ummAlQuwain.alt),
          cta: {
            _type: "cta",
            label: "See More",
            href: "#",
            variant: "primary",
            openInNewTab: false,
          },
          cardColor: "#777B80",
          buttonColor: "#D97252",
          imagePosition: "center",
        },
      ],
      backgroundColor: "#f3f3f3",
      titleColor: "#00A5B2",
      lineColor: "#216B97",
    },
  })
  .commit();

console.log("Updated about-page.branches with uploaded Sanity assets.");

import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const files = {
  dubaiChamber: {
    path: "/Users/razan/Downloads/Image 7.png",
    filename: "about-accreditation-dubai-chamber.png",
    title: "Dubai Chamber logo",
    alt: "Dubai Chamber logo",
  },
  dubaiHealthAuthority: {
    path: "/Users/razan/Downloads/dubai-health-authority.png",
    filename: "about-accreditation-dubai-health-authority.png",
    title: "Dubai Health Authority logo",
    alt: "Dubai Health Authority logo",
  },
  rta: {
    path: "/Users/razan/Downloads/Image 3.png",
    filename: "about-accreditation-rta.png",
    title: "Roads and Transport Authority logo",
    alt: "Roads and Transport Authority logo",
  },
  dubaiMunicipality: {
    path: "/Users/razan/Downloads/Image 5.png",
    filename: "about-accreditation-dubai-municipality.png",
    title: "Dubai Municipality logo",
    alt: "Dubai Municipality logo",
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
    accreditations: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Accreditations",
      },
      body: [
        block(
          "about-accreditations-body-1",
          "SAIS - Dubai maintains full accreditation from two internationally recognized and distinguished accreditation bodies: The New England Association of Schools and Colleges (NEASC) and Cognia. These accreditations affirm our commitment to educational excellence and continuous improvement."
        ),
        block(
          "about-accreditations-body-2",
          "Our institution holds all required licenses and permits from Dubai's regulatory authorities."
        ),
        block(
          "about-accreditations-body-3",
          "SAIS - Dubai is an approved and authorized College Board testing center for the PSAT, SAT, and Advanced Placement (AP) examinations. Our official Test Center number is 52858."
        ),
      ],
      logos: [
        {
          _key: "about-accreditations-dubai-chamber",
          _type: "object",
          name: "Dubai Chamber",
          image: imageWithAlt(assets.dubaiChamber, files.dubaiChamber.alt),
          width: "240px",
        },
        {
          _key: "about-accreditations-dubai-health-authority",
          _type: "object",
          name: "Dubai Health Authority",
          image: imageWithAlt(assets.dubaiHealthAuthority, files.dubaiHealthAuthority.alt),
          width: "260px",
        },
        {
          _key: "about-accreditations-rta",
          _type: "object",
          name: "Roads and Transport Authority",
          image: imageWithAlt(assets.rta, files.rta.alt),
          width: "260px",
        },
        {
          _key: "about-accreditations-dubai-municipality",
          _type: "object",
          name: "Dubai Municipality",
          image: imageWithAlt(assets.dubaiMunicipality, files.dubaiMunicipality.alt),
          width: "280px",
        },
      ],
      backgroundColor: "#f3f3f3",
      titleColor: "#00A5B2",
      lineColor: "#216B97",
      textColor: "#6F7378",
    },
  })
  .commit();

console.log("Updated about-page.accreditations with uploaded Sanity assets.");

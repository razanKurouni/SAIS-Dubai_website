import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const files = {
  characterImage: {
    path: "/Users/razan/Downloads/_DEL4827.jpg",
    filename: "about-values-character.jpg",
    title: "SAIS Dubai values - Character",
  },
  communityImage: {
    path: "/Users/razan/Downloads/_DEL48273.jpg",
    filename: "about-values-community.jpg",
    title: "SAIS Dubai values - Community",
  },
  growthImage: {
    path: "/Users/razan/Downloads/_DEL48274.jpg",
    filename: "about-values-growth.jpg",
    title: "SAIS Dubai values - Growth",
  },
  integrityIcon: {
    path: "/Users/razan/Downloads/Group 1349.png",
    filename: "about-values-icon-integrity.png",
    title: "Integrity icon",
  },
  respectIcon: {
    path: "/Users/razan/Downloads/Path 2101.png",
    filename: "about-values-icon-respect.png",
    title: "Respect and equity icon",
  },
  collaborationIcon: {
    path: "/Users/razan/Downloads/Group 1350.png",
    filename: "about-values-icon-collaboration.png",
    title: "Collaboration icon",
  },
  wellbeingIcon: {
    path: "/Users/razan/Downloads/Group 1351.png",
    filename: "about-values-icon-wellbeing.png",
    title: "Wellbeing icon",
  },
  innovationIcon: {
    path: "/Users/razan/Downloads/Group 1357.png",
    filename: "about-values-icon-innovation.png",
    title: "Innovation icon",
  },
  lifelongLearningIcon: {
    path: "/Users/razan/Downloads/Group 1359.png",
    filename: "about-values-icon-lifelong-learning.png",
    title: "Lifelong learning icon",
  },
};

for (const file of Object.values(files)) {
  if (!fs.existsSync(file.path)) {
    throw new Error(`File was not found at ${file.path}`);
  }
}

function keyed(key, value) {
  return {
    _key: key,
    ...value,
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
    values: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Our Values",
        subtitle:
          "We express our values through three connected pillars:\nthe character we build, the way we work together, and how we continue to grow.",
      },
      backgroundColor: "#00A5B2",
      titleColor: "#ffffff",
      introTextColor: "#ffffff",
      slides: [
        keyed("values-character", {
          _type: "valuesSlide",
          title: "Character",
          image: imageWithAlt(
            assets.characterImage,
            "SAIS Dubai teacher supporting a student with a tablet in class"
          ),
          curveColor: "#216B97",
          titleColor: "#216B97",
          itemTitleColor: "#216B97",
          textColor: "#666B70",
          imagePosition: "center",
          items: [
            keyed("values-character-integrity", {
              _type: "valuesPillarItem",
              title: "Integrity",
              description:
                "We act with honesty, take responsibility for our actions, and hold ourselves to high standards.",
              icon: imageWithAlt(assets.integrityIcon, "Integrity icon"),
            }),
            keyed("values-character-respect", {
              _type: "valuesPillarItem",
              title: "Respect and Equity",
              description:
                "By treating every individual with fairness, dignity, and consideration, we create an inclusive environment where everyone feels they belong and can succeed.",
              icon: imageWithAlt(assets.respectIcon, "Respect and equity icon"),
            }),
          ],
        }),
        keyed("values-community", {
          _type: "valuesSlide",
          title: "Community",
          image: imageWithAlt(
            assets.communityImage,
            "SAIS Dubai students smiling together on the playground"
          ),
          curveColor: "#D97252",
          titleColor: "#D97252",
          itemTitleColor: "#D97252",
          textColor: "#666B70",
          imagePosition: "center",
          items: [
            keyed("values-community-collaboration", {
              _type: "valuesPillarItem",
              title: "Collaboration",
              description:
                "We work together with purpose, valuing the synergy between different cultures and perspectives, and building strong relationships across our school community.",
              icon: imageWithAlt(assets.collaborationIcon, "Collaboration icon"),
            }),
            keyed("values-community-wellbeing", {
              _type: "valuesPillarItem",
              title: "Wellbeing",
              description:
                "We prioritize the social, emotional, and physical wellbeing of our community, creating a safe and supportive environment where individuals can grow with confidence.",
              icon: imageWithAlt(assets.wellbeingIcon, "Wellbeing icon"),
            }),
          ],
        }),
        keyed("values-growth", {
          _type: "valuesSlide",
          title: "Growth",
          image: imageWithAlt(assets.growthImage, "SAIS Dubai students working in a science lab"),
          curveColor: "#777B80",
          titleColor: "#777B80",
          itemTitleColor: "#777B80",
          textColor: "#666B70",
          imagePosition: "center",
          items: [
            keyed("values-growth-innovation", {
              _type: "valuesPillarItem",
              title: "Innovation",
              description:
                "We embrace curiosity, creativity, and forward thinking, using technology and new ideas to enrich learning and prepare students for a changing world.",
              icon: imageWithAlt(assets.innovationIcon, "Innovation icon"),
            }),
            keyed("values-growth-lifelong-learning", {
              _type: "valuesPillarItem",
              title: "Lifelong Learning",
              description:
                "We encourage curiosity, adaptability, and continuous growth, empowering students to take ownership of their learning and future.",
              icon: imageWithAlt(assets.lifelongLearningIcon, "Lifelong learning icon"),
            }),
          ],
        }),
      ],
    },
  })
  .commit();

console.log("Updated about-page.values with uploaded Sanity assets.");

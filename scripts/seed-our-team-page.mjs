import fs from "node:fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Our Team page.");
}

async function uploadImage(path, filename, title) {
  if (!fs.existsSync(path)) {
    throw new Error(`Image was not found at ${path}`);
  }

  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt: title,
  };
}

const heroImage = await uploadImage(
  "public/our-team-hero.png",
  "our-team-hero.png",
  "SAIS Dubai team members standing together"
);

const teamMembers = [
  {
    key: "mohammed-sultan",
    name: "Mohammed Sultan",
    role: "School Principal",
    path: "/Users/razan/Downloads/Mohammed Sultan.png",
    filename: "our-team-mohammed-sultan.png",
  },
  {
    key: "bachir-zarzour",
    name: "Mr. Bachir Zarzour",
    role: "Vice Principal",
    path: "/Users/razan/Downloads/MR. Bachir Zarzour.png",
    filename: "our-team-bachir-zarzour.png",
  },
  {
    key: "meisam-hasanpour",
    name: "Mr. Meisam Hasanpour",
    role: "Assistant Principal",
    path: "/Users/razan/Downloads/MR. Meisam Hasanpour.png",
    filename: "our-team-meisam-hasanpour.png",
  },
  {
    key: "donna-reeves",
    name: "Donna Reeves",
    role: "Curriculum Coordinator and Head of Performing Arts",
    path: "/Users/razan/Downloads/Donna Reeves.png",
    filename: "our-team-donna-reeves.png",
  },
  {
    key: "rawad-bou-jaber",
    name: "Mr. Rawad Bou Jaber",
    role: "Head of 5 - 12 Boys",
    path: "/Users/razan/Downloads/MR. Rawad Bou Jaber.png",
    filename: "our-team-rawad-bou-jaber.png",
  },
  {
    key: "rana-el-dor",
    name: "Ms. Rana El Dor",
    role: "Head of 6 - 12 Girls",
    path: "/Users/razan/Downloads/MS. Rana El Dor.png",
    filename: "our-team-rana-el-dor.png",
  },
  {
    key: "sophia-sheikh",
    name: "Sophia Sheikh",
    role: "Head of Upper Elementary (3-4-5 Girls)",
    path: "/Users/razan/Downloads/Sophia Sheikh.png",
    filename: "our-team-sophia-sheikh.png",
  },
  {
    key: "preet-sahota",
    name: "Ms. Preet Sahota",
    role: "Career and Guidance Counsellor/Wellbeing Coordinator",
    path: "/Users/razan/Downloads/Ms. Preet Sahota.png",
    filename: "our-team-preet-sahota.png",
  },
];

const memberImages = await Promise.all(
  teamMembers.map((member) => uploadImage(member.path, member.filename, member.name))
);

await client.createOrReplace({
  _id: "our-team-page",
  _type: "ourTeamPage",
  seo: {
    _type: "seo",
    title: "Our Team | SAIS Dubai",
    description: "Meet the team at Sharjah American International School Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Meet\nOur Team",
    },
    image: heroImage,
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  leadershipSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title:
        "Our academic team is a diverse group of passionate educators and experienced leaders committed to delivering high-quality education across all grade levels.",
      description: [
        {
          _key: "leadership-description",
          _type: "block",
          children: [
            {
              _key: "leadership-description-text",
              _type: "span",
              text:
                "Our Senior Leadership Team (SLT) provides strategic direction and fosters a culture of excellence and innovation.",
            },
          ],
        },
      ],
    },
    groupTitle: "Senior Leadership Team",
    members: teamMembers.map((member, index) => ({
      _key: member.key,
      _type: "boardGovernorMember",
      name: member.name,
      role: member.role,
      image: memberImages[index],
      cardColor: "#27779d",
      imageBackgroundColor: "#d3d3d3",
    })),
    backgroundColor: "#ffffff",
    introColor: "#216B97",
    bodyColor: "#707174",
    titleColor: "#00A5B2",
    lineColor: "#216B97",
  },
});

console.log("Seeded our-team-page with editable hero and leadership team content.");

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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Student Inclusion page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/Mask Group 2.jpg",
    filename: "student-inclusion-hero.jpg",
    title: "SAIS Dubai students learning in class",
  },
  intro: {
    path: "/Users/razan/Downloads/_DEL4328.jpg",
    filename: "student-inclusion-intro.jpg",
    title: "SAIS Dubai student reading outdoors",
  },
  approach: {
    path: "/Users/razan/Downloads/Mask Group 2.jpg",
    filename: "student-inclusion-approach.jpg",
    title: "SAIS Dubai inclusive classroom activity",
  },
  determinationIcon: {
    path: "/Users/razan/Downloads/Group 571.jpg",
    filename: "student-inclusion-determination-icon.jpg",
    title: "Students of determination icon",
  },
  giftedIcon: {
    path: "/Users/razan/Downloads/Group 574.jpg",
    filename: "student-inclusion-gifted-icon.jpg",
    title: "Gifted and talented students icon",
  },
  ealIcon: {
    path: "/Users/razan/Downloads/Group 1223.jpg",
    filename: "student-inclusion-eal-icon.jpg",
    title: "EAL learners icon",
  },
};

async function uploadImage({ path, filename, title }) {
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

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-text`,
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

function updateCommunityCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;

  return cards.map((card) => {
    const isStudentInclusionCard = card?._key === "student-inclusion" || card?.title === "Student Inclusion";
    if (!isStudentInclusionCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/student-inclusion",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

await client.createOrReplace({
  _id: "student-inclusion-page",
  _type: "studentInclusionPage",
  seo: {
    _type: "seo",
    title: "Student Inclusion | SAIS Dubai",
    description: "Learn about student inclusion and support programs at SAIS Dubai.",
    image: uploadedImages.hero,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student\nInclusion",
    },
    image: uploadedImages.hero,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  introSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Investing in Continuous\nProfessional Growth",
      description: [
        block(
          "student-inclusion-intro",
          "Inclusion is a core value embraced by the entire school community. The commitment to equitable access to learning opportunities is evident in the school's open admission policy and inclusive practices tailored to meet the diverse needs of all learners. Specialized programs cater to students of determination, those on learning support programs, and those with additional language needs, ensuring every student can thrive. Investment in additional resources and student support services, including dedicated Special Educational Needs Coordinator (SENCO) and social and emotional counselors, underscores the school's dedication to supporting every learner."
        ),
      ],
    },
    image: uploadedImages.intro,
    imagePosition: "left",
    theme: "teal",
    ctas: [],
  },
  approachSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Inclusive Learning Community",
      description: [
        block(
          "student-inclusion-approach-1",
          "Rigorous assessment data analyses guide efforts to address the varying needs of the diverse student body, shaping curriculum design, adaptation, and lesson planning. Curriculum enrichment initiatives integrate critical issues, promoting awareness and understanding from an early age."
        ),
        block(
          "student-inclusion-approach-2",
          "Peer mentoring programs, community service projects, and thoughtfully curated resources further promote inclusivity and representation within the learning community."
        ),
        block(
          "student-inclusion-approach-3",
          "Ethical practice is paramount, with all members committed to upholding ethical standards. Through surveys, student leadership opportunities, parental engagement initiatives, and an open-door policy, we foster a positive and welcoming learning environment where every member feels a sense of belonging."
        ),
      ],
    },
    image: uploadedImages.approach,
    imagePosition: "right",
    theme: "teal",
    ctas: [],
  },
  supportProgramsSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Inclusion & Support Programs",
    },
    backgroundColor: "#f2f2f2",
    titleColor: "#00A5B2",
    cardBorderColor: "#216B97",
    cardHoverBorderColor: "#00A5B2",
    cardTextColor: "#216B97",
    cards: [
      {
        _key: "students-of-determination",
        _type: "object",
        title: "Students of Determination",
        description:
          "Students with special educational needs and/or disabilities (SEND/SOD) are supported through individualized education plans (IEP), push-in/pull-out support services, and tailored curriculum, instruction, and assessments.",
        icon: uploadedImages.determinationIcon,
        iconType: "determination",
      },
      {
        _key: "gifted-talented",
        _type: "object",
        title: "Gifted and Talented Students",
        description:
          "Students with identified gifts and/or talents are provided with enrichment and accelerated programs as comprehensively stated and elaborated on in their advanced learning plans (ALPs).",
        icon: uploadedImages.giftedIcon,
        iconType: "gifted",
      },
      {
        _key: "eal-learners",
        _type: "object",
        title: "EAL Learners",
        description:
          "Students with additional English language needs are identified through WIDA screener and supported with tiered interventions.",
        icon: uploadedImages.ealIcon,
        iconType: "eal",
      },
      {
        _key: "counselling-support",
        _type: "object",
        title: "Counselling and Support Services",
        description:
          "Students receive social, emotional, and pastoral support through coordinated care pathways and responsive school-based services.",
        iconType: "counseling",
      },
    ],
  },
});

const communityPage = await client.getDocument("our-community-page");
const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded Student Inclusion page and linked the community card.");

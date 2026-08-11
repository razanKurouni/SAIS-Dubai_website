import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectRoot = process.cwd();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Student Programs page.");
}

const imageSources = {
  hero: {
    path: path.join(projectRoot, "public/sais-hero-students.jpg"),
    filename: "student-programs-hero.jpg",
    title: "SAIS Dubai students working together",
  },
  intro: {
    path: "/Users/razan/Downloads/DSC05465.png",
    filename: "student-programs-intro.jpg",
    title: "SAIS Dubai student programs and leadership",
  },
  modelUnitedNationsIcon: {
    path: "/Users/razan/Downloads/Group 714.png",
    filename: "student-programs-model-united-nations.png",
    title: "Model United Nations Conferences icon",
  },
  modelCongressIcon: {
    path: "/Users/razan/Downloads/Group 716.png",
    filename: "student-programs-model-congress.png",
    title: "Model Congress Participation icon",
  },
  workshopsIcon: {
    path: "/Users/razan/Downloads/Group 716.png",
    filename: "student-programs-specialized-workshops.png",
    title: "Specialized Workshops icon",
  },
  businessCompetitionsIcon: {
    path: "/Users/razan/Downloads/Group 706.png",
    filename: "student-programs-business-competitions.png",
    title: "Business Competitions icon",
  },
  athleticTournamentsIcon: {
    path: "/Users/razan/Downloads/Group 700.png",
    filename: "student-programs-athletic-tournaments.png",
    title: "Athletic Tournaments icon",
  },
  leadershipRolesIcon: {
    path: "/Users/razan/Downloads/Group 708.png",
    filename: "student-programs-leadership-roles.png",
    title: "Student Leadership Roles icon",
  },
  studentCongress: {
    path: "/Users/razan/Downloads/DSC05465.png",
    filename: "student-programs-student-congress.png",
    title: "SAIS Dubai Student Congress",
  },
  sgaCurrentNeedsIcon: {
    path: "/Users/razan/Downloads/Group 714.png",
    filename: "student-programs-sga-current-needs.png",
    title: "Address Current Student Needs And Priorities icon",
  },
  sgaAdministrationIcon: {
    path: "/Users/razan/Downloads/Group 716.png",
    filename: "student-programs-sga-administration.png",
    title: "Advise Administration On Student-Related Issues icon",
  },
  sgaIdeasIcon: {
    path: "/Users/razan/Downloads/Group 718.png",
    filename: "student-programs-sga-ideas.png",
    title: "Foster Innovative Ideas icon",
  },
  coreCooperationIcon: {
    path: "/Users/razan/Downloads/Group 706.png",
    filename: "student-programs-core-cooperation.png",
    title: "Cooperation icon",
  },
  coreIntegrityIcon: {
    path: "/Users/razan/Downloads/Group 702.png",
    filename: "student-programs-core-integrity.png",
    title: "Integrity icon",
  },
  coreDedicationIcon: {
    path: "/Users/razan/Downloads/Group 704.png",
    filename: "student-programs-core-dedication.png",
    title: "Dedication icon",
  },
  coreEnthusiasmIcon: {
    path: "/Users/razan/Downloads/Group 700.png",
    filename: "student-programs-core-enthusiasm.png",
    title: "Enthusiasm icon",
  },
  coreCommunicationIcon: {
    path: "/Users/razan/Downloads/Group 708.png",
    filename: "student-programs-core-communication.png",
    title: "Communication icon",
  },
};

async function uploadImage({ path: imagePath, filename, title }) {
  if (!fs.existsSync(imagePath)) {
    console.warn(`Skipping missing image at ${imagePath}`);
    return undefined;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
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

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

await client.createOrReplace({
  _id: "student-programs-page",
  _type: "studentProgramsPage",
  seo: {
    _type: "seo",
    title: "Student Programs | SAIS Dubai",
    description: "Explore student leadership and enrichment programs at SAIS Dubai.",
    image: uploadedImages.hero,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student\nPrograms",
    },
    image: uploadedImages.hero,
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: [
      { _key: "student-life", _type: "object", label: "Student Life", href: "/student-life", openInNewTab: false },
      {
        _key: "student-programs",
        _type: "object",
        label: "Student Programs",
        href: "/student-programs",
        openInNewTab: false,
      },
      {
        _key: "extra-curricular-activities",
        _type: "object",
        label: "Extra Curricular Activities",
        href: "/extra-curricular-activities",
        openInNewTab: false,
      },
    ],
    activeHref: "/student-programs",
    activeColor: "#216B97",
    inactiveColor: "#d97252",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Student life sections",
  },
  introSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Enriching Student\nLife Beyond the Classroom",
      description: [
        block(
          "student-programs-intro",
          "We are committed to fostering student development beyond the classroom through diverse extracurricular programs. These enrichment activities create a vibrant, connected community while enabling students to excel personally and collectively at SAIS - Dubai."
        ),
      ],
    },
    image: uploadedImages.intro,
    imagePosition: "left",
    theme: "blue",
    ctas: [],
  },
  proactiveApproach: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student Leadership Program",
      description: [block("student-programs-leadership-intro", "Students can discover and maximize their potential through:")],
    },
    backgroundColor: "#707174",
    titleColor: "#00A5B2",
    cardBorderColor: "#00A5B2",
    cardHoverBorderColor: "#216B97",
    cardTextColor: "#00A5B2",
    cards: [
      {
        _key: "model-united-nations",
        _type: "studentProgramsIconCard",
        title: "Model United Nations Conferences",
        description: "",
        icon: uploadedImages.modelUnitedNationsIcon,
      },
      {
        _key: "model-congress",
        _type: "studentProgramsIconCard",
        title: "Model Congress Participation",
        description: "",
        icon: uploadedImages.modelCongressIcon,
      },
      {
        _key: "specialized-workshops",
        _type: "studentProgramsIconCard",
        title: "Specialized Workshops",
        description: "",
        icon: uploadedImages.workshopsIcon,
      },
      {
        _key: "business-competitions",
        _type: "studentProgramsIconCard",
        title: "Business Competitions",
        description: "",
        icon: uploadedImages.businessCompetitionsIcon,
      },
      {
        _key: "athletic-tournaments",
        _type: "studentProgramsIconCard",
        title: "Athletic Tournaments",
        description: "",
        icon: uploadedImages.athleticTournamentsIcon,
      },
      {
        _key: "student-leadership-roles",
        _type: "studentProgramsIconCard",
        title: "Student Leadership Roles",
        description: "",
        icon: uploadedImages.leadershipRolesIcon,
      },
    ],
  },
  studentCongressSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "SAIS Student Congress",
      description: [
        block(
          "student-congress-overview",
          "Modeled after the U.S. Congressional system, the Student Congress serves as a vital connection between the SGA, Emirati Union, and the broader student body, enhancing overall student life at SAIS - Dubai."
        ),
        block(
          "student-congress-mission",
          "Mission\nThe SAIS - Dubai Student Congress strives to enhance collaboration between Student Leadership Associations by creating effective pathways for leadership groups to accomplish their objectives and fulfill their agendas."
        ),
        block(
          "student-congress-vision",
          "Vision\nWe are dedicated to promoting student wellbeing and ensuring student voices are heard at all levels of the school hierarchy. The Congress demonstrates the power of teamwork and integrity throughout SAIS - Dubai."
        ),
      ],
    },
    image: uploadedImages.studentCongress,
    imagePosition: "center",
    panelColor: "#00A5B2",
    waveColor: "#216B97",
    titleColor: "#ffffff",
    textColor: "#ffffff",
  },
  sgaGoalsSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student Government Association (SGA)",
      description: [
        block(
          "sga-goals-intro",
          "Mission: To represent student interests through initiatives that enrich student life.\nVision: To set the standard as the premier student government nationally."
        ),
      ],
    },
    backgroundColor: "#f2f2f2",
    titleColor: "#00A5B2",
    textColor: "#216B97",
    cardBorderColor: "#216B97",
    cardHoverBorderColor: "#00A5B2",
    cardTextColor: "#00A5B2",
    cards: [
      {
        _key: "sga-address-current-needs",
        _type: "studentProgramsIconCard",
        title: "Address Current Student Needs And Priorities",
        description: "",
        icon: uploadedImages.sgaCurrentNeedsIcon,
      },
      {
        _key: "sga-advise-administration",
        _type: "studentProgramsIconCard",
        title: "Advise Administration On Student-Related Issues",
        description: "",
        icon: uploadedImages.sgaAdministrationIcon,
      },
      {
        _key: "sga-foster-ideas",
        _type: "studentProgramsIconCard",
        title: "Foster Innovative Ideas",
        description: "",
        icon: uploadedImages.sgaIdeasIcon,
      },
      {
        _key: "sga-governance-structure",
        _type: "studentProgramsIconCard",
        title: "Maintain A Student-Led Governance Structure",
        description: "",
        icon: uploadedImages.sgaAdministrationIcon,
      },
    ],
  },
  coreValuesSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Core Values",
    },
    backgroundColor: "#f2f2f2",
    titleColor: "#00A5B2",
    textColor: "#216B97",
    cardBackgroundColor: "#00A5B2",
    cardTextColor: "#216B97",
    cards: [
      {
        _key: "core-cooperation",
        _type: "object",
        title: "Cooperation",
        description: "",
        icon: uploadedImages.coreCooperationIcon,
      },
      {
        _key: "core-integrity",
        _type: "object",
        title: "Integrity",
        description: "",
        icon: uploadedImages.coreIntegrityIcon,
      },
      {
        _key: "core-dedication",
        _type: "object",
        title: "Dedication",
        description: "",
        icon: uploadedImages.coreDedicationIcon,
      },
      {
        _key: "core-enthusiasm",
        _type: "object",
        title: "Enthusiasm",
        description: "",
        icon: uploadedImages.coreEnthusiasmIcon,
      },
      {
        _key: "core-communication",
        _type: "object",
        title: "Communication",
        description: "",
        icon: uploadedImages.coreCommunicationIcon,
      },
    ],
  },
});

console.log("Seeded Student Programs page.");

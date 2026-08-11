import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the admissions application page.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2023-01-01",
  useCdn: false,
});

async function uploadImage(path, filename, alt) {
  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title: alt,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
    alt,
  };
}

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
  };
}

const heroImage = await uploadImage(
  "/Users/razan/Downloads/Screenshot 2025-10-30 at 13.08.45.png",
  "admissions-application-hero.png",
  "SAIS Dubai kindergarten corridor",
);
const processImage = await uploadImage(
  "/Users/razan/Downloads/_DEL6245.png",
  "admissions-application-process.png",
  "SAIS Dubai students conducting a laboratory experiment",
);
const timelineImage = await uploadImage(
  "/Users/razan/Downloads/DSC04983.png",
  "admissions-application-timeline.png",
  "SAIS Dubai teacher working with a student in class",
);

const navigationItems = [
  { _key: "introduction", _type: "linkField", label: "Introduction", href: "/admissions" },
  { _key: "applications", _type: "linkField", label: "Applications", href: "/admissions/applications" },
  { _key: "book-tour", _type: "linkField", label: "Book A Tour", href: "/admissions/book-a-tour" },
  { _key: "faqs", _type: "linkField", label: "FAQ's", href: "/admissions/faqs" },
  { _key: "fees", _type: "linkField", label: "Fees", href: "/admissions/fees" },
  { _key: "withdrawal", _type: "linkField", label: "Withdrawal", href: "/admissions/withdrawal" },
];

const page = {
  _id: "admissions-application-page",
  _type: "admissionsApplicationPage",
  seo: {
    _type: "seo",
    title: "Admissions Application | SAIS Dubai",
    description: "Learn about the SAIS Dubai application process and registration timelines.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: { _type: "sectionHeading", title: "Admissions\nApplication" },
    image: heroImage,
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: navigationItems,
    activeHref: "/admissions/applications",
    activeColor: "#216B97",
    inactiveColor: "#00A5B2",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Admissions navigation",
  },
  applicationProcess: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Application Process",
      description: [
        block(
          "application-process-1",
          "We rigorously adhere to all KHDA admissions guidelines and regulations. We assure families that student enrollment decisions are based on transparent criteria and expectations, which our Registration Department is prepared to discuss in detail with parents and guardians.",
        ),
        block(
          "application-process-2",
          "All parents are required to sign a Parent-School Contract, which is annually reviewed and approved by the KHDA. We strongly encourage parents and guardians to review this contract thoroughly, as it contains essential information and guidelines for both students and families. A sample of the Parent-School Contract is available in the Admissions Policy section.",
        ),
      ],
    },
    image: processImage,
    imagePosition: "center",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    titleColor: "#00A5B2",
    textColor: "#ffffff",
  },
  timelinesSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Application Timelines",
      description: [
        block(
          "application-timeline-1",
          "The registration process is typically completed within one week, barring exceptional circumstances (such as missing original documents or visa documentation). Please note that it is not possible to select specific teachers or class sections for your child. Student placement and class distribution are determined by school leadership based on multiple factors including gender balance, class size, and availability of support programs.",
        ),
        block(
          "application-timeline-2",
          "To initiate the admissions process for KG1-Grade 12, please contact or visit the Registration Office.",
        ),
      ],
    },
    image: timelineImage,
    imagePosition: "left",
    theme: "light",
  },
  stepsSection: {
    _type: "object",
    heading: { _type: "sectionHeading", title: "Registration Process" },
    steps: [
      {
        _key: "pre-registration",
        _type: "object",
        number: 1,
        title: "Pre-Registration",
        description:
          "The application process begins with the parent/guardian completing the official application form and signing the Entry Requirements and Commitment documents. Once submitted to the Registrar's Office, our team will schedule a specific date for your child's placement assessments and interview.",
        backgroundColor: "#00A5B2",
      },
      {
        _key: "assessment-interview",
        _type: "object",
        number: 2,
        title: "Assessment & Interview",
        description:
          "Potential students seeking school admission will conduct Placement Tests in English and Mathematics as the first step in the admissions process. Test results will be reviewed by the relevant Head of School, Student Support Department, Deputy Principal, or the school Principal. Parents or guardians will be contacted to arrange an interview for you and your child/children.",
        backgroundColor: "#216B97",
      },
      {
        _key: "registration",
        _type: "object",
        number: 3,
        title: "Registration",
        description:
          "Following successful completion of all placement requirements, the registration process commences. During this stage, parents/guardians must submit all required documentation to finalize enrollment. For comprehensive information regarding registration procedures, fee structure, curriculum details, and additional school information, please consult the 2025 School Guide.",
        backgroundColor: "#d97252",
      },
    ],
  },
  finalCta: {
    _type: "object",
    text: "Start the Pre-Registration Process Now",
    buttonLabel: "Start Now",
    linkUrl: "/contact-us",
  },
};

await client.createOrReplace(page);
console.log("Seeded admissions-application-page.");

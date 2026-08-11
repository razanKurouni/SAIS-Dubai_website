import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the admissions fees page.");
}

const client = createClient({ projectId, dataset, token, apiVersion: "2023-01-01", useCdn: false });

async function uploadImage(path, filename, alt) {
  const asset = await client.assets.upload("image", fs.createReadStream(path), { filename, title: alt });

  return {
    _type: "imageWithAlt",
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    alt,
  };
}

function block(key, text, marks = []) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${key}-span`, _type: "span", marks, text }],
  };
}

function listBlock(key, text, listItem = "bullet") {
  return {
    ...block(key, text),
    listItem,
    level: 1,
  };
}

const heroImage = await uploadImage(
  "/Users/razan/Downloads/_NEC6197.jpg",
  "admissions-fees-hero.jpg",
  "Sharjah American International School Dubai entrance and UAE flags",
);
const feesImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4328.jpg",
  "admissions-fees-student-reading.jpg",
  "Young SAIS Dubai student reading outdoors",
);
const discountImage = await uploadImage(
  "/Users/razan/Downloads/DSC05344.jpg",
  "admissions-fees-discount-policy.jpg",
  "SAIS Dubai students collaborating in class",
);

const navigationItems = [
  { _key: "introduction", _type: "linkField", label: "Introduction", href: "/admissions" },
  { _key: "applications", _type: "linkField", label: "Applications", href: "/admissions/applications" },
  { _key: "book-tour", _type: "linkField", label: "Book A Tour", href: "/#tour" },
  { _key: "faqs", _type: "linkField", label: "FAQ's", href: "/admissions/faqs" },
  { _key: "fees", _type: "linkField", label: "Fees", href: "/admissions/fees" },
  { _key: "withdrawal", _type: "linkField", label: "Withdrawal", href: "/admissions/withdrawal" },
];

const feeRows = [
  ["kg-1", "KG 1", "17,976", "1,026", "494", "21,345"],
  ["kg-2", "KG 2", "20,544", "1,220", "494", "24,894"],
  ["grade-1", "Grade 1", "21,826", "1,348", "494", "25,909"],
  ["grade-2", "Grade 2", "23,111", "1,767", "494", "27,693"],
  ["grade-3", "Grade 3", "24,396", "1,893", "494", "31,379"],
  ["grade-4", "Grade 4", "25,678", "2,021", "494", "32,694"],
  ["grade-5", "Grade 5", "26,963", "2,182", "494", "34,235"],
  ["grade-6", "Grade 6", "28,246", "2,310", "494", "35,551"],
  ["grade-7", "Grade 7", "29,529", "2,504", "614", "37,329"],
  ["grade-8", "Grade 8", "30,815", "2,567", "614", "38,668"],
  ["grade-9", "Grade 9", "32,099", "2,824", "614", "38,204"],
  ["grade-10", "Grade 10", "35,949", "2,730", "614", "42,029"],
  ["grade-11", "Grade 11", "41,086", "2,760", "614", "47,141"],
  ["grade-12", "Grade 12", "44,938", "2,760", "614", "51,664"],
].map(([key, gradeYear, tuitionFee, books, uniform, total]) => ({
  _key: key,
  _type: "object",
  gradeYear,
  tuitionFee,
  books,
  uniform,
  total,
}));

const page = {
  _id: "admissions-fees-page",
  _type: "admissionsFeesPage",
  seo: {
    _type: "seo",
    title: "Admissions Fees | SAIS Dubai",
    description: "Learn about tuition fees and discount policies at SAIS Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: { _type: "sectionHeading", title: "Admissions\nFees" },
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
    activeHref: "/admissions/fees",
    activeColor: "#216B97",
    inactiveColor: "#00A5B2",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Admissions navigation",
  },
  feesIntro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "​",
      description: [
        block(
          "fees-intro-1",
          "Tuition fees are established in accordance with the regulations and approvals of the Knowledge and Human Development Authority (KHDA).",
        ),
        block(
          "fees-intro-2",
          "Our fee structure reflects our commitment to delivering high-quality education aligned with international standards, while ensuring transparency, fairness, and compliance with all regulatory requirements in Dubai. All tuition fees are reviewed and approved by KHDA, and any adjustments are implemented strictly in line with the approved School Fees Framework.",
        ),
        block(
          "fees-intro-3",
          "We strive to provide value-driven education that supports student achievement, wellbeing, and holistic development, while maintaining clear communication with parents regarding all financial matters.",
        ),
      ],
    },
    image: feesImage,
    imagePosition: "center",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    titleColor: "#ffffff",
    textColor: "#ffffff",
  },
  discountPolicy: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Discount Policy",
      description: [
        block(
          "discount-policy-1",
          "At SAIS-Dubai, we are committed to making quality education accessible to families while recognising the valuable contributions of key community partners. To support our school community, we offer a range of tuition fee discounts for eligible families, including sibling discounts and special rates for employees of selected organisations.",
        ),
        block(
          "discount-policy-2",
          "All discounts apply to tuition fees only and are subject to the terms and conditions outlined below. Supporting documentation may be required to verify eligibility. Please note that discounts cannot be combined, and only one discount may be applied per student.",
        ),
        block(
          "discount-policy-3",
          "For further information regarding eligibility or required documentation, please contact our Admissions Team.",
          ["strong"],
        ),
      ],
    },
    image: discountImage,
    imagePosition: "right",
    theme: "light",
  },
  feeStructure: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Our Fee Structure",
      description: [
        block(
          "fee-structure-intro",
          "Our admissions team is here to guide you through each step of the application process and answer any questions you may have. We welcome families who are looking for a school that combines academic excellence, strong values, and meaningful opportunities for personal growth.",
        ),
      ],
    },
    labels: {
      _type: "object",
      gradeYear: "Grade/Year",
      tuitionFee: "Tuition Fee",
      books: "Books (AED)",
      uniform: "Uniform (AED)",
      total: "Total (AED)",
    },
    rows: feeRows,
  },
  termsSection: {
    _type: "object",
    heading: { _type: "sectionHeading", title: "Terms & Conditions" },
    leftColumn: [
      {
        _key: "disclaimer",
        _type: "object",
        title: "Disclaimer",
        body: [
          block(
            "disclaimer-text",
            "Please note that school fees for the upcoming academic year are subject to change in accordance with Article 51 of the Bylaw of Federal Law No. (28) of 1999 Concerning Private Education and applicable regulations.",
          ),
        ],
      },
      {
        _key: "payment-schedule",
        _type: "object",
        title: "Payment Schedule and Fees",
        body: [
          listBlock("schedule-1", "All tuition fees must be settled on or before the specified due dates as defined in the payment plan.", "number"),
          listBlock("schedule-2", "The registration fee is deducted from tuition fees upon enrollment.", "number"),
          listBlock("schedule-3", "An early payment discount is available for full payment made before the commencement of Term One.", "number"),
          listBlock("schedule-4", "For post-dated cheques (PDC), amounts will be considered paid only after successful clearance and credit to the school’s bank account.", "number"),
          listBlock("schedule-5", "A service charge of AED 500 will be applied for any cheques returned by the bank.", "number"),
          listBlock("schedule-6", "Parents/guardians will be billed for any damage to school property caused by their child.", "number"),
          listBlock("schedule-7", "The registration fee is non-refundable and non-transferable under all circumstances.", "number"),
          listBlock("schedule-8", "School books and uniforms are non-refundable items.", "number"),
        ],
      },
      {
        _key: "payment-methods",
        _type: "object",
        title: "Payment Methods",
        accentList: true,
        body: [
          listBlock("method-1", "Cash", "number"),
          listBlock("method-2", "Current dated cheque", "number"),
          listBlock("method-3", "Post-dated cheques", "number"),
          listBlock("method-4", "Credit card (Visa or Mastercard)", "number"),
          listBlock("method-5", "Wire transfer", "number"),
          block("payment-note", "Please note:", ["strong"]),
          listBlock("payment-note-1", "Current dated or post-dated cheques will not be accepted for initial academic year payments unless submitted at least one month before the academic year commences."),
          listBlock("payment-note-2", "Fees are considered paid only when credited to the school’s bank account."),
          listBlock("payment-note-3", "A student’s registration is considered complete only after the first payment has been cleared, whether made in cash, by credit card, or wire transfer."),
          listBlock("payment-note-4", "For wire transfers, all associated bank charges must be covered by the parent/guardian. Only the net amount received in the school’s account will be credited against outstanding fees."),
        ],
      },
    ],
    rightColumn: [
      {
        _key: "non-payment",
        _type: "object",
        title: "Consequences of Non-Payment",
        body: [
          block("non-payment-intro", "The school reserves the following rights regarding non-payment of fees:"),
          listBlock("non-payment-1", "To send payment reminders via email, written notices, phone calls, SMS, and parent portal notifications to parents/guardians with outstanding payments."),
          listBlock("non-payment-2", "To temporarily suspend students for up to three school days per term (consecutively or intermittently) after issuing three payment default notices."),
          listBlock("non-payment-3", "To withhold the provision of learning resources, participation in extra-curricular activities and field trips, and access to school ICT networks, library, laboratories, and other facilities."),
          listBlock("non-payment-4", "To withhold transfer certificates, grade reports, mark sheets, transcripts, and recommendation letters for any student with outstanding fees."),
          listBlock("non-payment-5", "To pursue appropriate legal action and/or inform relevant authorities to recover outstanding fees."),
          listBlock("non-payment-6", "To claim legal fees and associated costs incurred in the recovery of outstanding fees."),
        ],
      },
      {
        _key: "refund-policy",
        _type: "object",
        title: "Refund Policy for Student Withdrawals",
        body: [
          block("refund-intro", "In accordance with the Ministry of Education decree:"),
          block("refund-1", "1. Parents/guardians must provide 30 days’ advance notice of student withdrawal and submit a formal refund request."),
          block("refund-2", "2. Withdrawal prior to the commencement of the academic year:"),
          listBlock("refund-2a", "If initiated by the parent/guardian: The balance of the first term fee paid will be refunded; registration and admission fees remain non-refundable."),
          listBlock("refund-2b", "If initiated by the school: The amount corresponding to the first term fee paid is refunded, excluding the registration fee."),
          block("refund-3", "3. Withdrawal during the school term:"),
          listBlock("refund-3a", "If a student attends any part of the first week or fails to attend without written notification one week before term commencement: The school retains the full registration or re-registration fee."),
          listBlock("refund-3b", "If a student attends two weeks or less in a term: The school will charge the equivalent of one full month of tuition fees."),
          listBlock("refund-3c", "If a student attends more than two weeks but less than one month: The school will charge the equivalent of two full months of tuition fees."),
          listBlock("refund-3d", "If a student attends more than one month in a term: The school will charge the full-term fee."),
          listBlock("refund-3e", "One month’s fee is calculated as one-tenth of the total annual school fees."),
        ],
      },
    ],
  },
};

await client.createOrReplace(page);
console.log("Seeded admissions-fees-page.");

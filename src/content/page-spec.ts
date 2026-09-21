/**
 * Shared description of every website page and the content "slots" it renders.
 *
 * The same spec drives:
 *  - the Sanity Studio (page list, section labels),
 *  - the migration script (which old field becomes which section),
 *  - the frontend adapters (which section feeds which component),
 *  - the site search index.
 *
 * Keep this file free of imports so it can also be loaded by Node scripts.
 */

export type SlotKind =
  | "imageText" // heading + image (+ mobile image, badge, body, buttons)
  | "text" // heading + rich text
  | "heading" // a bare section heading
  | "image" // a single image
  | "cards" // heading + repeatable cards
  | "entries" // heading + image + small list entries (contact rows, metrics, icon links)
  | "cta" // call-to-action band: text + buttons (+ optional file download)
  | "media" // video: poster image + file or external link
  | "form" // enquiry form settings
  | "news" // news headings / labels
  | "gallery"; // image gallery + social links

export type SlotSpec = {
  /** Stable id stored on the section (`slot`) and used as its `_key`. */
  slot: string;
  kind: SlotKind;
  /** Human title shown in the Studio. */
  label: string;
  /** Old field path in the previous document model (dot path). Defaults to `slot`. */
  path?: string;
  /** Old array field holding the cards/entries when it is not `cards`/`items`. */
  items?: string;
  /** Old plain-string field whose value becomes the section heading title (migration only). */
  titleFrom?: string;
  /** Old plain-string field whose value becomes the section heading eyebrow (migration only). */
  eyebrowFrom?: string;
};

export type PageSpec = {
  id: string;
  route: string;
  title: string;
  group: string;
  slots: SlotSpec[];
};

const it = (slot: string, label: string, extra: Partial<SlotSpec> = {}): SlotSpec => ({
  slot,
  kind: "imageText",
  label,
  ...extra,
});
const txt = (slot: string, label: string, extra: Partial<SlotSpec> = {}): SlotSpec => ({
  slot,
  kind: "text",
  label,
  ...extra,
});
const cards = (slot: string, label: string, extra: Partial<SlotSpec> = {}): SlotSpec => ({
  slot,
  kind: "cards",
  label,
  ...extra,
});
const entries = (slot: string, label: string, extra: Partial<SlotSpec> = {}): SlotSpec => ({
  slot,
  kind: "entries",
  label,
  ...extra,
});

export const PAGE_SPECS: PageSpec[] = [
  {
    id: "homepage-main",
    route: "/",
    title: "Homepage",
    group: "Homepage",
    slots: [
      it("intro", "Intro"),
      { slot: "heroContactBand", kind: "cta", label: "Contact Band" },
      cards("accreditations", "Accreditations", { items: "logos" }),
      it("whySection", "Why SAIS"),
      entries("facts", "Facts & Figures"),
      cards("whyDubai", "Why Choose Us"),
      cards("quickLinks", "Quick Links"),
      cards("learningPhases", "Learning Phases"),
      cards("tour", "Book a Tour / Apply"),
      { slot: "news", kind: "news", label: "Latest News" },
      { slot: "instagram", kind: "gallery", label: "Social Feed" },
      { slot: "ctaBand", kind: "cta", label: "CTA Band" },
    ],
  },
  {
    id: "about-page",
    route: "/about-us",
    title: "About SAIS",
    group: "About SAIS",
    slots: [
      it("intro", "Introduction"),
      it("governance", "Governance"),
      it("inspection", "Inspection"),
      it("principalMessage", "Principal's Message"),
      cards("boardGovernors", "Board of Governors", { items: "members" }),
      cards("statement", "Mission & Vision"),
      cards("values", "Core Values", { items: "slides" }),
      cards("accreditations", "Accreditations", { items: "logos" }),
      it("khdaSection", "KHDA Rating"),
      cards("branches", "Our Branches"),
    ],
  },
  {
    id: "our-team-page",
    route: "/about-us/our-team",
    title: "Our Team",
    group: "About SAIS",
    slots: [
      cards("leadershipSection", "Leadership Team", { items: "members", eyebrowFrom: "groupTitle" }),
      cards("departmentsSection", "Departments", { items: "slides" }),
      it("pastoralSection", "Pastoral Team"),
      it("administrationSection", "Administration Team"),
    ],
  },
  {
    id: "academics-page",
    route: "/academics",
    title: "Academics",
    group: "Academics",
    slots: [
      entries("curriculumSection", "Curriculum"),
      cards("skillsSection", "Skills", { items: "groups" }),
      txt("curriculumOverviewSection", "Curriculum Overview"),
      it("curriculumOverviewSection.firstBlock", "Curriculum Overview – Block 1"),
      it("curriculumOverviewSection.secondBlock", "Curriculum Overview – Block 2"),
      cards("teachingCommitmentsSection", "Teaching Commitments"),
      cards("learningSliderSection", "Learning Slider", { items: "slides" }),
    ],
  },
  {
    id: "academics-kindergarten-page",
    route: "/academics/kindergarten",
    title: "Kindergarten",
    group: "Academics",
    slots: [
      txt("intro", "Introduction"),
      it("excellenceSection", "Excellence"),
      it("curriculumSection", "Curriculum"),
      cards("assessmentSection", "Assessment"),
    ],
  },
  {
    id: "academics-elementary-page",
    route: "/academics/elementary",
    title: "Elementary",
    group: "Academics",
    slots: [txt("intro", "Introduction"), it("curriculumSection", "Curriculum"), it("assessmentSection", "Assessment")],
  },
  {
    id: "academics-middle-school-page",
    route: "/academics/middle-school",
    title: "Middle School",
    group: "Academics",
    slots: [
      it("overviewSection", "Overview"),
      it("tailoredInstructionSection", "Tailored Instruction"),
      txt("curriculumOverviewSection", "Curriculum Overview"),
      it("curriculumOverviewSection.firstBlock", "Curriculum Overview – Block 1"),
      it("curriculumOverviewSection.secondBlock", "Curriculum Overview – Block 2"),
      entries("assessmentSection", "Assessment"),
      cards("supportProgramsSection", "Support Programs"),
      { slot: "learningPhasesElementaryImage", kind: "image", label: "Learning Phases – Elementary Image" },
    ],
  },
  {
    id: "academics-high-school-page",
    route: "/academics/high-school",
    title: "High School",
    group: "Academics",
    slots: [
      it("overviewSection", "Overview"),
      it("excellenceSection", "Excellence"),
      it("curriculumSection", "Curriculum"),
      it("careerGuidanceSection", "Career Guidance"),
      it("pathwaysSection", "Pathways"),
      cards("pathwaysSliderSection", "Pathways Slider", { items: "slides" }),
      it("apDiplomaSection", "AP Diploma"),
      cards("apCoursesSection", "AP Courses"),
      cards("apBenefitsSection", "AP Benefits"),
    ],
  },
  {
    id: "admissions-page",
    route: "/admissions",
    title: "Admissions",
    group: "Admissions",
    slots: [it("introSection", "Introduction"), it("policySection", "Admissions Policy")],
  },
  {
    id: "admissions-application-page",
    route: "/admissions/applications",
    title: "Applications",
    group: "Admissions",
    slots: [
      entries("applicationProcess", "Application Process"),
      it("timelinesSection", "Timelines"),
      cards("stepsSection", "Application Steps", { items: "steps" }),
      { slot: "finalCta", kind: "cta", label: "Final CTA" },
      entries("mograHubAppBand", "MograHub App Band"),
    ],
  },
  {
    id: "admissions-book-tour-page",
    route: "/admissions/book-a-tour",
    title: "Book a Tour",
    group: "Admissions",
    slots: [it("introSection", "Introduction"), { slot: "formSection", kind: "form", label: "Tour Form" }],
  },
  {
    id: "admissions-faq-page",
    route: "/admissions/faqs",
    title: "FAQs",
    group: "Admissions",
    slots: [entries("introSection", "Introduction"), cards("faqSection", "FAQs", { items: "items" })],
  },
  {
    id: "admissions-fees-page",
    route: "/admissions/fees",
    title: "Fees",
    group: "Admissions",
    slots: [
      entries("feesIntro", "Fees Introduction"),
      cards("feeStructure", "Fee Structure", { items: "rows" }),
      cards("termsSection", "Fee Terms – Left Column", { items: "leftColumn" }),
      cards("termsSection.rightColumn", "Fee Terms – Right Column", { path: "termsSection", items: "rightColumn" }),
      it("discountPolicy", "Discount Policy"),
    ],
  },
  {
    id: "admissions-withdrawal-page",
    route: "/admissions/withdrawal",
    title: "Withdrawal",
    group: "Admissions",
    slots: [it("intro", "Withdrawal Policy")],
  },
  {
    id: "our-community-page",
    route: "/our-community",
    title: "Our Community",
    group: "Our Community",
    slots: [it("supportSection", "Support"), cards("linksSection", "Community Links")],
  },
  {
    id: "our-campus-page",
    route: "/our-campus",
    title: "Our Campus",
    group: "Our Community",
    slots: [
      txt("intro", "Introduction"),
      { slot: "videoSection", kind: "media", label: "Campus Video" },
      cards("facilities", "Facilities"),
    ],
  },
  {
    id: "student-staff-wellbeing-page",
    route: "/student-staff-wellbeing",
    title: "Student & Staff Wellbeing",
    group: "Our Community",
    slots: [
      it("commitment", "Our Commitment"),
      cards("proactiveApproach", "Proactive Approach"),
      entries("counsellingSection", "Counselling"),
      it("selSection", "Social & Emotional Learning"),
      it("wellbeingFramework", "Wellbeing Framework"),
    ],
  },
  {
    id: "student-inclusion-page",
    route: "/student-inclusion",
    title: "Student Inclusion",
    group: "Our Community",
    slots: [it("introSection", "Introduction"), it("approachSection", "Our Approach"), cards("supportProgramsSection", "Support Programs")],
  },
  {
    id: "parent-involvement-page",
    route: "/parent-involvement",
    title: "Parent Involvement",
    group: "Our Community",
    slots: [
      it("introSection", "Introduction"),
      { slot: "videoHeading", kind: "heading", label: "Video Heading" },
      { slot: "videoSection", kind: "media", label: "Video" },
      cards("proactiveApproach", "Proactive Approach"),
    ],
  },
  {
    id: "school-calendar-page",
    route: "/school-calendar",
    title: "School Calendar",
    group: "Our Community",
    slots: [txt("intro", "Introduction"), cards("terms", "Terms"), { slot: "calendarDownload", kind: "cta", label: "Calendar Download" }],
  },
  {
    id: "school-policies-page",
    route: "/school-policies",
    title: "School Policies",
    group: "Our Community",
    slots: [txt("intro", "Introduction"), cards("policies", "Policy Documents")],
  },
  {
    id: "health-safety-page",
    route: "/health-safety",
    title: "Health & Safety",
    group: "Our Community",
    slots: [it("introSection", "Introduction"), it("approachSection", "Our Approach")],
  },
  {
    id: "food-services-nutrition-page",
    route: "/food-services-nutrition",
    title: "Food Services & Nutrition",
    group: "Our Community",
    slots: [it("introSection", "Introduction")],
  },
  {
    id: "medical-services-page",
    route: "/medical-services",
    title: "Medical Services",
    group: "Our Community",
    slots: [it("introSection", "Introduction")],
  },
  {
    id: "school-supplies-uniform-page",
    route: "/school-supplies-uniform",
    title: "School Supplies & Uniform",
    group: "Our Community",
    slots: [it("introSection", "Introduction"), it("uniformSection", "Uniform")],
  },
  {
    id: "transportation-safety-page",
    route: "/transportation-safety-guidelines",
    title: "Transportation Safety Guidelines",
    group: "Our Community",
    slots: [cards("guidelinesSection", "Guidelines")],
  },
  {
    id: "student-life-page",
    route: "/student-life",
    title: "Student Life",
    group: "Student Life",
    slots: [txt("intro", "Introduction"), cards("learningSliderSection", "Activities Slider", { items: "slides" })],
  },
  {
    id: "student-programs-page",
    route: "/student-programs",
    title: "Student Programs",
    group: "Student Life",
    slots: [
      it("introSection", "Introduction"),
      cards("proactiveApproach", "Proactive Approach"),
      entries("studentCongressSection", "Student Congress"),
      cards("sgaGoalsSection", "SGA Goals"),
      cards("coreValuesSection", "Core Values"),
      cards("leadershipStructureSection", "Leadership Structure – Executive", {
        items: "executiveMembers",
        eyebrowFrom: "executiveHeading",
      }),
      cards("leadershipStructureSection.ministerialMembers", "Leadership Structure – Ministerial", {
        path: "leadershipStructureSection",
        items: "ministerialMembers",
        titleFrom: "ministerialHeading",
      }),
      it("eligibilitySection", "Eligibility"),
    ],
  },
  {
    id: "extra-curricular-activities-page",
    route: "/extra-curricular-activities",
    title: "Extra Curricular Activities",
    group: "Student Life",
    slots: [it("introSection", "Introduction"), it("activitiesSection", "Activities")],
  },
  {
    id: "news-listing-page",
    route: "/news-events",
    title: "News & Events",
    group: "News & Events",
    slots: [{ slot: "newsListing", kind: "news", label: "News Listing Labels", path: "." }],
  },
  {
    id: "contact-page",
    route: "/contact-us",
    title: "Contact Us",
    group: "Contact & Careers",
    slots: [entries("contactInfo", "Contact Information")],
  },
  {
    id: "careers-page",
    route: "/careers",
    title: "Careers",
    group: "Contact & Careers",
    slots: [
      it("intro", "Introduction"),
      it("editorialSection", "Editorial"),
      entries("careSection", "Professional Care"),
      cards("requirementsSection", "Requirements", { items: "columns" }),
      entries("joinTeamSection", "Join Our Team", { items: "cards" }),
    ],
  },
];

/**
 * Prefix added to every page document id in Sanity. Keep it empty for a fresh
 * dataset. Set it (for example "site-") when the compact model is introduced
 * into a dataset that still holds documents of an older model with the same
 * ids, so both can coexist until the old ones are removed.
 */
export const PAGE_ID_PREFIX: string = "site-";

/** Sanity document id of a page spec. */
export const pageDocumentId = (specId: string) => `${PAGE_ID_PREFIX}${specId}`;

/** Page spec id from a Sanity document id. */
export const specIdFromDocumentId = (documentId: string) =>
  PAGE_ID_PREFIX && documentId.startsWith(PAGE_ID_PREFIX) ? documentId.slice(PAGE_ID_PREFIX.length) : documentId;

export const PAGE_SPEC_BY_ID: Record<string, PageSpec> = Object.fromEntries(
  PAGE_SPECS.map((spec) => [spec.id, spec]),
);

export const PAGE_GROUPS: string[] = Array.from(new Set(PAGE_SPECS.map((spec) => spec.group)));

export function slotLabel(pageId: string | undefined, slot: string | undefined) {
  if (!pageId || !slot) return slot || "Section";
  const found = PAGE_SPEC_BY_ID[pageId]?.slots.find((item) => item.slot === slot);
  return found?.label || slot;
}

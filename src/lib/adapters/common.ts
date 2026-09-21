/**
 * Helpers that turn the generic CMS sections (see `src/content/page-spec.ts`)
 * into the shapes the page components render.
 *
 * Content comes from Sanity; design tokens are applied afterwards from
 * `src/design`, so nothing here deals with colors or layout.
 */
import type {
  AboutBranchCard,
  AcademicsKindergartenAssessmentCard,
  AcademicsLearningSlide,
  AcademicsSkillGroup,
  AcademicsSupportProgramCard,
  AccreditationLogo,
  AdmissionsFeeStructureRow,
  AdmissionsFeeTermsGroup,
  AdmissionsTourFormSection,
  ApplicationStep,
  BoardGovernorMember,
  CalendarDownloadSection,
  CampusVideoSection,
  CareersJoinTeamCard,
  CareersRequirementColumn,
  CmsCard,
  CmsEntry,
  CmsHero,
  CmsPage,
  CmsSection,
  ContactInfoItem,
  ContactInfoSection,
  Cta,
  FaqItem,
  FeatureCard,
  MetricItem,
  MograHubAppBand,
  PageHeroContent,
  PortableTextBlock,
  SanityImage,
  SchoolCalendarTerm,
  SchoolPolicyDocument,
  SectionHeading,
  StatementCard,
  ValuesSlide,
  WhyDubaiItem,
} from "@/types/sanity";
import { BOOK_TOUR_FORM_ARIA_LABEL, BOOK_TOUR_FORM_FIELDS } from "@/design/forms";
import { richTextToPlainText } from "@/lib/content";

export type SlotMap = Map<string, CmsSection>;

export function bySlot(page: CmsPage | null | undefined): SlotMap {
  const map: SlotMap = new Map();
  for (const section of page?.sections || []) {
    const key = section.slot || section._key;
    if (key && !map.has(key)) map.set(key, section);
  }
  return map;
}

export function heading(section?: CmsSection | null): SectionHeading | undefined {
  if (!section?.heading) return undefined;
  return { ...section.heading, title: section.heading.title || "" };
}

export function requiredHeading(section?: CmsSection | null, fallbackTitle = ""): SectionHeading {
  return heading(section) || { title: fallbackTitle };
}

export function image(picture?: SanityImage | null): SanityImage | undefined {
  return picture?.url ? picture : undefined;
}

/** Strips the `mobileUrl` fields a section image carries when the section has no mobile image. */
export function cleanCtas(ctas?: Cta[] | null): Cta[] | undefined {
  if (!ctas?.length) return undefined;
  return ctas.map((cta) => ({ label: cta.label || "", href: cta.href || "#", openInNewTab: cta.openInNewTab }));
}

export function hero(page?: CmsPage | null): PageHeroContent | undefined {
  const value = page?.hero;
  if (!value) return undefined;
  return {
    heading: value.heading ? { ...value.heading, title: value.heading.title || "" } : undefined,
    image: image(value.image),
  };
}

export function homeHero(value?: CmsHero | null) {
  if (!value) return undefined;
  return {
    heading: value.heading?.title || "",
    subtitle: value.heading?.subtitle,
    description: value.heading?.description,
    image: image(value.image),
    ctas: cleanCtas(value.ctas),
    valueBar: value.items,
  };
}

/**
 * The generic "image + text" shape. It is a superset of every image/text
 * section type the components accept, so one converter serves them all.
 */
export type ImageTextLike = {
  heading: SectionHeading;
  image?: SanityImage;
  ctas?: Cta[];
  cta?: Cta;
  body?: PortableTextBlock[];
  badge?: SanityImage;
  policyTitle?: string;
};

export function imageText(section?: CmsSection | null): ImageTextLike | undefined {
  if (!section) return undefined;
  const ctas = cleanCtas(section.ctas);
  return {
    heading: requiredHeading(section),
    image: image(section.image),
    ctas,
    cta: ctas?.[0],
    body: section.body?.length ? section.body : undefined,
    badge: image(section.icon),
    policyTitle: section.heading?.subtitle,
  };
}

export function textSection(section?: CmsSection | null) {
  if (!section) return undefined;
  return {
    heading: requiredHeading(section),
    body: section.body?.length ? section.body : undefined,
    bodyText: section.body?.length ? section.body : undefined,
  };
}

function cards(section?: CmsSection | null): CmsCard[] {
  return section?.cards || [];
}

function entries(section?: CmsSection | null): CmsEntry[] {
  return section?.entries || [];
}

/* ----------------------------------------------------------------------- */
/* Card conversions                                                         */
/* ----------------------------------------------------------------------- */

export function featureCards(section?: CmsSection | null): FeatureCard[] {
  return cards(section).map((card) => ({
    title: card.title || "",
    description: card.description,
    image: image(card.image),
    cta: card.cta,
  }));
}

export function members(section?: CmsSection | null): BoardGovernorMember[] {
  return cards(section).map((card) => ({
    _key: card._key,
    name: card.title,
    role: card.subtitle,
    image: image(card.image),
    yearsOfExperience: card.label,
    hoverBio: card.description,
  }));
}

/** Cards that only carry a title and an image (department slides, simple galleries). */
export function titledImages(section?: CmsSection | null) {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    image: image(card.image),
  }));
}

/** Cards with a title, an image and rich text (campus facilities). */
export function richCards(section?: CmsSection | null) {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    image: image(card.image),
    body: card.body,
  }));
}

/** People cards: name, role, short text and photo. */
export function people(section?: CmsSection | null) {
  return cards(section).map((card) => ({
    _key: card._key,
    name: card.title,
    role: card.subtitle,
    description: card.description,
    image: image(card.image),
  }));
}

export function statementCards(section?: CmsSection | null): StatementCard[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    description: card.description,
    image: image(card.image),
  }));
}

export function valuesSlides(section?: CmsSection | null): ValuesSlide[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    image: image(card.image),
    items: (card.entries || []).map((entry) => ({
      _key: entry._key,
      title: entry.label,
      description: entry.text,
      icon: image(entry.icon),
    })),
  }));
}

export function logos(section?: CmsSection | null): AccreditationLogo[] {
  return cards(section).map((card) => ({
    _key: card._key,
    name: card.title,
    image: image(card.image),
  }));
}

export function branchCards(section?: CmsSection | null): AboutBranchCard[] {
  return cards(section).map((card) => ({
    _key: card._key,
    name: card.title,
    established: card.label,
    location: card.subtitle,
    description: card.description,
    image: image(card.image),
    cta: card.cta,
  }));
}

export function steps(section?: CmsSection | null): ApplicationStep[] {
  return cards(section).map((card, index) => ({
    _key: card._key,
    number: card.label ? Number(card.label) || index + 1 : index + 1,
    title: card.title,
    description: card.description,
  }));
}

export function faqItems(section?: CmsSection | null): FaqItem[] {
  return cards(section).map((card) => ({
    _key: card._key,
    question: card.title,
    answer: card.description,
  }));
}

export const FEE_COLUMNS = ["gradeYear", "tuitionFee", "books", "uniform", "total"] as const;

function entryValue(list: CmsEntry[] | undefined, label: string) {
  return list?.find((entry) => entry.label === label)?.text;
}

export function feeRows(section?: CmsSection | null): AdmissionsFeeStructureRow[] {
  return cards(section).map((card) => ({
    _key: card._key,
    gradeYear: card.title,
    tuitionFee: entryValue(card.entries, "tuitionFee"),
    books: entryValue(card.entries, "books"),
    uniform: entryValue(card.entries, "uniform"),
    total: entryValue(card.entries, "total"),
  }));
}

export function feeLabels(section?: CmsSection | null) {
  const list = entries(section);
  return {
    gradeYear: entryValue(list, "gradeYear"),
    tuitionFee: entryValue(list, "tuitionFee"),
    books: entryValue(list, "books"),
    uniform: entryValue(list, "uniform"),
    total: entryValue(list, "total"),
  };
}

export function termsGroups(section?: CmsSection | null): AdmissionsFeeTermsGroup[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    body: card.body,
  }));
}

export function iconCards(section?: CmsSection | null): AcademicsSupportProgramCard[] & AcademicsKindergartenAssessmentCard[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    description: card.description,
    icon: image(card.icon),
    iconType: card.iconType as AcademicsSupportProgramCard["iconType"],
  }));
}

export function calendarTerms(section?: CmsSection | null): SchoolCalendarTerm[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    rows: (card.entries || []).map((entry) => ({ _key: entry._key, label: entry.label, date: entry.text })),
  }));
}

export function policies(section?: CmsSection | null): SchoolPolicyDocument[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    coverImage: image(card.image),
    documentUrl: card.file?.url || null,
    documentFilename: card.file?.filename || null,
    downloadLabel: card.label,
  }));
}

export function skillGroups(section?: CmsSection | null): AcademicsSkillGroup[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    items: (card.entries || []).map((entry) => ({
      _key: entry._key,
      title: entry.label,
      icon: image(entry.icon),
      iconType: entry.iconType as AcademicsSkillGroup["items"] extends Array<infer Item> ? Item extends { iconType?: infer T } ? T : never : never,
    })),
  }));
}

export function learningSlides(section?: CmsSection | null): AcademicsLearningSlide[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    body: card.description,
    image: image(card.image),
  }));
}

export function requirementColumns(section?: CmsSection | null): CareersRequirementColumn[] {
  return cards(section).map((card) => ({
    _key: card._key,
    title: card.title,
    intro: card.description,
    items: (card.entries || []).map((entry) => entry.text || entry.label || "").filter(Boolean),
  }));
}

export function whyItems(section?: CmsSection | null): WhyDubaiItem[] {
  return cards(section).map((card) => ({
    title: card.title,
    description: card.description || "",
    iconType: card.iconType as WhyDubaiItem["iconType"],
    icon: image(card.icon),
  }));
}

/* ----------------------------------------------------------------------- */
/* Entry conversions                                                        */
/* ----------------------------------------------------------------------- */

export function contactItems(section?: CmsSection | null): ContactInfoItem[] {
  return entries(section).map((entry) => ({
    _key: entry._key,
    icon: entry.iconType as ContactInfoItem["icon"],
    label: entry.label,
    text: entry.text,
    href: entry.href,
  }));
}

export function contactInfo(section?: CmsSection | null): ContactInfoSection | undefined {
  if (!section) return undefined;
  return {
    heading: heading(section),
    image: image(section.image),
    items: contactItems(section),
  };
}

export function metrics(section?: CmsSection | null): MetricItem[] {
  return entries(section).map((entry) => ({ value: entry.text || "", label: entry.label || "" }));
}

export function joinTeamCards(section?: CmsSection | null): CareersJoinTeamCard[] {
  return entries(section).map((entry) => ({
    _key: entry._key,
    icon: image(entry.icon),
    label: entry.label,
    text: entry.text,
    href: entry.href,
  }));
}

export function mograHubAppBand(section?: CmsSection | null): MograHubAppBand | undefined {
  if (!section) return undefined;
  const list = entries(section);
  const schoolCode = list.find((entry) => entry.iconType === "schoolCode") || list[0];
  return {
    eyebrow: section.heading?.eyebrow,
    title: section.heading?.title,
    description: richTextToPlainText(section.heading?.description) || undefined,
    schoolCodeLabel: schoolCode?.label,
    schoolCode: schoolCode?.text,
    androidUrl: list.find((entry) => entry.iconType === "android")?.href,
    appleUrl: list.find((entry) => entry.iconType === "apple")?.href,
  };
}

/* ----------------------------------------------------------------------- */
/* Other section kinds                                                      */
/* ----------------------------------------------------------------------- */

export function ctaBand(section?: CmsSection | null) {
  if (!section) return undefined;
  return {
    text: section.heading?.title || "",
    ctas: cleanCtas(section.ctas),
  };
}

export function download(section?: CmsSection | null): CalendarDownloadSection | undefined {
  if (!section) return undefined;
  const cta = section.ctas?.[0];
  return {
    text: section.heading?.title,
    buttonLabel: cta?.label,
    fileUrl: section.file?.url || (cta?.href && cta.href !== "#" ? cta.href : null),
    fileName: section.file?.filename || null,
  };
}

export function video(section?: CmsSection | null): CampusVideoSection | undefined {
  if (!section) return undefined;
  return {
    poster: image(section.image),
    videoFileUrl: section.video?.url || undefined,
    videoFilename: section.video?.filename || undefined,
    videoUrl: section.href,
  };
}

export function form(section?: CmsSection | null): AdmissionsTourFormSection | undefined {
  return {
    ariaLabel: BOOK_TOUR_FORM_ARIA_LABEL,
    fields: BOOK_TOUR_FORM_FIELDS,
    recipientEmail: section?.recipientEmail,
    submitLabel: section?.submitLabel,
    successMessage: section?.successMessage,
    errorMessage: section?.errorMessage,
  };
}

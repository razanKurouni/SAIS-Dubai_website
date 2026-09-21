/**
 * Per-page adapters: CMS page document → the data shape each page renders.
 *
 * Every function maps the sections of a page (looked up by their `slot`) to
 * the props the existing components expect. Design tokens are added later by
 * `applyDesign` in `src/lib/sanity.ts`.
 */
import type {
  AboutPageData,
  AcademicsElementaryPageData,
  AcademicsHighSchoolPageData,
  AcademicsKindergartenPageData,
  AcademicsMiddleSchoolPageData,
  AcademicsPageData,
  AdmissionsApplicationPageData,
  AdmissionsBookTourPageData,
  AdmissionsFaqPageData,
  AdmissionsFeesPageData,
  AdmissionsPageData,
  AdmissionsWithdrawalPageData,
  CareersPageData,
  CmsPage,
  ContactPageData,
  ExtraCurricularActivitiesPageData,
  FoodServicesNutritionPageData,
  HealthSafetyPageData,
  HomepageData,
  MedicalServicesPageData,
  NewsListingPageData,
  OurCampusPageData,
  OurCommunityPageData,
  OurTeamPageData,
  ParentInvolvementPageData,
  SchoolCalendarPageData,
  SchoolPoliciesPageData,
  SchoolSuppliesUniformPageData,
  SiteSettings,
  StudentInclusionPageData,
  StudentLifePageData,
  StudentProgramsPageData,
  StudentStaffWellbeingPageData,
  TransportationSafetyPageData,
} from "@/types/sanity";
import { INNER_NAVIGATION } from "@/design/inner-navigation";
import { specIdFromDocumentId } from "@/content/page-spec";
import {
  branchCards,
  bySlot,
  calendarTerms,
  cleanCtas,
  contactInfo,
  ctaBand,
  download,
  faqItems,
  featureCards,
  feeLabels,
  feeRows,
  form,
  heading,
  hero,
  homeHero,
  iconCards,
  image,
  imageText,
  joinTeamCards,
  learningSlides,
  logos,
  members,
  metrics,
  mograHubAppBand,
  people,
  policies,
  requirementColumns,
  requiredHeading,
  richCards,
  skillGroups,
  statementCards,
  steps,
  termsGroups,
  textSection,
  valuesSlides,
  video,
  whyItems,
} from "./common";

function base(page: CmsPage) {
  return {
    seo: page.seo,
    hero: hero(page),
    innerNavigation: INNER_NAVIGATION[specIdFromDocumentId(page._id)],
  };
}

export function adaptHomepage(page: CmsPage, settings: SiteSettings | null): HomepageData {
  const s = bySlot(page);
  const news = s.get("news");
  const instagram = s.get("instagram");
  const whyDubai = s.get("whyDubai");
  const learningPhases = s.get("learningPhases");

  return {
    seo: page.seo,
    header: settings?.header,
    navigation: settings?.header?.navigation,
    hero: homeHero(page.hero),
    heroContactBand: ctaBand(s.get("heroContactBand")),
    intro: imageText(s.get("intro")),
    whyDubai: whyDubai
      ? { heading: requiredHeading(whyDubai), image: image(whyDubai.image), items: whyItems(whyDubai) }
      : undefined,
    ctaBand: s.has("ctaBand") ? { text: "", ...ctaBand(s.get("ctaBand")) } : undefined,
    accreditations: s.has("accreditations")
      ? {
          heading: requiredHeading(s.get("accreditations")),
          logos: logos(s.get("accreditations")).map((logo) => ({ name: logo.name || "", image: logo.image })),
        }
      : undefined,
    whySection: imageText(s.get("whySection")),
    facts: s.has("facts") ? { heading: requiredHeading(s.get("facts")), items: metrics(s.get("facts")) } : undefined,
    quickLinks: s.has("quickLinks")
      ? { heading: requiredHeading(s.get("quickLinks")), cards: featureCards(s.get("quickLinks")) }
      : undefined,
    learningPhases: learningPhases
      ? { heading: requiredHeading(learningPhases), cta: learningPhases.cta, cards: featureCards(learningPhases) }
      : undefined,
    tour: s.has("tour") ? { heading: requiredHeading(s.get("tour")), cards: featureCards(s.get("tour")) } : undefined,
    news: news ? { heading: requiredHeading(news), cta: news.cta } : undefined,
    instagram: instagram
      ? {
          heading: requiredHeading(instagram),
          images: (instagram.images || []).filter((item) => item.url),
          socialLinks: cleanCtas(instagram.ctas),
        }
      : undefined,
    footer: settings?.footer,
  };
}

export function adaptAbout(page: CmsPage): AboutPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: imageText(s.get("intro")),
    governance: imageText(s.get("governance")),
    inspection: imageText(s.get("inspection")),
    principalMessage: imageText(s.get("principalMessage")),
    boardGovernors: s.has("boardGovernors")
      ? { heading: heading(s.get("boardGovernors")), members: members(s.get("boardGovernors")) }
      : undefined,
    statement: s.has("statement") ? { heading: heading(s.get("statement")), cards: statementCards(s.get("statement")) } : undefined,
    values: s.has("values") ? { heading: heading(s.get("values")), slides: valuesSlides(s.get("values")) } : undefined,
    accreditations: s.has("accreditations")
      ? { heading: heading(s.get("accreditations")), body: s.get("accreditations")?.body, logos: logos(s.get("accreditations")) }
      : undefined,
    khdaSection: imageText(s.get("khdaSection")),
    branches: s.has("branches") ? { heading: heading(s.get("branches")), cards: branchCards(s.get("branches")) } : undefined,
  };
}

export function adaptOurTeam(page: CmsPage): OurTeamPageData {
  const s = bySlot(page);
  const leadership = s.get("leadershipSection");
  const departments = s.get("departmentsSection");
  return {
    ...base(page),
    leadershipSection: leadership
      ? { heading: heading(leadership), groupTitle: leadership.heading?.eyebrow, members: members(leadership) }
      : undefined,
    departmentsSection: departments
      ? {
          heading: heading(departments),
          slides: (departments.cards || []).map((card) => ({
            _key: card._key,
            title: card.title,
            image: image(card.image),
            panels: (card.entries || []).map((entry) => ({ _key: entry._key, title: entry.label, image: image(entry.icon) })),
          })),
        }
      : undefined,
    pastoralSection: imageText(s.get("pastoralSection")),
    administrationSection: imageText(s.get("administrationSection")),
  };
}

export function adaptAcademics(page: CmsPage): AcademicsPageData {
  const s = bySlot(page);
  const overview = s.get("curriculumOverviewSection");
  const first = imageText(s.get("curriculumOverviewSection.firstBlock"));
  const second = imageText(s.get("curriculumOverviewSection.secondBlock"));
  return {
    ...base(page),
    curriculumSection: contactInfo(s.get("curriculumSection")),
    skillsSection: s.has("skillsSection")
      ? { heading: heading(s.get("skillsSection")), groups: skillGroups(s.get("skillsSection")) }
      : undefined,
    curriculumOverviewSection:
      overview || first || second ? { heading: heading(overview), firstBlock: first, secondBlock: second } : undefined,
    teachingCommitmentsSection: s.has("teachingCommitmentsSection")
      ? { heading: heading(s.get("teachingCommitmentsSection")), cards: iconCards(s.get("teachingCommitmentsSection")) }
      : undefined,
    learningSliderSection: s.has("learningSliderSection")
      ? { heading: heading(s.get("learningSliderSection")), slides: learningSlides(s.get("learningSliderSection")) }
      : undefined,
  };
}

export function adaptKindergarten(page: CmsPage): AcademicsKindergartenPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    excellenceSection: imageText(s.get("excellenceSection")),
    curriculumSection: imageText(s.get("curriculumSection")),
    assessmentSection: s.has("assessmentSection")
      ? {
          heading: heading(s.get("assessmentSection")),
          cards: iconCards(s.get("assessmentSection")),
        }
      : undefined,
  };
}

export function adaptElementary(page: CmsPage): AcademicsElementaryPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    curriculumSection: imageText(s.get("curriculumSection")),
    assessmentSection: imageText(s.get("assessmentSection")),
  };
}

export function adaptMiddleSchool(page: CmsPage): AcademicsMiddleSchoolPageData {
  const s = bySlot(page);
  const overview = s.get("curriculumOverviewSection");
  const first = imageText(s.get("curriculumOverviewSection.firstBlock"));
  const second = imageText(s.get("curriculumOverviewSection.secondBlock"));
  return {
    ...base(page),
    overviewSection: imageText(s.get("overviewSection")),
    tailoredInstructionSection: imageText(s.get("tailoredInstructionSection")),
    curriculumOverviewSection:
      overview || first || second ? { heading: heading(overview), firstBlock: first, secondBlock: second } : undefined,
    assessmentSection: contactInfo(s.get("assessmentSection")),
    supportProgramsSection: s.has("supportProgramsSection")
      ? { heading: heading(s.get("supportProgramsSection")), cards: iconCards(s.get("supportProgramsSection")) }
      : undefined,
    learningPhasesElementaryImage: image(s.get("learningPhasesElementaryImage")?.image),
  };
}

export function adaptHighSchool(page: CmsPage): AcademicsHighSchoolPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    overviewSection: imageText(s.get("overviewSection")),
    excellenceSection: imageText(s.get("excellenceSection")),
    curriculumSection: imageText(s.get("curriculumSection")),
    careerGuidanceSection: imageText(s.get("careerGuidanceSection")),
    pathwaysSection: imageText(s.get("pathwaysSection")),
    pathwaysSliderSection: s.has("pathwaysSliderSection")
      ? { heading: heading(s.get("pathwaysSliderSection")), slides: learningSlides(s.get("pathwaysSliderSection")) }
      : undefined,
    apDiplomaSection: imageText(s.get("apDiplomaSection")),
    apCoursesSection: s.has("apCoursesSection")
      ? { heading: heading(s.get("apCoursesSection")), cards: iconCards(s.get("apCoursesSection")) }
      : undefined,
    apBenefitsSection: s.has("apBenefitsSection")
      ? { heading: heading(s.get("apBenefitsSection")), cards: iconCards(s.get("apBenefitsSection")) }
      : undefined,
  };
}

export function adaptAdmissions(page: CmsPage): AdmissionsPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    policySection: imageText(s.get("policySection")),
  };
}

export function adaptAdmissionsApplication(page: CmsPage): AdmissionsApplicationPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    applicationProcess: contactInfo(s.get("applicationProcess")),
    timelinesSection: imageText(s.get("timelinesSection")),
    stepsSection: s.has("stepsSection") ? { heading: heading(s.get("stepsSection")), steps: steps(s.get("stepsSection")) } : undefined,
    finalCta: download(s.get("finalCta")),
    mograHubAppBand: mograHubAppBand(s.get("mograHubAppBand")),
  };
}

export function adaptAdmissionsBookTour(page: CmsPage): AdmissionsBookTourPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    formSection: form(s.get("formSection")),
  };
}

export function adaptAdmissionsFaq(page: CmsPage): AdmissionsFaqPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: contactInfo(s.get("introSection")),
    faqSection: s.has("faqSection") ? { heading: heading(s.get("faqSection")), items: faqItems(s.get("faqSection")) } : undefined,
  };
}

export function adaptAdmissionsFees(page: CmsPage): AdmissionsFeesPageData {
  const s = bySlot(page);
  const terms = s.get("termsSection");
  const termsRight = s.get("termsSection.rightColumn");
  return {
    ...base(page),
    feesIntro: contactInfo(s.get("feesIntro")),
    feeStructure: s.has("feeStructure")
      ? { heading: heading(s.get("feeStructure")), labels: feeLabels(s.get("feeStructure")), rows: feeRows(s.get("feeStructure")) }
      : undefined,
    termsSection:
      terms || termsRight
        ? { heading: heading(terms), leftColumn: termsGroups(terms), rightColumn: termsGroups(termsRight) }
        : undefined,
    discountPolicy: imageText(s.get("discountPolicy")),
  };
}

export function adaptAdmissionsWithdrawal(page: CmsPage): AdmissionsWithdrawalPageData {
  const s = bySlot(page);
  return { ...base(page), intro: imageText(s.get("intro")) };
}

export function adaptNewsListing(page: CmsPage): NewsListingPageData {
  const s = bySlot(page);
  const listing = s.get("newsListing");
  return {
    seo: page.seo,
    hero: hero(page),
    newsHeading: listing?.heading?.title,
    newslettersHeading: listing?.heading?.subtitle,
    buttonLabel: listing?.cta?.label,
  };
}

export function adaptOurCommunity(page: CmsPage): OurCommunityPageData {
  const s = bySlot(page);
  const links = s.get("linksSection");
  return {
    ...base(page),
    supportSection: imageText(s.get("supportSection")),
    linksSection: links ? { heading: requiredHeading(links), cta: links.cta, cards: featureCards(links) } : undefined,
  };
}

export function adaptOurCampus(page: CmsPage): OurCampusPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    videoSection: video(s.get("videoSection")),
    facilities: s.has("facilities") ? { heading: heading(s.get("facilities")), cards: richCards(s.get("facilities")) } : undefined,
  };
}

export function adaptStudentStaffWellbeing(page: CmsPage): StudentStaffWellbeingPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    commitment: imageText(s.get("commitment")),
    proactiveApproach: s.has("proactiveApproach")
      ? { heading: heading(s.get("proactiveApproach")), cards: iconCards(s.get("proactiveApproach")) }
      : undefined,
    counsellingSection: contactInfo(s.get("counsellingSection")),
    selSection: imageText(s.get("selSection")),
    wellbeingFramework: imageText(s.get("wellbeingFramework")),
  };
}

export function adaptStudentInclusion(page: CmsPage): StudentInclusionPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    approachSection: imageText(s.get("approachSection")),
    supportProgramsSection: s.has("supportProgramsSection")
      ? { heading: heading(s.get("supportProgramsSection")), cards: iconCards(s.get("supportProgramsSection")) }
      : undefined,
  };
}

export function adaptParentInvolvement(page: CmsPage): ParentInvolvementPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    videoHeading: heading(s.get("videoHeading")),
    videoSection: video(s.get("videoSection")),
    proactiveApproach: s.has("proactiveApproach")
      ? { heading: heading(s.get("proactiveApproach")), cards: iconCards(s.get("proactiveApproach")) }
      : undefined,
  };
}

export function adaptSchoolCalendar(page: CmsPage): SchoolCalendarPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    terms: calendarTerms(s.get("terms")),
    calendarDownload: download(s.get("calendarDownload")),
  };
}

export function adaptSchoolPolicies(page: CmsPage): SchoolPoliciesPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    policies: policies(s.get("policies")),
  };
}

export function adaptHealthSafety(page: CmsPage): HealthSafetyPageData {
  const s = bySlot(page);
  return { ...base(page), introSection: imageText(s.get("introSection")), approachSection: imageText(s.get("approachSection")) };
}

export function adaptFoodServices(page: CmsPage): FoodServicesNutritionPageData {
  const s = bySlot(page);
  return { ...base(page), introSection: imageText(s.get("introSection")) };
}

export function adaptMedicalServices(page: CmsPage): MedicalServicesPageData {
  const s = bySlot(page);
  return { ...base(page), introSection: imageText(s.get("introSection")) };
}

export function adaptSchoolSuppliesUniform(page: CmsPage): SchoolSuppliesUniformPageData {
  const s = bySlot(page);
  return { ...base(page), introSection: imageText(s.get("introSection")), uniformSection: imageText(s.get("uniformSection")) };
}

export function adaptTransportationSafety(page: CmsPage): TransportationSafetyPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    guidelinesSection: s.has("guidelinesSection")
      ? {
          heading: heading(s.get("guidelinesSection")),
          cards: iconCards(s.get("guidelinesSection")),
        }
      : undefined,
  };
}

export function adaptStudentLife(page: CmsPage): StudentLifePageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    learningSliderSection: s.has("learningSliderSection")
      ? { heading: heading(s.get("learningSliderSection")), slides: learningSlides(s.get("learningSliderSection")) }
      : undefined,
  };
}

export function adaptStudentPrograms(page: CmsPage): StudentProgramsPageData {
  const s = bySlot(page);
  const executive = s.get("leadershipStructureSection");
  const ministerial = s.get("leadershipStructureSection.ministerialMembers");
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    proactiveApproach: s.has("proactiveApproach")
      ? { heading: heading(s.get("proactiveApproach")), cards: iconCards(s.get("proactiveApproach")) }
      : undefined,
    studentCongressSection: contactInfo(s.get("studentCongressSection")),
    sgaGoalsSection: s.has("sgaGoalsSection")
      ? { heading: heading(s.get("sgaGoalsSection")), cards: iconCards(s.get("sgaGoalsSection")) }
      : undefined,
    coreValuesSection: s.has("coreValuesSection")
      ? { heading: heading(s.get("coreValuesSection")), cards: iconCards(s.get("coreValuesSection")) }
      : undefined,
    leadershipStructureSection:
      executive || ministerial
        ? {
            heading: heading(executive),
            executiveHeading: executive?.heading?.eyebrow,
            executiveMembers: people(executive),
            ministerialHeading: ministerial?.heading?.title,
            ministerialMembers: people(ministerial),
          }
        : undefined,
    eligibilitySection: imageText(s.get("eligibilitySection")),
  };
}

export function adaptExtraCurricular(page: CmsPage): ExtraCurricularActivitiesPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    activitiesSection: imageText(s.get("activitiesSection")),
  };
}

export function adaptContact(page: CmsPage): ContactPageData {
  const s = bySlot(page);
  return { ...base(page), contactInfo: contactInfo(s.get("contactInfo")) };
}

export function adaptCareers(page: CmsPage): CareersPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: imageText(s.get("intro")),
    editorialSection: imageText(s.get("editorialSection")),
    careSection: contactInfo(s.get("careSection")),
    requirementsSection: s.has("requirementsSection") ? { columns: requirementColumns(s.get("requirementsSection")) } : undefined,
    joinTeamSection: s.has("joinTeamSection")
      ? { heading: heading(s.get("joinTeamSection")), cards: joinTeamCards(s.get("joinTeamSection")) }
      : undefined,
  };
}

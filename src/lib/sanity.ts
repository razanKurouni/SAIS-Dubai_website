import { createClient } from "@sanity/client";
import { pageQuery } from "@/sanity/queries/page";
import { SITE_SETTINGS_ID, siteSettingsQuery } from "@/sanity/queries/site-settings";
import { newsPostBySlugQuery, newsPostsQuery } from "@/sanity/queries/news";
import { applyDesign } from "@/design/apply-design";
import { PAGE_DESIGN } from "@/design/page-design";
import { mapLegacySectionsToHomepage } from "@/lib/content";
import * as adapt from "@/lib/adapters/pages";
import { pageDocumentId } from "@/content/page-spec";
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
  NewsPost,
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export function getSanityClient(useCdn = true) {
  return createClient({
    projectId,
    dataset,
    apiVersion: "2023-01-01",
    useCdn,
    perspective: "published",
  });
}

/* ----------------------------------------------------------------------- */
/* Raw content                                                              */
/* ----------------------------------------------------------------------- */

/** Loads a page by its spec id (see src/content/page-spec.ts). */
export async function getPage(specId: string, useCdn = true): Promise<CmsPage | null> {
  try {
    const client = getSanityClient(useCdn);
    return await client.fetch<CmsPage | null>(pageQuery, { id: pageDocumentId(specId) });
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<SiteSettings | null>(siteSettingsQuery, { id: SITE_SETTINGS_ID });
  } catch {
    return null;
  }
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  try {
    const client = getSanityClient();
    return (await client.fetch<NewsPost[]>(newsPostsQuery)) || [];
  } catch {
    return [];
  }
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<NewsPost | null>(newsPostBySlugQuery, { slug });
  } catch {
    return null;
  }
}

/* ----------------------------------------------------------------------- */
/* Pages: content from Sanity + design from code                            */
/* ----------------------------------------------------------------------- */

async function adaptedPage<T>(id: string, adapter: (page: CmsPage) => T, useCdn = true): Promise<T | null> {
  const page = await getPage(id, useCdn);
  if (!page) return null;
  return applyDesign(adapter(page), PAGE_DESIGN[id]);
}

export async function getHomepage(): Promise<HomepageData> {
  try {
    const [page, settings, newsPosts] = await Promise.all([getPage("homepage-main"), getSiteSettings(), getNewsPosts()]);

    if (!page) {
      return mapLegacySectionsToHomepage([]);
    }

    const homepage = applyDesign(adapt.adaptHomepage(page, settings), PAGE_DESIGN["homepage-main"]);
    const homepageNewsPosts = newsPosts
      .filter((post) => post.category !== "newsletter")
      .slice(0, 3)
      .map((post) => ({
        title: post.title || "News & Events",
        description: post.excerpt,
        image: post.image,
        cta: {
          label: "See More",
          href: `/news-events/${post.slug}`,
        },
      }));

    return {
      ...homepage,
      news: {
        ...homepage.news,
        heading: homepage.news?.heading || { title: "Latest News" },
        cta: { ...homepage.news?.cta, label: homepage.news?.cta?.label || "See All", href: homepage.news?.cta?.href || "/news-events" },
        posts: homepageNewsPosts.length ? homepageNewsPosts : homepage.news?.posts,
      },
    };
  } catch {
    return mapLegacySectionsToHomepage([]);
  }
}

export const getAboutPage = (): Promise<AboutPageData | null> => adaptedPage("about-page", adapt.adaptAbout);
export const getOurTeamPage = (): Promise<OurTeamPageData | null> => adaptedPage("our-team-page", adapt.adaptOurTeam);

export const getAcademicsPage = (): Promise<AcademicsPageData | null> => adaptedPage("academics-page", adapt.adaptAcademics);
export const getAcademicsKindergartenPage = (): Promise<AcademicsKindergartenPageData | null> =>
  adaptedPage("academics-kindergarten-page", adapt.adaptKindergarten);
export const getAcademicsElementaryPage = (): Promise<AcademicsElementaryPageData | null> =>
  adaptedPage("academics-elementary-page", adapt.adaptElementary);
export const getAcademicsMiddleSchoolPage = (): Promise<AcademicsMiddleSchoolPageData | null> =>
  adaptedPage("academics-middle-school-page", adapt.adaptMiddleSchool);
export const getAcademicsHighSchoolPage = (): Promise<AcademicsHighSchoolPageData | null> =>
  adaptedPage("academics-high-school-page", adapt.adaptHighSchool);

export const getAdmissionsPage = (): Promise<AdmissionsPageData | null> => adaptedPage("admissions-page", adapt.adaptAdmissions);
export const getAdmissionsApplicationPage = (): Promise<AdmissionsApplicationPageData | null> =>
  adaptedPage("admissions-application-page", adapt.adaptAdmissionsApplication);
export const getAdmissionsBookTourPage = (): Promise<AdmissionsBookTourPageData | null> =>
  adaptedPage("admissions-book-tour-page", adapt.adaptAdmissionsBookTour);
export const getAdmissionsFaqPage = (): Promise<AdmissionsFaqPageData | null> =>
  adaptedPage("admissions-faq-page", adapt.adaptAdmissionsFaq, false);
export const getAdmissionsFeesPage = (): Promise<AdmissionsFeesPageData | null> =>
  adaptedPage("admissions-fees-page", adapt.adaptAdmissionsFees);
export const getAdmissionsWithdrawalPage = (): Promise<AdmissionsWithdrawalPageData | null> =>
  adaptedPage("admissions-withdrawal-page", adapt.adaptAdmissionsWithdrawal);

export const getNewsListingPage = (): Promise<NewsListingPageData | null> => adaptedPage("news-listing-page", adapt.adaptNewsListing);

export const getOurCommunityPage = (): Promise<OurCommunityPageData | null> => adaptedPage("our-community-page", adapt.adaptOurCommunity);
export const getOurCampusPage = (): Promise<OurCampusPageData | null> => adaptedPage("our-campus-page", adapt.adaptOurCampus);
export const getStudentStaffWellbeingPage = (): Promise<StudentStaffWellbeingPageData | null> =>
  adaptedPage("student-staff-wellbeing-page", adapt.adaptStudentStaffWellbeing);
export const getStudentInclusionPage = (): Promise<StudentInclusionPageData | null> =>
  adaptedPage("student-inclusion-page", adapt.adaptStudentInclusion);
export const getParentInvolvementPage = (): Promise<ParentInvolvementPageData | null> =>
  adaptedPage("parent-involvement-page", adapt.adaptParentInvolvement);
export const getSchoolCalendarPage = (): Promise<SchoolCalendarPageData | null> =>
  adaptedPage("school-calendar-page", adapt.adaptSchoolCalendar);
export const getSchoolPoliciesPage = (): Promise<SchoolPoliciesPageData | null> =>
  adaptedPage("school-policies-page", adapt.adaptSchoolPolicies);
export const getHealthSafetyPage = (): Promise<HealthSafetyPageData | null> => adaptedPage("health-safety-page", adapt.adaptHealthSafety);
export const getFoodServicesNutritionPage = (): Promise<FoodServicesNutritionPageData | null> =>
  adaptedPage("food-services-nutrition-page", adapt.adaptFoodServices);
export const getMedicalServicesPage = (): Promise<MedicalServicesPageData | null> =>
  adaptedPage("medical-services-page", adapt.adaptMedicalServices);
export const getSchoolSuppliesUniformPage = (): Promise<SchoolSuppliesUniformPageData | null> =>
  adaptedPage("school-supplies-uniform-page", adapt.adaptSchoolSuppliesUniform);
export const getTransportationSafetyPage = (): Promise<TransportationSafetyPageData | null> =>
  adaptedPage("transportation-safety-page", adapt.adaptTransportationSafety);

export const getStudentLifePage = (): Promise<StudentLifePageData | null> => adaptedPage("student-life-page", adapt.adaptStudentLife);
export const getStudentProgramsPage = (): Promise<StudentProgramsPageData | null> =>
  adaptedPage("student-programs-page", adapt.adaptStudentPrograms);
export const getExtraCurricularActivitiesPage = (): Promise<ExtraCurricularActivitiesPageData | null> =>
  adaptedPage("extra-curricular-activities-page", adapt.adaptExtraCurricular);

export const getContactPage = (): Promise<ContactPageData | null> => adaptedPage("contact-page", adapt.adaptContact);
export const getCareersPage = (): Promise<CareersPageData | null> => adaptedPage("careers-page", adapt.adaptCareers);

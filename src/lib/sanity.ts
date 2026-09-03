import { createClient } from "@sanity/client";
import { aboutPageQuery } from "@/sanity/queries/about-page";
import { ourTeamPageQuery } from "@/sanity/queries/our-team-page";
import { ourCommunityPageQuery } from "@/sanity/queries/our-community-page";
import { ourCampusPageQuery } from "@/sanity/queries/our-campus-page";
import { studentStaffWellbeingPageQuery } from "@/sanity/queries/student-staff-wellbeing-page";
import { studentInclusionPageQuery } from "@/sanity/queries/student-inclusion-page";
import { healthSafetyPageQuery } from "@/sanity/queries/health-safety-page";
import { foodServicesNutritionPageQuery } from "@/sanity/queries/food-services-nutrition-page";
import { medicalServicesPageQuery } from "@/sanity/queries/medical-services-page";
import { schoolSuppliesUniformPageQuery } from "@/sanity/queries/school-supplies-uniform-page";
import { transportationSafetyPageQuery } from "@/sanity/queries/transportation-safety-page";
import { parentInvolvementPageQuery } from "@/sanity/queries/parent-involvement-page";
import { schoolCalendarPageQuery } from "@/sanity/queries/school-calendar-page";
import { schoolPoliciesPageQuery } from "@/sanity/queries/school-policies-page";
import { studentLifePageQuery } from "@/sanity/queries/student-life-page";
import { studentProgramsPageQuery } from "@/sanity/queries/student-programs-page";
import { extraCurricularActivitiesPageQuery } from "@/sanity/queries/extra-curricular-activities-page";
import { academicsElementaryPageQuery } from "@/sanity/queries/academics-elementary-page";
import { academicsKindergartenPageQuery } from "@/sanity/queries/academics-kindergarten-page";
import { academicsMiddleSchoolPageQuery } from "@/sanity/queries/academics-middle-school-page";
import { academicsHighSchoolPageQuery } from "@/sanity/queries/academics-high-school-page";
import { academicsPageQuery } from "@/sanity/queries/academics-page";
import { careersPageQuery } from "@/sanity/queries/careers-page";
import { contactPageQuery } from "@/sanity/queries/contact-page";
import { admissionsPageQuery } from "@/sanity/queries/admissions-page";
import { admissionsApplicationPageQuery } from "@/sanity/queries/admissions-application-page";
import { admissionsBookTourPageQuery } from "@/sanity/queries/admissions-book-tour-page";
import { admissionsFaqPageQuery } from "@/sanity/queries/admissions-faq-page";
import { admissionsFeesPageQuery } from "@/sanity/queries/admissions-fees-page";
import { admissionsWithdrawalPageQuery } from "@/sanity/queries/admissions-withdrawal-page";
import { newsListingPageQuery, newsPostBySlugQuery, newsPostsQuery } from "@/sanity/queries/news";
import {
  homepageQuery,
  legacyHomeSectionsQuery,
  siteFooterQuery,
  siteHeaderQuery,
} from "@/sanity/queries/homepage";
import { mapLegacySectionsToHomepage } from "@/lib/content";
import type {
  AboutPageData,
  OurTeamPageData,
  OurCommunityPageData,
  OurCampusPageData,
  StudentStaffWellbeingPageData,
  StudentInclusionPageData,
  HealthSafetyPageData,
  FoodServicesNutritionPageData,
  MedicalServicesPageData,
  SchoolSuppliesUniformPageData,
  TransportationSafetyPageData,
  ParentInvolvementPageData,
  SchoolCalendarPageData,
  SchoolPoliciesPageData,
  StudentLifePageData,
  StudentProgramsPageData,
  ExtraCurricularActivitiesPageData,
  AcademicsElementaryPageData,
  AcademicsKindergartenPageData,
  AcademicsMiddleSchoolPageData,
  AcademicsHighSchoolPageData,
  AcademicsPageData,
  CareersPageData,
  ContactPageData,
  AdmissionsPageData,
  AdmissionsApplicationPageData,
  AdmissionsBookTourPageData,
  AdmissionsFaqPageData,
  AdmissionsFeesPageData,
  AdmissionsWithdrawalPageData,
  NewsListingPageData,
  NewsPost,
  HomepageData,
  LegacyHomeSection,
  SiteFooter,
  SiteHeader,
} from "@/types/sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

function getSanityClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion: "2023-01-01",
    useCdn: true,
    perspective: "published",
  });
}

export async function getHomepage(): Promise<HomepageData> {
  try {
    const client = getSanityClient();
    const [homepage, siteHeader, siteFooter, newsPosts] = await Promise.all([
      client.fetch<HomepageData | null>(homepageQuery),
      client.fetch<SiteHeader | null>(siteHeaderQuery),
      client.fetch<SiteFooter | null>(siteFooterQuery),
      client.fetch<NewsPost[]>(newsPostsQuery),
    ]);

    if (homepage) {
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
        header: siteHeader || homepage.header,
        navigation: siteHeader?.navigation || homepage.navigation,
        news: {
          ...homepage.news,
          heading: homepage.news?.heading || { title: "Latest News" },
          cta: { ...homepage.news?.cta, label: homepage.news?.cta?.label || "See All", href: "/news-events" },
          posts: homepageNewsPosts.length ? homepageNewsPosts : homepage.news?.posts,
        },
        footer: siteFooter || homepage.footer,
      };
    }

    const legacySections = await client.fetch<LegacyHomeSection[]>(legacyHomeSectionsQuery);
    return mapLegacySectionsToHomepage(legacySections || []);
  } catch {
    return mapLegacySectionsToHomepage([]);
  }
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AboutPageData | null>(aboutPageQuery);
  } catch {
    return null;
  }
}

export async function getAdmissionsPage(): Promise<AdmissionsPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AdmissionsPageData | null>(admissionsPageQuery);
  } catch {
    return null;
  }
}

export async function getAdmissionsApplicationPage(): Promise<AdmissionsApplicationPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AdmissionsApplicationPageData | null>(admissionsApplicationPageQuery);
  } catch {
    return null;
  }
}

export async function getAdmissionsBookTourPage(): Promise<AdmissionsBookTourPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AdmissionsBookTourPageData | null>(admissionsBookTourPageQuery);
  } catch {
    return null;
  }
}

export async function getAdmissionsFaqPage(): Promise<AdmissionsFaqPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AdmissionsFaqPageData | null>(admissionsFaqPageQuery);
  } catch {
    return null;
  }
}

export async function getAdmissionsFeesPage(): Promise<AdmissionsFeesPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AdmissionsFeesPageData | null>(admissionsFeesPageQuery);
  } catch {
    return null;
  }
}

export async function getAdmissionsWithdrawalPage(): Promise<AdmissionsWithdrawalPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AdmissionsWithdrawalPageData | null>(admissionsWithdrawalPageQuery);
  } catch {
    return null;
  }
}

export async function getNewsListingPage(): Promise<NewsListingPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<NewsListingPageData | null>(newsListingPageQuery);
  } catch {
    return null;
  }
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  try {
    const client = getSanityClient();
    return await client.fetch<NewsPost[]>(newsPostsQuery);
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

export async function getOurTeamPage(): Promise<OurTeamPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<OurTeamPageData | null>(ourTeamPageQuery);
  } catch {
    return null;
  }
}

export async function getOurCommunityPage(): Promise<OurCommunityPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<OurCommunityPageData | null>(ourCommunityPageQuery);
  } catch {
    return null;
  }
}

export async function getOurCampusPage(): Promise<OurCampusPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<OurCampusPageData | null>(ourCampusPageQuery);
  } catch {
    return null;
  }
}

export async function getStudentStaffWellbeingPage(): Promise<StudentStaffWellbeingPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<StudentStaffWellbeingPageData | null>(studentStaffWellbeingPageQuery);
  } catch {
    return null;
  }
}

export async function getStudentInclusionPage(): Promise<StudentInclusionPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<StudentInclusionPageData | null>(studentInclusionPageQuery);
  } catch {
    return null;
  }
}

export async function getHealthSafetyPage(): Promise<HealthSafetyPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<HealthSafetyPageData | null>(healthSafetyPageQuery);
  } catch {
    return null;
  }
}

export async function getFoodServicesNutritionPage(): Promise<FoodServicesNutritionPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<FoodServicesNutritionPageData | null>(foodServicesNutritionPageQuery);
  } catch {
    return null;
  }
}

export async function getMedicalServicesPage(): Promise<MedicalServicesPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<MedicalServicesPageData | null>(medicalServicesPageQuery);
  } catch {
    return null;
  }
}

export async function getSchoolSuppliesUniformPage(): Promise<SchoolSuppliesUniformPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<SchoolSuppliesUniformPageData | null>(schoolSuppliesUniformPageQuery);
  } catch {
    return null;
  }
}

export async function getTransportationSafetyPage(): Promise<TransportationSafetyPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<TransportationSafetyPageData | null>(transportationSafetyPageQuery);
  } catch {
    return null;
  }
}

export async function getParentInvolvementPage(): Promise<ParentInvolvementPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<ParentInvolvementPageData | null>(parentInvolvementPageQuery);
  } catch {
    return null;
  }
}

export async function getSchoolCalendarPage(): Promise<SchoolCalendarPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<SchoolCalendarPageData | null>(schoolCalendarPageQuery);
  } catch {
    return null;
  }
}

export async function getSchoolPoliciesPage(): Promise<SchoolPoliciesPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<SchoolPoliciesPageData | null>(schoolPoliciesPageQuery);
  } catch {
    return null;
  }
}

export async function getStudentLifePage(): Promise<StudentLifePageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<StudentLifePageData | null>(studentLifePageQuery);
  } catch {
    return null;
  }
}

export async function getStudentProgramsPage(): Promise<StudentProgramsPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<StudentProgramsPageData | null>(studentProgramsPageQuery);
  } catch {
    return null;
  }
}

export async function getExtraCurricularActivitiesPage(): Promise<ExtraCurricularActivitiesPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<ExtraCurricularActivitiesPageData | null>(extraCurricularActivitiesPageQuery);
  } catch {
    return null;
  }
}

export async function getAcademicsPage(): Promise<AcademicsPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AcademicsPageData | null>(academicsPageQuery);
  } catch {
    return null;
  }
}

export async function getAcademicsKindergartenPage(): Promise<AcademicsKindergartenPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AcademicsKindergartenPageData | null>(academicsKindergartenPageQuery);
  } catch {
    return null;
  }
}

export async function getAcademicsElementaryPage(): Promise<AcademicsElementaryPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AcademicsElementaryPageData | null>(academicsElementaryPageQuery);
  } catch {
    return null;
  }
}

export async function getAcademicsMiddleSchoolPage(): Promise<AcademicsMiddleSchoolPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AcademicsMiddleSchoolPageData | null>(academicsMiddleSchoolPageQuery);
  } catch {
    return null;
  }
}

export async function getAcademicsHighSchoolPage(): Promise<AcademicsHighSchoolPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<AcademicsHighSchoolPageData | null>(academicsHighSchoolPageQuery);
  } catch {
    return null;
  }
}

export async function getCareersPage(): Promise<CareersPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<CareersPageData | null>(careersPageQuery);
  } catch {
    return null;
  }
}

export async function getContactPage(): Promise<ContactPageData | null> {
  try {
    const client = getSanityClient();
    return await client.fetch<ContactPageData | null>(contactPageQuery);
  } catch {
    return null;
  }
}

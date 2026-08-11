import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getExtraCurricularActivitiesPage, getHomepage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type { ImageTextSection, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Extra Curricular Activities | SAIS Dubai",
  description: "Explore extracurricular activities at Sharjah American International School Dubai.",
};

const fallbackHero = {
  title: "Extra Curricular\nActivities",
  image: {
    url: "/about-values-community.jpg",
    alt: "SAIS Dubai students participating in extracurricular activities",
  },
  topLineColor: "#216B97",
  panelColor: "#707174",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

const fallbackInnerNavigation = {
  items: studentSectionNavItems,
  activeHref: "/extra-curricular-activities",
  activeColor: "var(--sais-primary)",
  inactiveColor: "#d97252",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Student Life page navigation",
} satisfies {
  items: InnerPageNavItem[];
  activeHref: string;
  activeColor: string;
  inactiveColor: string;
  textColor: string;
  dividerColor: string;
  topLineColor: string;
  ariaLabel: string;
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

function bullet(_key: string, text: string): PortableTextBlock {
  return {
    ...paragraph(_key, text),
    listItem: "bullet",
    level: 1,
  };
}

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "Enriching Every Student Journey",
    description: [
      paragraph(
        "extra-curricular-intro",
        "For our students, learning goes beyond the classroom. Our extracurricular program offers a variety of activities that support students' personal, social, and academic development. Through these experiences, students explore their passions, develop new talents, and build confidence, teamwork, and leadership skills."
      ),
    ],
  },
  image: {
    url: "/about-values-community.jpg",
    alt: "SAIS Dubai students exploring activities",
  },
  imagePosition: "left",
  theme: "teal",
};

const fallbackActivitiesSection: ImageTextSection = {
  heading: {
    title: "Extra Curricular Activities",
    description: [
      bullet(
        "extra-curricular-swimming",
        "Swimming: Students improve swimming techniques and water safety while building confidence, discipline, and teamwork through structured lessons and guided practice."
      ),
      bullet(
        "extra-curricular-badminton",
        "Badminton: Students build coordination, discipline, and confidence through engaging drills and friendly matches in a fun and supportive environment."
      ),
      bullet(
        "extra-curricular-football",
        "Football: Students develop teamwork, discipline, and physical fitness through structured training sessions and friendly matches in a supportive environment."
      ),
      bullet(
        "extra-curricular-volleyball",
        "Volleyball: Students strengthen volleyball skills, improve fitness, and develop communication and collaboration through structured practice and friendly matches."
      ),
    ],
  },
  image: {
    url: "/about-values-growth.jpg",
    alt: "SAIS Dubai student activity program",
  },
  ctas: [
    {
      label: "Download",
      href: "#",
      variant: "primary",
    },
  ],
  imagePosition: "right",
  theme: "blue",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getExtraCurricularActivitiesPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ExtraCurricularActivitiesPage() {
  const [data, page] = await Promise.all([getHomepage(), getExtraCurricularActivitiesPage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = resolveStudentSectionNavItems(innerNavigation?.items);
  const activitiesSection = page?.activitiesSection || fallbackActivitiesSection;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main extra-curricular-activities-page__main"
      pageClassName="extra-curricular-activities-page"
    >
      <PageHero
        className="extra-curricular-activities-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        titleId="extra-curricular-activities-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems}
        activeHref={fallbackInnerNavigation.activeHref}
        activeColor={innerNavigation?.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation?.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation?.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation?.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation?.topLineColor || fallbackInnerNavigation.topLineColor}
        className="extra-curricular-activities-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <IntroFeatureSection
        section={page?.introSection}
        fallbackSection={fallbackIntroSection}
        className="extra-curricular-activities-intro-feature"
        titleId="extra-curricular-activities-intro-title"
        panelColor="#00A5B2"
        accentColor="#707174"
        titleColor="#ffffff"
        textColor="#ffffff"
        imagePosition={page?.introSection?.imagePosition || fallbackIntroSection.imagePosition || "center"}
      />

      <ApproachSectionBase
        id="extra-curricular-activities-details"
        className="extra-curricular-activities-details"
        title={activitiesSection.heading?.title || fallbackActivitiesSection.heading.title}
        content={activitiesSection.heading?.description || fallbackActivitiesSection.heading.description}
        image={activitiesSection.image || fallbackActivitiesSection.image}
        imageSizes="(max-width: 767px) 100vw, 53vw"
        cta={activitiesSection.ctas?.[0] || fallbackActivitiesSection.ctas?.[0]}
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

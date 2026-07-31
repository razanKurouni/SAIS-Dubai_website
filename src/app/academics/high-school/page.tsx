import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsApBenefitsSection } from "@/components/sections/academics-ap-benefits-section";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { AcademicsSupportProgramsSliderSection } from "@/components/sections/academics-support-programs-slider-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getAcademicsHighSchoolPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsApBenefitsSection as AcademicsApBenefitsSectionData,
  AcademicsKindergartenFeatureSection,
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  AcademicsSupportProgramsSection,
  ImageTextSection,
  InnerNavigationItem,
  PortableTextBlock,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "High School | Academics | SAIS Dubai",
  description: "Explore High School academics at Sharjah American International School Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const highSchoolPage = await getAcademicsHighSchoolPage();
  return {
    title: highSchoolPage?.seo?.title || fallbackMetadata.title,
    description: highSchoolPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

const fallbackInnerNavigation = {
  items: [
    { label: "Overview", href: "/academics" },
    { label: "Kindergarten", href: "/academics/kindergarten" },
    { label: "Elementary", href: "/academics/elementary" },
    { label: "Middle School", href: "/academics/middle-school" },
    { label: "High School", href: "/academics/high-school" },
  ],
  activeHref: "/academics/high-school",
  activeColor: "#00A5B2",
  inactiveColor: "var(--sais-primary)",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Academics page navigation",
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

const fallbackHero = {
  eyebrow: "Academics",
  title: "High School",
  image: {
    url: "/academics-high-school-hero.jpg",
    alt: "SAIS Dubai high school students in a science lab",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "var(--sais-gray)",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

function resolveInnerNavItems(items?: InnerNavigationItem[]): InnerPageNavItem[] {
  return (
    items?.flatMap((item) => {
      if (!item.label || !item.href) return [];
      return [{ label: item.label, href: item.href, openInNewTab: item.openInNewTab }];
    }) || []
  );
}

const fallbackOverviewSection: ImageTextSection = {
  heading: {
    title: "Freedom to Explore,\nGuidance to Grow",
    description: [
      paragraph(
        "hs-overview-1",
        "In Grades 9 through 12, students experience increased autonomy and agency in their learning journey."
      ),
      paragraph(
        "hs-overview-2",
        "At SAIS-Dubai, students have access to a wide range of choice and elective courses, allowing them to tailor their learning pathways to align with their interests, aspirations, and career goals. Pedagogical approaches in these grades are designed to respond to the diverse priorities and dynamics of student choice. Teachers employ a student-centered approach that encourages inquiry, critical thinking, and creativity, while also providing guidance and support to help students navigate their academic pursuits."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-overview.jpg",
    alt: "SAIS Dubai high school students doing a science experiment",
  },
  imagePosition: "right",
  theme: "light",
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
};

const fallbackExcellenceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Building Confident,\nFuture-Ready Graduates",
    description: [
      paragraph(
        "hs-excellence",
        "Project-based learning, collaborative projects, and real-world applications of learning are emphasized, empowering students to take ownership of their education and become active participants in their learning process. Through a combination of personalized support, rigorous academic experiences, and opportunities for exploration and self-expression, students in Grades 9-12 develop the skills, knowledge, and dispositions needed to succeed in college, careers, and beyond."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-excellence.jpg",
    alt: "SAIS Dubai high school student painting a model in class",
  },
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "var(--sais-accent)",
  waveColor: "var(--sais-primary)",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackCareerGuidanceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Career Guidance",
    description: [
      paragraph(
        "hs-career-1",
        "Career guidance empowers students to make informed, careful, and personalized choices for higher education and career readiness. Our program supports students in academic planning, course selection, goal setting, career exploration, soft-skills development and post-secondary transition, including admissions processes and financial responsibilities."
      ),
      paragraph(
        "hs-career-2",
        "Our Career Guidance curriculum develops higher education and career readiness through these key themes:"
      ),
    ],
  },
  image: {
    url: "/academics-high-school-career.jpg",
    alt: "SAIS Dubai high school student reading a college brochure",
  },
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#6F7175",
  panelColor: "#6F7175",
  waveColor: "#216B97",
  titleColor: "#00A5B2",
  textColor: "#ffffff",
};

const fallbackCurriculumSection: ImageTextSection = {
  heading: {
    title: "The Curriculum",
    description: [
      paragraph(
        "hs-curriculum",
        "High School (Grades 9–12): The curriculum enables the students to pursue a personalized pathway. Advanced Placement (AP) courses, elective options, and career guidance prepare students for university and beyond. College and career readiness, entrepreneurship, interdisciplinary learning, and leadership programs define our high school model."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-curriculum.jpg",
    alt: "SAIS Dubai high school students raising hands in class",
  },
  imagePosition: "right",
};


const fallbackPathwaysSection: ImageTextSection = {
  heading: {
    title: "High School Pathways",
    description: [
      paragraph(
        "hs-pathways-1",
        "High School Pathways function like college majors, but begin during the high school experience. Every student can benefit from selecting and following a sequence of career-related classes aligned with their interests."
      ),
      {
        _key: "hs-pathways-bold",
        _type: "block",
        children: [{ _key: "hs-pathways-bold-span", _type: "span", text: "A Pathway:", marks: ["strong"] }],
      },
      {
        _key: "hs-pathways-bullet-1",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "hs-pathways-bullet-1-span", _type: "span", text: "Provides a sequence of courses within your area of interest" }],
      },
      {
        _key: "hs-pathways-bullet-2",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "hs-pathways-bullet-2-span", _type: "span", text: "Connects your career interests from high school to college and/or career" }],
      },
      {
        _key: "hs-pathways-bullet-3",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "hs-pathways-bullet-3-span", _type: "span", text: "Serves as an educational roadmap guiding you to relevant high school courses and post-secondary options" }],
      },
      {
        _key: "hs-pathways-bullet-4",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "hs-pathways-bullet-4-span", _type: "span", text: "Helps you acquire knowledge and skills linked to specific post-secondary programs leading to certificates, degrees, and careers" }],
      },
    ],
  },
  image: {
    url: "/academics-high-school-pathways.jpg",
    alt: "SAIS Dubai high school students raising hands in class",
  },
  imagePosition: "right",
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
};

const fallbackPathwaysSlider: AcademicsLearningSliderSectionData = {
  heading: { title: "Pathway Overview" },
  slides: [
    {
      _key: "slide-science",
      title: "Science and Engineering Pathway",
      body: "Students in this pathway solve problems, develop new technologies, and drive innovation. This rigorous college preparatory curriculum focuses on advanced mathematics and science, preparing students for university-level work.\n\nParticipants apply essential math and science content in real-world contexts. Career possibilities range from science and math educators to laboratory technicians to NASA astronauts",
      backgroundColor: "#00A5B2",
      sideColor: "#216B97",
      ringColor: "#d97252",
      textColor: "#ffffff",
    },
  ],
};

const fallbackApDiplomaSection: ImageTextSection = {
  heading: {
    title: "Advanced Placement (AP) Diploma",
    description: [
      paragraph("hs-ap-1", "Advanced Placement (AP) is a College Board program that allows high school students to take courses that can earn college credits and/or qualify them for advanced university classes. AP courses are weighted (1.25) provided students achieve qualifying scores on the respective College Board Exam."),
      paragraph("hs-ap-2", "AP classes are optional. All enrolled students must sit for the College Board AP exam and cover the cost of required resources and exams."),
    ],
  },
  image: { url: "/academics-high-school-ap-diploma.jpg", alt: "SAIS Dubai high school students in AP class" },
  imagePosition: "right",
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
};

const fallbackApBenefitsSection: AcademicsApBenefitsSectionData = {
  heading: {
    title: "Benefits of AP Courses",
    subtitle: "SAIS-Dubai offers a range of AP courses to challenge and prepare students for higher education:",
  },
  backgroundColor: "#00A5B2",
  titleColor: "#ffffff",
  subtitleColor: "#ffffff",
  cardIconColor: "#d97252",
  cardTitleColor: "#216B97",
  cardTextColor: "#666b70",
  cards: [
    { _key: "benefit-admission", title: "Stand Out In The Admission Process", description: "AP coursework signals to admissions officers that a student is capable of rigorous, college-level work, strengthening their application." },
    { _key: "benefit-learning", title: "College-Level Learning", description: "Understand that meaningful learning occurs when students engage in critical thinking." },
    { _key: "benefit-recognition", title: "Global Recognition", description: "Emphasize the importance of effort and persistence in achievement." },
    { _key: "benefit-savings", title: "Cost Savings", description: "Most colleges and universities worldwide grant credit and/or placement for qualifying AP exam scores." },
    { _key: "benefit-advantage", title: "Academic Advantage", description: "AP students typically achieve higher college GPAs." },
    { _key: "benefit-scholarship", title: "Scholarship Opportunities", description: "AP participation may increase eligibility for certain scholarships." },
  ],
};

const fallbackApCoursesSection: AcademicsSupportProgramsSection = {
  heading: {
    title: "Advanced Placement (AP) Courses",
    subtitle: "SAIS-Dubai offers a range of AP courses to challenge and prepare students for higher education:",
  },
  backgroundColor: "#f0f2f5",
  titleColor: "var(--sais-primary)",
  cardBorderColor: "var(--sais-primary)",
  cardHoverBorderColor: "var(--sais-accent)",
  cardTextColor: "var(--sais-primary)",
  cards: [
    { _key: "ap-english-lang", title: "AP English Language\nand Composition" },
    { _key: "ap-english-lit", title: "AP English Literature\nand Composition" },
    { _key: "ap-biology", title: "AP Biology" },
    { _key: "ap-chemistry", title: "AP Chemistry" },
    { _key: "ap-physics-1", title: "AP Physics 1\n(Algebra-Based)" },
    { _key: "ap-physics-c-em", title: "AP Physics C:\nElectricity and Magnetism" },
    { _key: "ap-physics-2", title: "AP Physics 2\n(Algebra-Based)" },
    { _key: "ap-physics-c-m", title: "AP Physics C:\nMechanics" },
    { _key: "ap-calculus", title: "AP Calculus AB" },
    { _key: "ap-psychology", title: "AP Psychology" },
    { _key: "ap-statistics", title: "AP Statistics" },
  ],
};

export default async function AcademicsHighSchoolPage() {
  const [data, highSchoolPage] = await Promise.all([getHomepage(), getAcademicsHighSchoolPage()]);

  const hero = highSchoolPage?.hero;
  const innerNavigation = highSchoolPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);

  const overviewSection: ImageTextSection = {
    ...fallbackOverviewSection,
    ...highSchoolPage?.overviewSection,
    heading: highSchoolPage?.overviewSection?.heading || fallbackOverviewSection.heading,
    image: highSchoolPage?.overviewSection?.image || fallbackOverviewSection.image,
    imagePosition: "right",
  };

  const excellenceSection = highSchoolPage?.excellenceSection || fallbackExcellenceSection;
  const excellenceIntroSection: ImageTextSection = {
    heading: excellenceSection.heading || fallbackExcellenceSection.heading,
    image: excellenceSection.image || fallbackExcellenceSection.image,
    imagePosition: "left",
    theme: "blue",
  };

  const curriculumSection: ImageTextSection = {
    ...fallbackCurriculumSection,
    ...highSchoolPage?.curriculumSection,
    heading: highSchoolPage?.curriculumSection?.heading || fallbackCurriculumSection.heading,
    image: highSchoolPage?.curriculumSection?.image || fallbackCurriculumSection.image,
    imagePosition: "right",
  };

  const careerGuidanceSection = highSchoolPage?.careerGuidanceSection || fallbackCareerGuidanceSection;

  const pathwaysSection: ImageTextSection = {
    ...fallbackPathwaysSection,
    ...highSchoolPage?.pathwaysSection,
    heading: highSchoolPage?.pathwaysSection?.heading || fallbackPathwaysSection.heading,
    image: highSchoolPage?.pathwaysSection?.image || fallbackPathwaysSection.image,
    imagePosition: "right",
  };

  const pathwaysSlider = highSchoolPage?.pathwaysSliderSection || fallbackPathwaysSlider;

  const apDiplomaSection: ImageTextSection = {
    ...fallbackApDiplomaSection,
    ...highSchoolPage?.apDiplomaSection,
    heading: highSchoolPage?.apDiplomaSection?.heading || fallbackApDiplomaSection.heading,
    image: highSchoolPage?.apDiplomaSection?.image || fallbackApDiplomaSection.image,
    imagePosition: "right",
  };

  const apCoursesSection = highSchoolPage?.apCoursesSection || fallbackApCoursesSection;
  const apBenefitsSection = highSchoolPage?.apBenefitsSection || fallbackApBenefitsSection;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-high-school-page__main"
      pageClassName="academics-high-school-page"
    >
      <PageHero
        className="academics-high-school-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        eyebrow={hero?.heading?.eyebrow || fallbackHero.eyebrow}
        titleId="academics-high-school-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems.length ? innerNavItems : fallbackInnerNavigation.items}
        activeHref={innerNavigation?.activeHref || fallbackInnerNavigation.activeHref}
        activeColor={innerNavigation?.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation?.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation?.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation?.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation?.topLineColor || fallbackInnerNavigation.topLineColor}
        className="academics-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <EditorialSplitSection
        id="academics-high-school-overview"
        title="Freedom to Explore, Guidance to Grow"
        section={overviewSection}
        fallbackImage={fallbackOverviewSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-overview-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle
      />

      <IntroFeatureSection
        className="academics-high-school-excellence-feature"
        titleId="academics-high-school-excellence-title"
        section={excellenceIntroSection}
        fallbackSection={{
          heading: fallbackExcellenceSection.heading,
          image: fallbackExcellenceSection.image,
          imagePosition: "left",
          theme: "blue",
        }}
        panelColor={excellenceSection.panelColor || fallbackExcellenceSection.panelColor}
        accentColor={excellenceSection.waveColor || fallbackExcellenceSection.waveColor}
        titleColor={excellenceSection.titleColor || fallbackExcellenceSection.titleColor}
        textColor={excellenceSection.textColor || fallbackExcellenceSection.textColor}
        imagePosition={excellenceSection.imageSide || fallbackExcellenceSection.imageSide}
      />

      <EditorialSplitSection
        id="academics-high-school-curriculum"
        title="The Curriculum"
        section={{ ...curriculumSection, imagePosition: "right" }}
        fallbackImage={fallbackCurriculumSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-curriculum-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
      />

      <AcademicsElementaryAssessmentSection
        section={careerGuidanceSection}
        fallbackSection={fallbackCareerGuidanceSection}
        className="academics-high-school-career-guidance"
        titleId="academics-high-school-career-title"
      />

      <EditorialSplitSection
        id="academics-high-school-pathways"
        title="High School Pathways"
        section={pathwaysSection}
        fallbackImage={fallbackPathwaysSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-pathways-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle
        preserveRichText
      />

      <AcademicsLearningSliderSection
        section={pathwaysSlider}
        fallbackSection={fallbackPathwaysSlider}
        className="academics-high-school-pathways-slider"
      />

      <EditorialSplitSection
        id="academics-high-school-ap-diploma"
        title="Advanced Placement (AP) Diploma"
        section={apDiplomaSection}
        fallbackImage={fallbackApDiplomaSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-ap-diploma-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle
      />

      <AcademicsSupportProgramsSliderSection
        section={apCoursesSection}
        fallbackSection={fallbackApCoursesSection}
        className="academics-high-school-ap-courses"
      />

      <AcademicsApBenefitsSection
        section={apBenefitsSection}
        fallbackSection={fallbackApBenefitsSection}
        className="academics-high-school-ap-benefits"
      />

      <LearningPhasesSection section={data?.learningPhases} excludeTitle="High School" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

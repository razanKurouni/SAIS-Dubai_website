import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsCurriculumOverviewSection } from "@/components/sections/academics-curriculum-overview-section";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { AcademicsSupportProgramsSliderSection } from "@/components/sections/academics-support-programs-slider-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsMiddleSchoolPage, getHomepage } from "@/lib/sanity";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import type {
  AcademicsCurriculumOverviewSection as AcademicsCurriculumOverviewSectionData,
  AcademicsKindergartenFeatureSection,
  AcademicsSupportProgramsSection as AcademicsSupportProgramsSectionData,
  ContactInfoSection as ContactInfoSectionData,
  ImageTextSection,
  InnerNavigationItem,
  PortableTextBlock,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Middle School | Academics | SAIS Dubai",
  description: "Explore Middle School academics at Sharjah American International School Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const middleSchoolPage = await getAcademicsMiddleSchoolPage();

  return {
    title: middleSchoolPage?.seo?.title || fallbackMetadata.title,
    description: middleSchoolPage?.seo?.description || fallbackMetadata.description,
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
  activeHref: "/academics/middle-school",
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
      if (!item.label || !item.href) {
        return [];
      }

      return [
        {
          label: item.label,
          href: item.href,
          openInNewTab: item.openInNewTab,
        },
      ];
    }) || []
  );
}

const fallbackHero = {
  eyebrow: "Academics",
  title: "Middle School",
  image: {
    url: "/academics-middle-school-hero.jpg",
    alt: "SAIS Dubai middle school students reading together",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "#d97252",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

const fallbackOverviewSection: ImageTextSection = {
  heading: {
    title: "Stepping Into Specialised Learning",
    description: [
      paragraph(
        "middle-school-overview",
        "As students transition into Grades 5 through 8, significant changes occur in their academic environment. They move from a homeroom setting to subject-based instruction, allowing for greater depth and specialization in each subject area. Additionally, students transition from co-educational to segregated classes, facilitating a focused learning environment that addresses the unique needs of learners at this stage of development."
      ),
    ],
  },
  image: {
    url: "/academics-middle-school-overview.png",
    alt: "SAIS Dubai middle school students reading in the library",
  },
  imagePosition: "right",
  theme: "light",
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
};

const fallbackTailoredInstructionSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Tailored Instruction for Every Stage of Learning",
    description: [
      paragraph(
        "middle-school-tailored-instruction",
        "At SAIS Dubai, these transitions are carefully considered in the design of pedagogical approaches. Teachers utilize a variety of instructional strategies tailored to the subject area and the developmental stage of students, fostering independence, critical thinking, and collaborative skills. The curriculum is structured to provide a balanced blend of academic rigor, inquiry-based learning, and opportunities for exploration and self-discovery, ensuring that students thrive academically and socially during this transitional period."
      ),
    ],
  },
  image: {
    url: "/academics-middle-school-tailored.png",
    alt: "SAIS Dubai middle school student playing keyboard during music class",
  },
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#d97252",
  waveColor: "var(--sais-accent)",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackCurriculumOverviewSection: AcademicsCurriculumOverviewSectionData & {
  firstBlock: ImageTextSection;
  secondBlock: ImageTextSection;
} = {
  heading: {
    title: "The Curriculum",
    description: [
      paragraph(
        "middle-school-curriculum-intro",
        'We use the DRDP (Desired Results Developmental Profile) assessment which is an observational and portfolio-based assessment that measures young children\'s learning and development. More specifically, it measures progress on the following six "desired results".'
      ),
    ],
  },
  backgroundColor: "#00A5B2",
  titleColor: "#216B97",
  textColor: "#ffffff",
  firstBlock: {
    heading: {
      title: "Middle School Program",
      description: [
        paragraph(
          "middle-school-curriculum-program-1",
          "Our Middle School program offers a strong academic foundation across a wide range of subjects while nurturing the whole child. Students are encouraged to become active participants in their learning, with an emphasis on independence, innovation, and responsibility."
        ),
        paragraph(
          "middle-school-curriculum-program-2",
          "In addition to that, our program is designed to meet the dynamic needs of the adolescent learner. With student voice at the center, we provide a learning experience that encourages independent thinking, responsible risk-taking, and bold exploration across all subject areas. Through collaborative learning, inquiry-based projects, and real-world application, our students learn how to think, not just what to think."
        ),
      ],
    },
    image: {
      url: "/academics-middle-school-curriculum-classroom.png",
      alt: "SAIS Dubai middle school classroom discussion",
    },
    imagePosition: "left",
    backgroundColor: "transparent",
    titleColor: "#216B97",
    textColor: "#ffffff",
  },
  secondBlock: {
    heading: {
      title: "Beyond the Classroom",
      description: [
        paragraph(
          "middle-school-curriculum-beyond-1",
          "Beyond the classroom, SAIS Middle School offers a variety of extracurricular activities and after-school clubs, such as chess, robotics, cooking, and more. These programs develop students' interests, confidence, and leadership skills."
        ),
        paragraph(
          "middle-school-curriculum-beyond-2",
          "Through local celebrations like National Day, Ramadan, and Eid, and global initiatives like Earth Day, Cancer Awareness Campaigns, and International Day, students gain a deeper appreciation of both their heritage and the wider world."
        ),
        paragraph(
          "middle-school-curriculum-beyond-3",
          "We don't just prepare students for high school - we prepare them for life. We guide them to turn uncertainty into ambition, ideas into impact, and dreams into achievable goals."
        ),
      ],
    },
    image: {
      url: "/academics-middle-school-curriculum-support.png",
      alt: "SAIS Dubai teacher supporting a middle school student",
    },
    imagePosition: "right",
    backgroundColor: "transparent",
    titleColor: "#216B97",
    textColor: "#ffffff",
  },
};

const fallbackAssessmentSection: ContactInfoSectionData = {
  heading: {
    title: "Assessment",
    description: [
      paragraph(
        "middle-school-assessment",
        "Assessment in Middle School follows a balanced approach that integrates formative assessment, such as observations, classwork, and ongoing feedback, with summative assessment, including quizzes, projects, and exams to evaluate student understanding. This process is aligned with international standards and supported by global benchmarking tools such as MAP Growth (NWEA) and CAT4, as well as Arabic international assessments, ensuring data-driven instruction, continuous progress monitoring, and personalized learning that supports every student's academic growth and development across all subjects."
      ),
    ],
  },
  image: {
    url: "/academics-middle-school-assessment.png",
    alt: "SAIS Dubai middle school students reviewing a book together",
  },
  imagePosition: "center",
  panelColor: "#d97252",
  waveColor: "#216B97",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackSupportProgramsSection: AcademicsSupportProgramsSectionData = {
  heading: {
    title: "Inclusion & Support Programs",
  },
  backgroundColor: "#ffffff",
  titleColor: "#00A5B2",
  cardBorderColor: "#216B97",
  cardHoverBorderColor: "#00A5B2",
  cardTextColor: "#216B97",
  cards: [
    {
      _key: "students-of-determination",
      title: "Students of Determination",
      description:
        "Students with special educational needs and/or disabilities (SEND/SOD) are supported through individualized education plans (IEPs), push-in/pull-out support services, and tailored curriculum, instruction, and assessments.",
      iconType: "determination",
    },
    {
      _key: "gifted-and-talented",
      title: "Gifted and Talented Students",
      description:
        "Students with identified gifts and/or talents are provided with enrichment and accelerated programs as comprehensively stated and elaborated on in their advanced learning plans (ALPs).",
      iconType: "gifted",
    },
    {
      _key: "eal-learners",
      title: "EAL Learners",
      description:
        "Students with additional English language needs are identified through WIDA screener and supported with tiered interventions.",
      iconType: "eal",
    },
    {
      _key: "academic-counseling",
      title: "Academic Counseling",
      description:
        "Students in all phases are provided with integrated support through counseling, pastoral care, and academic planning.",
      iconType: "counseling",
    },
    {
      _key: "differentiation",
      title: "Differentiation",
      description:
        "Internal and external assessment data as well as observational feedback are used to design targeted interventions and personalized instruction.",
      iconType: "differentiation",
    },
  ],
};

export default async function AcademicsMiddleSchoolPage() {
  const [data, middleSchoolPage] = await Promise.all([getHomepage(), getAcademicsMiddleSchoolPage()]);
  const hero = middleSchoolPage?.hero;
  const innerNavigation = middleSchoolPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);
  const overviewSection: ImageTextSection = {
    ...fallbackOverviewSection,
    ...middleSchoolPage?.overviewSection,
    heading: middleSchoolPage?.overviewSection?.heading || fallbackOverviewSection.heading,
    image: middleSchoolPage?.overviewSection?.image || fallbackOverviewSection.image,
    imagePosition: "right",
  };
  const tailoredInstructionSection =
    middleSchoolPage?.tailoredInstructionSection || fallbackTailoredInstructionSection;
  const curriculumOverviewSection =
    middleSchoolPage?.curriculumOverviewSection || fallbackCurriculumOverviewSection;
  const assessmentSection = middleSchoolPage?.assessmentSection || fallbackAssessmentSection;
  const supportProgramsSection =
    middleSchoolPage?.supportProgramsSection || fallbackSupportProgramsSection;
  const learningPhasesSection = data?.learningPhases
    ? {
        ...data.learningPhases,
        cards: data.learningPhases.cards?.map((card) =>
          card.title?.trim().toLowerCase() === "elementary" && middleSchoolPage?.learningPhasesElementaryImage
            ? { ...card, image: middleSchoolPage.learningPhasesElementaryImage }
            : card,
        ),
      }
    : undefined;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-middle-school-page__main"
      pageClassName="academics-middle-school-page"
    >
      <PageHero
        className="academics-middle-school-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        eyebrow={hero?.heading?.eyebrow || fallbackHero.eyebrow}
        titleId="academics-middle-school-hero-title"
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
        id="academics-middle-school-overview"
        title="Stepping Into Specialised Learning"
        section={overviewSection}
        fallbackImage={fallbackOverviewSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-middle-school-overview-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle
      />

      <AcademicsElementaryAssessmentSection
        className="academics-middle-school-tailored-section"
        imageSide={tailoredInstructionSection.imageSide || fallbackTailoredInstructionSection.imageSide}
        titleId="academics-middle-school-tailored-title"
        section={tailoredInstructionSection}
        fallbackSection={fallbackTailoredInstructionSection}
      />

      <AcademicsCurriculumOverviewSection
        section={curriculumOverviewSection}
        fallbackSection={fallbackCurriculumOverviewSection}
        className="academics-middle-school-curriculum-overview"
        titleId="academics-middle-school-curriculum-title"
        idPrefix="academics-middle-school-curriculum"
        firstImagePosition="left"
        secondImagePosition="right"
        showFirstBlockTitle={false}
        showSecondBlockTitle={false}
      />

      <ContactInfoSection
        className="academics-middle-school-assessment-section"
        titleId="academics-middle-school-assessment-title"
        section={assessmentSection}
        fallbackSection={fallbackAssessmentSection}
        ariaLabel="Middle School assessment"
        flipped={false}
      />

      <AcademicsSupportProgramsSliderSection
        section={supportProgramsSection}
        fallbackSection={fallbackSupportProgramsSection}
        className="academics-middle-school-support-programs"
        autoplayIntervalMs={3200}
      />
      <LearningPhasesSection section={learningPhasesSection} excludeTitle="Middle School" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

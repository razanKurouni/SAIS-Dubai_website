import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsArabicSection } from "@/components/sections/academics-arabic-section";
import { AcademicsKindergartenAssessmentSection } from "@/components/sections/academics-kindergarten-assessment-section";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getAcademicsKindergartenPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsKindergartenAssessmentSection as AcademicsKindergartenAssessmentSectionData,
  AcademicsKindergartenFeatureSection,
  AcademicsKindergartenIntroSection,
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  ImageTextSection,
  InnerNavigationItem,
  PortableTextBlock,
} from "@/types/sanity";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";

const fallbackMetadata: Metadata = {
  title: "Kindergarten | Academics | SAIS Dubai",
  description: "Explore Kindergarten academics at Sharjah American International School Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const kindergartenPage = await getAcademicsKindergartenPage();

  return {
    title: kindergartenPage?.seo?.title || fallbackMetadata.title,
    description: kindergartenPage?.seo?.description || fallbackMetadata.description,
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
  activeHref: "/academics/kindergarten",
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

type IntroStyle = CSSProperties & {
  "--academics-kg-intro-bg"?: string;
  "--academics-kg-intro-title"?: string;
  "--academics-kg-intro-text"?: string;
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackHero = {
  eyebrow: "Academics",
  title: "Kindergarten",
  image: {
    url: "/academics-kg-hero.png",
    alt: "SAIS Dubai kindergarten students learning through play",
  },
  topLineColor: "#d97252",
  panelColor: "var(--sais-primary)",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

const fallbackIntro: Required<AcademicsKindergartenIntroSection> = {
  heading: {
    title: "Building Success Through Collaboration",
    description: [
      paragraph(
        "kg-intro",
        "In the early years at SAIS Dubai, our teaching and learning approaches prioritize play-based learning, exploration, and hands-on experiences to foster holistic development."
      ),
    ],
  },
  titleColor: "var(--sais-accent)",
  textColor: "var(--sais-primary)",
  backgroundColor: "#ffffff",
};

const fallbackExcellenceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Driving Excellence\nThrough Continuous Review",
    description: [
      paragraph(
        "kg-excellence",
        "Teachers utilize a combination of structured activities and child-directed learning opportunities to cater to individual learning styles and needs. Our curriculum emphasizes foundational skills such as literacy, numeracy, and social-emotional development, integrating them into engaging and developmentally appropriate learning experiences. Through a blend of structured lessons, interactive activities, and creative expression, students in KG-Grade 2 develop essential skills, knowledge, and attitudes that form the building blocks for future learning success."
      ),
    ],
  },
  image: {
    url: "/academics-kg-excellence.png",
    alt: "SAIS Dubai kindergarten students playing music together",
  },
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "var(--sais-accent)",
  panelColor: "var(--sais-primary)",
  waveColor: "#d97252",
  titleColor: "var(--sais-accent)",
  textColor: "#ffffff",
};

const fallbackCurriculumSection: ImageTextSection = {
  heading: {
    title: "The Curriculum",
    description: [
      paragraph(
        "kg-curriculum",
        "Early Years (KG-Grade 2): The curriculum provides hands-on, inquiry-based learning through thematic units and play-based exploration. Integrated with AERO and NGSS standards, the program emphasizes foundational literacy, numeracy, science, and social-emotional development."
      ),
    ],
  },
  image: {
    url: "/academics-kg-curriculum.png",
    alt: "SAIS Dubai teacher guiding a kindergarten student during outdoor learning",
  },
  imagePosition: "right",
};

const fallbackAssessmentSection: AcademicsKindergartenAssessmentSectionData = {
  heading: {
    title: "Assessment",
    description: [
      paragraph(
        "kg-assessment",
        "We use the DRDP (Desired Results Developmental Profile) assessment which is an observational and portfolio-based assessment that measures young children's learning and development. More specifically, it measures progress on the following six desired results."
      ),
    ],
  },
  cards: [
    {
      _key: "personally-socially-competent",
      title: "Children Are Personally\nand Socially Competent",
      icon: {
        url: "/academics-kg-assessment-social.png",
        alt: "Children are personally and socially competent icon",
      },
    },
    {
      _key: "effective-learners",
      title: "Children Are\nEffective Learners",
      icon: {
        url: "/academics-kg-assessment-effective-learners.png",
        alt: "Children are effective learners icon",
      },
    },
    {
      _key: "physical-motor-competence",
      title: "Children Show Physical\nand Motor Competence",
      icon: {
        url: "/academics-kg-assessment-physical.png",
        alt: "Children show physical and motor competence icon",
      },
    },
    {
      _key: "safe-healthy",
      title: "Children Are Safe\nand Healthy",
      icon: {
        url: "/academics-kg-assessment-safe-healthy.png",
        alt: "Children are safe and healthy icon",
      },
    },
    {
      _key: "families-support-learning",
      title: "Families Support their Child's\nLearning and Development",
      icon: {
        url: "/academics-kg-assessment-family-support.png",
        alt: "Families support their child's learning and development icon",
      },
    },
    {
      _key: "families-achieve-goals",
      title: "Families Achieve Their Goals",
      icon: {
        url: "/academics-kg-assessment-goals.png",
        alt: "Families achieve their goals icon",
      },
    },
  ],
  backgroundColor: "var(--sais-primary)",
  titleColor: "var(--sais-accent)",
  textColor: "#ffffff",
  cardTextColor: "var(--sais-primary)",
  cardBorderColor: "var(--sais-accent)",
  cardHoverBorderColor: "#d97252",
};

function blocksToPlainText(blocks?: PortableTextBlock[]) {
  return (
    blocks
      ?.map((block) => block.children?.map((child) => child.text || "").join("") || "")
      .filter(Boolean)
      .join("\n\n") || ""
  );
}

function resolveInnerNavItems(items?: InnerNavigationItem[]): InnerPageNavItem[] {
  return (
    items
      ?.flatMap((item) => {
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
      })
      || []
  );
}

function toExcellenceSliderSection(
  section: AcademicsKindergartenFeatureSection | undefined,
  fallbackSection: Required<AcademicsKindergartenFeatureSection>,
): AcademicsLearningSliderSectionData {
  const heading = section?.heading || fallbackSection.heading;

  return {
    slides: [
      {
        _key: "kindergarten-excellence",
        title: heading?.title,
        body: blocksToPlainText(heading?.description),
        image: section?.image || fallbackSection.image,
        backgroundColor: section?.panelColor || fallbackSection.panelColor,
        sideColor: section?.backgroundColor || fallbackSection.backgroundColor,
        ringColor: section?.waveColor || fallbackSection.waveColor,
        titleColor: section?.titleColor || fallbackSection.titleColor,
        textColor: section?.textColor || fallbackSection.textColor,
        imagePosition: section?.imagePosition || fallbackSection.imagePosition,
      },
    ],
  };
}

export default async function AcademicsKindergartenPage() {
  const [data, kindergartenPage] = await Promise.all([getHomepage(), getAcademicsKindergartenPage()]);
  const hero = kindergartenPage?.hero;
  const intro = kindergartenPage?.intro || fallbackIntro;
  const excellenceSection = kindergartenPage?.excellenceSection || fallbackExcellenceSection;
  const curriculumSection = kindergartenPage?.curriculumSection || fallbackCurriculumSection;
  const assessmentSection = kindergartenPage?.assessmentSection || fallbackAssessmentSection;
  const innerNavigation = kindergartenPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroEyebrow = hero?.heading?.eyebrow || fallbackHero.eyebrow;
  const heroImage = hero?.image || fallbackHero.image;
  const introStyle: IntroStyle = {
    "--academics-kg-intro-bg": intro.backgroundColor || fallbackIntro.backgroundColor,
    "--academics-kg-intro-title": intro.titleColor || fallbackIntro.titleColor,
    "--academics-kg-intro-text": intro.textColor || fallbackIntro.textColor,
  };
  const excellenceSliderSection = toExcellenceSliderSection(excellenceSection, fallbackExcellenceSection);

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-kindergarten-page__main"
      pageClassName="academics-kindergarten-page"
    >
      <PageHero
        className="academics-kindergarten-hero"
        title={heroTitle}
        image={heroImage}
        eyebrow={heroEyebrow}
        titleId="academics-kindergarten-hero-title"
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

      <section
        className="academics-kg-intro"
        aria-labelledby="academics-kg-intro-title"
        style={introStyle}
      >
        <SectionReveal className="academics-kg-intro__inner">
          {intro.heading?.title ? (
            <h2 id="academics-kg-intro-title" className="academics-kg-intro__title">
              {intro.heading.title}
            </h2>
          ) : null}
          <RichText blocks={intro.heading?.description} className="academics-kg-intro__body" />
        </SectionReveal>
      </section>

      <AcademicsLearningSliderSection
        className="academics-kg-excellence-slider"
        section={excellenceSliderSection}
        fallbackSection={toExcellenceSliderSection(undefined, fallbackExcellenceSection)}
      />

      <EditorialSplitSection
        id="academics-kg-curriculum"
        title="The Curriculum"
        section={{ ...curriculumSection, imagePosition: "right" }}
        fallbackImage={fallbackCurriculumSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-kg-curriculum-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
      />

      <AcademicsKindergartenAssessmentSection
        section={assessmentSection}
        fallbackSection={fallbackAssessmentSection}
      />
      <AcademicsArabicSection section={kindergartenPage?.arabicSection} idPrefix="academics-kg" />
      <LearningPhasesSection section={data?.learningPhases} excludeTitle="Kindergarten" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

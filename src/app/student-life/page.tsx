import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { richTextToParagraphs } from "@/lib/content";
import { getHomepage, getStudentLifePage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type {
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  PortableTextBlock,
} from "@/types/sanity";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";

const fallbackMetadata: Metadata = {
  title: "Student Life | SAIS Dubai",
  description: "Explore student life at Sharjah American International School Dubai.",
};

const fallbackInnerNavigation = {
  items: studentSectionNavItems,
  activeHref: "/student-life",
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

const fallbackHero = {
  title: "Student\nLife",
  image: {
    url: "/about-values-community.jpg",
    alt: "SAIS Dubai students enjoying school life",
  },
  topLineColor: "#d97252",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackIntro = {
  heading: {
    title: "A Foundation for Growth and Development",
    description: [
      paragraph(
        "student-life-intro",
        "Student life forms the essential foundation for personal and academic development. During this formative period, young people encounter diverse situations that prepare them for future challenges. They develop crucial skills in respect and self-discipline while building relationships with peers and educators."
      ),
    ],
  },
  backgroundColor: "#ffffff",
  titleColor: "#00A5B2",
  textColor: "#216B97",
};

const fallbackLearningSliderSection: AcademicsLearningSliderSectionData = {
  heading: {
    title: "",
  },
  slides: [
    {
      _key: "character-formation",
      title: "Character Formation",
      body:
        "School life represents a joyful time when students can explore, form friendships, acquire skills, and embrace experiences without the weight of adult responsibilities. Within the school environment, students learn the importance of punctuality, adherence to rules, and fulfillment of responsibilities while gaining knowledge and developing new capabilities.",
      image: {
        url: "/about-values-growth.jpg",
        alt: "SAIS Dubai students playing together",
      },
      backgroundColor: "#216B97",
      sideColor: "#00A5B2",
      ringColor: "#d97252",
      titleColor: "#ffffff",
      textColor: "#ffffff",
      imagePosition: "center",
    },
    {
      _key: "guided-development",
      title: "Guided Development",
      body:
        "The guidance received during student life transforms young people into well-rounded individuals. Teachers and parents provide direction, helping students distinguish between beneficial and detrimental choices. This golden period of development is when children's minds - comparable to clay - are most receptive to positive molding and influence.",
      image: {
        url: "/about-values-growth.jpg",
        alt: "SAIS Dubai teacher guiding students",
      },
      backgroundColor: "#216B97",
      sideColor: "#00A5B2",
      ringColor: "#d97252",
      titleColor: "#ffffff",
      textColor: "#ffffff",
      imagePosition: "center",
    },
    {
      _key: "comprehensive-learning",
      title: "Comprehensive Learning",
      body:
        "The school environment facilitates holistic learning beyond academics. Students develop proper manners, positive behaviors, discipline, and punctuality. With appropriate education and guidance, they mature into responsible adults prepared for real-world challenges.",
      image: {
        url: "/about-values-growth.jpg",
        alt: "SAIS Dubai student guidance session",
      },
      backgroundColor: "#d97252",
      sideColor: "#00A5B2",
      ringColor: "#216B97",
      titleColor: "#ffffff",
      textColor: "#ffffff",
      imagePosition: "center",
    },
    {
      _key: "social-ethical-foundations",
      title: "Building Social and Ethical Foundations",
      body:
        "Student life establishes the groundwork for both character development and knowledge acquisition. It teaches children about consistency, obedience, sincerity, and perseverance. Through social interactions, students enhance their interpersonal skills while learning to respect diversity while maintaining their own values and principles.",
      image: {
        url: "/about-values-growth.jpg",
        alt: "SAIS Dubai student exploring sensory learning",
      },
      backgroundColor: "#216B97",
      sideColor: "#00A5B2",
      ringColor: "#00A5B2",
      titleColor: "#ffffff",
      textColor: "#ffffff",
      imagePosition: "center",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentLifePage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function StudentLifePage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentLifePage()]);
  const hero = page?.hero;
  const intro = page?.intro || fallbackIntro;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = resolveStudentSectionNavItems(innerNavigation?.items);
  const introParagraphs = richTextToParagraphs(intro.heading?.description);

  return (
    <SitePageShell data={data} mainClassName="site-page__main student-life-page__main" pageClassName="student-life-page">
      <PageHero
        className="student-life-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        titleId="student-life-hero-title"
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
        className="student-life-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <section
        id="student-life"
        className="student-life-overview"
        aria-labelledby="student-life-overview-title"
        style={{
          "--student-life-overview-bg": intro.backgroundColor || fallbackIntro.backgroundColor,
          "--student-life-overview-title": intro.titleColor || fallbackIntro.titleColor,
          "--student-life-overview-text": intro.textColor || fallbackIntro.textColor,
        } as CSSProperties}
      >
        <div className="student-life-overview__inner">
          <h2 id="student-life-overview-title" className="student-life-overview__title">
            {intro.heading?.title || fallbackIntro.heading.title}
          </h2>
          <div className="student-life-overview__body">
            {(introParagraphs.length ? introParagraphs : richTextToParagraphs(fallbackIntro.heading.description)).map(
              (paragraphText) => (
                <p key={paragraphText}>{paragraphText}</p>
              ),
            )}
          </div>
        </div>
      </section>

      <AcademicsLearningSliderSection
        section={page?.learningSliderSection}
        fallbackSection={fallbackLearningSliderSection}
        className="student-life-learning-slider"
      />
      <TourIntroSection  section={data?.tour} />
      <TourSection  section={data?.tour} />
    </SitePageShell>
  );
}

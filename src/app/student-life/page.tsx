import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { StudentLifeNationalIdentitySection } from "@/components/sections/student-life-national-identity-section";
import { richTextToParagraphs } from "@/lib/content";
import { getHomepage, getStudentLifePage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type {
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  ImageTextSection,
  PortableTextBlock,
  StudentLifeNationalIdentitySection as StudentLifeNationalIdentitySectionData,
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

function heading3(_key: string, text: string): PortableTextBlock {
  return { ...paragraph(_key, text), style: "h3" };
}

function statement(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    style: "normal",
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: ["strong"] }],
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

const fallbackNationalIdentity: StudentLifeNationalIdentitySectionData = {
  heading: {
    title: "UAE National Identity & Al Sanaa at SAIS - Dubai",
    subtitle: "Proud of Our Heritage. Connected to Dubai. Ready for the Future.",
  },
  body: [
    paragraph(
      "ni-intro-1",
      "At Sharjah American International School – Dubai, National Identity is part of everyday school life. We believe that every student who learns and grows in Dubai is part of its diverse education community, a Dubai Student who understands and respects the UAE’s culture and values, develops a strong sense of belonging, and is empowered to contribute positively to Dubai and the UAE."
    ),
    paragraph(
      "ni-intro-2",
      "Our approach therefore brings together UAE National Identity, Al Sanaa, student leadership, citizenship and cultural understanding through the curriculum, school experiences and everyday interactions."
    ),
    heading3("ni-everyday", "National Identity & Al Sanaa in Everyday Life"),
    paragraph(
      "ni-everyday-1",
      "At the heart of our program is Al Sanaa, which is the Emirati traditions of manners, hospitality and social conduct."
    ),
    paragraph(
      "ni-everyday-2",
      "Students learn about and practice traditions such as welcoming guests, Majlis etiquette, serving Arabic coffee, respecting elders, generosity and appropriate greetings. More importantly, they understand the values behind these traditions: respect, humility, responsibility, kindness and hospitality. These values are reinforced throughout school life, not only during special events, but through classroom learning, assemblies, Arabic, Islamic Studies, Social Studies, Moral Education, service learning and daily interactions."
    ),
    heading3("ni-union", "Student Leadership: The Emirati Union"),
    paragraph(
      "ni-union-1",
      "Our Emirati Union empowers Emirati students to take an active role in promoting National Identity across the school. Students contribute to national celebrations, represent their peers, share Emirati culture with the wider school community and develop leadership, communication and citizenship skills."
    ),
    paragraph(
      "ni-union-2",
      "We are also proud of Omar, a Grade 12 Emirati student and member of the Dubai Student Council, representing student voice beyond SAIS - Dubai and contributing to the wider educational community in Dubai."
    ),
  ],
};

const fallbackNationalIdentityCalendar: AcademicsLearningSliderSectionData = {
  heading: {
    title: "Celebrating the UAE Throughout the Year",
  },
  slides: [
    {
      _key: "ni-calendar",
      title: "National Identity & Al Sanaa Calendar",
      body:
        "Our dedicated National Identity & Al Sanaa Calendar ensures that UAE heritage, values and achievements are celebrated throughout the year through student-led activities, performances, exhibitions, discussions and community engagement.",
      image: {
        url: "https://cdn.sanity.io/images/uwffig4f/production/ca7fcf0fc83f77f9374465abfdb00fe8c4fb8a1d-1560x1252.jpg",
        alt: "SAIS - Dubai students in a majlis-style circle discussion in the library",
      },
      backgroundColor: "#216B97",
      sideColor: "#00A5B2",
      ringColor: "#d97252",
      titleColor: "#ffffff",
      textColor: "#ffffff",
      imagePosition: "center",
    },
    {
      _key: "ni-occasions",
      title: "Key Occasions",
      body: [
        "Emirati Women’s Day",
        "Al Sanaa Heritage Day",
        "UAE Flag Day",
        "Commemoration Day",
        "Eid Al Etihad / UAE National Day",
        "Haq Al Laila",
        "UAE Innovation Month",
        "Emirati Children’s Day",
        "Zayed Humanitarian Workday",
      ]
        .map((occasion) => `• ${occasion}`)
        .join("\n"),
      image: {
        url: "https://cdn.sanity.io/images/uwffig4f/production/d2ba84a001a638caf80e985719ebc3b943ec6a2f-5176x3637.jpg",
        alt: "UAE flags flying at the SAIS - Dubai campus",
      },
      backgroundColor: "#216B97",
      sideColor: "#00A5B2",
      ringColor: "#d97252",
      titleColor: "#ffffff",
      textColor: "#ffffff",
      imagePosition: "center",
    },
    {
      _key: "ni-womens-day",
      title: "Emirati Women’s Day",
      body:
        "Our recent Emirati Women’s Day celebration, for example, provided students with opportunities to recognize the achievements and contributions of Emirati women and reflect on their role in the UAE’s continued development.",
      image: {
        url: "https://cdn.sanity.io/images/uwffig4f/production/ea8e39295e228d484ad68713a5fcc89a45881c4d-1528x1312.jpg",
        alt: "SAIS - Dubai teacher working with Emirati students",
      },
      backgroundColor: "#d97252",
      sideColor: "#00A5B2",
      ringColor: "#216B97",
      titleColor: "#ffffff",
      textColor: "#ffffff",
      imagePosition: "center",
    },
  ],
};

const fallbackNationalIdentityFuture: ImageTextSection = {
  heading: {
    title: "Heritage, Belonging and the Future",
    description: [
      paragraph(
        "ni-future-1",
        "Our commitment to National Identity connects the UAE’s heritage and traditions with innovation, leadership, service and future aspirations."
      ),
      paragraph(
        "ni-future-2",
        "Whether Emirati or from one of the many nationalities represented in our community, we want every SAIS - Dubai student to understand the country in which they live and learn, respect its heritage and values, and develop a genuine sense of belonging, responsibility and contribution."
      ),
      statement(
        "ni-future-3",
        "At SAIS - Dubai, National Identity is not only celebrated, it is learned, experienced and lived."
      ),
    ],
  },
  image: {
    url: "https://cdn.sanity.io/images/uwffig4f/production/2282c337b695948ee0354b73d650d31ebc65406d-1528x1312.jpg",
    alt: "SAIS - Dubai students and teacher beside a mural of UAE landmarks",
  },
  imagePosition: "right",
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
        className="student-life-inner-nav student-community-inner-nav"
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
      <StudentLifeNationalIdentitySection section={page?.nationalIdentity || fallbackNationalIdentity} />
      <AcademicsLearningSliderSection
        section={page?.nationalIdentityCalendar}
        fallbackSection={fallbackNationalIdentityCalendar}
        className="student-life-national-identity-slider"
        headingId="national-identity-calendar-title"
      />
      <EditorialSplitSection
        id="national-identity-future"
        title={fallbackNationalIdentityFuture.heading.title}
        section={page?.nationalIdentityFuture || fallbackNationalIdentityFuture}
        fallbackImage={fallbackNationalIdentityFuture.image || {}}
        fallbackParagraphs={[]}
        className="student-life-national-identity-future"
        showTitle
        preserveRichText
      />
      <TourIntroSection  section={data?.tour} />
      <TourSection  section={data?.tour} />
    </SitePageShell>
  );
}

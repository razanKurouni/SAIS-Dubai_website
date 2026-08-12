import Image from "next/image";
import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { CareersJoinTeamSection } from "@/components/sections/careers-join-team-section";
import { CareersRequirementsSection } from "@/components/sections/careers-requirements-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getCareersPage, getHomepage } from "@/lib/sanity";
import type {
  CareersJoinTeamSection as CareersJoinTeamSectionData,
  CareersRequirementsSection as CareersRequirementsSectionData,
  ContactInfoSection as ContactInfoSectionData,
  ImageTextSection,
  PortableTextBlock,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Careers | SAIS Dubai",
  description: "Explore career opportunities at Sharjah American International School Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const careersPage = await getCareersPage();

  return {
    title: careersPage?.seo?.title || fallbackMetadata.title,
    description: careersPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

const fallbackHero = {
  title: "Work At\nOur School",
  image: {
    url: "/careers-hero.jpg",
    alt: "SAIS Dubai teacher supporting a student in a sensory learning space",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "#707174",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

const fallbackIntroDescription: PortableTextBlock[] = [
  {
    _key: "careers-intro-1",
    _type: "block",
    children: [
      {
        _key: "careers-intro-span-1",
        _type: "span",
        text:
          "Sharjah American International School, Dubai Campus, delivers premium education that equips students to meet contemporary global challenges. With over 23 years as an education provider in the UAE, we remain dedicated to pursuing excellence and leadership in educational practice.",
      },
    ],
  },
];

const fallbackIntroImage = {
  url: "/careers-work-for-sais.png",
  alt: "SAIS Dubai staff members standing together",
};

const fallbackEditorialImage = {
  url: "/careers-editorial.jpg",
  alt: "SAIS Dubai teacher supporting a student in a learning space",
};

const fallbackEditorialParagraphs = [
  "The SAIS educational community currently encompasses four Emirates across the UAE: Sharjah, Dubai, Umm Al-Quwain, and Abu Dhabi.",
  "The SAIS journey began with the establishment of our flagship Sharjah campus in 1997. The Dubai campus, opened in 2005, represents the second institution in our expanding network. Initially launched as a comprehensive KG-Grade 12 American curriculum school, we began with 60 students and a dedicated core faculty. The school experienced consistent enrollment growth and evolved into a vibrant, innovative learning environment delivering premier American education while honoring local customs and traditions.",
  "The administrative leadership across all SAIS campuses maintains close professional collaboration, forming a cohesive professional learning network that supports the development of each institution and its leadership team.",
];

const fallbackCareDescription: PortableTextBlock[] = [
  {
    _key: "careers-care-body-1",
    _type: "block",
    children: [
      {
        _key: "careers-care-body-1-text",
        _type: "span",
        text:
          "We are committed to safeguarding and promoting the welfare of children and young people, and we expect all employees and volunteers to share this commitment. As our institution continues to grow, we seek qualified, talented, and dedicated professionals to join our team.",
      },
    ],
  },
];

const fallbackCareSection: ContactInfoSectionData = {
  heading: {
    title: "Professional Care,\nEvery School Day",
    description: fallbackCareDescription,
  },
  image: {
    url: "/careers-professional-care.jpg",
    alt: "SAIS Dubai teacher supporting students during a classroom activity",
  },
  imagePosition: "center",
  panelColor: "#00a5b2",
  waveColor: "#d97252",
  textColor: "#ffffff",
};

const fallbackRequirementsSection: CareersRequirementsSectionData = {
  columns: [
    {
      _key: "our-commitment",
      title: "Our Commitment",
      intro: "Successful candidates will receive an excellent remuneration package including:",
      items: [
        "Competitive tax-free salary",
        "Medical insurance",
        "UAE working permit",
        "Residence visa",
        "Annual flight allowance",
        "Tuition fee concession",
        "Additional benefits in accordance with UAE Labour Law",
      ],
    },
    {
      _key: "qualifications-requirements",
      title: "Qualifications & Requirements",
      items: [
        "Certified professional teaching qualification at degree level (B.Ed., PGCE, PGDE, or equivalent in Primary Education for KG and Primary positions)",
        "Subject teachers must hold a Bachelor's or Master's degree in the relevant subject",
        "Minimum of 2 years of varied and demonstrable teaching experience at various school levels",
        "Experience in American curriculum schools is advantageous but not mandatory",
        "Proven ability to motivate and inspire students",
        "Commitment to providing outstanding teaching and learning",
        "Desire to work in a challenging environment with genuine career advancement opportunities",
      ],
    },
  ],
};

const fallbackJoinTeamDescription: PortableTextBlock[] = [
  {
    _key: "careers-join-team-body-1",
    _type: "block",
    children: [
      {
        _key: "careers-join-team-body-1-text",
        _type: "span",
        text:
          "If you possess the ideal combination of skills and attitude with a drive to excel in your career, we invite you to apply by:",
      },
    ],
  },
];

const fallbackJoinTeamSection: CareersJoinTeamSectionData = {
  heading: {
    title: "Join Our Team",
    description: fallbackJoinTeamDescription,
  },
  cards: [
    {
      _key: "email-cv",
      icon: {
        url: "/careers-apply-email.png",
        alt: "Email application icon",
      },
      label: "Emailing your CV to",
      text: "hrrecruitment@saisdubai.com\n(specify position in the subject line)",
      href: "mailto:hrrecruitment@saisdubai.com",
    },
    {
      _key: "teach-away",
      icon: {
        url: "/careers-apply-web.png",
        alt: "Online application icon",
      },
      label: "Applying through",
      text: "www.teachaway.com",
      href: "https://www.teachaway.com",
    },
    {
      _key: "schrole",
      icon: {
        url: "/careers-apply-web.png",
        alt: "Online application icon",
      },
      label: "Applying through",
      text: "www.schrole.edu.au",
      href: "https://www.schrole.edu.au",
    },
  ],
};

const careersInnerNavItems = [
  { label: "Latest News", href: "/news-events" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

export default async function CareersPage() {
  const [data, careersPage] = await Promise.all([getHomepage(), getCareersPage()]);
  const careersHero = careersPage?.hero;
  const intro = careersPage?.intro;
  const heroTitle = careersHero?.heading?.title || fallbackHero.title;
  const heroImage = careersHero?.image || fallbackHero.image;
  const introTitle = intro?.heading?.title || "Work For SAIS";
  const introDescription = intro?.heading?.description?.length
    ? intro.heading.description
    : fallbackIntroDescription;
  const introImage = intro?.image || fallbackIntroImage;
  const editorialSection: ImageTextSection = careersPage?.editorialSection
    ? {
        ...careersPage.editorialSection,
        imagePosition: careersPage.editorialSection.imagePosition || "right",
      }
    : {
        heading: { title: "SAIS Educational Community" },
        imagePosition: "right",
      };

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main careers-page__main"
      pageClassName="careers-page"
    >
      <PageHero
        className="careers-hero"
        title={heroTitle}
        image={heroImage}
        eyebrow={careersHero?.heading?.eyebrow}
        titleId="careers-hero-title"
        priority
        topLineColor={careersHero?.topLineColor || fallbackHero.topLineColor}
        panelColor={careersHero?.panelColor || fallbackHero.panelColor}
        waveColor={careersHero?.waveColor || fallbackHero.waveColor}
        textColor={careersHero?.textColor || fallbackHero.textColor}
        imagePosition={careersHero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={careersHero?.imageWidth || fallbackHero.imageWidth}
      />
      <InnerPageNav
        className="news-contact-careers-inner-nav"
        items={careersInnerNavItems}
        activeHref="/careers"
        activeColor="var(--sais-accent)"
        inactiveColor="#707174"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        ariaLabel="Careers page navigation"
      />

      <section className="careers-work" aria-labelledby="careers-work-title">
        <SectionReveal className="careers-work__inner">
          <div className="careers-work__copy">
            <h2 id="careers-work-title" className="careers-work__title">
              {introTitle}
            </h2>
            <RichText blocks={introDescription} className="careers-work__body" />
          </div>

          {introImage.url ? (
            <div className="careers-work__image-wrap">
              <Image
                src={introImage.url}
                alt={introImage.alt || introTitle}
                fill
                sizes="(max-width: 767px) calc(100vw - 48px), min(84vw, 1040px)"
                quality={84}
                className="careers-work__image"
              />
            </div>
          ) : null}
        </SectionReveal>
      </section>

      <EditorialSplitSection
        id="careers-community"
        title="SAIS Educational Community"
        section={editorialSection}
        fallbackImage={fallbackEditorialImage}
        fallbackParagraphs={fallbackEditorialParagraphs}
        className="careers-editorial"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
      />

      <ContactInfoSection
        section={careersPage?.careSection}
        fallbackSection={fallbackCareSection}
        className="careers-care-section"
        titleId="careers-care-title"
      />

      <CareersRequirementsSection
        section={careersPage?.requirementsSection}
        fallbackSection={fallbackRequirementsSection}
      />

      <CareersJoinTeamSection
        section={careersPage?.joinTeamSection}
        fallbackSection={fallbackJoinTeamSection}
      />
    </SitePageShell>
  );
}

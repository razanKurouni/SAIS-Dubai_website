import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AboutAccreditationsSection } from "@/components/sections/about-accreditations-section";
import { AboutBranchesSection } from "@/components/sections/about-branches-section";
import { AboutBoardGovernorsSection } from "@/components/sections/about-board-governors-section";
import { AboutGovernanceSection } from "@/components/sections/about-governance-section";
import { AboutInspectionSection } from "@/components/sections/about-inspection-section";
import { AboutKhdaSection } from "@/components/sections/about-khda-section";
import { AboutPrincipalMessageSection } from "@/components/sections/about-principal-message-section";
import { AboutStatementSection } from "@/components/sections/about-statement-section";
import { AboutValuesSection } from "@/components/sections/about-values-section";
import { PageHero } from "@/components/sections/page-hero";
import { richTextToParagraphs } from "@/lib/content";
import { getAboutPage, getHomepage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "About Us | SAIS Dubai",
  description: "Learn more about Sharjah American International School Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();

  return {
    title: aboutPage?.seo?.title || fallbackMetadata.title,
    description: aboutPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

const fallbackHero = {
  title: "About Sharjah American International School, Dubai",
  image: {
    url: "/about-hero-building.jpg",
    alt: "Sharjah American International School Dubai campus building",
  },
  imageWidth: "60%",
};

const fallbackIntro = {
  image: {
    url: "/about-intro-students.jpg",
    alt: "SAIS Dubai students smiling together on the playground",
  },
  body: [
    "The SAIS educational community currently encompasses four Emirates across the UAE: Sharjah, Dubai, Umm Al-Quwain, and Abu Dhabi.",
    "The SAIS journey began with the establishment of our flagship Sharjah campus in 1997. The Dubai campus, opened in 2005, represents the second institution in our expanding network. Initially launched as a comprehensive KG-Grade 12 American curriculum school, we began with 60 students and a dedicated core faculty. The school experienced consistent enrollment growth and evolved into a vibrant, innovative learning environment delivering premier American education while honoring local customs and traditions.",
    "The administrative leadership across all SAIS campuses maintains close professional collaboration, forming a cohesive professional learning network that supports the development of each institution and its leadership team.",
  ],
};

const highlights = [
  {
    label: "American Curriculum",
    text: "A rigorous learning pathway designed to help students grow academically, socially, and personally.",
  },
  {
    label: "Islamic Values",
    text: "A school culture rooted in respect, tradition, care, and responsible citizenship.",
  },
  {
    label: "Dubai Campus",
    text: "A welcoming community for students and families across every stage of school life.",
  },
];

export default async function AboutUsPage() {
  const [data, aboutPage] = await Promise.all([getHomepage(), getAboutPage()]);
  const aboutHero = aboutPage?.hero;
  const aboutIntro = aboutPage?.intro;
  const aboutPrincipalMessage = aboutPage?.principalMessage;
  const aboutBoardGovernors = aboutPage?.boardGovernors;
  const aboutStatement = aboutPage?.statement;
  const aboutValues = aboutPage?.values;
  const aboutAccreditations = aboutPage?.accreditations;
  const aboutKhda = aboutPage?.khdaSection;
  const aboutBranches = aboutPage?.branches;
  const aboutGovernance = aboutPage?.governance;
  const aboutInspection = aboutPage?.inspection;
  const heroTitle = aboutHero?.heading?.title || fallbackHero.title;
  const heroImage = aboutHero?.image || fallbackHero.image;
  const introHeading = {
    title: aboutIntro?.heading?.title ,
    accentTitle: aboutIntro?.heading?.accentTitle ,
    subtitle: aboutIntro?.heading?.subtitle,
  };
  const introImage = aboutIntro?.image || fallbackIntro.image;
  const introParagraphs = richTextToParagraphs(aboutIntro?.body);
  const introBody = introParagraphs.length > 0 ? introParagraphs : fallbackIntro.body;

  return (
    <SitePageShell data={data} mainClassName="site-page__main about-page__main" pageClassName="about-page">
      <PageHero
        className="about-hero"
        title={heroTitle}
        image={heroImage}
        titleId="about-hero-title"
        priority
        topLineColor={aboutHero?.topLineColor}
        panelColor={aboutHero?.panelColor}
        waveColor={aboutHero?.waveColor}
        textColor={aboutHero?.textColor}
        imagePosition={aboutHero?.imagePosition}
        imageWidth={aboutHero?.imageWidth || fallbackHero.imageWidth}
      />

      <section id="about" className="about-intro-section" aria-labelledby="about-intro-title">
        <div className="about-intro-section__inner">
          <h2 id="about-intro-title" className="about-intro-section__lead">
            {introHeading.title}
            {introHeading.accentTitle ? (
              <>
                {" "}
                <span className="about-intro-section__lead-accent">{introHeading.accentTitle}</span>
              </>
            ) : null}
            {introHeading.subtitle ? (
              <>
                {" "}
                <span className="about-intro-section__lead-subtitle">{introHeading.subtitle}</span>
              </>
            ) : null}
          </h2>

          <div className="about-intro-section__content">
            <div
              className="about-intro-section__media"
              style={{ "--about-intro-image-position": aboutIntro?.imagePosition || "center" } as CSSProperties}
            >
              <Image
                src={introImage.url || fallbackIntro.image.url}
                alt={introImage.alt || fallbackIntro.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 40vw"
                className="about-intro-section__image"
              />
            </div>

            <div className="about-intro-section__body">
              {introBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutGovernanceSection section={aboutGovernance} />
      <AboutInspectionSection section={aboutInspection} />
      <AboutPrincipalMessageSection section={aboutPrincipalMessage} />
      <AboutBoardGovernorsSection section={aboutBoardGovernors} />
      <AboutStatementSection section={aboutStatement} />
      <AboutValuesSection section={aboutValues} />
      <AboutAccreditationsSection section={aboutAccreditations} />
      <AboutKhdaSection section={aboutKhda} />
      <AboutBranchesSection section={aboutBranches} />
    </SitePageShell>
  );
}

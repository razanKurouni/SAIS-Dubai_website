import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { richTextToParagraphs } from "@/lib/content";
import { getHealthSafetyPage, getHomepage } from "@/lib/sanity";
import type { ImageTextSection, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Health & Safety | SAIS Dubai",
  description: "Learn about health and safety care at SAIS Dubai.",
};

const fallbackHero = {
  title: "Health\n& Safety",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai health and safety",
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

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "Professional Care,\nEvery School Day",
    description: [
      paragraph(
        "health-safety-intro",
        "The school medical includes a licensed and approved Doctor and 2 nurses in a dedicated clinic area as per Knowledge and Human Development Authority requirements (KHDA). The medical staffs are available during school hours to provide assistance and support to students in any medical situation. The medical staff are available will always assess and monitor the condition of the student and make a professional decision about appropriate treatment required."
      ),
    ],
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai medical care",
  },
  imagePosition: "left",
  theme: "teal",
};

const fallbackApproachSection: ImageTextSection = {
  heading: {
    title: "Health & Safety Support",
    description: [
      paragraph(
        "health-safety-approach-1",
        "In the event that the medical concern is a minor issue, the staff will provide the appropriate care and return the student to class. In the event that the medical concern is moderate or severe the Doctor will liaise with the school leadership staff to make contact with the family and agree on the best support and treatment for the student."
      ),
      paragraph(
        "health-safety-approach-2",
        "For your child's safety and health please be sure to provide the Coordinator and teacher with any information regarding your child's medical history and any special circumstances that we should be aware and accommodate."
      ),
      paragraph(
        "health-safety-approach-3",
        "Students have regular workshops and assemblies conducted by trained health professionals to raise awareness and teach good health practices for life."
      ),
    ],
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai health awareness",
  },
  imagePosition: "right",
  theme: "teal",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHealthSafetyPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function HealthSafetyPage() {
  const [data, page] = await Promise.all([getHomepage(), getHealthSafetyPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const approachSection = page?.approachSection || fallbackApproachSection;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main health-safety-page__main"
      pageClassName="health-safety-page"
    >
      <PageHero
        className="health-safety-hero"
        title={heroTitle}
        image={heroImage}
        titleId="health-safety-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/health-safety" />

      <IntroFeatureSection
        section={page?.introSection}
        fallbackSection={fallbackIntroSection}
        className="health-safety-intro-feature"
        titleId="health-safety-intro-title"
        panelColor="#707174"
        accentColor="#00A5B2"
        titleColor="#ffffff"
        textColor="#ffffff"
        imagePosition={page?.introSection?.imagePosition || "center"}
      />

      <ApproachSectionBase
        id="health-safety-details"
        className="health-safety-approach"
        title={approachSection.heading?.title || fallbackApproachSection.heading.title}
        paragraphs={richTextToParagraphs(approachSection.heading?.description)}
        image={approachSection.image}
        imageSizes="(max-width: 767px) 100vw, 53vw"
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHomepage, getMedicalServicesPage } from "@/lib/sanity";
import type { ImageTextSection, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Medical Services | SAIS Dubai",
  description: "Learn about medical services at SAIS Dubai.",
};

const fallbackHero = {
  title: "Medical\nServices",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai medical services",
  },
  topLineColor: "#216B97",
  panelColor: "#707174",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: [] }],
  };
}

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "Professional Healthcare,\nOn Site Every School Day",
    description: [
      paragraph(
        "medical-services-intro",
        "Our on-campus clinic is staffed by a licensed doctor and three qualified nurses, adhering to Dubai Health Authority standards. The medical team is available during school hours to address student health needs promptly."
      ),
    ],
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai medical clinic care",
  },
  imagePosition: "center",
  theme: "blue",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMedicalServicesPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function MedicalServicesPage() {
  const [data, page] = await Promise.all([getHomepage(), getMedicalServicesPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main medical-services-page__main"
      pageClassName="medical-services-page"
    >
      <PageHero
        className="medical-services-hero"
        title={heroTitle}
        image={heroImage}
        titleId="medical-services-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/medical-services" />

      <IntroFeatureSection
        section={page?.introSection}
        fallbackSection={fallbackIntroSection}
        className="medical-services-intro-feature"
        titleId="medical-services-intro-title"
        panelColor="#216B97"
        accentColor="#00A5B2"
        titleColor="#ffffff"
        textColor="#ffffff"
        imagePosition={page?.introSection?.imagePosition || "center"}
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

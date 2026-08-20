import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHomepage, getOurCommunityPage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Our Community | SAIS Dubai",
  description: "Learn about the SAIS Dubai community, campus, wellbeing, inclusion, services, and school support.",
};

const fallbackHero = {
  title: "Our\nCommunity",
  image: {
    url: "/about-statement-mission.jpg",
    alt: "SAIS Dubai principal speaking with students",
  },
  topLineColor: "#216B97",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

export async function generateMetadata(): Promise<Metadata> {
  const ourCommunityPage = await getOurCommunityPage();

  return {
    title: ourCommunityPage?.seo?.title || fallbackMetadata.title,
    description: ourCommunityPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function OurCommunityPage() {
  const [data, ourCommunityPage] = await Promise.all([getHomepage(), getOurCommunityPage()]);
  const hero = ourCommunityPage?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main our-community-page__main"
      pageClassName="our-community-page"
    >
      <PageHero
        className="our-community-hero"
        title={heroTitle}
        image={heroImage}
        titleId="our-community-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <IntroFeatureSection section={ourCommunityPage?.supportSection} titleId="our-community-support-title" />
      <LearningPhasesSection section={ourCommunityPage?.linksSection} />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

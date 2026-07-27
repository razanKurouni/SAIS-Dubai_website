import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { OurTeamLeadershipSection } from "@/components/sections/our-team-leadership-section";
import { PageHero } from "@/components/sections/page-hero";
import { getHomepage, getOurTeamPage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Our Team | SAIS Dubai",
  description: "Meet the team at Sharjah American International School Dubai.",
};

const fallbackHero = {
  title: "Meet\nOur Team",
  image: {
    url: "/our-team-hero.png",
    alt: "SAIS Dubai team members standing together",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

export async function generateMetadata(): Promise<Metadata> {
  const ourTeamPage = await getOurTeamPage();

  return {
    title: ourTeamPage?.seo?.title || fallbackMetadata.title,
    description: ourTeamPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function OurTeamPage() {
  const [data, ourTeamPage] = await Promise.all([getHomepage(), getOurTeamPage()]);
  const hero = ourTeamPage?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main our-team-page__main"
      pageClassName="our-team-page"
    >
      <PageHero
        className="our-team-hero"
        title={heroTitle}
        image={heroImage}
        titleId="our-team-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <OurTeamLeadershipSection section={ourTeamPage?.leadershipSection} />
    </SitePageShell>
  );
}

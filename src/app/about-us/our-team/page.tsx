import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { OurTeamDepartmentsSection } from "@/components/sections/our-team-departments-section";
import { OurTeamLeadershipSection } from "@/components/sections/our-team-leadership-section";
import { OurTeamPastoralSection } from "@/components/sections/our-team-pastoral-section";
import { PageHero } from "@/components/sections/page-hero";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { getHomepage, getOurTeamPage } from "@/lib/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

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

const aboutInnerNavItems = [
  { label: "About SAIS", href: "/about-us" },
  { label: "Our Team", href: "/about-us/our-team" },
];

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

      <InnerPageNav
        className="about-inner-nav"
        items={aboutInnerNavItems}
        activeHref="/about-us/our-team"
        activeColor="var(--sais-accent)"
        inactiveColor="#707174"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        ariaLabel="About SAIS navigation"
      />

      <OurTeamLeadershipSection section={ourTeamPage?.leadershipSection} />
      <OurTeamDepartmentsSection section={ourTeamPage?.departmentsSection} />
      <OurTeamPastoralSection section={ourTeamPage?.pastoralSection} />
      <OurTeamPastoralSection
        section={ourTeamPage?.administrationSection}
        className="our-team-administration"
        titleId="our-team-administration-title"
        fallbackAlt="SAIS Dubai administration team"
      />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

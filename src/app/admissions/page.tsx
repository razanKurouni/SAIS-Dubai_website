import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getAdmissionsPage, getHomepage } from "@/lib/sanity";
import styles from "./admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Admissions Introduction | SAIS Dubai",
  description: "Explore the admissions process at Sharjah American International School Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsPage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = (innerNavigation?.items || []).reduce<InnerPageNavItem[]>((items, item) => {
    if (item.label && item.href) {
      items.push({
        label: item.label,
        href: item.href,
        openInNewTab: item.openInNewTab,
      });
    }

    return items;
  }, []);
  const policySection = page?.policySection;

  return (
    <SitePageShell
      data={data}
      mainClassName={`site-page__main ${styles.pageMain}`}
      pageClassName="admissions-page"
    >
      <PageHero
        className="admissions-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-hero-title"
        priority
        topLineColor={hero?.topLineColor}
        panelColor={hero?.panelColor}
        waveColor={hero?.waveColor}
        textColor={hero?.textColor}
        imagePosition={hero?.imagePosition}
        imageWidth={hero?.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems}
        activeHref={innerNavigation?.activeHref}
        activeColor={innerNavigation?.activeColor}
        inactiveColor={innerNavigation?.inactiveColor}
        textColor={innerNavigation?.textColor}
        dividerColor={innerNavigation?.dividerColor}
        topLineColor={innerNavigation?.topLineColor}
        className={styles.stickyNav}
        ariaLabel={innerNavigation?.ariaLabel}
      />

      {page?.introSection ? (
        <IntroFeatureSection
          section={page.introSection}
          className="admissions-intro-feature"
          titleId="admissions-intro-title"
          panelColor="#707174"
          accentColor="#d97252"
          titleColor="#ffffff"
          textColor="#ffffff"
          imagePosition={page.introSection.imagePosition}
        />
      ) : null}

      {policySection ? (
        <ApproachSectionBase
          id="admissions-policy"
          className="admissions-policy-section"
          title={policySection.heading?.title}
          lead={policySection.heading?.title}
          content={policySection.heading?.description}
          image={policySection.image}
          imageSizes="(max-width: 767px) 100vw, 53vw"
        />
      ) : null}

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

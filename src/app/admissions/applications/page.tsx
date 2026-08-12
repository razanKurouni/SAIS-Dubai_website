import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AboutInspectionSection } from "@/components/sections/about-inspection-section";
import { ApplicationStepsSection } from "@/components/sections/application-steps-section";
import { CalendarDownloadSection } from "@/components/sections/calendar-download-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAdmissionsApplicationPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Admissions Application | SAIS Dubai",
  description: "Learn about the SAIS Dubai application process and registration timelines.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsApplicationPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsApplicationPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsApplicationPage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = (innerNavigation?.items || []).reduce<InnerPageNavItem[]>((items, item) => {
    if (item.label && item.href) {
      items.push({ label: item.label, href: item.href, openInNewTab: item.openInNewTab });
    }
    return items;
  }, []);

  return (
    <SitePageShell
      data={data}
      mainClassName={`site-page__main admissions-application-page__main ${styles.pageMain}`}
      pageClassName="admissions-application-page"
    >
      <PageHero
        className="admissions-application-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-application-hero-title"
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

      {page?.applicationProcess ? (
        <ContactInfoSection
          section={page.applicationProcess}
          fallbackSection={page.applicationProcess}
        />
      ) : null}

      {page?.timelinesSection ? (
        <AboutInspectionSection section={page.timelinesSection} />
      ) : null}

      {page?.stepsSection ? (
        <ApplicationStepsSection section={page.stepsSection} />
      ) : null}

      {page?.finalCta ? <CalendarDownloadSection section={page.finalCta} download={false} icon="arrow" /> : null}
    </SitePageShell>
  );
}

import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { FaqGridSection } from "@/components/sections/faq-grid-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAdmissionsFaqPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Frequently Asked Questions | SAIS Dubai",
  description: "Find answers to frequently asked questions about SAIS Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsFaqPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsFaqPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsFaqPage()]);
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
      mainClassName={`site-page__main admissions-faq-page__main ${styles.pageMain}`}
      pageClassName="admissions-faq-page"
    >
      <PageHero
        className="admissions-faq-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-faq-hero-title"
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
        <ContactInfoSection section={page.introSection} fallbackSection={page.introSection} />
      ) : null}

      <FaqGridSection section={page?.faqSection} />
    </SitePageShell>
  );
}

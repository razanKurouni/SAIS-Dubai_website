import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AdmissionsFeeStructureSection } from "@/components/sections/admissions-fee-structure-section";
import { AdmissionsFeeTermsSection } from "@/components/sections/admissions-fee-terms-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAdmissionsFeesPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Admissions Fees | SAIS Dubai",
  description: "Learn about tuition fees and discount policies at SAIS Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsFeesPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsFeesPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsFeesPage()]);
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
      mainClassName={`site-page__main admissions-fees-page__main ${styles.pageMain}`}
      pageClassName="admissions-fees-page"
    >
      <PageHero
        className="admissions-fees-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-fees-hero-title"
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

      {page?.feesIntro ? (
        <ContactInfoSection section={page.feesIntro} fallbackSection={page.feesIntro} />
      ) : null}

      {page?.discountPolicy?.image ? (
        <EditorialSplitSection
          id="discount-policy"
          title="Discount Policy"
          section={page.discountPolicy}
          fallbackImage={page.discountPolicy.image}
          fallbackParagraphs={[]}
          className="admissions-fees-discount-policy"
          showTitle
          preserveRichText
        />
      ) : null}

      <AdmissionsFeeStructureSection section={page?.feeStructure} />
      <AdmissionsFeeTermsSection section={page?.termsSection} />
    </SitePageShell>
  );
}

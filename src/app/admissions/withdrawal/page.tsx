import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { richTextToParagraphs } from "@/lib/content";
import { getAdmissionsWithdrawalPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Student Withdrawal Process | SAIS Dubai",
  description: "Learn about the student withdrawal process at SAIS Dubai.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsWithdrawalPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsWithdrawalPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsWithdrawalPage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const intro = page?.intro;
  const introParagraphs = richTextToParagraphs(intro?.body);
  const innerNavItems = (innerNavigation?.items || []).reduce<InnerPageNavItem[]>((items, item) => {
    if (item.label && item.href) {
      items.push({ label: item.label, href: item.href, openInNewTab: item.openInNewTab });
    }
    return items;
  }, []);

  return (
    <SitePageShell
      data={data}
      mainClassName={`site-page__main admissions-withdrawal-page__main ${styles.pageMain}`}
      pageClassName="admissions-withdrawal-page"
    >
      <PageHero
        className="admissions-withdrawal-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-withdrawal-hero-title"
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

      {intro ? (
        <section id="about" className="about-intro-section" aria-labelledby="about-intro-title">
          <div className="about-intro-section__inner">
            <Reveal threshold={0.16}>
              <h2 id="about-intro-title" className="about-intro-section__lead">
                {intro.heading?.title}
                {intro.heading?.accentTitle ? (
                  <>
                    {" "}
                    <span className="about-intro-section__lead-accent">{intro.heading.accentTitle}</span>
                  </>
                ) : null}
                {intro.heading?.subtitle ? (
                  <>
                    {" "}
                    <span className="about-intro-section__lead-subtitle">{intro.heading.subtitle}</span>
                  </>
                ) : null}
              </h2>
            </Reveal>

            <div className="about-intro-section__content">
              <Reveal
                className="about-intro-section__media"
                delay={120}
                threshold={0.14}
                style={{ "--about-intro-image-position": intro.imagePosition || "center" } as CSSProperties}
              >
                {intro.image?.url ? (
                  <Image
                    src={intro.image.url}
                    alt={intro.image.alt || intro.heading?.title || "Student withdrawal process"}
                    fill
                    sizes="(max-width: 767px) 100vw, 40vw"
                    className="about-intro-section__image"
                  />
                ) : null}
              </Reveal>

              <Reveal className="about-intro-section__body" delay={220} threshold={0.14}>
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}
    </SitePageShell>
  );
}

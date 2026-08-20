import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { CmsImage } from "@/components/ui/cms-image";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { richTextToParagraphs } from "@/lib/content";
import { getHomepage, getStudentStaffWellbeingPage } from "@/lib/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

const fallbackMetadata: Metadata = {
  title: "Student & Staff Wellbeing | SAIS Dubai",
  description: "Learn about student and staff wellbeing support at SAIS Dubai.",
};

const fallbackHero = {
  title: "Student &\nStaff Wellbeing",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai campus building",
  },
  topLineColor: "#216B97",
  panelColor: "#707174",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentStaffWellbeingPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function StudentStaffWellbeingPage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentStaffWellbeingPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main wellbeing-page__main"
      pageClassName="wellbeing-page"
    >
      <PageHero
        className="wellbeing-hero"
        title={heroTitle}
        image={heroImage}
        titleId="wellbeing-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/student-staff-wellbeing" />

      <section className="wellbeing-commitment" aria-labelledby="wellbeing-commitment-title">
        <div className="wellbeing-commitment__inner">
          <SectionReveal className="wellbeing-commitment__copy">
            <h2 id="wellbeing-commitment-title" className="wellbeing-commitment__title">
              {page?.commitment?.heading?.title || "Our Commitment"}
            </h2>
            <RichText blocks={page?.commitment?.heading?.description} className="wellbeing-commitment__body" />
          </SectionReveal>

          <SectionReveal className="wellbeing-commitment__media">
            <CmsImage
              image={page?.commitment?.image}
              fallbackLabel={page?.commitment?.heading?.title || "Our Commitment"}
              className="wellbeing-commitment__image"
              imageClassName="object-cover"
              sizes="(max-width: 767px) 90vw, 78vw"
            />
          </SectionReveal>
        </div>
      </section>

      <section className="wellbeing-proactive" aria-labelledby="wellbeing-proactive-title">
        <div className="wellbeing-proactive__inner">
          <SectionReveal className="wellbeing-proactive__header">
            <h2 id="wellbeing-proactive-title" className="wellbeing-proactive__title">
              {page?.proactiveApproach?.heading?.title || "A Proactive Approach"}
            </h2>
            <RichText blocks={page?.proactiveApproach?.heading?.description} className="wellbeing-proactive__intro" />
          </SectionReveal>

          {page?.proactiveApproach?.cards?.length ? (
            <div className="wellbeing-proactive__cards">
              {page.proactiveApproach.cards.map((card, index) => (
                <Reveal key={card._key || `${card.description}-${index}`} delay={index * 90}>
                  <HoverIconCard
                    className="wellbeing-proactive__card"
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      <IntroFeatureSection
        section={
          page?.counsellingSection?.heading
            ? {
                heading: page.counsellingSection.heading,
                image: page.counsellingSection.image,
                imagePosition: "left",
                theme: "blue",
              }
            : undefined
        }
        className="wellbeing-counselling-feature"
        titleId="wellbeing-counselling-title"
        panelColor={page?.counsellingSection?.panelColor || "#00A5B2"}
        accentColor={page?.counsellingSection?.waveColor || "#d97252"}
        titleColor={page?.counsellingSection?.titleColor || "#ffffff"}
        textColor={page?.counsellingSection?.textColor || "#ffffff"}
        imagePosition={page?.counsellingSection?.imagePosition || "center"}
      />


      <section className="wellbeing-sel" aria-labelledby="wellbeing-sel-title">
        <div className="wellbeing-sel__inner">
          <SectionReveal className="wellbeing-sel__copy">
            <h2 id="wellbeing-sel-title" className="wellbeing-sel__title">
              {page?.selSection?.heading?.title || "Social and Emotional Learning Program (SEL)"}
            </h2>
            <RichText blocks={page?.selSection?.heading?.description} className="wellbeing-sel__body" />
          </SectionReveal>

          <SectionReveal className="wellbeing-sel__media">
            <CmsImage
              image={page?.selSection?.image}
              fallbackLabel={page?.selSection?.heading?.title || "Social and Emotional Learning"}
              className="wellbeing-sel__image"
              imageClassName="object-cover"
              sizes="(max-width: 767px) 90vw, 38vw"
            />
          </SectionReveal>
        </div>
      </section>

      
      <ApproachSectionBase
        id="wellbeing-framework"
        className="approach-section--home"
        title={page?.wellbeingFramework?.heading?.title || "Wellbeing Framework"}
        lead={page?.wellbeingFramework?.heading?.title || "Wellbeing Framework"}
        paragraphs={richTextToParagraphs(page?.wellbeingFramework?.heading?.description)}
        image={page?.wellbeingFramework?.image || data?.whySection?.image}
        imageSizes="(max-width: 767px) 100vw, 53vw"
      />
      <TourIntroSection section={data?.tour} />
            <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

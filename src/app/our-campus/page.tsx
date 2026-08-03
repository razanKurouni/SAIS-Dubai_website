import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { CampusVideoSection } from "@/components/sections/campus-video-section";
import { PageHero } from "@/components/sections/page-hero";
import { CmsImage } from "@/components/ui/cms-image";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getOurCampusPage } from "@/lib/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

const fallbackMetadata: Metadata = {
  title: "Our Campus | SAIS Dubai",
  description: "Explore SAIS Dubai's modern campus, facilities, learning spaces, and sports environments.",
};

const fallbackHero = {
  title: "Our\nCampus",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai campus",
  },
  topLineColor: "#d97252",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

export async function generateMetadata(): Promise<Metadata> {
  const ourCampusPage = await getOurCampusPage();

  return {
    title: ourCampusPage?.seo?.title || fallbackMetadata.title,
    description: ourCampusPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function OurCampusPage() {
  const [data, ourCampusPage] = await Promise.all([getHomepage(), getOurCampusPage()]);
  const hero = ourCampusPage?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell data={data} mainClassName="site-page__main our-campus-page__main" pageClassName="our-campus-page">
      <PageHero
        className="our-campus-hero"
        title={heroTitle}
        image={heroImage}
        titleId="our-campus-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <section className="campus-intro" aria-labelledby="campus-intro-title">
        <SectionReveal className="campus-intro__inner">
          <h2 id="campus-intro-title" className="campus-intro__title">
            {ourCampusPage?.intro?.heading?.title || "Modern Spaces for Modern Learning"}
          </h2>
          <RichText blocks={ourCampusPage?.intro?.heading?.description} className="campus-intro__body" />
        </SectionReveal>
      </section>

      <CampusVideoSection section={ourCampusPage?.videoSection} />

      <section className="campus-facilities" aria-labelledby="campus-facilities-title">
        <div className="campus-facilities__inner">
          <SectionReveal className="campus-facilities__header">
            <h2 id="campus-facilities-title" className="campus-facilities__title">
              {ourCampusPage?.facilities?.heading?.title || "Facilities"}
            </h2>
            <RichText blocks={ourCampusPage?.facilities?.heading?.description} className="campus-facilities__intro" />
          </SectionReveal>

          {ourCampusPage?.facilities?.cards?.length ? (
            <div className="campus-facilities__grid">
              {ourCampusPage.facilities.cards.map((card, index) => (
                <Reveal
                  as="article"
                  key={card._key || `${card.title}-${index}`}
                  className="campus-facility-card"
                  delay={index * 90}
                >
                  <CmsImage
                    image={card.image}
                    fallbackLabel={card.title || "Campus facility"}
                    className="campus-facility-card__image"
                    imageClassName="object-cover"
                    sizes="(max-width: 767px) 92vw, 42vw"
                  />
                  <div className="campus-facility-card__body">
                    <h3 className="campus-facility-card__title">{card.title}</h3>
                    <RichText blocks={card.body} className="campus-facility-card__text" />
                  </div>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      <TourIntroSection section={data?.tour} />
            <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

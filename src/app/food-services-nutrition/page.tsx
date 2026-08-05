import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getFoodServicesNutritionPage, getHomepage } from "@/lib/sanity";
import type { ImageTextSection, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Food Services & Nutrition | SAIS Dubai",
  description: "Learn about food services and nutrition at SAIS Dubai.",
};

const fallbackHero = {
  title: "Food\nNutrition",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai food services and nutrition",
  },
  topLineColor: "#216B97",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: [] }],
  };
}

function bullet(_key: string, text: string): PortableTextBlock {
  return {
    ...paragraph(_key, text),
    listItem: "bullet",
    level: 1,
  };
}

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "School Cafeteria",
    description: [
      paragraph(
        "food-services-intro-1",
        "Our air-conditioned school cafeteria is operated by a registered food and nutrition company that adheres to strict regulations established by:"
      ),
      bullet("food-services-khda", "Knowledge and Human Development Authority (KHDA)"),
      bullet("food-services-dubai-municipality", "Dubai Municipality"),
      paragraph(
        "food-services-intro-2",
        "We provide students with high-quality, nutritious food options that fully comply with Islamic dietary requirements. The menu is refreshed annually, incorporating student suggestions whenever possible to ensure both nutritional excellence and student satisfaction."
      ),
    ],
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai cafeteria",
  },
  imagePosition: "center",
  theme: "blue",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFoodServicesNutritionPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function FoodServicesNutritionPage() {
  const [data, page] = await Promise.all([getHomepage(), getFoodServicesNutritionPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main food-services-nutrition-page__main"
      pageClassName="food-services-nutrition-page"
    >
      <PageHero
        className="food-services-nutrition-hero"
        title={heroTitle}
        image={heroImage}
        titleId="food-services-nutrition-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <IntroFeatureSection
        section={page?.introSection}
        fallbackSection={fallbackIntroSection}
        className="food-services-nutrition-intro-feature"
        titleId="food-services-nutrition-intro-title"
        panelColor="#216B97"
        accentColor="#d97252"
        titleColor="#ffffff"
        textColor="#ffffff"
        imagePosition={page?.introSection?.imagePosition || "center"}
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { richTextToParagraphs } from "@/lib/content";
import { getHomepage, getSchoolSuppliesUniformPage } from "@/lib/sanity";
import type { ImageTextSection, PortableTextBlock } from "@/types/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

const fallbackMetadata: Metadata = {
  title: "School Supplies & Uniform | SAIS Dubai",
  description: "Learn about school supplies and uniform at SAIS Dubai.",
};

const fallbackHero = {
  title: "School Supplies\n& Uniform",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai school supplies and uniform",
  },
  topLineColor: "#d97252",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
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
    title: "Everything You Need,\nMade Simple",
    description: [
      paragraph(
        "school-supplies-intro-1",
        "Families have convenient options for purchasing school supplies:"
      ),
      bullet("school-supplies-bookstore", "Through our school bookstore at discounted rates"),
      bullet("school-supplies-retailers", "From external retailers of their choice"),
      paragraph(
        "school-supplies-intro-2",
        "We provide a comprehensive booklist annually that details all necessary equipment for the academic year. Students can replace items at the school bookstore throughout the year as needed."
      ),
    ],
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai school supplies",
  },
  imagePosition: "center",
  theme: "teal",
};

const fallbackUniformSection: ImageTextSection = {
  heading: {
    title: "School Uniform",
    description: [
      paragraph(
        "school-uniform-1",
        "All students from KG1 through Grade 12 wear the SAIS-Dubai uniform, which supports our learning-focused environment and reinforces our core values of compassion, excellence, integrity, respect, and responsibility."
      ),
      paragraph(
        "school-uniform-2",
        "Our uniform is thoughtfully designed to respect the cultural context of the United Arab Emirates while promoting personal respect and responsibility among our students."
      ),
      paragraph("school-uniform-3", "We maintain two official uniforms:"),
      bullet("school-uniform-standard", "Standard daily school uniform"),
      bullet("school-uniform-pe", "Physical Education (PE) uniform, worn on days when students have PE classes"),
      paragraph(
        "school-uniform-4",
        "All uniform garments conform to our division-specific dress code policies."
      ),
    ],
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai students in uniform",
  },
  imagePosition: "right",
  theme: "teal",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSchoolSuppliesUniformPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function SchoolSuppliesUniformPage() {
  const [data, page] = await Promise.all([getHomepage(), getSchoolSuppliesUniformPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const uniformSection = page?.uniformSection || fallbackUniformSection;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main school-supplies-uniform-page__main"
      pageClassName="school-supplies-uniform-page"
    >
      <PageHero
        className="school-supplies-uniform-hero"
        title={heroTitle}
        image={heroImage}
        titleId="school-supplies-uniform-hero-title"
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
        className="school-supplies-uniform-intro-feature"
        titleId="school-supplies-uniform-intro-title"
        panelColor="#00A5B2"
        accentColor="#216B97"
        titleColor="#ffffff"
        textColor="#ffffff"
        imagePosition={page?.introSection?.imagePosition || "center"}
      />

      <ApproachSectionBase
        id="school-supplies-uniform-details"
        className="school-supplies-uniform-approach"
        title={uniformSection.heading?.title || fallbackUniformSection.heading.title}
        paragraphs={richTextToParagraphs(uniformSection.heading?.description)}
        image={uniformSection.image}
        imageSizes="(max-width: 767px) 100vw, 53vw"
      />
      <TourIntroSection section={data?.tour} />
      <TourSection  section={data?.tour} />
    </SitePageShell>
  );
}

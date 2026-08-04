import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { CampusVideoSection } from "@/components/sections/campus-video-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { PageHero } from "@/components/sections/page-hero";
import { getHomepage, getParentInvolvementPage } from "@/lib/sanity";
import type { ImageTextSection, PortableTextBlock, SanityImage } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Parent Involvement | SAIS Dubai",
  description: "Learn how SAIS Dubai partners with parents to support student success.",
};

const fallbackHero = {
  title: "Parent\nInvolvement",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai parent involvement",
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
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackIntroImage: SanityImage = {
  url: "/contact-campus-building.jpg",
  alt: "SAIS Dubai students and parent",
};

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "Building Success\nThrough Collaboration",
    description: [
      paragraph(
        "parent-involvement-intro-1",
        "Parents are essential partners in our educational community. We actively encourage and value parent engagement in their children's learning and school life."
      ),
      paragraph(
        "parent-involvement-intro-2",
        "As key stakeholders, parents contribute constructively to our holistic education approach, helping to create successful learning experiences for all students."
      ),
      paragraph(
        "parent-involvement-intro-3",
        "Students achieve their highest potential academically, socially, and emotionally when we establish a strong, positive partnership between school, student, and parent."
      ),
    ],
  },
  image: fallbackIntroImage,
  imagePosition: "left",
  theme: "light",
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getParentInvolvementPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ParentInvolvementPage() {
  const [data, page] = await Promise.all([getHomepage(), getParentInvolvementPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main parent-involvement-page__main"
      pageClassName="parent-involvement-page"
    >
      <PageHero
        className="parent-involvement-hero"
        title={heroTitle}
        image={heroImage}
        titleId="parent-involvement-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <EditorialSplitSection
        id="parent-involvement-intro"
        title="Building Success Through Collaboration"
        section={page?.introSection || fallbackIntroSection}
        fallbackImage={fallbackIntroImage}
        fallbackParagraphs={[]}
        className="parent-involvement-intro"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
      />

      <section className="parent-involvement-video-heading" aria-labelledby="parent-video-title">
        <div className="academics-support-programs__inner">
          <h2 id="parent-video-title" className="academics-support-programs__title">
            {page?.videoHeading?.title || "Hear From Our Parents"}
          </h2>
        </div>
      </section>

      <CampusVideoSection section={page?.videoSection} />
    </SitePageShell>
  );
}

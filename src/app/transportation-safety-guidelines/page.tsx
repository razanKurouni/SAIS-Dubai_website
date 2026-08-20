import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsKindergartenAssessmentSection } from "@/components/sections/academics-kindergarten-assessment-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHomepage, getTransportationSafetyPage } from "@/lib/sanity";
import type { AcademicsKindergartenAssessmentSection as AssessmentSection, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "School Transportation Safety Guidelines | SAIS Dubai",
  description: "Learn about school transportation safety guidelines at SAIS Dubai.",
};

const fallbackHero = {
  title: "School Transportation\nSafety Guidelines",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai school transportation",
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

const fallbackGuidelinesSection: AssessmentSection = {
  heading: {
    title: "Professional Healthcare,\nOn Site Every School Day",
    description: [
      paragraph(
        "transportation-guidelines-intro",
        "Seating assignments will follow a carefully planned route system that maximizes safety while accommodating capacity requirements. Unavailable seats will be clearly marked."
      ),
    ],
  },
  cards: [
    {
      _key: "boarding",
      title: "Boarding",
      description:
        "Students will board from the back of the bus to the front to minimize contact between passengers.",
    },
    {
      _key: "afternoon-boarding",
      title: "Afternoon Boarding",
      description:
        "Afternoon boarding will be organized by drop-off sequence, with students who exit first boarding last and sitting in front seats.",
    },
    {
      _key: "cleaning-sanitization",
      title: "Cleaning & Sanitization",
      description: "All buses undergo regular cleaning and sanitization procedures.",
    },
    {
      _key: "attendance-records",
      title: "Attendance Records",
      description:
        "Detailed attendance records will be maintained for all bus riders, with absence promptly reported to school administration. Live monitoring systems will be active on all buses.",
    },
  ],
  backgroundColor: "#216B97",
  titleColor: "#ffffff",
  textColor: "#ffffff",
  cardTextColor: "#216B97",
  cardBorderColor: "#216B97",
  cardHoverBorderColor: "#d97252",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTransportationSafetyPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function TransportationSafetyGuidelinesPage() {
  const [data, page] = await Promise.all([getHomepage(), getTransportationSafetyPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main transportation-safety-page__main"
      pageClassName="transportation-safety-page"
    >
      <PageHero
        className="transportation-safety-hero"
        title={heroTitle}
        image={heroImage}
        titleId="transportation-safety-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/transportation-safety-guidelines" />

      <AcademicsKindergartenAssessmentSection
        section={page?.guidelinesSection}
        fallbackSection={fallbackGuidelinesSection}
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsSupportProgramsSliderSection } from "@/components/sections/academics-support-programs-slider-section";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { richTextToParagraphs } from "@/lib/content";
import { getHomepage, getStudentInclusionPage } from "@/lib/sanity";
import type { AcademicsSupportProgramsSection, ImageTextSection, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Student Inclusion | SAIS Dubai",
  description: "Learn about student inclusion and support programs at SAIS Dubai.",
};

const fallbackHero = {
  title: "Student\nInclusion",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai students",
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
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "Investing in Continuous\nProfessional Growth",
    description: [
      paragraph(
        "student-inclusion-intro",
        "Inclusion is a core value embraced by the entire school community. The commitment to equitable access to learning opportunities is evident in the school's open admission policy and inclusive practices tailored to meet the diverse needs of all learners. Specialized programs cater to students of determination, those on learning support programs, and those with additional language needs, ensuring every student can thrive. Investment in additional resources and student support services, including dedicated Special Educational Needs Coordinator (SENCO) and social and emotional counselors, underscores the school's dedication to supporting every learner."
      ),
    ],
  },
  image: {
    url: "/sais-building-futures.png",
    alt: "SAIS Dubai student reading outdoors",
  },
  imagePosition: "left",
  theme: "teal",
};

const fallbackApproachSection: ImageTextSection = {
  heading: {
    title: "Inclusive Learning Community",
    description: [
      paragraph(
        "student-inclusion-approach-1",
        "Rigorous assessment data analyses guide efforts to address the varying needs of the diverse student body, shaping curriculum design, adaptation, and lesson planning. Curriculum enrichment initiatives integrate critical issues, promoting awareness and understanding from an early age."
      ),
      paragraph(
        "student-inclusion-approach-2",
        "Peer mentoring programs, community service projects, and thoughtfully curated resources further promote inclusivity and representation within the learning community."
      ),
      paragraph(
        "student-inclusion-approach-3",
        "Ethical practice is paramount, with all members committed to upholding ethical standards. Through surveys, student leadership opportunities, parental engagement initiatives, and an open-door policy, we foster a positive and welcoming learning environment where every member feels a sense of belonging."
      ),
    ],
  },
  image: {
    url: "/sais-building-futures.png",
    alt: "SAIS Dubai students learning together",
  },
  imagePosition: "right",
  theme: "teal",
};

const fallbackSupportProgramsSection: AcademicsSupportProgramsSection = {
  heading: {
    title: "Inclusion & Support Programs",
  },
  backgroundColor: "#f2f2f2",
  titleColor: "#00A5B2",
  cardBorderColor: "#216B97",
  cardHoverBorderColor: "#00A5B2",
  cardTextColor: "#216B97",
  cards: [
    {
      _key: "students-of-determination",
      title: "Students of Determination",
      description:
        "Students with special educational needs and/or disabilities (SEND/SOD) are supported through individualized education plans (IEP), push-in/pull-out support services, and tailored curriculum, instruction, and assessments.",
      iconType: "determination",
    },
    {
      _key: "gifted-talented",
      title: "Gifted and Talented Students",
      description:
        "Students with identified gifts and/or talents are provided with enrichment and accelerated programs as comprehensively stated and elaborated on in their advanced learning plans (ALPs).",
      iconType: "gifted",
    },
    {
      _key: "eal-learners",
      title: "EAL Learners",
      description:
        "Students with additional English language needs are identified through WIDA screener and supported with tiered interventions.",
      iconType: "eal",
    },
    {
      _key: "counselling-support",
      title: "Counselling and Support Services",
      description:
        "Students receive social, emotional, and pastoral support through coordinated care pathways and responsive school-based services.",
      iconType: "counseling",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentInclusionPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function StudentInclusionPage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentInclusionPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const approachSection = page?.approachSection || fallbackApproachSection;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main student-inclusion-page__main"
      pageClassName="student-inclusion-page"
    >
      <PageHero
        className="student-inclusion-hero"
        title={heroTitle}
        image={heroImage}
        titleId="student-inclusion-hero-title"
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
        className="student-inclusion-intro-feature"
        titleId="student-inclusion-intro-title"
        panelColor="#00A5B2"
        accentColor="#d97252"
        titleColor="#ffffff"
        textColor="#ffffff"
        imagePosition={page?.introSection?.imagePosition || "center"}
      />

      <ApproachSectionBase
        id="student-inclusion-approach"
        className="student-inclusion-approach"
        title={approachSection.heading?.title || fallbackApproachSection.heading.title}
        paragraphs={richTextToParagraphs(approachSection.heading?.description)}
        image={approachSection.image}
        imageSizes="(max-width: 767px) 100vw, 53vw"
      />

      <AcademicsSupportProgramsSliderSection
        section={page?.supportProgramsSection}
        fallbackSection={fallbackSupportProgramsSection}
        className="student-inclusion-support-programs"
      />
    </SitePageShell>
  );
}

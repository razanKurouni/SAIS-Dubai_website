import type { Metadata } from "next";
import Image from "next/image";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsKindergartenAssessmentSection } from "@/components/sections/academics-kindergarten-assessment-section";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { StudentProgramsLeadershipStructureSection } from "@/components/sections/student-programs-leadership-structure-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHomepage, getStudentProgramsPage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type { InnerPageNavItem } from "@/components/sections/inner-page-nav";
import type {
  AcademicsKindergartenAssessmentSection as AssessmentSection,
  ContactInfoSection as ContactInfoSectionData,
  ImageTextSection,
  InnerNavigation,
  PortableTextBlock,
  SectionHeading,
  SanityImage,
  StudentProgramsLeadershipStructureSection as LeadershipStructureSectionData,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Student Programs | SAIS Dubai",
  description: "Explore student leadership and enrichment programs at SAIS Dubai.",
};

const fallbackHero = {
  title: "Student\nPrograms",
  image: {
    url: "/sais-hero-students.jpg",
    alt: "SAIS Dubai students working together",
  },
  topLineColor: "#216B97",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

const fallbackInnerNavigationItems: InnerPageNavItem[] = studentSectionNavItems;

const fallbackInnerNavigation: InnerNavigation = {
  items: fallbackInnerNavigationItems,
  activeHref: "/student-programs",
  activeColor: "#216B97",
  inactiveColor: "#d97252",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Student life sections",
};

function paragraph(_key: string, text: string, options: Partial<PortableTextBlock> = {}): PortableTextBlock {
  return {
    _key,
    _type: "block",
    style: "normal",
    markDefs: [],
    ...options,
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: [] }],
  };
}

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "Enriching Student\nLife Beyond the Classroom",
    description: [
      paragraph(
        "student-programs-intro",
        "We are committed to fostering student development beyond the classroom through diverse extracurricular programs. These enrichment activities create a vibrant, connected community while enabling students to excel personally and collectively at SAIS - Dubai."
      ),
    ],
  },
  image: {
    url: "/about-statement-mission.jpg",
    alt: "SAIS Dubai students with school leadership",
  },
  imagePosition: "left",
  theme: "blue",
};

const fallbackProactiveSection: AssessmentSection = {
  heading: {
    title: "Student Leadership Program",
    description: [paragraph("student-programs-leadership-intro", "Students can discover and maximize their potential through:")],
  },
  backgroundColor: "#707174",
  titleColor: "#00A5B2",
  cardBorderColor: "#00A5B2",
  cardHoverBorderColor: "#216B97",
  cardTextColor: "#00A5B2",
  cards: [
    { _key: "model-united-nations", title: "Model United Nations Conferences" },
    { _key: "model-congress", title: "Model Congress Participation" },
    { _key: "specialized-workshops", title: "Specialized Workshops" },
    { _key: "business-competitions", title: "Business Competitions" },
    { _key: "athletic-tournaments", title: "Athletic Tournaments" },
    { _key: "student-leadership-roles", title: "Student Leadership Roles" },
  ],
};

const fallbackStudentCongressSection: ContactInfoSectionData = {
  heading: {
    title: "SAIS Student Congress",
    description: [
      paragraph(
        "student-congress-overview",
        "Modeled after the U.S. Congressional system, the Student Congress serves as a vital connection between the SGA, Emirati Union, and the broader student body, enhancing overall student life at SAIS - Dubai."
      ),
      paragraph(
        "student-congress-mission",
        "Mission: The SAIS - Dubai Student Congress strives to enhance collaboration between Student Leadership Associations by creating effective pathways for leadership groups to accomplish their objectives and fulfill their agendas."
      ),
      paragraph(
        "student-congress-vision",
        "Vision: We are dedicated to promoting student wellbeing and ensuring student voices are heard at all levels of the school hierarchy. The Congress demonstrates the power of teamwork and integrity throughout SAIS - Dubai."
      ),
    ],
  },
  image: {
    url: "/campus-video-placeholder.jpg",
    alt: "SAIS Dubai Student Congress",
  },
  imagePosition: "center",
  panelColor: "#00A5B2",
  waveColor: "#216B97",
  titleColor: "#ffffff",
  textColor: "#ffffff",
  items: [],
};

const fallbackSgaGoalsSection: AssessmentSection = {
  heading: {
    title: "Student Government Association (SGA)",
    description: [
      paragraph(
        "sga-mission-vision",
        "Mission: To represent student interests through initiatives that enrich student life. Vision: To set the standard as the premier student government nationally."
      ),
    ],
  },
  backgroundColor: "#f2f2f2",
  titleColor: "#00A5B2",
  textColor: "#216B97",
  cardBorderColor: "#216B97",
  cardHoverBorderColor: "#00A5B2",
  cardTextColor: "#00A5B2",
  cards: [
    { _key: "address-needs", title: "Address Current Student Needs And Priorities" },
    { _key: "advise-administration", title: "Advise Administration On Student-Related Issues" },
    { _key: "foster-ideas", title: "Foster Innovative Ideas" },
    { _key: "governance-structure", title: "Maintain A Student-Led Governance Structure" },
  ],
};

type CoreValueCard = {
  _key?: string;
  title?: string;
  icon?: SanityImage;
};

type CoreValuesSectionData = {
  heading?: SectionHeading;
  cards?: CoreValueCard[];
};

const fallbackCoreValuesSection: CoreValuesSectionData = {
  heading: {
    title: "Core Values",
  },
  cards: [
    { _key: "cooperation", title: "Cooperation" },
    { _key: "integrity", title: "Integrity" },
    { _key: "dedication", title: "Dedication" },
    { _key: "enthusiasm", title: "Enthusiasm" },
    { _key: "communication", title: "Communication" },
  ],
};

const leadershipMemberImage: SanityImage = {
  url: "/about-statement-mission.jpg",
  alt: "SAIS Dubai student leader",
};

const ministerialRoles = [
  "Presidential Affairs",
  "Cabinet Affairs and The Future",
  "Climate Change and Environment",
  "Climate Change and Environment",
  "Interior",
  "Economy",
  "Financial Affairs",
  "Foreign Affairs and International Cooperation",
  "Foreign Affairs and International Cooperation",
  "Health and Prevention",
  "Financial Affairs",
  "Culture and Knowledge Development",
  "Youth and Sports Education",
  "Higher Education",
  "Tolerance",
  "Community Development",
  "Happiness",
];

const fallbackLeadershipStructureSection: LeadershipStructureSectionData = {
  heading: {
    title: "Leadership Structure",
  },
  executiveHeading: "Executive Leadership",
  executiveMembers: [
    {
      _key: "president-prime-minister",
      name: "Student Name",
      role: "President and Prime Minister",
      description: "(Grades 11-12), selected by the\nSenior Leadership Team",
      image: leadershipMemberImage,
    },
    {
      _key: "deputy-prime-minister",
      name: "Student Name",
      role: "Deputy Prime Minister",
      description: "(Grade 10), elected by the\nHigh School Student Body",
      image: leadershipMemberImage,
    },
  ],
  ministerialHeading: "Ministerial Positions",
  ministerialMembers: ministerialRoles.map((role, index) => ({
    _key: `ministerial-${index + 1}`,
    name: "Student Name",
    role,
    image: leadershipMemberImage,
  })),
};

const fallbackEligibilitySection: ImageTextSection = {
  heading: {
    title: "Eligibility and Election Process",
    description: [
      paragraph("eligibility-candidate-requirements", "Candidate Requirements:"),
      paragraph("eligibility-application", "Submission of completed application forms", {
        listItem: "bullet",
        level: 1,
      }),
      paragraph("eligibility-average", "Minimum overall average of B+ (85%)", { listItem: "bullet", level: 1 }),
      paragraph("eligibility-conduct", "Demonstrated positive behaviour and conduct", { listItem: "bullet", level: 1 }),
      paragraph("eligibility-election-procedures", "Election Procedures:"),
      paragraph("eligibility-campaign", "Structured campaign with a clear agenda", { listItem: "bullet", level: 1 }),
      paragraph("eligibility-speeches", "Formal speeches presented to the student body", {
        listItem: "bullet",
        level: 1,
      }),
      paragraph("eligibility-voting", "Voting conducted via official ballots managed by staff", {
        listItem: "bullet",
        level: 1,
      }),
      paragraph("eligibility-results", "Results are announced following the vote tabulation."),
    ],
  },
  image: {
    url: "/about-statement-mission.jpg",
    alt: "SAIS Dubai students building confidence",
  },
  imagePosition: "right",
  theme: "teal",
};

function resolveInnerNavItems(innerNavigation?: InnerNavigation) {
  const items = resolveStudentSectionNavItems(innerNavigation?.items);
  const activeHref = fallbackInnerNavigation.activeHref;

  return { items, activeHref };
}

function CoreValuesSection({
  section,
  fallbackSection,
}: {
  section?: CoreValuesSectionData;
  fallbackSection: CoreValuesSectionData;
}) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];

  if (!heading?.title && !cards.length) {
    return null;
  }

  return (
    <section className="student-programs-core-values" aria-labelledby="student-programs-core-values-title">
      <div className="student-programs-core-values__inner">
        {heading?.title ? (
          <h2 id="student-programs-core-values-title" className="student-programs-core-values__title">
            {heading.title}
          </h2>
        ) : null}

        {cards.length ? (
          <div className="student-programs-core-values__items">
            {cards.map((card, index) => (
              <article className="student-programs-core-values__item" key={card._key || `${card.title}-${index}`}>
                {card.icon?.url ? (
                  <span className="student-programs-core-values__icon" aria-hidden="true">
                    <Image
                      src={card.icon.url}
                      alt=""
                      fill
                      sizes="72px"
                      className="student-programs-core-values__icon-image"
                    />
                  </span>
                ) : null}
                {card.title ? <h3 className="student-programs-core-values__item-title">{card.title}</h3> : null}
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentProgramsPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function StudentProgramsPage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentProgramsPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const innerNavigation = page?.innerNavigation || fallbackInnerNavigation;
  const eligibilitySection = page?.eligibilitySection || fallbackEligibilitySection;
  const { items: navItems, activeHref } = resolveInnerNavItems(innerNavigation);

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main student-programs-page__main"
      pageClassName="student-programs-page"
    >
      <PageHero
        className="student-programs-hero"
        title={heroTitle}
        image={heroImage}
        titleId="student-programs-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        className="student-community-inner-nav"
        items={navItems}
        activeHref={activeHref}
        activeColor={innerNavigation.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation.topLineColor || fallbackInnerNavigation.topLineColor}
        ariaLabel={innerNavigation.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <IntroFeatureSection
        section={page?.introSection}
        fallbackSection={fallbackIntroSection}
        className="student-programs-intro-feature"
        titleId="student-programs-intro-title"
        panelColor="#216B97"
        accentColor="#00A5B2"
        titleColor="#00A5B2"
        textColor="#ffffff"
        imagePosition={page?.introSection?.imagePosition || "center"}
      />

      <AcademicsKindergartenAssessmentSection
        section={page?.proactiveApproach}
        fallbackSection={fallbackProactiveSection}
      />

      <ContactInfoSection
        section={page?.studentCongressSection}
        fallbackSection={fallbackStudentCongressSection}
        className="academics-middle-school-assessment-section student-programs-congress-section"
        titleId="student-programs-congress-title"
        ariaLabel="SAIS Student Congress"
        flipped={false}
      />

      <div className="student-programs-sga-goals">
        <AcademicsKindergartenAssessmentSection
          section={page?.sgaGoalsSection}
          fallbackSection={fallbackSgaGoalsSection}
        />
      </div>

      <CoreValuesSection
        section={page?.coreValuesSection}
        fallbackSection={fallbackCoreValuesSection}
      />

      <StudentProgramsLeadershipStructureSection
        section={page?.leadershipStructureSection}
        fallbackSection={fallbackLeadershipStructureSection}
      />

      <ApproachSectionBase
        className="approach-section--home student-programs-eligibility-section"
        title={eligibilitySection.heading?.title || fallbackEligibilitySection.heading.title}
        titleId="student-programs-eligibility-title"
        lead={eligibilitySection.heading?.title || fallbackEligibilitySection.heading.title}
        content={eligibilitySection.heading?.description || fallbackEligibilitySection.heading.description}
        image={eligibilitySection.image || fallbackEligibilitySection.image}
        imageSizes="(max-width: 767px) 100vw, 50vw"
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { CalendarDownloadSection } from "@/components/sections/calendar-download-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getSchoolCalendarPage } from "@/lib/sanity";
import type { PortableTextBlock, SchoolCalendarTerm, SanityImage } from "@/types/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

type TermStyle = CSSProperties & {
  "--school-calendar-term-color"?: string;
};

const fallbackMetadata: Metadata = {
  title: "School Calendar | SAIS Dubai",
  description: "View SAIS Dubai term dates, holidays, and key school calendar events.",
};

const fallbackHero = {
  title: "School\nCalendar",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS Dubai school calendar",
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

const fallbackIntro = {
  heading: {
    title: "Term Dates & Key Events",
    description: [
      paragraph(
        "school-calendar-intro",
        "Our School Calendar provides a clear overview of the academic year, helping families plan ahead with confidence. Here you will find important school term dates, key holidays including Islamic observances, and significant school events and occasions that shape our vibrant community. We encourage parents and students to refer to this calendar regularly to stay informed and engaged throughout the year."
      ),
    ],
  },
};

const fallbackTerms: SchoolCalendarTerm[] = [
  {
    _key: "important-dates-2026-2027",
    title: "School Important Dates 2026–2027",
    color: "#216B97",
    rows: [
      { _key: "important-date-1", label: "Deadline for Grades 11 & 12 to change electives — Semester 1", date: "Friday, 11 September 2026" },
      { _key: "important-date-2", label: "Days off for students", date: "Wednesday, 14 October – Friday, 16 October 2026" },
      { _key: "important-date-3", label: "Mid-Semester 1 Examinations", date: "Friday, 23 October – Friday, 30 October 2026 (Regular school timings)" },
      { _key: "important-date-4", label: "National Day Holiday (to be confirmed)", date: "Wednesday, Thursday & Friday, 2–4 December 2026" },
      { _key: "important-date-5", label: "Winter Break for students", date: "Monday, 14 December 2026 – Friday, 1 January 2027" },
      { _key: "important-date-6", label: "Semester 1 Final Examinations", date: "Monday, 18 January – Friday, 22 January 2027 (Early dismissal for Grades 3–12)" },
      { _key: "important-date-7", label: "Semester 2 begins", date: "Monday, 25 January 2027" },
      { _key: "important-date-8", label: "Deadline for Grades 11 & 12 to change electives — Semester 2", date: "Friday, 5 February 2027" },
      { _key: "important-date-9", label: "Eid Break (to be confirmed)", date: "Monday, 8 March – Friday, 12 March 2027" },
      { _key: "important-date-10", label: "Mid-Semester 2 Examinations", date: "Friday, 26 March – Friday, 2 April 2027 (Regular school timings)" },
      { _key: "important-date-11", label: "Spring Break for students", date: "Monday, 5 April – Friday, 9 April 2027" },
      { _key: "important-date-12", label: "Eid Break (to be confirmed)", date: "Monday, 17 May & Tuesday, 18 May 2027" },
    ],
  },
];

const fallbackDownload = {
  text: "Download the full school calendar here:",
  buttonLabel: "Download",
  fileUrl: null,
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSchoolCalendarPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function SchoolCalendarPage() {
  const [data, page] = await Promise.all([getHomepage(), getSchoolCalendarPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage: SanityImage = hero?.image || fallbackHero.image;
  const intro = page?.intro || fallbackIntro;
  const terms = page?.terms?.length ? page.terms : fallbackTerms;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main school-calendar-page__main"
      pageClassName="school-calendar-page"
    >
      <PageHero
        className="school-calendar-hero"
        title={heroTitle}
        image={heroImage}
        titleId="school-calendar-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/school-calendar" />

      <section className="school-calendar-content" aria-labelledby="school-calendar-content-title">
        <SectionReveal className="school-calendar-content__inner">
          <div className="school-calendar-content__header">
            <h2 id="school-calendar-content-title" className="school-calendar-content__title">
              {intro.heading?.title || fallbackIntro.heading.title}
            </h2>
            <RichText blocks={intro.heading?.description} className="school-calendar-content__intro" />
          </div>

          <div className="school-calendar-table" role="table" aria-label="School term dates and key events">
            {terms.map((term) => (
              <div
                key={term._key || term.title}
                className="school-calendar-table__term"
                style={{ "--school-calendar-term-color": term.color } as TermStyle}
              >
                <div className="school-calendar-table__term-title" role="rowgroup">
                  {term.title}
                </div>
                <div className="school-calendar-table__rows" role="rowgroup">
                  {(term.rows || []).map((row) => (
                    <div key={row._key || `${row.label}-${row.date}`} className="school-calendar-table__row" role="row">
                      <div className="school-calendar-table__cell" role="cell">
                        {row.label}
                      </div>
                      <div className="school-calendar-table__cell" role="cell">
                        {row.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <CalendarDownloadSection section={page?.calendarDownload || fallbackDownload} />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}

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
    _key: "autumn-term",
    title: "Autumn Term",
    color: "#216B97",
    rows: [
      { _key: "autumn-1", label: "First Day of Term", date: "Tuesday 26th August" },
      { _key: "autumn-2", label: "Prophet Mohammed's (PBUH) Birthday*", date: "Thursday 4th September" },
      { _key: "autumn-3", label: "Mid-Term Break", date: "Monday 13th - Friday 17th October" },
      { _key: "autumn-4", label: "Commemoration Day*", date: "Tuesday 2nd December" },
      { _key: "autumn-5", label: "National Day*", date: "Wednesday 3rd December" },
      { _key: "autumn-6", label: "Last day of Term 1", date: "Friday 5th December 2025" },
      { _key: "autumn-7", label: "Winter Break", date: "Monday 8th December - Friday 2nd January 2026" },
    ],
  },
  {
    _key: "spring-term",
    title: "Spring Term",
    color: "#00A5B2",
    rows: [
      { _key: "spring-1", label: "First Day of Term 2", date: "Monday 5th January 2026" },
      { _key: "spring-2", label: "Ramadan Begins*", date: "Wednesday 18th February" },
      { _key: "spring-3", label: "End of Term 2", date: "Friday 13th March" },
      { _key: "spring-4", label: "Eid al-Fitr*", date: "Thursday 19th - Friday 20th March" },
      { _key: "spring-5", label: "Spring Break", date: "Monday 9th March - Friday 22nd March" },
    ],
  },
  {
    _key: "summer-term",
    title: "Summer Term",
    color: "#d97252",
    rows: [
      { _key: "summer-1", label: "First Day of Term 3", date: "Monday 23rd March" },
      { _key: "summer-2", label: "Eid Al Adha*", date: "Tuesday 26th - Friday 29th May" },
      { _key: "summer-3", label: "Islamic New Year", date: "Tuesday 16th June" },
      { _key: "summer-4", label: "Last Day of Term 3", date: "Friday 3rd July" },
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

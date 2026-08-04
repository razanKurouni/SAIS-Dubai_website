import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the School Calendar page.");
}

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-text`,
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

function row(key, label, date) {
  return {
    _key: key,
    _type: "schoolCalendarRow",
    label,
    date,
  };
}

function updateCommunityCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;

  return cards.map((card) => {
    const isCalendarCard = card?._key === "school-calendar" || card?.title === "School Calendar";
    if (!isCalendarCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/school-calendar",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const relatedContent = await client.fetch(`{
  "calendarCard": *[_type == "ourCommunityPage" && _id == "our-community-page"][0].linksSection.cards[_key == "school-calendar"][0] {
    image
  }
}`);

const existingPage = await client.getDocument("school-calendar-page").catch(() => null);
const heroImage = existingPage?.hero?.image || relatedContent?.calendarCard?.image;

await client.createOrReplace({
  _id: "school-calendar-page",
  _type: "schoolCalendarPage",
  seo: existingPage?.seo || {
    _type: "seo",
    title: "School Calendar | SAIS Dubai",
    description: "View SAIS Dubai term dates, holidays, and key school calendar events.",
    ...(heroImage ? { image: heroImage } : {}),
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "School\nCalendar",
    },
    ...(heroImage ? { image: heroImage } : {}),
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Term Dates & Key Events",
      description: [
        block(
          "school-calendar-intro",
          "Our School Calendar provides a clear overview of the academic year, helping families plan ahead with confidence. Here you will find important school term dates, key holidays including Islamic observances, and significant school events and occasions that shape our vibrant community. We encourage parents and students to refer to this calendar regularly to stay informed and engaged throughout the year."
        ),
      ],
    },
  },
  terms: [
    {
      _key: "autumn-term",
      _type: "schoolCalendarTerm",
      title: "Autumn Term",
      color: "#216B97",
      rows: [
        row("autumn-1", "First Day of Term", "Tuesday 26th August"),
        row("autumn-2", "Prophet Mohammed's (PBUH) Birthday*", "Thursday 4th September"),
        row("autumn-3", "Mid-Term Break", "Monday 13th - Friday 17th October"),
        row("autumn-4", "Commemoration Day*", "Tuesday 2nd December"),
        row("autumn-5", "National Day*", "Wednesday 3rd December"),
        row("autumn-6", "Last day of Term 1", "Friday 5th December 2025"),
        row("autumn-7", "Winter Break", "Monday 8th December - Friday 2nd January 2026"),
      ],
    },
    {
      _key: "spring-term",
      _type: "schoolCalendarTerm",
      title: "Spring Term",
      color: "#00A5B2",
      rows: [
        row("spring-1", "First Day of Term 2", "Monday 5th January 2026"),
        row("spring-2", "Ramadan Begins*", "Wednesday 18th February"),
        row("spring-3", "End of Term 2", "Friday 13th March"),
        row("spring-4", "Eid al-Fitr*", "Thursday 19th - Friday 20th March"),
        row("spring-5", "Spring Break", "Monday 9th March - Friday 22nd March"),
      ],
    },
    {
      _key: "summer-term",
      _type: "schoolCalendarTerm",
      title: "Summer Term",
      color: "#d97252",
      rows: [
        row("summer-1", "First Day of Term 3", "Monday 23rd March"),
        row("summer-2", "Eid Al Adha*", "Tuesday 26th - Friday 29th May"),
        row("summer-3", "Islamic New Year", "Tuesday 16th June"),
        row("summer-4", "Last Day of Term 3", "Friday 3rd July"),
      ],
    },
  ],
  calendarDownload: existingPage?.calendarDownload || {
    _type: "object",
    text: "Download the full school calendar here:",
    buttonLabel: "Download",
  },
});

const communityPage = await client.getDocument("our-community-page");
const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded School Calendar page and linked the community card.");

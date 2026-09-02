import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) throw new Error("SANITY_AUTH_TOKEN is required.");

const entries = [
  ["Deadline for Grades 11 & 12 to change electives — Semester 1", "Friday, 11 September 2026"],
  ["Days off for students", "Wednesday, 14 October – Friday, 16 October 2026"],
  ["Mid-Semester 1 Examinations", "Friday, 23 October – Friday, 30 October 2026 (Regular school timings)"],
  ["National Day Holiday (to be confirmed)", "Wednesday, Thursday & Friday, 2–4 December 2026"],
  ["Winter Break for students", "Monday, 14 December 2026 – Friday, 1 January 2027"],
  ["Semester 1 Final Examinations", "Monday, 18 January – Friday, 22 January 2027 (Early dismissal for Grades 3–12)"],
  ["Semester 2 begins", "Monday, 25 January 2027"],
  ["Deadline for Grades 11 & 12 to change electives — Semester 2", "Friday, 5 February 2027"],
  ["Eid Break (to be confirmed)", "Monday, 8 March – Friday, 12 March 2027"],
  ["Mid-Semester 2 Examinations", "Friday, 26 March – Friday, 2 April 2027 (Regular school timings)"],
  ["Spring Break for students", "Monday, 5 April – Friday, 9 April 2027"],
  ["Eid Break (to be confirmed)", "Monday, 17 May & Tuesday, 18 May 2027"],
];

const terms = [{
  _key: "important-dates-2026-2027",
  _type: "schoolCalendarTerm",
  title: "School Important Dates 2026–2027",
  color: "#216B97",
  rows: entries.map(([label, date], index) => ({
    _key: `important-date-${index + 1}`,
    _type: "schoolCalendarRow",
    label,
    date,
  })),
}];

await client.patch("school-calendar-page").set({ terms }).commit();
console.log("Updated School Calendar dates in Sanity from the supplied document.");

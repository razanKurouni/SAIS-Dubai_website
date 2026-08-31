import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("SANITY_AUTH_TOKEN is required.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token,
});

const link = (key, label, href) => ({
  _key: key,
  _type: "linkField",
  label,
  href,
  openInNewTab: true,
});

await client
  .patch("admissions-application-page")
  .set({
    mograHubAppBand: {
      _type: "object",
      eyebrow: "Parent & Student Mobile App",
      title: "Your school in your pocket — download mograHUB",
      description:
        "Attendance, timetable, homework and assignments, exam results and report cards, fee statements and school announcements — all in one app, for parents and students.",
      schoolCodeLabel: "School Code",
      schoolCode: "SAISD",
      androidUrl: "https://play.google.com/store/apps/details?id=com.mogra.hub&hl=en",
      appleUrl: "https://apps.apple.com/ae/app/mograhub/id6736962827",
    },
  })
  .commit();

await client
  .patch("site-footer")
  .set({
    quickLinks: [
      { ...link("quick-about-sais", "About SAIS", "/about-us"), openInNewTab: false },
      { ...link("quick-admissions", "Admissions", "/admissions"), openInNewTab: false },
      { ...link("quick-careers", "Careers", "/careers"), openInNewTab: false },
      { ...link("quick-contact", "Contact Us", "/contact-us"), openInNewTab: false },
    ],
    parentStudentLinks: [
      link("parent-student-portal", "Parent Portal", "https://saisd.ppnv1.mograsys.com"),
      link("apply-online", "Apply Online", "https://saisd.oa.mograsys.com"),
      {
        ...link("download-mograhub", "Download the App", "/admissions/applications#mograhub-app"),
        openInNewTab: false,
      },
    ],
  })
  .commit();

console.log("Added mograHUB placement content to Admissions Applications and the site footer.");

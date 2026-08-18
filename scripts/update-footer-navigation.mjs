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
  openInNewTab: false,
});

const columns = [
  {
    _key: "footer-main-pages",
    _type: "object",
    title: "Main Pages",
    links: [
      link("about", "About", "/about-us#about"),
      link("academics", "Academics", "/academics"),
      link("our-community", "Our Community", "/our-community"),
      link("student-life", "Student Life", "/student-life"),
    ],
  },
  {
    _key: "footer-admissions-pages",
    _type: "object",
    title: "Admissions Pages",
    links: [
      link("campus-tours", "Campus Tours", "/admissions/book-a-tour"),
      link("admissions-process", "Admissions Process", "/admissions/applications"),
      link("admissions-faqs", "FAQ’s", "/admissions/faqs"),
      link("admissions-fees", "Fees", "/admissions/fees"),
    ],
  },
  {
    _key: "footer-contact-pages",
    _type: "object",
    title: "More Pages",
    links: [
      link("news-events", "News & Events", "/news-events"),
      link("contact-us", "Contact Us", "/contact-us"),
      link("careers", "Careers", "/careers"),
    ],
  },
];

await client.patch("site-footer").set({ columns }).commit();
console.log("Updated footer navigation links in Sanity.");

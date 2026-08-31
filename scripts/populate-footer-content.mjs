import { createReadStream } from "node:fs";
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

const footer = await client.getDocument("site-footer");
let logoAssetRef = footer?.logo?.image?.asset?._ref;

if (!logoAssetRef) {
  const asset = await client.assets.upload(
    "image",
    createReadStream("public/sais-footer-logo-lockup.png"),
    { filename: "sais-footer-logo-lockup.png" },
  );
  logoAssetRef = asset._id;
}

const contactItems = [
  {
    _key: "footer-address",
    _type: "object",
    label: "Address",
    text: "Sharjah American\nInternational School Dubai Campus\nP.O. Box 47755, Al Warqa 1,\nDubai, UAE.",
    href: "https://maps.google.com/?q=Sharjah+American+International+School+Dubai",
    icon: "location",
  },
  {
    _key: "footer-phone",
    _type: "object",
    label: "Phone",
    text: "+971 4 280 1111",
    href: "tel:+97142801111",
    icon: "phone",
  },
  {
    _key: "footer-email",
    _type: "object",
    label: "Email",
    text: "sais_dubai@saisdubai.com",
    href: "mailto:sais_dubai@saisdubai.com",
    icon: "email",
  },
];

const link = (key, label, href, openInNewTab = false) => ({
  _key: key,
  _type: "linkField",
  label,
  href,
  openInNewTab,
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

const socialLinks = [
  link("linkedin", "LinkedIn", "https://www.linkedin.com/in/sais-dubai-174281177/", true),
  link("facebook", "Facebook", "https://www.facebook.com/SAISDubai/", true),
  link("youtube", "YouTube", "https://www.youtube.com/channel/UC9lzvD4QMlT9jmqbc3rRs0w", true),
  link("instagram", "Instagram", "https://www.instagram.com/saisdubaicampus/", true),
];

const legalLinks = [
  link("terms", "Terms & Conditions", "/terms-and-conditions"),
  link("privacy", "Privacy Policy", "/privacy-policy"),
];

await client.patch("site-footer").set({
  logo: {
    _type: "imageWithAlt",
    image: { _type: "image", asset: { _type: "reference", _ref: logoAssetRef } },
    alt: "Sharjah American International School Dubai",
  },
  contactItems,
  columns,
  quickLinksTitle: "Quick Links",
  quickLinks: [
    link("quick-about-sais", "About SAIS", "/about-us"),
    link("quick-admissions", "Admissions", "/admissions"),
    link("quick-careers", "Careers", "/careers"),
    link("quick-contact", "Contact Us", "/contact-us"),
  ],
  parentStudentLinksTitle: "Parents & Students",
  parentStudentLinks: [
    link("parent-student-portal", "Parent Portal", "https://saisd.ppnv1.mograsys.com", true),
    link("apply-online", "Apply Online", "https://saisd.oa.mograsys.com", true),
    link("download-mograhub", "Download the App", "/admissions/applications#mograhub-app"),
  ],
  socialLinks,
  legalLinks,
  copyrightText: "© 2026 Sharjah American International School Dubai Campus",
  creditLabel: "Site by",
  creditName: "Formulate",
  creditUrl: "https://www.formulatecreative.com/",
}).commit();

console.log("Populated all editable footer content in Sanity.");

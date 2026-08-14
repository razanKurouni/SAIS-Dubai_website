import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

async function uploadImage(path, filename, title) {
  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt: title,
  };
}

const logo = await uploadImage(
  "public/sais-logo-lockup.png",
  "sais-logo-lockup.png",
  "Sharjah American International School Dubai logo"
);

const heroImage = await uploadImage(
  "public/sais-hero-students.jpg",
  "sais-hero-students.jpg",
  "SAIS Dubai students gathered on campus"
);

const apLogo = await uploadImage(
  "/Users/razan/Downloads/nCxwJ2uF9o0CLCK9Nfy6YlTVEk.png",
  "college-board-ap.png",
  "College Board Advanced Placement Program logo"
);

const cogniaLogo = await uploadImage(
  "/Users/razan/Downloads/NT5qr4URIdMt5th4kPVG7aHQgzI.png",
  "cognia-accredited.png",
  "Cognia accredited logo"
);

const khdaLogo = await uploadImage(
  "/Users/razan/Downloads/Group 952.png",
  "rated-good-by-khda.png",
  "Rated Good by KHDA badge"
);

const neascLogo = await uploadImage(
  "/Users/razan/Downloads/rA0GpkF0HUhxGluRxydnAitWxA.png",
  "neasc-accredited.png",
  "NEASC accredited logo"
);

const homepage = {
  _id: "homepage-main",
  _type: "homepage",
  seo: {
    _type: "seo",
    title: "SAIS Dubai | School Website",
    description: "Sharjah American International School Dubai homepage.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: "Empowering Students to Achieve Their Highest Potential",
    subtitle: "Through a rigorous American curriculum grounded in Islamic values and cultural heritage.",
    image: heroImage,
    ctas: [],
    valueBar: [],
  },
  heroContactBand: {
    _type: "object",
    text: "For applications, school tours, or potential career opportunities, please don't hesitate to get in touch with our team.",
    ctas: [
      { _type: "cta", _key: "book-tour", label: "Book a Tour", href: "/admissions/book-a-tour", variant: "primary", openInNewTab: false },
      { _type: "cta", _key: "apply-now", label: "Apply Now", href: "/admissions/applications", variant: "secondary", openInNewTab: false },
      { _type: "cta", _key: "careers", label: "Careers", href: "/careers", variant: "ghost", openInNewTab: false },
    ],
  },
  accreditations: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Accreditations & Affiliations",
    },
    logos: [
      { _type: "object", _key: "ap", name: "College Board Advanced Placement Program", image: apLogo },
      { _type: "object", _key: "cognia", name: "Cognia Accredited", image: cogniaLogo },
      { _type: "object", _key: "khda", name: "Rated Good by KHDA", image: khdaLogo },
      { _type: "object", _key: "neasc", name: "NEASC Accredited", image: neascLogo },
    ],
  },
  facts: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Facts & Figures",
    },
    items: [
      { _type: "metricItem", _key: "start", value: "2005", label: "Start of Classes" },
      { _type: "metricItem", _key: "uae-nationals", value: "26.5%", label: "UAE Nationals" },
      { _type: "metricItem", _key: "professionals", value: "34+", label: "Certified Professionals" },
      { _type: "metricItem", _key: "students", value: "2068+", label: "Students Enrolled" },
    ],
  },
};

const siteHeader = {
  _id: "site-header-main",
  logo,
  _type: "siteHeader",
  bookTourButton: {
    _type: "cta",
    label: "Book a Tour",
    href: "#tour",
    variant: "primary",
    openInNewTab: false,
  },
  applyNowButton: {
    _type: "cta",
    label: "Apply Now",
    href: "#apply",
    variant: "secondary",
    openInNewTab: false,
  },
  navigation: [
    { _type: "linkField", _key: "about", label: "About", href: "/about-us#about", openInNewTab: false },
    { _type: "linkField", _key: "academics", label: "Academics", href: "#academics", openInNewTab: false },
    { _type: "linkField", _key: "admissions", label: "Admissions", href: "#admissions", openInNewTab: false },
    { _type: "linkField", _key: "community", label: "Community", href: "#community", openInNewTab: false },
    { _type: "linkField", _key: "contact", label: "Contact", href: "/contact-us", openInNewTab: false },
  ],
};

const siteFooter = {
  _id: "site-footer",
  _type: "siteFooter",
  logoText: "SAIS",
  contactText: [],
  columns: [],
  socialLinks: [],
  legalLinks: [],
};

await client.createOrReplace(homepage);
await client.createOrReplace(siteHeader);
await client.createOrReplace(siteFooter);

console.log("Seeded homepage-main, site-header, and site-footer.");

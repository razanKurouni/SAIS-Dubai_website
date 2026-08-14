import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

await client
  .patch("homepage-main")
  .set({
    heroContactBand: {
      _type: "object",
      text: "For applications, school tours, or potential career opportunities, please don't hesitate to get in touch with our team.",
      ctas: [
        {
          _type: "cta",
          _key: "book-tour",
          label: "Book a Tour",
          href: "/admissions/book-a-tour",
          variant: "primary",
          openInNewTab: false,
        },
        {
          _type: "cta",
          _key: "apply-now",
          label: "Apply Now",
          href: "/admissions/applications",
          variant: "secondary",
          openInNewTab: false,
        },
        {
          _type: "cta",
          _key: "careers",
          label: "Careers",
          href: "/careers",
          variant: "ghost",
          openInNewTab: false,
        },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.heroContactBand.");

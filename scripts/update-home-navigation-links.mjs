import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const quickLinkByTitle = new Map([
  ["about us", "/about-us"],
  ["academics", "/academics"],
  ["community", "/our-community"],
  ["student life", "/student-life"],
]);

const navigationByLabel = new Map([
  ["about", "/about-us#about"],
  ["academics", "/academics"],
  ["admissions", "/admissions"],
  ["community", "/our-community"],
  ["contact", "/contact-us"],
]);

const homepage = await client.getDocument("homepage-main");
const quickLinks = homepage?.quickLinks?.cards?.map((card) => {
  const href = quickLinkByTitle.get(card.title?.trim().toLowerCase());

  return href ? { ...card, cta: { ...card.cta, href, openInNewTab: false } } : card;
});

if (quickLinks?.length) {
  await client.patch("homepage-main").set({ "quickLinks.cards": quickLinks }).commit();
}

const header = await client.getDocument("site-header-main");
const navigation = header?.navigation?.map((link) => {
  const href = navigationByLabel.get(link.label?.trim().toLowerCase());

  return href ? { ...link, href, openInNewTab: false } : link;
});

await client
  .patch("site-header-main")
  .set({
    ...(navigation?.length ? { navigation } : {}),
    bookTourButton: {
      ...header?.bookTourButton,
      _type: "cta",
      label: header?.bookTourButton?.label || "Book a Tour",
      href: "/admissions/book-a-tour",
      openInNewTab: false,
    },
    applyNowButton: {
      ...header?.applyNowButton,
      _type: "cta",
      label: header?.applyNowButton?.label || "Apply Now",
      href: "/admissions/applications",
      openInNewTab: false,
    },
  })
  .commit();

console.log("Updated homepage Quick Links and site header navigation links.");

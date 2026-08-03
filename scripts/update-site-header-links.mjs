import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });
const header = await client.getDocument("site-header-main");

const fallbackNavigation = [
  { _type: "linkField", _key: "about", label: "About", href: "/about-us#about", openInNewTab: false },
  { _type: "linkField", _key: "academics", label: "Academics", href: "#academics", openInNewTab: false },
  { _type: "linkField", _key: "admissions", label: "Admissions", href: "#admissions", openInNewTab: false },
  { _type: "linkField", _key: "community", label: "Community", href: "#community", openInNewTab: false },
  { _type: "linkField", _key: "contact", label: "Contact", href: "/contact-us", openInNewTab: false },
];

const navigation = (header?.navigation?.length ? header.navigation : fallbackNavigation).map((link) => {
  const label = link.label?.trim().toLowerCase();

  if (label?.includes("about")) {
    return { ...link, href: "/about-us#about" };
  }

  if (label?.includes("academic")) {
    return { ...link, href: "/academics" };
  }

  if (label?.includes("community")) {
    return { ...link, href: "/our-community" };
  }

  if (label?.includes("contact")) {
    return { ...link, href: "/contact-us" };
  }

  if (label?.includes("career")) {
    return { ...link, href: "/careers" };
  }

  return link;
});

await client
  .patch("site-header-main")
  .set({
    navigation,
  })
  .commit();

const footer = await client.getDocument("site-footer");
const columns = footer?.columns?.map((column) => ({
  ...column,
  links: column.links?.map((link) => {
    if (link.label?.trim().toLowerCase().includes("about")) {
      return { ...link, href: "/about-us#about" };
    }

    if (link.label?.trim().toLowerCase().includes("academic")) {
      return { ...link, href: "/academics" };
    }

    if (link.label?.trim().toLowerCase().includes("community")) {
      return { ...link, href: "/our-community" };
    }

    if (link.label?.trim().toLowerCase().includes("contact")) {
      return { ...link, href: "/contact-us" };
    }

    if (link.label?.trim().toLowerCase().includes("career")) {
      return { ...link, href: "/careers" };
    }

    return link;
  }),
}));

if (columns?.length) {
  await client
    .patch("site-footer")
    .set({
      columns,
    })
    .commit();
}

console.log("Updated site-header-main and site-footer links for About, Academics, Our Community, Careers, and Contact Us.");

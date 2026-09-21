const links = (name, title) => ({ name, title, type: "array", of: [{ type: "cta" }] });

export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "header",
      title: "Header / Menu",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "logo", title: "Logo", type: "picture" },
        { name: "scrolledLogo", title: "Logo (scrolled header)", type: "picture" },
        { name: "menuIcon", title: "Menu Icon", type: "picture" },
        { name: "bookTourButton", title: "Book a Tour Button", type: "cta" },
        { name: "applyNowButton", title: "Apply Now Button", type: "cta" },
        links("navigation", "Main Navigation"),
      ],
    },
    {
      name: "footer",
      title: "Footer",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "logo", title: "Footer Logo", type: "picture" },
        { name: "logoText", title: "Logo Text", type: "string" },
        { name: "contactText", title: "Contact Text", type: "blockContent" },
        {
          name: "contactItems",
          title: "Contact Rows",
          type: "array",
          of: [{ type: "entry" }],
          description: "Address, phone and email rows. Use the icon field: location, phone or email.",
        },
        { name: "parentStudentLinksTitle", title: "Parent & Student Links Title", type: "string" },
        links("parentStudentLinks", "Parent & Student Links"),
        { name: "quickLinksTitle", title: "Quick Links Title", type: "string" },
        links("quickLinks", "Quick Links"),
        links("socialLinks", "Social Links"),
        links("legalLinks", "Legal Links"),
        { name: "copyrightText", title: "Copyright Text", type: "string" },
        { name: "creditLabel", title: "Credit Label", type: "string" },
        { name: "creditName", title: "Credit Name", type: "string" },
        { name: "creditUrl", title: "Credit URL", type: "string" },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
};

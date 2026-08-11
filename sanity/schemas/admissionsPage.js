export const admissionsPage = {
  name: "admissionsPage",
  title: "Admissions Intro Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image", type: "imageWithAlt" },
        { name: "topLineColor", title: "Top Line Color", type: "string" },
        { name: "panelColor", title: "Panel Background Color", type: "string" },
        { name: "waveColor", title: "Curved Line Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
        { name: "imagePosition", title: "Image Position", type: "string" },
        { name: "imageWidth", title: "Desktop Image Width", type: "string" },
      ],
    },
    {
      name: "innerNavigation",
      title: "Admissions Navigation",
      type: "object",
      fields: [
        { name: "items", title: "Navigation Items", type: "array", of: [{ type: "linkField" }] },
        { name: "activeHref", title: "Active Page URL", type: "string" },
        { name: "activeColor", title: "Active Color", type: "string" },
        { name: "inactiveColor", title: "Inactive Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
        { name: "dividerColor", title: "Divider Color", type: "string" },
        { name: "topLineColor", title: "Top Line Color", type: "string" },
        { name: "ariaLabel", title: "Accessibility Label", type: "string" },
      ],
    },
    {
      name: "introSection",
      title: "Admissions Welcome Section",
      type: "imageTextSection",
    },
    {
      name: "policySection",
      title: "Admissions Policy Section",
      type: "imageTextSection",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Admissions Intro",
        subtitle: "Admissions landing page",
      };
    },
  },
};

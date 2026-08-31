const heroFields = [
  { name: "heading", title: "Hero Text", type: "sectionHeading" },
  { name: "image", title: "Hero Image (Desktop)", type: "imageWithAlt" },
  { name: "mobileImage", title: "Hero Image (Mobile)", type: "imageWithAlt", description: "Optional image used on screens up to 920px wide. Falls back to the desktop image when empty." },
  { name: "topLineColor", title: "Top Line Color", type: "string" },
  { name: "panelColor", title: "Panel Background Color", type: "string" },
  { name: "waveColor", title: "Curved Line Color", type: "string" },
  { name: "textColor", title: "Text Color", type: "string" },
  { name: "imagePosition", title: "Image Position", type: "string" },
  { name: "imageWidth", title: "Desktop Image Width", type: "string" },
];

const navigationFields = [
  { name: "items", title: "Navigation Items", type: "array", of: [{ type: "linkField" }] },
  { name: "activeHref", title: "Active Page URL", type: "string" },
  { name: "activeColor", title: "Active Color", type: "string" },
  { name: "inactiveColor", title: "Inactive Color", type: "string" },
  { name: "textColor", title: "Text Color", type: "string" },
  { name: "dividerColor", title: "Divider Color", type: "string" },
  { name: "topLineColor", title: "Top Line Color", type: "string" },
  { name: "ariaLabel", title: "Accessibility Label", type: "string" },
];

export const admissionsApplicationPage = {
  name: "admissionsApplicationPage",
  title: "Admissions Application Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    { name: "hero", title: "Hero", type: "object", fields: heroFields },
    {
      name: "innerNavigation",
      title: "Admissions Navigation",
      type: "object",
      fields: navigationFields,
    },
    {
      name: "applicationProcess",
      title: "Application Process Section",
      type: "object",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        { name: "imagePosition", title: "Image Position", type: "string" },
        { name: "panelColor", title: "Panel Background Color", type: "string" },
        { name: "waveColor", title: "Curved Line Color", type: "string" },
        { name: "titleColor", title: "Title Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
      ],
    },
    {
      name: "timelinesSection",
      title: "Application Timelines Section",
      type: "imageTextSection",
    },
    {
      name: "stepsSection",
      title: "Registration Steps",
      type: "object",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "number", title: "Step Number", type: "number" },
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 7 },
                { name: "backgroundColor", title: "Card Color", type: "string" },
              ],
              preview: { select: { title: "title", subtitle: "description" } },
            },
          ],
        },
      ],
    },
    {
      name: "finalCta",
      title: "Start Registration Band",
      type: "object",
      fields: [
        { name: "text", title: "Text", type: "string" },
        { name: "buttonLabel", title: "Button Label", type: "string" },
        { name: "linkUrl", title: "Button Link", type: "string" },
      ],
    },
    {
      name: "mograHubAppBand",
      title: "mograHUB App Band",
      description: "Displayed directly below the Start Registration band.",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 4 },
        { name: "schoolCodeLabel", title: "School Code Label", type: "string" },
        { name: "schoolCode", title: "School Code", type: "string" },
        { name: "androidUrl", title: "Google Play Link", type: "url" },
        { name: "appleUrl", title: "App Store Link", type: "url" },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Admissions Application", subtitle: "Applications page" };
    },
  },
};

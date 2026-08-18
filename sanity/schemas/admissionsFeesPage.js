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

export const admissionsFeesPage = {
  name: "admissionsFeesPage",
  title: "Admissions Fees Page",
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
      name: "feesIntro",
      title: "Fees Introduction",
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
    { name: "discountPolicy", title: "Discount Policy", type: "imageTextSection" },
    {
      name: "feeStructure",
      title: "Fee Structure",
      type: "object",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "labels",
          title: "Table Column Labels",
          type: "object",
          fields: [
            { name: "gradeYear", title: "Grade / Year", type: "string" },
            { name: "tuitionFee", title: "Tuition Fee", type: "string" },
            { name: "books", title: "Books", type: "string" },
            { name: "uniform", title: "Uniform", type: "string" },
            { name: "total", title: "Total", type: "string" },
          ],
        },
        {
          name: "rows",
          title: "Fee Rows",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "gradeYear", title: "Grade / Year", type: "string" },
                { name: "tuitionFee", title: "Tuition Fee", type: "string" },
                { name: "books", title: "Books", type: "string" },
                { name: "uniform", title: "Uniform", type: "string" },
                { name: "total", title: "Total", type: "string" },
              ],
              preview: {
                select: { title: "gradeYear", subtitle: "total" },
                prepare({ title, subtitle }) {
                  return { title: title || "Fee row", subtitle: subtitle ? `Total: ${subtitle}` : undefined };
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "termsSection",
      title: "Terms & Conditions",
      type: "object",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "leftColumn",
          title: "Left Column",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "body", title: "Content", type: "blockContent" },
                { name: "accentList", title: "Use Blue Numbered List", type: "boolean" },
              ],
              preview: { select: { title: "title" } },
            },
          ],
        },
        {
          name: "rightColumn",
          title: "Right Column",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "body", title: "Content", type: "blockContent" },
                { name: "accentList", title: "Use Blue Numbered List", type: "boolean" },
              ],
              preview: { select: { title: "title" } },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Admissions Fees", subtitle: "Fees page" };
    },
  },
};

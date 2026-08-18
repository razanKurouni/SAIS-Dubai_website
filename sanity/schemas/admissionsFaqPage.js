export const admissionsFaqPage = {
  name: "admissionsFaqPage",
  title: "Admissions FAQ Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image (Desktop)", type: "imageWithAlt" },
        { name: "mobileImage", title: "Hero Image (Mobile)", type: "imageWithAlt", description: "Optional image used on screens up to 920px wide. Falls back to the desktop image when empty." },
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
      title: "FAQ Introduction",
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
      name: "faqSection",
      title: "Questions and Answers",
      type: "object",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "items",
          title: "FAQ Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() },
                { name: "answer", title: "Answer", type: "text", rows: 4, validation: (Rule) => Rule.required() },
              ],
              preview: { select: { title: "question", subtitle: "answer" } },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Admissions FAQ", subtitle: "Frequently asked questions page" };
    },
  },
};

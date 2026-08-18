export const transportationSafetyPage = {
  name: "transportationSafetyPage",
  title: "Transportation Safety Guidelines Page",
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
      name: "guidelinesSection",
      title: "Guidelines Cards Section",
      type: "object",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "transportationSafetyCard",
              title: "Safety Card",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 4 },
                { name: "icon", title: "Icon", type: "imageWithAlt" },
              ],
            },
          ],
        },
        { name: "backgroundColor", title: "Background Color", type: "string" },
        { name: "titleColor", title: "Title Color", type: "string" },
        { name: "textColor", title: "Intro Text Color", type: "string" },
        { name: "cardTextColor", title: "Card Title Color", type: "string" },
        { name: "cardBorderColor", title: "Card Border Color", type: "string" },
        { name: "cardHoverBorderColor", title: "Card Hover Border Color", type: "string" },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Transportation Safety Guidelines",
        subtitle: "Community detail page",
      };
    },
  },
};

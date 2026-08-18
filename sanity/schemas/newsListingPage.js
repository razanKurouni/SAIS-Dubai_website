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

export const newsListingPage = {
  name: "newsListingPage",
  title: "Latest News Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    { name: "hero", title: "Hero", type: "object", fields: heroFields },
    { name: "newsHeading", title: "News Section Heading", type: "string" },
    { name: "newslettersHeading", title: "Newsletters Heading", type: "string" },
    { name: "buttonLabel", title: "Card Button Label", type: "string" },
  ],
  preview: {
    prepare() {
      return { title: "Latest News", subtitle: "News listing page" };
    },
  },
};

export const healthSafetyPage = {
  name: "healthSafetyPage",
  title: "Health & Safety Page",
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
      name: "introSection",
      title: "Professional Care Section",
      type: "imageTextSection",
    },
    {
      name: "approachSection",
      title: "Health & Safety Detail Section",
      type: "imageTextSection",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Health & Safety",
        subtitle: "Community detail page",
      };
    },
  },
};

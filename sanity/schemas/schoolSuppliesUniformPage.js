export const schoolSuppliesUniformPage = {
  name: "schoolSuppliesUniformPage",
  title: "School Supplies & Uniform Page",
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
      name: "introSection",
      title: "Supplies Section",
      type: "imageTextSection",
    },
    {
      name: "uniformSection",
      title: "Uniform Section",
      type: "imageTextSection",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "School Supplies & Uniform",
        subtitle: "Community detail page",
      };
    },
  },
};

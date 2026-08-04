export const parentInvolvementPage = {
  name: "parentInvolvementPage",
  title: "Parent Involvement Page",
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
      title: "Building Success Section",
      type: "imageTextSection",
    },
    {
      name: "videoHeading",
      title: "Parents Video Heading",
      type: "sectionHeading",
    },
    {
      name: "videoSection",
      title: "Parents Video",
      type: "object",
      fields: [
        { name: "poster", title: "Video Poster Image", type: "imageWithAlt" },
        {
          name: "videoUrl",
          title: "Video URL",
          type: "url",
          description: "Optional direct video URL. If empty, the poster image stays visible.",
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Parent Involvement",
        subtitle: "Community detail page",
      };
    },
  },
};

export const ourCampusPage = {
  name: "ourCampusPage",
  title: "Our Campus Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the Our Campus page.",
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
      name: "intro",
      title: "Modern Spaces Intro",
      type: "object",
      fields: [{ name: "heading", title: "Heading Text", type: "sectionHeading" }],
    },
    {
      name: "videoSection",
      title: "Campus Video",
      type: "object",
      fields: [
        {
          name: "videoFile",
          title: "Campus Video File",
          type: "file",
          description: "Upload the campus video here. MP4 is recommended for the best browser support.",
          options: { accept: "video/*" },
        },
        { name: "poster", title: "Video Poster Image", type: "imageWithAlt" },
        {
          name: "videoUrl",
          title: "External Video URL (Optional)",
          type: "url",
          description: "Fallback direct video URL. The uploaded Campus Video File is used first when both are provided.",
        },
      ],
    },
    {
      name: "facilities",
      title: "Facilities",
      type: "object",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "cards",
          title: "Facility Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "campusFacilityCard",
              title: "Facility Card",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "image", title: "Image", type: "imageWithAlt" },
                { name: "body", title: "Body", type: "blockContent" },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Our Campus",
        subtitle: "Hero, intro, video, and facilities",
      };
    },
  },
};

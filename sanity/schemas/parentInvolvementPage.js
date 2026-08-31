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
      title: "Building Success Section",
      type: "imageTextSection",
    },
    {
      name: "proactiveApproach",
      title: "A Proactive Approach",
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
              name: "parentInvolvementIconCard",
              title: "Icon Card",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 3 },
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
        {
          name: "videoFile",
          title: "Parents Video File",
          type: "file",
          description: "Upload the parents video here. MP4 is recommended for the best browser support.",
          options: { accept: "video/*" },
        },
        { name: "poster", title: "Video Poster Image", type: "imageWithAlt" },
        {
          name: "videoUrl",
          title: "External Video URL (Optional)",
          type: "url",
          description: "Fallback direct video URL. The uploaded Parents Video File is used first when both are provided.",
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

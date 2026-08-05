export const schoolPoliciesPage = {
  name: "schoolPoliciesPage",
  title: "School Policies Page",
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
      name: "intro",
      title: "Intro",
      type: "object",
      fields: [{ name: "heading", title: "Heading Text", type: "sectionHeading" }],
    },
    {
      name: "policies",
      title: "Policy Documents",
      type: "array",
      of: [
        {
          type: "object",
          name: "schoolPolicyDocument",
          title: "Policy Document",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "coverImage", title: "Cover Image", type: "imageWithAlt" },
            {
              name: "documentFile",
              title: "PDF Document",
              type: "file",
              description: "Clicking the cover opens this file in a new tab. Download PDF downloads this file.",
            },
            { name: "downloadLabel", title: "Download Label", type: "string", initialValue: "Download PDF" },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "School Policies",
        subtitle: "Community detail page",
      };
    },
  },
};

export const admissionsWithdrawalPage = {
  name: "admissionsWithdrawalPage",
  title: "Admissions Withdrawal Page",
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
      name: "intro",
      title: "Withdrawal Information",
      type: "object",
      fields: [
        { name: "heading", title: "Lead Text", type: "sectionHeading" },
        { name: "image", title: "Section Image", type: "imageWithAlt" },
        { name: "body", title: "Body Text", type: "blockContent" },
        { name: "imagePosition", title: "Image Position", type: "string" },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Student Withdrawal Process", subtitle: "Admissions withdrawal page" };
    },
  },
};

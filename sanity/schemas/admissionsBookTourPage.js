const heroFields = [
  { name: "heading", title: "Hero Text", type: "sectionHeading" },
  { name: "image", title: "Hero Image", type: "imageWithAlt" },
  { name: "topLineColor", title: "Top Line Color", type: "string" },
  { name: "panelColor", title: "Panel Background Color", type: "string" },
  { name: "waveColor", title: "Curved Line Color", type: "string" },
  { name: "textColor", title: "Text Color", type: "string" },
  { name: "imagePosition", title: "Image Position", type: "string" },
  { name: "imageWidth", title: "Desktop Image Width", type: "string" },
];

const navigationFields = [
  { name: "items", title: "Navigation Items", type: "array", of: [{ type: "linkField" }] },
  { name: "activeHref", title: "Active Page URL", type: "string" },
  { name: "activeColor", title: "Active Color", type: "string" },
  { name: "inactiveColor", title: "Inactive Color", type: "string" },
  { name: "textColor", title: "Text Color", type: "string" },
  { name: "dividerColor", title: "Divider Color", type: "string" },
  { name: "topLineColor", title: "Top Line Color", type: "string" },
  { name: "ariaLabel", title: "Accessibility Label", type: "string" },
];

export const admissionsBookTourPage = {
  name: "admissionsBookTourPage",
  title: "Admissions Book a Tour Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    { name: "hero", title: "Hero", type: "object", fields: heroFields },
    { name: "innerNavigation", title: "Admissions Navigation", type: "object", fields: navigationFields },
    { name: "introSection", title: "Tour Introduction", type: "imageTextSection" },
    {
      name: "formSection",
      title: "Tour Request Form",
      type: "object",
      fields: [
        { name: "ariaLabel", title: "Accessibility Label", type: "string" },
        {
          name: "recipientEmail",
          title: "Recipient Email",
          type: "string",
          description: "Tour requests will be sent to this email address.",
          validation: (Rule) => Rule.required().email(),
        },
        {
          name: "fields",
          title: "Form Fields",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "name", title: "Field Name", type: "string" },
                {
                  name: "type",
                  title: "Field Type",
                  type: "string",
                  options: {
                    list: ["text", "email", "tel", "date", "time", "textarea"],
                    layout: "dropdown",
                  },
                },
                { name: "placeholder", title: "Placeholder", type: "string" },
                { name: "required", title: "Required", type: "boolean" },
              ],
              preview: { select: { title: "label", subtitle: "type" } },
            },
          ],
        },
        { name: "submitLabel", title: "Submit Button Label", type: "string" },
        { name: "successMessage", title: "Success Message", type: "string" },
        { name: "errorMessage", title: "Error Message", type: "string" },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Book a Tour", subtitle: "Admissions tour page" };
    },
  },
};

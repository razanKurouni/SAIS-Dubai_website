const contactInfoFields = [
  { name: "heading", title: "Text Content", type: "sectionHeading" },
  { name: "image", title: "Image", type: "imageWithAlt" },
  { name: "imagePosition", title: "Image Position", type: "string" },
  { name: "panelColor", title: "Panel Background Color", type: "string" },
  { name: "waveColor", title: "Curved Line Color", type: "string" },
  { name: "titleColor", title: "Title Color", type: "string" },
  { name: "textColor", title: "Text Color", type: "string" },
  {
    name: "items",
    title: "Optional Items",
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          {
            name: "icon",
            title: "Icon",
            type: "string",
            options: {
              list: [
                { title: "Location", value: "location" },
                { title: "Phone", value: "phone" },
                { title: "Email", value: "email" },
              ],
            },
          },
          { name: "label", title: "Label", type: "string" },
          { name: "text", title: "Text", type: "text", rows: 3 },
          { name: "href", title: "Optional Link", type: "string" },
        ],
      },
    ],
  },
];

export const studentStaffWellbeingPage = {
  name: "studentStaffWellbeingPage",
  title: "Student & Staff Wellbeing Page",
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
      name: "commitment",
      title: "Our Commitment",
      type: "object",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        { name: "imagePosition", title: "Image Position", type: "string" },
      ],
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
              name: "wellbeingIconCard",
              title: "Icon Card",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 3 },
                { name: "icon", title: "Icon", type: "imageWithAlt" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "counsellingSection",
      title: "Counselling and Support Services",
      type: "object",
      fields: contactInfoFields,
    },
    {
      name: "selSection",
      title: "Social and Emotional Learning Program",
      type: "object",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        { name: "imagePosition", title: "Image Position", type: "string" },
      ],
    },
    {
      name: "wellbeingFramework",
      title: "Wellbeing Framework",
      type: "imageTextSection",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Student & Staff Wellbeing",
        subtitle: "Community detail page",
      };
    },
  },
};

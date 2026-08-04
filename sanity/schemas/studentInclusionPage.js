const supportProgramsFields = [
  { name: "heading", title: "Section Heading", type: "sectionHeading" },
  {
    name: "backgroundColor",
    title: "Background Color",
    type: "string",
    description: "Optional CSS color for the section background, for example #ffffff.",
  },
  {
    name: "titleColor",
    title: "Title Color",
    type: "string",
    description: "Optional CSS color for the section title, for example #00A5B2.",
  },
  {
    name: "cardBorderColor",
    title: "Card Border Color",
    type: "string",
    description: "Optional CSS color for card borders, for example #216B97.",
  },
  {
    name: "cardHoverBorderColor",
    title: "Card Hover Border Color",
    type: "string",
    description: "Optional CSS color for card hover borders, for example #00A5B2.",
  },
  {
    name: "cardTextColor",
    title: "Card Title Color",
    type: "string",
    description: "Optional CSS color for card titles, for example #216B97.",
  },
  {
    name: "cards",
    title: "Cards",
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text", rows: 4 },
          { name: "icon", title: "Optional Icon Image", type: "imageWithAlt" },
          {
            name: "iconType",
            title: "Fallback Icon Type",
            type: "string",
            options: {
              list: [
                { title: "Students of Determination", value: "determination" },
                { title: "Gifted and Talented", value: "gifted" },
                { title: "EAL Learners", value: "eal" },
                { title: "Academic Counseling", value: "counseling" },
                { title: "Differentiation", value: "differentiation" },
              ],
              layout: "radio",
            },
          },
        ],
        preview: {
          select: {
            title: "title",
            subtitle: "description",
            media: "icon.image",
          },
        },
      },
    ],
  },
];

export const studentInclusionPage = {
  name: "studentInclusionPage",
  title: "Student Inclusion Page",
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
      title: "Intro Feature Section",
      type: "imageTextSection",
    },
    {
      name: "approachSection",
      title: "Approach Section",
      type: "imageTextSection",
    },
    {
      name: "supportProgramsSection",
      title: "Inclusion & Support Programs Slider",
      type: "object",
      fields: supportProgramsFields,
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Student Inclusion",
        subtitle: "Community detail page",
      };
    },
  },
};

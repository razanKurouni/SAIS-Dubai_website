const colorField = (name, title, description) => ({
  name,
  title,
  type: "string",
  description,
});

const innerNavigationFields = [
  {
    name: "items",
    title: "Navigation Items",
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          { name: "label", title: "Label", type: "string" },
          { name: "href", title: "Link", type: "string" },
          { name: "openInNewTab", title: "Open in New Tab", type: "boolean", initialValue: false },
        ],
        preview: {
          select: {
            title: "label",
            subtitle: "href",
          },
        },
      },
    ],
  },
  { name: "activeHref", title: "Active Link", type: "string" },
  colorField("activeColor", "Active Background Color", "Optional CSS color, for example #00A5B2."),
  colorField("inactiveColor", "Inactive Background Color", "Optional CSS color, for example #216B97."),
  colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
  colorField("dividerColor", "Divider Color", "Optional CSS color, for example #ffffff."),
  colorField("topLineColor", "Top Line Color", "Optional CSS color, for example #ffffff."),
  { name: "ariaLabel", title: "Accessibility Label", type: "string" },
];

const learningSlideFields = [
  { name: "title", title: "Title", type: "string" },
  {
    name: "body",
    title: "Body",
    type: "text",
    rows: 6,
    description: "Use blank lines for paragraphs and lines starting with - for bullets.",
  },
  { name: "image", title: "Image", type: "imageWithAlt" },
  colorField("backgroundColor", "Background Color", "Optional CSS color for the main slide background."),
  colorField("sideColor", "Side Shape Color", "Optional CSS color for the curved side shape."),
  colorField("ringColor", "Curve Line Color", "Optional CSS color for the curved line."),
  colorField("titleColor", "Title Color", "Optional CSS color for the slide title."),
  colorField("textColor", "Text Color", "Optional CSS color for the slide text."),
  {
    name: "imagePosition",
    title: "Image Position",
    type: "string",
    description: "Optional CSS object-position value, for example center or 45% center.",
  },
];

export const studentLifePage = {
  name: "studentLifePage",
  title: "Student Life Page",
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
        colorField("topLineColor", "Top Line Color", "Optional CSS color, for example #d97252."),
        colorField("panelColor", "Panel Background Color", "Optional CSS color, for example #216B97."),
        colorField("waveColor", "Curved Line Color", "Optional CSS color, for example #00A5B2."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center.",
        },
        {
          name: "imageWidth",
          title: "Desktop Image Width",
          type: "string",
          description: "Optional CSS width for desktop, for example 58%. Mobile stays 100%.",
        },
      ],
    },
    {
      name: "innerNavigation",
      title: "Inner Navigation",
      type: "object",
      fields: innerNavigationFields,
    },
    {
      name: "intro",
      title: "Intro",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        colorField("backgroundColor", "Background Color", "Optional CSS color, for example #ffffff."),
        colorField("titleColor", "Title Color", "Optional CSS color, for example #00A5B2."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #216B97."),
      ],
    },
    {
      name: "learningSliderSection",
      title: "Learning Slider",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        {
          name: "slides",
          title: "Slides",
          type: "array",
          of: [
            {
              type: "object",
              fields: learningSlideFields,
              preview: {
                select: {
                  title: "title",
                  media: "image.image",
                },
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "hero.heading.title",
    },
    prepare({ title }) {
      return {
        title: title || "Student Life Page",
      };
    },
  },
};

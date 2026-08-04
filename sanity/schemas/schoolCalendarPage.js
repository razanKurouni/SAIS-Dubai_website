export const schoolCalendarPage = {
  name: "schoolCalendarPage",
  title: "School Calendar Page",
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
      title: "Term Dates Intro",
      type: "object",
      fields: [{ name: "heading", title: "Heading Text", type: "sectionHeading" }],
    },
    {
      name: "terms",
      title: "Term Tables",
      type: "array",
      of: [
        {
          type: "object",
          name: "schoolCalendarTerm",
          title: "Term",
          fields: [
            { name: "title", title: "Term Title", type: "string" },
            { name: "color", title: "Term Header Color", type: "string" },
            {
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "schoolCalendarRow",
                  title: "Calendar Row",
                  fields: [
                    { name: "label", title: "Event", type: "string" },
                    { name: "date", title: "Date", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "calendarDownload",
      title: "Calendar Download",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "string",
          initialValue: "Download the full school calendar here:",
        },
        { name: "buttonLabel", title: "Button Label", type: "string", initialValue: "Download" },
        { name: "file", title: "Calendar File", type: "file" },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "School Calendar",
        subtitle: "Community detail page",
      };
    },
  },
};

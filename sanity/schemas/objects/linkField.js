export const linkField = {
  name: "linkField",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Page Name",
      type: "string",
      description: "Text shown to visitors.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "href",
      title: "Page Link",
      type: "string",
      description: "Use an internal path like /admissions/fees or a full external URL.",
      initialValue: "#",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    },
  ],
};

export const siteFooter = {
  name: "siteFooter",
  title: "Footer",
  type: "document",
  fields: [
    { name: "logoText", title: "Logo Text", type: "string" },
    { name: "contactText", title: "Contact Text", type: "blockContent" },
    {
      name: "columns",
      title: "Link Columns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Column Title", type: "string" },
            {
              name: "links",
              title: "Pages",
              description: "Edit each page name and page link shown in the footer.",
              type: "array",
              of: [{ type: "linkField" }],
            },
          ],
        },
      ],
    },
    { name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "linkField" }] },
    { name: "legalLinks", title: "Legal Links", type: "array", of: [{ type: "linkField" }] },
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
        subtitle: "Footer columns, contact text, social links, and legal links",
      };
    },
  },
};

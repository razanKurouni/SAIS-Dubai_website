export const newsPost = {
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "News & Event", value: "news" },
          { title: "Newsletter", value: "newsletter" },
        ],
        layout: "radio",
      },
      initialValue: "news",
    },
    { name: "featured", title: "Featured Post", type: "boolean", initialValue: false },
    { name: "publishedAt", title: "Published Date", type: "datetime" },
    { name: "excerpt", title: "Card Summary", type: "text", rows: 4 },
    { name: "image", title: "Featured Image", type: "imageWithAlt" },
    { name: "body", title: "Full Article", type: "blockContent" },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image.image" },
  },
};

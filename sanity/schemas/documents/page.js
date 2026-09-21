import { sectionTypeNames } from "../objects/sections";
import { onlyWhenUsedAll } from "../visibility";

export const page = {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Page Name",
      type: "string",
      description: "Internal name shown in the Studio.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "route",
      title: "Website Path",
      type: "string",
      readOnly: true,
      description: "The URL of this page on the website. Managed by the website.",
    },
    { name: "seo", title: "SEO", type: "seo", options: { collapsible: true, collapsed: false } },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: onlyWhenUsedAll([
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "image", title: "Hero Image (Desktop)", type: "picture" },
        {
          name: "mobileImage",
          title: "Hero Image (Mobile)",
          type: "picture",
          description: "Optional image used on screens up to 920px wide.",
        },
        { name: "ctas", title: "Buttons", type: "array", of: [{ type: "cta" }] },
        {
          name: "items",
          title: "Value Bar",
          type: "array",
          of: [{ type: "string" }],
          description: "Short values shown under the homepage hero.",
        },
      ], "hero"),
    },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: sectionTypeNames.map((type) => ({ type })),
      description: "The sections of this page, in the order the website shows them.",
    },
  ],
  preview: {
    select: { title: "title", subtitle: "route", media: "hero.image" },
  },
};

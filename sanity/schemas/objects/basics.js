/**
 * Small shared building blocks.
 *
 * Every content type on the site is built from these few objects so the
 * dataset stays well under Sanity's free-plan attribute limit: an attribute is
 * a unique field path, so re-using the same field names everywhere keeps the
 * count low no matter how many pages exist.
 *
 * Nothing here controls design (colors, layouts, variants). Those live in the
 * code under `src/design/`.
 *
 * Fields are hidden in the Studio unless the section uses them (see visibility.js).
 */
import { onlyWhenUsedAll } from "../visibility";

export const picture = {
  name: "picture",
  title: "Image",
  type: "image",
  fields: [
    {
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for accessibility and SEO.",
    },
  ],
};

export const cta = {
  name: "cta",
  title: "Button / Link",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "href",
      title: "Link",
      type: "string",
      description: "Use an internal path like /admissions/fees, #section-id for page anchors, or a full URL.",
      initialValue: "#",
      validation: (Rule) => Rule.required(),
    },
    { name: "openInNewTab", title: "Open in new tab", type: "boolean", initialValue: false },
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
};

export const blockContent = {
  name: "blockContent",
  title: "Rich Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Green Accent", value: "accentGreen" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
        ],
      },
    },
  ],
};

export const sectionHeading = {
  name: "sectionHeading",
  title: "Heading",
  type: "object",
  fields: onlyWhenUsedAll([
    { name: "eyebrow", title: "Eyebrow", type: "string", description: "Small label above the title. Optional." },
    { name: "title", title: "Title", type: "string" },
    {
      name: "accentTitle",
      title: "Accent Title",
      type: "string",
      description: "Optional highlighted part of the title.",
    },
    { name: "subtitle", title: "Subtitle", type: "string" },
    { name: "description", title: "Text", type: "blockContent" },
  ], "heading"),
};

export const seo = {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    { name: "title", title: "SEO Title", type: "string", description: "Recommended length: 50-60 characters." },
    {
      name: "description",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Recommended length: 140-160 characters.",
    },
    { name: "image", title: "Social Share Image", type: "picture" },
  ],
};

export const entry = {
  name: "entry",
  title: "Entry",
  type: "object",
  description: "A small list row: a label with a value, a link, or an icon.",
  fields: onlyWhenUsedAll([
    { name: "label", title: "Label", type: "string" },
    { name: "text", title: "Text / Value", type: "text", rows: 2 },
    { name: "href", title: "Link", type: "string" },
    {
      name: "iconType",
      title: "Icon",
      type: "string",
      description: "Optional built-in icon name (for example location, phone, email).",
    },
    { name: "icon", title: "Icon Image", type: "picture" },
  ], "entry"),
  preview: {
    select: { title: "label", subtitle: "text" },
    prepare: ({ title, subtitle }) => ({ title: title || subtitle || "Entry", subtitle: title ? subtitle : undefined }),
  },
};

export const card = {
  name: "card",
  title: "Card",
  type: "object",
  description: "A repeatable item: card, slide, team member, FAQ, table row, document…",
  fields: onlyWhenUsedAll([
    { name: "title", title: "Title", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "string", description: "Role, location, or a second line." },
    { name: "label", title: "Label", type: "string", description: "Short badge text: a year, a number, a button label." },
    { name: "description", title: "Short Text", type: "text", rows: 3 },
    { name: "body", title: "Rich Text", type: "blockContent" },
    { name: "image", title: "Image", type: "picture" },
    { name: "icon", title: "Icon Image", type: "picture" },
    {
      name: "iconType",
      title: "Built-in Icon",
      type: "string",
      description: "Optional built-in icon name used by some sections.",
    },
    { name: "cta", title: "Button", type: "cta" },
    { name: "file", title: "File", type: "file", description: "Downloadable document, when the card links to one." },
    {
      name: "entries",
      title: "Entries",
      type: "array",
      of: [{ type: "entry" }],
      description: "Sub-items: table cells, bullet points, dates, pillars.",
    },
  ], "card"),
  preview: {
    select: { title: "title", subtitle: "subtitle", description: "description", media: "image", icon: "icon" },
    prepare: ({ title, subtitle, description, media, icon }) => ({
      title: title || description || "Card",
      subtitle: subtitle || (title ? description : undefined),
      media: media || icon,
    }),
  },
};

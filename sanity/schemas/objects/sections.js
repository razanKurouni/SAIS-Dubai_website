/**
 * Page section types.
 *
 * All section types share the same field names (heading, body, image,
 * mobileImage, icon, cta, ctas, cards, entries, file, video, href) so that the
 * whole site only counts a handful of unique attribute paths in Sanity.
 *
 * Which component renders a section, and how it looks, is decided by the
 * website code from the page and the section `slot`. Editors only manage the
 * words, images and links.
 */
import { SLOT_LABELS } from "../slot-labels";
import { onlyWhenUsedAll } from "../visibility";

const slot = {
  name: "slot",
  title: "Section",
  type: "string",
  readOnly: true,
  description: "Identifies where this section appears on the page. Managed by the website.",
};

const heading = { name: "heading", title: "Heading", type: "sectionHeading" };
const body = { name: "body", title: "Rich Text", type: "blockContent" };
const image = { name: "image", title: "Image", type: "picture" };
const mobileImage = {
  name: "mobileImage",
  title: "Image (Mobile)",
  type: "picture",
  description: "Optional image used on small screens. Falls back to the main image when empty.",
};
const icon = { name: "icon", title: "Badge / Secondary Image", type: "picture" };
const cta = { name: "cta", title: "Button", type: "cta" };
const ctas = { name: "ctas", title: "Buttons", type: "array", of: [{ type: "cta" }] };
const cards = { name: "cards", title: "Cards", type: "array", of: [{ type: "card" }] };
const entries = { name: "entries", title: "Entries", type: "array", of: [{ type: "entry" }] };
const file = { name: "file", title: "File", type: "file" };

function preview(kindTitle) {
  return {
    select: { slot: "slot", title: "heading.title", subtitle: "heading.subtitle", media: "image" },
    prepare: ({ slot: slotValue, title, subtitle, media }) => ({
      title: SLOT_LABELS[slotValue] || slotValue || kindTitle,
      subtitle: title || subtitle || kindTitle,
      media,
    }),
  };
}

export const imageTextSection = {
  name: "imageTextSection",
  title: "Image & Text",
  type: "object",
  fields: [slot, ...onlyWhenUsedAll([heading, body, image, mobileImage, icon, ctas], "section")],
  preview: preview("Image & Text"),
};

export const textSection = {
  name: "textSection",
  title: "Text",
  type: "object",
  fields: [slot, ...onlyWhenUsedAll([heading, body], "section")],
  preview: preview("Text"),
};

export const cardsSection = {
  name: "cardsSection",
  title: "Cards / List",
  type: "object",
  fields: [slot, ...onlyWhenUsedAll([heading, body, image, cta, ctas, cards, entries], "section")],
  preview: preview("Cards"),
};

export const entriesSection = {
  name: "entriesSection",
  title: "Info Entries",
  type: "object",
  fields: [slot, ...onlyWhenUsedAll([heading, body, image, entries], "section")],
  preview: preview("Entries"),
};

export const ctaSection = {
  name: "ctaSection",
  title: "Call to Action",
  type: "object",
  fields: [slot, ...onlyWhenUsedAll([heading, ctas, file], "section")],
  preview: preview("Call to Action"),
};

export const mediaSection = {
  name: "mediaSection",
  title: "Video",
  type: "object",
  fields: [
    slot,
    ...onlyWhenUsedAll(
      [
        heading,
        { ...image, title: "Poster Image" },
        { name: "video", title: "Video File", type: "file", options: { accept: "video/*" } },
        { name: "href", title: "Video URL", type: "string", description: "Optional external video link (YouTube, Vimeo, MP4)." },
      ],
      "section",
    ),
  ],
  preview: preview("Video"),
};

export const formSection = {
  name: "formSection",
  title: "Form Settings",
  type: "object",
  fields: [
    slot,
    ...onlyWhenUsedAll(
      [
        heading,
        { name: "recipientEmail", title: "Recipient Email", type: "string" },
        { name: "submitLabel", title: "Submit Button Label", type: "string" },
        { name: "successMessage", title: "Success Message", type: "text", rows: 2 },
        { name: "errorMessage", title: "Error Message", type: "text", rows: 2 },
      ],
      "section",
    ),
  ],
  preview: preview("Form"),
};

export const newsSection = {
  name: "newsSection",
  title: "News",
  type: "object",
  fields: [slot, ...onlyWhenUsedAll([heading, cta], "section")],
  preview: preview("News"),
};

export const gallerySection = {
  name: "gallerySection",
  title: "Gallery",
  type: "object",
  fields: [slot, ...onlyWhenUsedAll([heading, { name: "images", title: "Images", type: "array", of: [{ type: "picture" }] }, ctas], "section")],
  preview: preview("Gallery"),
};

export const sectionTypes = [
  imageTextSection,
  textSection,
  cardsSection,
  entriesSection,
  ctaSection,
  mediaSection,
  formSection,
  newsSection,
  gallerySection,
];

export const sectionTypeNames = sectionTypes.map((type) => type.name);

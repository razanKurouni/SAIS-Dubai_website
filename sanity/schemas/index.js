import { blockContent, card, cta, entry, picture, sectionHeading, seo } from "./objects/basics";
import { sectionTypes } from "./objects/sections";
import { newsPost } from "./documents/newsPost";
import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";

export const schemaTypes = [
  picture,
  cta,
  blockContent,
  sectionHeading,
  seo,
  entry,
  card,
  ...sectionTypes,
  siteSettings,
  page,
  newsPost,
];

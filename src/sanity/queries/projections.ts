/** Shared GROQ projections for the content model. */

export const pictureProjection = `{
  alt,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

/**
 * News post images: tolerant of the older `{ image: { asset }, alt }` shape so
 * a dataset converted in place keeps its news pictures until they are normalized.
 */
export const newsPictureProjection = `{
  alt,
  "url": coalesce(asset->url, image.asset->url),
  "width": coalesce(asset->metadata.dimensions.width, image.asset->metadata.dimensions.width),
  "height": coalesce(asset->metadata.dimensions.height, image.asset->metadata.dimensions.height)
}`;

/** A picture that may have a `mobileImage` sibling field. */
export const responsivePictureProjection = `{
  alt,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "mobileUrl": ^.mobileImage.asset->url,
  "mobileAlt": ^.mobileImage.alt
}`;

export const fileProjection = `{
  "url": asset->url,
  "filename": asset->originalFilename
}`;

export const ctaProjection = `{
  label,
  href,
  openInNewTab
}`;

export const headingProjection = `{
  eyebrow,
  title,
  accentTitle,
  subtitle,
  description
}`;

export const seoProjection = `{
  title,
  description,
  image ${pictureProjection}
}`;

export const entryProjection = `{
  _key,
  label,
  text,
  href,
  iconType,
  icon ${pictureProjection}
}`;

export const cardProjection = `{
  _key,
  title,
  subtitle,
  label,
  description,
  body,
  image ${pictureProjection},
  icon ${pictureProjection},
  iconType,
  cta ${ctaProjection},
  file ${fileProjection},
  entries[] ${entryProjection}
}`;

export const sectionProjection = `{
  _type,
  _key,
  slot,
  heading ${headingProjection},
  body,
  image ${responsivePictureProjection},
  mobileImage ${pictureProjection},
  icon ${pictureProjection},
  cta ${ctaProjection},
  ctas[] ${ctaProjection},
  cards[] ${cardProjection},
  entries[] ${entryProjection},
  file ${fileProjection},
  video ${fileProjection},
  href,
  recipientEmail,
  submitLabel,
  successMessage,
  errorMessage,
  images[] ${pictureProjection}
}`;

const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url,
  "mobileUrl": ^.mobileImage.image.asset->url,
  "mobileAlt": ^.mobileImage.alt
}`;

const headingProjection = `{
  eyebrow,
  title,
  accentTitle,
  subtitle,
  description
}`;

export const schoolPoliciesPageQuery = `*[_type == "schoolPoliciesPage" && _id == "school-policies-page"][0] {
  seo {
    title,
    description,
    image ${imageWithAltProjection}
  },
  hero {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    topLineColor,
    panelColor,
    waveColor,
    textColor,
    imagePosition,
    imageWidth
  },
  intro {
    heading ${headingProjection}
  },
  policies[] {
    _key,
    title,
    coverImage ${imageWithAltProjection},
    "documentUrl": documentFile.asset->url,
    "documentFilename": documentFile.asset->originalFilename,
    downloadLabel
  }
}`;

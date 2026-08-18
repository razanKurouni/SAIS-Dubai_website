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

export const healthSafetyPageQuery = `*[_type == "healthSafetyPage" && _id == "health-safety-page"][0] {
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
  introSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] {
      label,
      href,
      variant,
      openInNewTab
    },
    imagePosition,
    theme
  },
  approachSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] {
      label,
      href,
      variant,
      openInNewTab
    },
    imagePosition,
    theme
  }
}`;

const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url,
  "mobileUrl": ^.mobileImage.image.asset->url,
  "mobileAlt": ^.mobileImage.alt
}`;

const ctaProjection = `{
  label,
  href,
  openInNewTab,
  variant
}`;

const headingProjection = `{
  eyebrow,
  title,
  accentTitle,
  subtitle,
  description
}`;

export const careersPageQuery = `*[_type == "careersPage" && _id == "careers-page"][0] {
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
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection}
  },
  editorialSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  },
  careSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    textColor
  },
  requirementsSection {
    columns[] {
      _key,
      title,
      intro,
      items
    }
  },
  joinTeamSection {
    heading ${headingProjection},
    cards[] {
      _key,
      icon ${imageWithAltProjection},
      label,
      text,
      href
    }
  }
}`;

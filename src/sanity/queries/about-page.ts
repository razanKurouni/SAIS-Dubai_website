const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url
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

export const aboutPageQuery = `*[_type == "aboutPage" && _id == "about-page"][0] {
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
    body,
    imagePosition
  },
  principalMessage {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  },
  governance {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  },
  inspection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  }
}`;

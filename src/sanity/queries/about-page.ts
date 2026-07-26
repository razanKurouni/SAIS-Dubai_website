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
  boardGovernors {
    heading ${headingProjection},
    members[] {
      _key,
      name,
      role,
      image ${imageWithAltProjection},
      cardColor,
      imageBackgroundColor
    },
    backgroundColor
  },
  statement {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      description,
      image ${imageWithAltProjection},
      cardColor,
      imagePosition
    },
    backgroundColor
  },
  values {
    heading ${headingProjection},
    slides[] {
      _key,
      title,
      image ${imageWithAltProjection},
      items[] {
        _key,
        title,
        description,
        icon ${imageWithAltProjection}
      },
      curveColor,
      titleColor,
      itemTitleColor,
      textColor,
      imagePosition
    },
    backgroundColor,
    titleColor,
    introTextColor
  },
  accreditations {
    heading ${headingProjection},
    body,
    logos[] {
      _key,
      name,
      image ${imageWithAltProjection},
      width
    },
    backgroundColor,
    titleColor,
    lineColor,
    textColor
  },
  khdaSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    badge ${imageWithAltProjection},
    cta ${ctaProjection},
    imagePosition,
    backgroundColor,
    panelColor,
    accentColor,
    titleColor,
    textColor
  },
  branches {
    heading ${headingProjection},
    cards[] {
      _key,
      name,
      established,
      location,
      description,
      image ${imageWithAltProjection},
      cta ${ctaProjection},
      cardColor,
      buttonColor,
      imagePosition
    },
    backgroundColor,
    titleColor,
    lineColor
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

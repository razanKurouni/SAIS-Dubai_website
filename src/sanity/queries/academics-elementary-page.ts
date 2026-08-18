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

export const academicsElementaryPageQuery = `*[_type == "academicsElementaryPage" && _id == "academics-elementary-page"][0] {
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
  innerNavigation {
    items[] {
      _key,
      label,
      href,
      openInNewTab
    },
    activeHref,
    activeColor,
    inactiveColor,
    textColor,
    dividerColor,
    topLineColor,
    ariaLabel
  },
  intro {
    heading ${headingProjection},
    titleColor,
    textColor,
    backgroundColor
  },
  curriculumSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  assessmentSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  }
}`;

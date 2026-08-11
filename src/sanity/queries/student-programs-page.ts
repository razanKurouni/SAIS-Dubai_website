const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url
}`;

const headingProjection = `{
  eyebrow,
  title,
  accentTitle,
  subtitle,
  description
}`;

export const studentProgramsPageQuery = `*[_type == "studentProgramsPage" && _id == "student-programs-page"][0] {
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
  proactiveApproach {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection}
    },
    backgroundColor,
    titleColor,
    textColor,
    cardTextColor,
    cardBorderColor,
    cardHoverBorderColor
  },
  studentCongressSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  sgaGoalsSection {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection}
    },
    backgroundColor,
    titleColor,
    textColor,
    cardTextColor,
    cardBorderColor,
    cardHoverBorderColor
  },
  coreValuesSection {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection},
      iconType
    }
  }
}`;

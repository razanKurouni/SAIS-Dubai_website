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

export const academicsHighSchoolPageQuery = `*[_type == "academicsHighSchoolPage" && _id == "academics-high-school-page"][0] {
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
  overviewSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    theme,
    backgroundColor,
    titleColor,
    textColor
  },
  excellenceSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imageSide,
    imagePosition,
    backgroundColor,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  curriculumSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition
  },
  careerGuidanceSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imageSide,
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  pathwaysSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    titleColor,
    textColor
  },
  pathwaysSliderSection {
    heading ${headingProjection},
    slides[] {
      _key,
      title,
      body,
      image ${imageWithAltProjection},
      backgroundColor,
      sideColor,
      ringColor,
      titleColor,
      textColor,
      imagePosition
    }
  },
  apDiplomaSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    titleColor,
    textColor
  },
  apCoursesSection {
    heading ${headingProjection},
    backgroundColor,
    titleColor,
    cardBorderColor,
    cardHoverBorderColor,
    cardTextColor,
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection}
    }
  },
  apBenefitsSection {
    heading ${headingProjection},
    backgroundColor,
    titleColor,
    subtitleColor,
    cardIconColor,
    cardTitleColor,
    cardTextColor,
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection}
    }
  }
}`;

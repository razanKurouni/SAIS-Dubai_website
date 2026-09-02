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

export const academicsMiddleSchoolPageQuery = `*[_type == "academicsMiddleSchoolPage" && _id == "academics-middle-school-page"][0] {
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
  tailoredInstructionSection {
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
  curriculumOverviewSection {
    heading ${headingProjection},
    backgroundColor,
    titleColor,
    textColor,
    firstBlock {
      heading ${headingProjection},
      image ${imageWithAltProjection},
      imagePosition,
      theme,
      backgroundColor,
      titleColor,
      textColor
    },
    secondBlock {
      heading ${headingProjection},
      image ${imageWithAltProjection},
      imagePosition,
      theme,
      backgroundColor,
      titleColor,
      textColor
    }
  },
  assessmentSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  supportProgramsSection {
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
      icon ${imageWithAltProjection},
      iconType
    }
  },
  learningPhasesElementaryImage ${imageWithAltProjection}
}`;

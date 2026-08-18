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

export const studentLifePageQuery = `*[_type == "studentLifePage" && _id == "student-life-page"][0] {
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
    backgroundColor,
    titleColor,
    textColor
  },
  learningSliderSection {
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
  }
}`;

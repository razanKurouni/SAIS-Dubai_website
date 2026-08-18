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

export const admissionsApplicationPageQuery = `*[_type == "admissionsApplicationPage" && _id == "admissions-application-page"][0] {
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
    items[] { label, href, openInNewTab },
    activeHref,
    activeColor,
    inactiveColor,
    textColor,
    dividerColor,
    topLineColor,
    ariaLabel
  },
  applicationProcess {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  timelinesSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] { label, href, variant, openInNewTab },
    imagePosition,
    theme
  },
  stepsSection {
    heading ${headingProjection},
    steps[] { _key, number, title, description, backgroundColor }
  },
  finalCta {
    text,
    buttonLabel,
    "fileUrl": linkUrl
  }
}`;

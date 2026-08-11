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

const imageTextSectionProjection = `{
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
}`;

export const admissionsPageQuery = `*[_type == "admissionsPage" && _id == "admissions-page"][0] {
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
  introSection ${imageTextSectionProjection},
  policySection ${imageTextSectionProjection}
}`;

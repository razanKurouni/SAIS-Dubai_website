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

const contactInfoProjection = `{
  heading ${headingProjection},
  image ${imageWithAltProjection},
  imagePosition,
  panelColor,
  waveColor,
  titleColor,
  textColor,
  items[] {
    _key,
    icon,
    label,
    text,
    href
  }
}`;

export const studentStaffWellbeingPageQuery = `*[_type == "studentStaffWellbeingPage" && _id == "student-staff-wellbeing-page"][0] {
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
  commitment {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition
  },
  proactiveApproach {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection}
    }
  },
  counsellingSection ${contactInfoProjection},
  selSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition
  },
  wellbeingFramework {
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
  }
}`;

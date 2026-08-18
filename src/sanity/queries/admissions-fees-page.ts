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

export const admissionsFeesPageQuery = `*[_type == "admissionsFeesPage" && _id == "admissions-fees-page"][0] {
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
  feesIntro {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  discountPolicy {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] { label, href, variant, openInNewTab },
    imagePosition,
    theme,
    backgroundColor,
    titleColor,
    textColor
  },
  feeStructure {
    heading ${headingProjection},
    labels { gradeYear, tuitionFee, books, uniform, total },
    rows[] { _key, gradeYear, tuitionFee, books, uniform, total }
  },
  termsSection {
    heading ${headingProjection},
    leftColumn[] { _key, title, body, accentList },
    rightColumn[] { _key, title, body, accentList }
  }
}`;

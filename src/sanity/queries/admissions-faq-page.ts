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

export const admissionsFaqPageQuery = `*[_type == "admissionsFaqPage" && _id == "admissions-faq-page"][0] {
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
  introSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  faqSection {
    heading ${headingProjection},
    items[] { _key, question, answer }
  }
}`;

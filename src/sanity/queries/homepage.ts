const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url,
  "mobileUrl": ^.mobileImage.image.asset->url,
  "mobileAlt": ^.mobileImage.alt
}`;

const ctaProjection = `{
  label,
  href,
  openInNewTab,
  variant
}`;

const linkProjection = `{
  label,
  href,
  openInNewTab
}`;

const headingProjection = `{
  eyebrow,
  title,
  accentTitle,
  subtitle,
  description
}`;

const cardProjection = `{
  title,
  description,
  theme,
  image ${imageWithAltProjection},
  cta ${ctaProjection}
}`;

export const homepageQuery = `*[_type == "homepage" && _id == "homepage-main"][0] {
  seo {
    title,
    description,
    image ${imageWithAltProjection}
  },
  hero {
    heading,
    subtitle,
    description,
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    valueBar
  },
  heroContactBand {
    text,
    ctas[] ${ctaProjection}
  },
  intro {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  },
  whyDubai {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    items[] {
      title,
      description,
      iconType,
      icon ${imageWithAltProjection}
    }
  },
  ctaBand {
    text,
    ctas[] ${ctaProjection}
  },
  accreditations {
    heading ${headingProjection},
    logos[] {
      name,
      image ${imageWithAltProjection}
    }
  },
  whySection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    ctas[] ${ctaProjection},
    imagePosition,
    theme
  },
  facts {
    heading ${headingProjection},
    items[] {
      value,
      label
    }
  },
  quickLinks {
    heading ${headingProjection},
    cards[] ${cardProjection}
  },
  learningPhases {
    heading ${headingProjection},
    cta ${ctaProjection},
    cards[] ${cardProjection}
  },
  tour {
    heading ${headingProjection},
    cards[] ${cardProjection}
  },
  news {
    heading ${headingProjection},
    cta ${ctaProjection},
    posts[] ${cardProjection}
  },
  instagram {
    heading ${headingProjection},
    images[] ${imageWithAltProjection},
    socialLinks[] ${linkProjection}
  }
}`;

export const siteHeaderQuery = `*[_type == "siteHeader" && _id == "site-header-main"][0] {
  logo ${imageWithAltProjection},
  scrolledLogo ${imageWithAltProjection},
  menuIcon ${imageWithAltProjection},
  bookTourButton ${ctaProjection},
  applyNowButton ${ctaProjection},
  navigation[] ${linkProjection}
}`;

export const siteFooterQuery = `*[_type == "siteFooter" && _id == "site-footer"][0] {
  logo ${imageWithAltProjection},
  logoText,
  contactText,
  contactItems[] { _key, label, text, href, icon },
  columns[] {
    title,
    links[] ${linkProjection}
  },
  parentStudentLinks[] ${linkProjection},
  quickLinks[] ${linkProjection},
  socialLinks[] ${linkProjection},
  legalLinks[] ${linkProjection},
  copyrightText,
  creditLabel,
  creditName,
  creditUrl
}`;

export const legacyHomeSectionsQuery = `*[_type == "homeSection"] | order(order asc) {
  _id,
  order,
  title,
  subtitle,
  body,
  items,
  ctas,
  imagePlaceholders[]{
    _key,
    label,
    fileName,
    note
  },
  images[]{
    _key,
    label,
    alt,
    caption,
    "url": image.asset->url
  }
}`;

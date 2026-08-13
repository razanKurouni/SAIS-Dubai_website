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

export const admissionsBookTourPageQuery = `*[_type == "admissionsBookTourPage" && _id == "admissions-book-tour-page"][0] {
  seo { title, description, image ${imageWithAltProjection} },
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
    theme
  },
  formSection {
    ariaLabel,
    recipientEmail,
    fields[] { _key, label, name, type, placeholder, required },
    submitLabel,
    successMessage,
    errorMessage
  }
}`;

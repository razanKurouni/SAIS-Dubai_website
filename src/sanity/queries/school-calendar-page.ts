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

export const schoolCalendarPageQuery = `*[_type == "schoolCalendarPage" && _id == "school-calendar-page"][0] {
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
  intro {
    heading ${headingProjection}
  },
  terms[] {
    _key,
    title,
    color,
    rows[] {
      _key,
      label,
      date
    }
  },
  calendarDownload {
    text,
    buttonLabel,
    "fileUrl": file.asset->url
  }
}`;

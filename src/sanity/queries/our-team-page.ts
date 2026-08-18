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

export const ourTeamPageQuery = `*[_type == "ourTeamPage" && _id == "our-team-page"][0] {
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
  leadershipSection {
    heading ${headingProjection},
    groupTitle,
    members[] {
      _key,
      name,
      role,
      image ${imageWithAltProjection},
      yearsOfExperience,
      hoverBio,
      cardColor,
      imageBackgroundColor
    },
    backgroundColor,
    introColor,
    bodyColor,
    titleColor,
    lineColor
  },
  departmentsSection {
    heading ${headingProjection},
    slides[] {
      _key,
      title,
      image ${imageWithAltProjection},
      imagePosition,
      panels[] {
        _key,
        title,
        image ${imageWithAltProjection},
        imagePosition
      }
    },
    backgroundColor,
    titleColor,
    slideTitleColor,
    lineColor
  },
  pastoralSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    titleColor,
    lineColor
  },
  administrationSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    titleColor,
    lineColor
  }
}`;

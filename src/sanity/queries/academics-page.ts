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

export const academicsPageQuery = `*[_type == "academicsPage" && _id == "academics-page"][0] {
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
  curriculumSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    textColor
  },
  skillsSection {
    heading ${headingProjection},
    groups[] {
      _key,
      title,
      items[] {
        _key,
        title,
        icon ${imageWithAltProjection},
        iconType,
        theme
      }
    }
  },
  curriculumOverviewSection {
    firstBlock {
      heading ${headingProjection},
      image ${imageWithAltProjection},
      imagePosition,
      theme
    },
    secondBlock {
      heading ${headingProjection},
      image ${imageWithAltProjection},
      imagePosition,
      theme
    }
  },
  teachingCommitmentsSection {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection},
      iconType
    }
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
      textColor,
      imagePosition
    }
  },
  calendarDownload {
    text,
    buttonLabel,
    "fileUrl": file.asset->url
  }
}`;

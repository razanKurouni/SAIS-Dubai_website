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

export const ourCampusPageQuery = `*[_type == "ourCampusPage" && _id == "our-campus-page"][0] {
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
  videoSection {
    poster ${imageWithAltProjection},
    videoUrl
  },
  facilities {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      image ${imageWithAltProjection},
      body
    }
  }
}`;

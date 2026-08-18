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

export const ourCommunityPageQuery = `*[_type == "ourCommunityPage" && _id == "our-community-page"][0] {
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
  supportSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    theme,
    ctas
  },
  linksSection {
    heading ${headingProjection},
    cta,
    cards[] {
      title,
      description,
      image ${imageWithAltProjection},
      cta,
      theme
    }
  }
}`;

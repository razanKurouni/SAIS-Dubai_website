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

export const newsListingPageQuery = `*[_type == "newsListingPage" && _id == "news-listing-page"][0] {
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
  newsHeading,
  newslettersHeading,
  buttonLabel
}`;

export const newsPostsQuery = `*[_type == "newsPost"] | order(featured desc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  featured,
  publishedAt,
  excerpt,
  image ${imageWithAltProjection}
}`;

export const newsPostBySlugQuery = `*[_type == "newsPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  featured,
  publishedAt,
  excerpt,
  image ${imageWithAltProjection},
  body,
  seo { title, description, image ${imageWithAltProjection} }
}`;

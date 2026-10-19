import { fileProjection, newsPictureProjection } from "./projections";

export const newsPostsQuery = `*[_type == "newsPost"] | order(featured desc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  featured,
  publishedAt,
  excerpt,
  image ${newsPictureProjection}
}`;

export const newsPostBySlugQuery = `*[_type == "newsPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  featured,
  publishedAt,
  excerpt,
  image ${newsPictureProjection},
  body,
  file ${fileProjection},
  seo { title, description, image ${newsPictureProjection} }
}`;

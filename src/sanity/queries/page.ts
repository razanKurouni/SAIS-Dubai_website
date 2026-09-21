import {
  ctaProjection,
  headingProjection,
  responsivePictureProjection,
  sectionProjection,
  seoProjection,
} from "./projections";

export const pageQuery = `*[_type == "page" && _id == $id][0] {
  _id,
  title,
  route,
  seo ${seoProjection},
  hero {
    heading ${headingProjection},
    image ${responsivePictureProjection},
    ctas[] ${ctaProjection},
    items
  },
  sections[] ${sectionProjection}
}`;

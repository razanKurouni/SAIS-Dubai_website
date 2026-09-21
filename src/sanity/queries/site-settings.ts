import { ctaProjection, entryProjection, pictureProjection } from "./projections";

export const SITE_SETTINGS_ID = "site-settings";

export const siteSettingsQuery = `*[_type == "siteSettings" && _id == $id][0] {
  header {
    logo ${pictureProjection},
    scrolledLogo ${pictureProjection},
    menuIcon ${pictureProjection},
    bookTourButton ${ctaProjection},
    applyNowButton ${ctaProjection},
    navigation[] ${ctaProjection}
  },
  footer {
    logo ${pictureProjection},
    logoText,
    contactText,
    contactItems[] ${entryProjection},
    parentStudentLinksTitle,
    parentStudentLinks[] ${ctaProjection},
    quickLinksTitle,
    quickLinks[] ${ctaProjection},
    socialLinks[] ${ctaProjection},
    legalLinks[] ${ctaProjection},
    copyrightText,
    creditLabel,
    creditName,
    creditUrl
  }
}`;

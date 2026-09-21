/**
 * Inner (sub-section) navigation shown under the hero of some pages, and its
 * colors. This is site structure, so it lives in code rather than the CMS.
 */
import type { InnerNavigation } from "@/types/sanity";

export const INNER_NAVIGATION: Record<string, InnerNavigation> = {
  "academics-elementary-page": {
    "items": [
      {
        "label": "Overview",
        "href": "/academics"
      },
      {
        "label": "Kindergarten",
        "href": "/academics/kindergarten"
      },
      {
        "label": "Elementary",
        "href": "/academics/elementary"
      },
      {
        "label": "Middle School",
        "href": "/academics/middle-school"
      },
      {
        "label": "High School",
        "href": "/academics/high-school"
      }
    ],
    "activeHref": "/academics/elementary",
    "activeColor": "#00A5B2",
    "inactiveColor": "#216B97",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Academics page navigation"
  },
  "academics-high-school-page": {
    "items": [
      {
        "label": "Overview",
        "href": "/academics"
      },
      {
        "label": "Kindergarten",
        "href": "/academics/kindergarten"
      },
      {
        "label": "Elementary",
        "href": "/academics/elementary"
      },
      {
        "label": "Middle School",
        "href": "/academics/middle-school"
      },
      {
        "label": "High School",
        "href": "/academics/high-school"
      }
    ],
    "activeHref": "/academics/high-school",
    "activeColor": "#00A5B2",
    "inactiveColor": "#216B97",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Academics page navigation"
  },
  "academics-kindergarten-page": {
    "items": [
      {
        "label": "Overview",
        "href": "/academics"
      },
      {
        "label": "Kindergarten",
        "href": "/academics/kindergarten"
      },
      {
        "label": "Elementary",
        "href": "/academics/elementary"
      },
      {
        "label": "Middle School",
        "href": "/academics/middle-school"
      },
      {
        "label": "High School",
        "href": "/academics/high-school"
      }
    ],
    "activeHref": "/academics/kindergarten",
    "activeColor": "#00A5B2",
    "inactiveColor": "#216B97",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Academics page navigation"
  },
  "academics-middle-school-page": {
    "items": [
      {
        "label": "Overview",
        "href": "/academics"
      },
      {
        "label": "Kindergarten",
        "href": "/academics/kindergarten"
      },
      {
        "label": "Elementary",
        "href": "/academics/elementary"
      },
      {
        "label": "Middle School",
        "href": "/academics/middle-school"
      },
      {
        "label": "High School",
        "href": "/academics/high-school"
      }
    ],
    "activeHref": "/academics/middle-school",
    "activeColor": "#00A5B2",
    "inactiveColor": "#216B97",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Academics page navigation"
  },
  "admissions-application-page": {
    "items": [
      {
        "label": "Introduction",
        "href": "/admissions"
      },
      {
        "label": "Applications",
        "href": "/admissions/applications"
      },
      {
        "label": "Book A Tour",
        "href": "/admissions/book-a-tour"
      },
      {
        "label": "FAQ's",
        "href": "/admissions/faqs"
      },
      {
        "label": "Fees",
        "href": "/admissions/fees"
      },
      {
        "label": "Withdrawal",
        "href": "/admissions/withdrawal"
      }
    ],
    "activeHref": "/admissions/applications",
    "activeColor": "#216B97",
    "inactiveColor": "#00A5B2",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Admissions navigation"
  },
  "admissions-book-tour-page": {
    "items": [
      {
        "label": "Introduction",
        "href": "/admissions"
      },
      {
        "label": "Applications",
        "href": "/admissions/applications"
      },
      {
        "label": "Book A Tour",
        "href": "/admissions/book-a-tour"
      },
      {
        "label": "FAQ's",
        "href": "/admissions/faqs"
      },
      {
        "label": "Fees",
        "href": "/admissions/fees"
      },
      {
        "label": "Withdrawal",
        "href": "/admissions/withdrawal"
      }
    ],
    "activeHref": "/admissions/book-a-tour",
    "activeColor": "#216B97",
    "inactiveColor": "#00A5B2",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Admissions navigation"
  },
  "admissions-faq-page": {
    "items": [
      {
        "label": "Introduction",
        "href": "/admissions"
      },
      {
        "label": "Applications",
        "href": "/admissions/applications"
      },
      {
        "label": "Book A Tour",
        "href": "/admissions/book-a-tour"
      },
      {
        "label": "FAQ's",
        "href": "/admissions/faqs"
      },
      {
        "label": "Fees",
        "href": "/admissions/fees"
      },
      {
        "label": "Withdrawal",
        "href": "/admissions/withdrawal"
      }
    ],
    "activeHref": "/admissions/faqs",
    "activeColor": "#216B97",
    "inactiveColor": "#00A5B2",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Admissions navigation"
  },
  "admissions-fees-page": {
    "items": [
      {
        "label": "Introduction",
        "href": "/admissions"
      },
      {
        "label": "Applications",
        "href": "/admissions/applications"
      },
      {
        "label": "Book A Tour",
        "href": "/admissions/book-a-tour"
      },
      {
        "label": "FAQ's",
        "href": "/admissions/faqs"
      },
      {
        "label": "Fees",
        "href": "/admissions/fees"
      },
      {
        "label": "Withdrawal",
        "href": "/admissions/withdrawal"
      }
    ],
    "activeHref": "/admissions/fees",
    "activeColor": "#216B97",
    "inactiveColor": "#00A5B2",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Admissions navigation"
  },
  "admissions-page": {
    "items": [
      {
        "label": "Introduction",
        "href": "/admissions"
      },
      {
        "label": "Applications",
        "href": "/admissions/applications"
      },
      {
        "label": "Book A Tour",
        "href": "/admissions/book-a-tour"
      },
      {
        "label": "FAQ's",
        "href": "/admissions/faqs"
      },
      {
        "label": "Fees",
        "href": "/admissions/fees"
      },
      {
        "label": "Withdrawal",
        "href": "/admissions/withdrawal"
      }
    ],
    "activeHref": "/admissions",
    "activeColor": "#216B97",
    "inactiveColor": "#00A5B2",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Admissions navigation"
  },
  "admissions-withdrawal-page": {
    "items": [
      {
        "label": "Introduction",
        "href": "/admissions"
      },
      {
        "label": "Applications",
        "href": "/admissions/applications"
      },
      {
        "label": "Book A Tour",
        "href": "/admissions/book-a-tour"
      },
      {
        "label": "FAQ's",
        "href": "/admissions/faqs"
      },
      {
        "label": "Fees",
        "href": "/admissions/fees"
      },
      {
        "label": "Withdrawal",
        "href": "/admissions/withdrawal"
      }
    ],
    "activeHref": "/admissions/withdrawal",
    "activeColor": "#216B97",
    "inactiveColor": "#00A5B2",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Admissions navigation"
  },
  "extra-curricular-activities-page": {
    "items": [
      {
        "label": "Student Life",
        "href": "/student-life"
      },
      {
        "label": "Student Programs",
        "href": "/student-life#student-programs"
      },
      {
        "label": "Extra Curricular Activities",
        "href": "/extra-curricular-activities"
      }
    ],
    "activeHref": "/extra-curricular-activities",
    "activeColor": "#216B97",
    "inactiveColor": "#d97252",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Student Life page navigation"
  },
  "student-life-page": {
    "items": [
      {
        "label": "Student Life",
        "href": "/student-life"
      },
      {
        "label": "Student Programs",
        "href": "#student-programs"
      },
      {
        "label": "Extra Curricular Activities",
        "href": "#extra-curricular-activities"
      }
    ],
    "activeHref": "/student-life",
    "activeColor": "#216B97",
    "inactiveColor": "#d97252",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Student Life page navigation"
  },
  "student-programs-page": {
    "items": [
      {
        "label": "Student Life",
        "href": "/student-life"
      },
      {
        "label": "Student Programs",
        "href": "/student-programs"
      },
      {
        "label": "Extra Curricular Activities",
        "href": "/extra-curricular-activities"
      }
    ],
    "activeHref": "/student-programs",
    "activeColor": "#216B97",
    "inactiveColor": "#d97252",
    "textColor": "#ffffff",
    "dividerColor": "#ffffff",
    "topLineColor": "#ffffff",
    "ariaLabel": "Student life sections"
  }
};

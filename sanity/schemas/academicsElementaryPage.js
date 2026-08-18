export const academicsElementaryPage = {
  name: "academicsElementaryPage",
  title: "Academics Elementary Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the Elementary page.",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image (Desktop)", type: "imageWithAlt" },
        { name: "mobileImage", title: "Hero Image (Mobile)", type: "imageWithAlt", description: "Optional image used on screens up to 920px wide. Falls back to the desktop image when empty." },
        {
          name: "topLineColor",
          title: "Top Line Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color for the left hero panel, for example #00A5B2.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color for the curved divider, for example #d97252.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the title, for example #ffffff.",
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 58% center.",
        },
        {
          name: "imageWidth",
          title: "Desktop Image Width",
          type: "string",
          description: "Optional CSS width for desktop, for example 60%. Mobile stays 100%.",
        },
      ],
    },
    {
      name: "innerNavigation",
      title: "Inner Navigation",
      type: "object",
      description: "Editable navigation bar shown below the Elementary hero.",
      fields: [
        {
          name: "items",
          title: "Navigation Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "href", title: "Link", type: "string" },
                { name: "openInNewTab", title: "Open in New Tab", type: "boolean", initialValue: false },
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "href",
                },
              },
            },
          ],
        },
        {
          name: "activeHref",
          title: "Active Link",
          type: "string",
          description: "The href that should be highlighted, for example /academics/elementary.",
        },
        {
          name: "activeColor",
          title: "Active Background Color",
          type: "string",
          description: "Optional CSS color for the active item, for example #00A5B2.",
        },
        {
          name: "inactiveColor",
          title: "Inactive Background Color",
          type: "string",
          description: "Optional CSS color for inactive items, for example #216B97.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "dividerColor",
          title: "Divider Color",
          type: "string",
          description: "Optional CSS color for item dividers, for example #ffffff.",
        },
        {
          name: "topLineColor",
          title: "Top Line Color",
          type: "string",
          description: "Optional CSS color for the top border, for example #ffffff.",
        },
        {
          name: "ariaLabel",
          title: "Accessibility Label",
          type: "string",
          description: "Optional label for screen readers.",
        },
      ],
    },
    {
      name: "intro",
      title: "Intro Text",
      type: "object",
      description: "Centered text section below the Academics navigation.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
      ],
    },
    {
      name: "curriculumSection",
      title: "The Curriculum Section",
      type: "object",
      description: "Editable curved image and text panel.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 45% center.",
        },
        {
          name: "backgroundColor",
          title: "Left Background Color",
          type: "string",
          description: "Optional CSS color behind the image, for example #00A5B2.",
        },
        {
          name: "panelColor",
          title: "Main Background Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2 or #d97252.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title, for example #00A5B2.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color for the body text, for example #ffffff.",
        },
      ],
    },
    {
      name: "assessmentSection",
      title: "Continuous Assessment Section",
      type: "object",
      description: "Editable text, image, and colors for the continuous assessment section.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 58% center.",
        },
        {
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title, for example #216B97.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color for the body text, for example #ffffff.",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "hero.heading.title",
      subtitle: "seo.description",
      media: "hero.image.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Academics Elementary Page",
        subtitle,
        media,
      };
    },
  },
};

export const aboutPage = {
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the About Us page.",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image", type: "imageWithAlt" },
        {
          name: "topLineColor",
          title: "Top Line Color",
          type: "string",
          description: "Optional CSS color, for example #d97252.",
        },
        {
          name: "panelColor",
          title: "Dark Panel Background Color",
          type: "string",
          description: "Optional CSS color for the left hero panel, for example #216B97.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color for the curved divider, for example #00A5B2.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the eyebrow and title.",
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center, right center, or 60% center.",
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
      name: "intro",
      title: "About Intro Section",
      type: "object",
      description: "The intro section under the hero with centered lead text, image, and body copy.",
      fields: [
        { name: "heading", title: "Lead Text", type: "sectionHeading" },
        { name: "image", title: "Section Image", type: "imageWithAlt" },
        { name: "body", title: "Body Text", type: "blockContent" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value for the section image.",
        },
      ],
    },
    {
      name: "principalMessage",
      title: "Principal Message Section",
      type: "imageTextSection",
      description: "Message from the principal with a fixed-height scrollable text area and principal image.",
    },
    {
      name: "governance",
      title: "Governance Board Section",
      type: "imageTextSection",
      description: "The teal text and image section below the About intro.",
    },
    {
      name: "inspection",
      title: "DSIB Review Section",
      type: "imageTextSection",
      description: "The white image and text section below the Governance Board section.",
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
        title: title || "About Us Page",
        subtitle,
        media,
      };
    },
  },
};

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
      name: "boardGovernors",
      title: "Board of Governors Section",
      type: "object",
      description: "The board member cards section shown on the About Us page.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "members",
          title: "Board Members",
          type: "array",
          of: [{ type: "boardGovernorMember" }],
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #f2f2f2.",
        },
      ],
    },
    {
      name: "statement",
      title: "Statement Section",
      type: "object",
      description: "The Vision and Mission cards section shown on the About Us page.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "cards",
          title: "Statement Cards",
          type: "array",
          of: [{ type: "statementCard" }],
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
      ],
    },
    {
      name: "values",
      title: "Values Slider Section",
      type: "object",
      description: "The Our Values slider section shown on the About Us page.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "slides",
          title: "Slides",
          type: "array",
          of: [{ type: "valuesSlide" }],
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "titleColor",
          title: "Main Title Color",
          type: "string",
          description: "Optional CSS color for the main section title.",
        },
        {
          name: "introTextColor",
          title: "Intro Text Color",
          type: "string",
          description: "Optional CSS color for the intro text under the main title.",
        },
      ],
    },
    {
      name: "accreditations",
      title: "Accreditations Section",
      type: "object",
      description: "The accreditations and authority logos section shown on the About Us page.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "body",
          title: "Body Text",
          type: "blockContent",
        },
        {
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() },
                { name: "image", title: "Logo Image", type: "imageWithAlt" },
                {
                  name: "width",
                  title: "Logo Width",
                  type: "string",
                  description: "Optional CSS width, for example 230px.",
                },
              ],
              preview: {
                select: {
                  title: "name",
                  media: "image.image",
                },
                prepare({ title, media }) {
                  return {
                    title: title || "Accreditation logo",
                    media,
                  };
                },
              },
            },
          ],
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #f4f4f4.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title.",
        },
        {
          name: "lineColor",
          title: "Divider Line Color",
          type: "string",
          description: "Optional CSS color for the horizontal divider.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the body text.",
        },
      ],
    },
    {
      name: "khdaSection",
      title: "KHDA Section",
      type: "object",
      description: "The KHDA licensed and approved section shown on the About Us page.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Section Image", type: "imageWithAlt" },
        { name: "badge", title: "KHDA Badge Image", type: "imageWithAlt" },
        { name: "cta", title: "Button", type: "cta" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center, right center, or 55% center.",
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color for the blue panel.",
        },
        {
          name: "accentColor",
          title: "Curve Color",
          type: "string",
          description: "Optional CSS color for the curved accent.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the body text.",
        },
      ],
    },
    {
      name: "branches",
      title: "Branches Section",
      type: "object",
      description: "The Our Branches cards section shown on the About Us page.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "cards",
          title: "Branch Cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Branch Name", type: "string", validation: (Rule) => Rule.required() },
                { name: "established", title: "Established Year", type: "string" },
                { name: "location", title: "Location", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 5 },
                { name: "image", title: "Branch Image", type: "imageWithAlt" },
                { name: "cta", title: "Button", type: "cta" },
                {
                  name: "cardColor",
                  title: "Card Background Color",
                  type: "string",
                  description: "Optional CSS color for the card background.",
                },
                {
                  name: "buttonColor",
                  title: "Button Icon Color",
                  type: "string",
                  description: "Optional CSS color for the circular arrow icon.",
                },
                {
                  name: "imagePosition",
                  title: "Image Position",
                  type: "string",
                  description: "Optional CSS object-position value, for example center or 50% 40%.",
                },
              ],
              preview: {
                select: {
                  title: "name",
                  subtitle: "location",
                  media: "image.image",
                },
                prepare({ title, subtitle, media }) {
                  return {
                    title: title || "Branch card",
                    subtitle,
                    media,
                  };
                },
              },
            },
          ],
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #f3f3f3.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title.",
        },
        {
          name: "lineColor",
          title: "Divider Line Color",
          type: "string",
          description: "Optional CSS color for the horizontal divider.",
        },
      ],
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

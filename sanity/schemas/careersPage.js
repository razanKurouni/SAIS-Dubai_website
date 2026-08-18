export const careersPage = {
  name: "careersPage",
  title: "Careers Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the Careers page.",
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
          title: "Dark Panel Background Color",
          type: "string",
          description: "Optional CSS color for the left hero panel, for example #707174.",
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
          description: "Optional CSS color for the title.",
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
      title: "Page Content",
      type: "object",
      description: "Editable content shown below the hero.",
      fields: [
        { name: "heading", title: "Heading & Body", type: "sectionHeading" },
        { name: "image", title: "Section Image", type: "imageWithAlt" },
        {
          name: "ctas",
          title: "Buttons",
          type: "array",
          of: [{ type: "cta" }],
        },
      ],
    },
    {
      name: "editorialSection",
      title: "Text + Image Section",
      type: "imageTextSection",
      description: "Editable text and image section shown below the Work For SAIS section.",
    },
    {
      name: "careSection",
      title: "Professional Care Section",
      type: "object",
      description: "Editable curved image panel shown below the careers intro content.",
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
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color, for example #d97252.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
      ],
    },
    {
      name: "requirementsSection",
      title: "Commitment & Requirements Section",
      type: "object",
      description: "Editable two-column list section shown below the Professional Care panel.",
      fields: [
        {
          name: "columns",
          title: "Columns",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "intro", title: "Intro Text", type: "text", rows: 2 },
                {
                  name: "items",
                  title: "List Items",
                  type: "array",
                  of: [{ type: "string" }],
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "intro",
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "joinTeamSection",
      title: "Join Our Team Section",
      type: "object",
      description: "Editable application cards shown at the bottom of the Careers page.",
      fields: [
        { name: "heading", title: "Heading & Intro", type: "sectionHeading" },
        {
          name: "cards",
          title: "Application Cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", title: "Icon", type: "imageWithAlt" },
                { name: "label", title: "Card Label", type: "string" },
                { name: "text", title: "Visible Link Text", type: "string" },
                {
                  name: "href",
                  title: "Card Link",
                  type: "string",
                  description: "Use mailto: for email cards, or a full URL for website links.",
                },
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "text",
                  media: "icon.image",
                },
              },
            },
          ],
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
        title: title || "Careers Page",
        subtitle,
        media,
      };
    },
  },
};

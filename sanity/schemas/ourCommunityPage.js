export const ourCommunityPage = {
  name: "ourCommunityPage",
  title: "Our Community Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the Our Community page.",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image", type: "imageWithAlt" },
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
          description: "Optional CSS color for the left hero panel.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color for the curved divider.",
        },
        { name: "textColor", title: "Text Color", type: "string" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value.",
        },
        {
          name: "imageWidth",
          title: "Desktop Image Width",
          type: "string",
          description: "Optional CSS width for desktop, for example 60%.",
        },
      ],
    },
    {
      name: "supportSection",
      title: "Supporting Every Student Section",
      type: "imageTextSection",
      description: "Editable curved image and text section below the hero.",
    },
    {
      name: "linksSection",
      title: "Learn About Our Community Cards",
      type: "object",
      description: "Editable cards shown under the community intro.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [{ type: "featureCard" }],
        },
        {
          name: "cta",
          title: "Section Button",
          type: "cta",
          description: "Optional button shown at the top right, same as Learning Phases.",
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Our Community",
        subtitle: "Hero, support section, and community cards",
      };
    },
  },
};

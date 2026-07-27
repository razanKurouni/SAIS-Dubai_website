export const ourTeamPage = {
  name: "ourTeamPage",
  title: "Our Team Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the Our Team page.",
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
          title: "Dark Panel Background Color",
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
          description: "Optional CSS color for the hero title.",
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
      name: "leadershipSection",
      title: "Leadership Team Section",
      type: "object",
      description: "Editable academic team intro and leadership cards shown below the hero.",
      fields: [
        { name: "heading", title: "Intro Text", type: "sectionHeading" },
        {
          name: "groupTitle",
          title: "Group Title",
          type: "string",
          description: "Example: Senior Leadership Team.",
        },
        {
          name: "members",
          title: "Team Members",
          type: "array",
          of: [{ type: "boardGovernorMember" }],
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "introColor",
          title: "Intro Text Color",
          type: "string",
          description: "Optional CSS color for the large intro text.",
        },
        {
          name: "bodyColor",
          title: "Small Text Color",
          type: "string",
          description: "Optional CSS color for the small paragraph under the intro.",
        },
        {
          name: "titleColor",
          title: "Group Title Color",
          type: "string",
          description: "Optional CSS color for the group title.",
        },
        {
          name: "lineColor",
          title: "Divider Line Color",
          type: "string",
          description: "Optional CSS color for the line under the group title.",
        },
      ],
    },
    {
      name: "departmentsSection",
      title: "Departments Section",
      type: "object",
      description: "Editable department image slider shown on the Our Team page.",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "slides",
          title: "Department Slides",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Slide Title",
                  type: "string",
                  description: "Use this when the slide has one full-width image.",
                },
                {
                  name: "image",
                  title: "Slide Image",
                  type: "imageWithAlt",
                  description: "Use this for one full-width image slide.",
                },
                {
                  name: "imagePosition",
                  title: "Image Position",
                  type: "string",
                  description: "Optional CSS object-position value, for example center or 50% 45%.",
                },
                {
                  name: "panels",
                  title: "Split Panels",
                  type: "array",
                  description: "Use this when one slide needs two department images side by side.",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "title", title: "Panel Title", type: "string" },
                        { name: "image", title: "Panel Image", type: "imageWithAlt" },
                        {
                          name: "imagePosition",
                          title: "Image Position",
                          type: "string",
                          description: "Optional CSS object-position value.",
                        },
                      ],
                      preview: {
                        select: {
                          title: "title",
                          media: "image.image",
                        },
                        prepare({ title, media }) {
                          return {
                            title: title || "Department panel",
                            media,
                          };
                        },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: "title",
                  media: "image.image",
                },
                prepare({ title, media }) {
                  return {
                    title: title || "Department slide",
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
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "titleColor",
          title: "Main Title Color",
          type: "string",
          description: "Optional CSS color for the main section title.",
        },
        {
          name: "slideTitleColor",
          title: "Slide Title Color",
          type: "string",
          description: "Optional CSS color for department titles.",
        },
        {
          name: "lineColor",
          title: "Divider Line Color",
          type: "string",
          description: "Optional CSS color for divider lines.",
        },
      ],
    },
    {
      name: "pastoralSection",
      title: "Pastoral Team Section",
      type: "object",
      description: "Editable Pastoral Team image section shown on the Our Team page.",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        { name: "image", title: "Team Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 50% 45%.",
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the title.",
        },
        {
          name: "lineColor",
          title: "Divider Line Color",
          type: "string",
          description: "Optional CSS color for the divider line.",
        },
      ],
    },
    {
      name: "administrationSection",
      title: "Administration Team Section",
      type: "object",
      description: "Editable Administration Team image section shown on the Our Team page.",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        { name: "image", title: "Team Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 50% 45%.",
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the title.",
        },
        {
          name: "lineColor",
          title: "Divider Line Color",
          type: "string",
          description: "Optional CSS color for the divider line.",
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
        title: title || "Our Team Page",
        subtitle,
        media,
      };
    },
  },
};

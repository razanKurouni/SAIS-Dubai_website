export const academicsMiddleSchoolPage = {
  name: "academicsMiddleSchoolPage",
  title: "Academics Middle School Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      description: "Editable hero content and colors for the Middle School page.",
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
          description: "Optional CSS color for the left hero panel, for example #d97252.",
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
          description: "Optional CSS color for the title, for example #ffffff.",
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 55% center.",
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
      description: "Editable navigation bar shown below the Middle School hero.",
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
          description: "The href that should be highlighted, for example /academics/middle-school.",
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
      name: "overviewSection",
      title: "Stepping Into Specialised Learning Section",
      type: "object",
      description: "Editable text and image section below the Academics navigation.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Side",
          type: "string",
          description: "Choose where the image appears in this section.",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
        },
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
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
          description: "Optional CSS color, for example #666b70.",
        },
      ],
    },
    {
      name: "tailoredInstructionSection",
      title: "Tailored Instruction Section",
      type: "object",
      description: "Editable curved image and text band for the Middle School page.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imageSide",
          title: "Image Side",
          type: "string",
          description: "Choose where the image appears in this curved band.",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
        },
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
          description: "Optional CSS color, for example #d97252.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title, for example #ffffff.",
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
      name: "curriculumOverviewSection",
      title: "The Curriculum Section",
      type: "object",
      description: "Editable teal curriculum section with two alternating image and text rows.",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Optional CSS color for the full section background, for example #00A5B2.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the heading, for example #216B97.",
        },
        {
          name: "textColor",
          title: "Body Text Color",
          type: "string",
          description: "Optional CSS color for body text, for example #ffffff.",
        },
        {
          name: "firstBlock",
          title: "First Row",
          type: "imageTextSection",
          description: "First row content. The page displays this image on the left by default.",
        },
        {
          name: "secondBlock",
          title: "Second Row",
          type: "imageTextSection",
          description: "Second row content. The page displays this image on the right by default.",
        },
      ],
    },
    {
      name: "assessmentSection",
      title: "Assessment Section",
      type: "object",
      description: "Editable curved assessment card for the Middle School page.",
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
          description: "Optional CSS color, for example #d97252.",
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
          description: "Optional CSS color for the section title, for example #ffffff.",
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
      name: "supportProgramsSection",
      title: "Inclusion & Support Programs Slider",
      type: "object",
      description: "Editable support program cards displayed as a horizontal slider.",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Optional CSS color for the section background, for example #ffffff.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the section title, for example #00A5B2.",
        },
        {
          name: "cardBorderColor",
          title: "Card Border Color",
          type: "string",
          description: "Optional CSS color for card borders, for example #216B97.",
        },
        {
          name: "cardHoverBorderColor",
          title: "Card Hover Border Color",
          type: "string",
          description: "Optional CSS color for card hover borders, for example #00A5B2.",
        },
        {
          name: "cardTextColor",
          title: "Card Title Color",
          type: "string",
          description: "Optional CSS color for card titles, for example #216B97.",
        },
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 4 },
                { name: "icon", title: "Optional Icon Image", type: "imageWithAlt" },
                {
                  name: "iconType",
                  title: "Fallback Icon Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "Students of Determination", value: "determination" },
                      { title: "Gifted and Talented", value: "gifted" },
                      { title: "EAL Learners", value: "eal" },
                      { title: "Academic Counseling", value: "counseling" },
                      { title: "Differentiation", value: "differentiation" },
                    ],
                    layout: "radio",
                  },
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "description",
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
        title: title || "Academics Middle School Page",
        subtitle,
        media,
      };
    },
  },
};

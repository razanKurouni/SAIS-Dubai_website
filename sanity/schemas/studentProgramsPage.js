const proactiveApproachFields = [
  { name: "heading", title: "Heading Text", type: "sectionHeading" },
  {
    name: "cards",
    title: "Cards",
    type: "array",
    of: [
      {
        type: "object",
        name: "studentProgramsIconCard",
        title: "Icon Card",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text", rows: 3 },
          { name: "icon", title: "Icon", type: "imageWithAlt" },
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
  { name: "backgroundColor", title: "Background Color", type: "string" },
  { name: "titleColor", title: "Title Color", type: "string" },
  { name: "textColor", title: "Intro Text Color", type: "string" },
  { name: "cardTextColor", title: "Card Title Color", type: "string" },
  { name: "cardBorderColor", title: "Card Border Color", type: "string" },
  { name: "cardHoverBorderColor", title: "Card Hover Border Color", type: "string" },
];

const teachingCommitmentsFields = [
  { name: "heading", title: "Heading Text", type: "sectionHeading" },
  {
    name: "cards",
    title: "Cards",
    type: "array",
    of: [
      {
        type: "object",
        name: "studentProgramsTeachingCard",
        title: "Teaching Card",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text", rows: 3 },
          { name: "icon", title: "Icon", type: "imageWithAlt" },
          {
            name: "iconType",
            title: "Fallback Icon",
            type: "string",
            options: {
              list: [
                { title: "Expectations", value: "expectations" },
                { title: "Engagement", value: "engagement" },
                { title: "Achievement", value: "achievement" },
              ],
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
];

const leadershipMemberFields = [
  { name: "name", title: "Student Name", type: "string" },
  { name: "role", title: "Role", type: "string" },
  { name: "description", title: "Description", type: "text", rows: 3 },
  { name: "image", title: "Image", type: "imageWithAlt" },
];

export const studentProgramsPage = {
  name: "studentProgramsPage",
  title: "Student Programs Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image (Desktop)", type: "imageWithAlt" },
        { name: "mobileImage", title: "Hero Image (Mobile)", type: "imageWithAlt", description: "Optional image used on screens up to 920px wide. Falls back to the desktop image when empty." },
        { name: "topLineColor", title: "Top Line Color", type: "string" },
        { name: "panelColor", title: "Panel Background Color", type: "string" },
        { name: "waveColor", title: "Curved Line Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
        { name: "imagePosition", title: "Image Position", type: "string" },
        { name: "imageWidth", title: "Desktop Image Width", type: "string" },
      ],
    },
    {
      name: "innerNavigation",
      title: "Inner Navigation",
      type: "object",
      fields: [
        {
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "href", title: "URL", type: "string" },
                { name: "openInNewTab", title: "Open in new tab", type: "boolean" },
              ],
            },
          ],
        },
        { name: "activeHref", title: "Active URL", type: "string" },
        { name: "activeColor", title: "Active Color", type: "string" },
        { name: "inactiveColor", title: "Inactive Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
        { name: "dividerColor", title: "Divider Color", type: "string" },
        { name: "topLineColor", title: "Top Line Color", type: "string" },
        { name: "ariaLabel", title: "Accessibility Label", type: "string" },
      ],
    },
    {
      name: "introSection",
      title: "Intro Feature Section",
      type: "imageTextSection",
    },
    {
      name: "proactiveApproach",
      title: "Student Leadership Program",
      type: "object",
      fields: proactiveApproachFields,
    },
    {
      name: "studentCongressSection",
      title: "SAIS Student Congress",
      type: "object",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        { name: "imagePosition", title: "Image Position", type: "string" },
        { name: "panelColor", title: "Panel Background Color", type: "string" },
        { name: "waveColor", title: "Curved Line Color", type: "string" },
        { name: "titleColor", title: "Title Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
      ],
    },
    {
      name: "sgaGoalsSection",
      title: "Student Government Association Goals",
      type: "object",
      fields: proactiveApproachFields,
    },
    {
      name: "coreValuesSection",
      title: "Core Values",
      type: "object",
      fields: teachingCommitmentsFields,
    },
    {
      name: "leadershipStructureSection",
      title: "Leadership Structure",
      type: "object",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        { name: "executiveHeading", title: "Executive Leadership Heading", type: "string" },
        {
          name: "executiveMembers",
          title: "Executive Leadership Members",
          type: "array",
          of: [
            {
              type: "object",
              name: "studentProgramsExecutiveLeader",
              title: "Executive Leader",
              fields: leadershipMemberFields,
              preview: {
                select: {
                  title: "name",
                  subtitle: "role",
                  media: "image.image",
                },
              },
            },
          ],
        },
        { name: "ministerialHeading", title: "Ministerial Positions Heading", type: "string" },
        {
          name: "ministerialMembers",
          title: "Ministerial Members",
          type: "array",
          of: [
            {
              type: "object",
              name: "studentProgramsMinisterialLeader",
              title: "Ministerial Leader",
              fields: leadershipMemberFields,
              preview: {
                select: {
                  title: "name",
                  subtitle: "role",
                  media: "image.image",
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "eligibilitySection",
      title: "Eligibility and Election Process",
      type: "imageTextSection",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Student Programs",
        subtitle: "Student Life detail page",
      };
    },
  },
};

export const metricItem = {
  name: "metricItem",
  title: "Metric",
  type: "object",
  fields: [
    { name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() },
    { name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() },
  ],
};

export const featureCard = {
  name: "featureCard",
  title: "Feature Card",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short card description. Optional.",
    },
    { name: "image", title: "Image", type: "imageWithAlt" },
    { name: "cta", title: "Button", type: "cta" },
    {
      name: "theme",
      title: "Card Color Theme",
      type: "string",
      description: "Used by sections like Learning Phases to control each card color.",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Teal", value: "teal" },
          { title: "Orange", value: "orange" },
          { title: "Gray", value: "gray" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Feature card",
        subtitle,
        media,
      };
    },
  },
};

export const imageTextSection = {
  name: "imageTextSection",
  title: "Image + Text Section",
  type: "object",
  fields: [
    { name: "heading", title: "Text Content", type: "sectionHeading" },
    { name: "image", title: "Image", type: "imageWithAlt" },
    {
      name: "ctas",
      title: "Buttons",
      type: "array",
      of: [{ type: "cta" }],
    },
    {
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    },
    {
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Teal", value: "teal" },
          { title: "Light", value: "light" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    },
  ],
};

export const boardGovernorMember = {
  name: "boardGovernorMember",
  title: "Board Governor Member",
  type: "object",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() },
    { name: "role", title: "Role", type: "string" },
    { name: "image", title: "Photo", type: "imageWithAlt" },
    {
      name: "cardColor",
      title: "Name Bar Color",
      type: "string",
      description: "Optional CSS color for the bottom name bar, for example #27779D.",
    },
    {
      name: "imageBackgroundColor",
      title: "Photo Area Background Color",
      type: "string",
      description: "Optional CSS color used when no photo is uploaded.",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Board member",
        subtitle,
        media,
      };
    },
  },
};

export const statementCard = {
  name: "statementCard",
  title: "Statement Card",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    },
    { name: "image", title: "Image", type: "imageWithAlt" },
    {
      name: "cardColor",
      title: "Card Background Color",
      type: "string",
      description: "Optional CSS color for the text area, for example #27779D or #00A5B2.",
    },
    {
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      description: "Optional CSS object-position value, for example center, left center, or 55% center.",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Statement card",
        subtitle,
        media,
      };
    },
  },
};

export const whyDubaiItem = {
  name: "whyDubaiItem",
  title: "Why SAIS Dubai Item",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Admin Label",
      type: "string",
      description: "For organizing this item inside Sanity only. This text is not shown on the website.",
    },
    {
      name: "description",
      title: "Visible Text on Website",
      type: "text",
      rows: 3,
      description: "This is the text shown under the icon on the website.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon Image",
      type: "imageWithAlt",
      description: "Upload the SVG/PNG icon shown inside the white circle.",
    },
    {
      name: "iconType",
      title: "Icon Type",
      type: "string",
      options: {
        list: [
          { title: "Achievement / Student", value: "student" },
          { title: "Globe / Standards", value: "globe" },
          { title: "Learning / Adaptation", value: "learning" },
          { title: "Family / Community", value: "family" },
        ],
        layout: "radio",
      },
      initialValue: "student",
    },
  ],
  preview: {
    select: {
      title: "description",
      subtitle: "title",
      media: "icon.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Icon item text",
        subtitle: subtitle ? `Admin label: ${subtitle}` : "Visible website text",
        media,
      };
    },
  },
};

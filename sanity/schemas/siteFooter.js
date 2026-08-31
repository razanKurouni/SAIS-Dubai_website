import { ImageIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

const contactIconPreviews = {
  location: MapPinIcon,
  phone: PhoneIcon,
  email: MailIcon,
};

export const siteFooter = {
  name: "siteFooter",
  title: "Footer",
  type: "document",
  icon: ImageIcon,
  fields: [
    { name: "logo", title: "Footer Logo", type: "imageWithAlt" },
    { name: "logoText", title: "Logo Text", type: "string" },
    { name: "contactText", title: "Contact Text", type: "blockContent" },
    {
      name: "contactItems",
      title: "Contact Information",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Item Name", type: "string", validation: (Rule) => Rule.required() },
            { name: "text", title: "Displayed Text", type: "text", rows: 4, validation: (Rule) => Rule.required() },
            { name: "href", title: "Link", type: "string", validation: (Rule) => Rule.required() },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Location", value: "location" },
                  { title: "Phone", value: "phone" },
                  { title: "Email", value: "email" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "label", subtitle: "text", icon: "icon" },
            prepare({ title, subtitle, icon }) {
              return {
                title,
                subtitle,
                media: contactIconPreviews[icon] || MapPinIcon,
              };
            },
          },
        },
      ],
    },
    {
      name: "columns",
      title: "Link Columns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Column Title", type: "string" },
            {
              name: "links",
              title: "Pages",
              description: "Edit each page name and page link shown in the footer.",
              type: "array",
              of: [{ type: "linkField" }],
            },
          ],
        },
      ],
    },
    {
      name: "parentStudentLinks",
      title: "Parents & Students Links",
      description: "Sitewide links for the portal, online applications, and the mograHUB app.",
      type: "array",
      of: [{ type: "linkField" }],
    },
    { name: "parentStudentLinksTitle", title: "Parents & Students Heading", type: "string" },
    {
      name: "quickLinks",
      title: "Quick Links",
      description: "The four main links shown in the sitewide footer.",
      type: "array",
      of: [{ type: "linkField" }],
    },
    { name: "quickLinksTitle", title: "Quick Links Heading", type: "string" },
    { name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "linkField" }] },
    { name: "legalLinks", title: "Legal Links", type: "array", of: [{ type: "linkField" }] },
    { name: "copyrightText", title: "Copyright Text", type: "string" },
    { name: "creditLabel", title: "Credit Label", type: "string", description: "Example: Site by" },
    { name: "creditName", title: "Credit Name", type: "string", description: "Example: Formulate" },
    { name: "creditUrl", title: "Credit Link", type: "url" },
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
        subtitle: "Footer columns, contact text, social links, and legal links",
      };
    },
  },
};

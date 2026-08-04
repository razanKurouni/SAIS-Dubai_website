import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { SchemaTypeDefinition } from "sanity";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const singletonTypes = [
  "siteHeader",
  "homepage",
  "academicsPage",
  "aboutPage",
  "ourTeamPage",
  "ourCommunityPage",
  "ourCampusPage",
  "studentStaffWellbeingPage",
  "studentInclusionPage",
  "careersPage",
  "contactPage",
  "siteFooter",
];

export default defineConfig({
  name: "saisDubai",
  title: "SAIS Dubai",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website Content")
          .items([
            S.listItem()
              .title("Menu / Header")
              .schemaType("siteHeader")
              .child(S.document().schemaType("siteHeader").documentId("site-header-main")),
            S.listItem()
              .title("Homepage")
              .schemaType("homepage")
              .child(S.document().schemaType("homepage").documentId("homepage-main")),
            S.listItem()
              .title("Academics Introduction")
              .schemaType("academicsPage")
              .child(S.document().schemaType("academicsPage").documentId("academics-page")),
            S.listItem()
              .title("About Us")
              .schemaType("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("about-page")),
            S.listItem()
              .title("Our Team")
              .schemaType("ourTeamPage")
              .child(S.document().schemaType("ourTeamPage").documentId("our-team-page")),
            S.listItem()
              .title("Our Community")
              .schemaType("ourCommunityPage")
              .child(S.document().schemaType("ourCommunityPage").documentId("our-community-page")),
            S.listItem()
              .title("Our Campus")
              .schemaType("ourCampusPage")
              .child(S.document().schemaType("ourCampusPage").documentId("our-campus-page")),
            S.listItem()
              .title("Student & Staff Wellbeing")
              .schemaType("studentStaffWellbeingPage")
              .child(S.document().schemaType("studentStaffWellbeingPage").documentId("student-staff-wellbeing-page")),
            S.listItem()
              .title("Student Inclusion")
              .schemaType("studentInclusionPage")
              .child(S.document().schemaType("studentInclusionPage").documentId("student-inclusion-page")),
            S.listItem()
              .title("Careers")
              .schemaType("careersPage")
              .child(S.document().schemaType("careersPage").documentId("careers-page")),
            S.listItem()
              .title("Contact Us")
              .schemaType("contactPage")
              .child(S.document().schemaType("contactPage").documentId("contact-page")),
            S.listItem()
              .title("Footer")
              .schemaType("siteFooter")
              .child(S.document().schemaType("siteFooter").documentId("site-footer")),
            S.divider(),
            ...S.documentTypeListItems().filter((listItem) => {
              const id = listItem.getId();
              return id ? !singletonTypes.includes(id) : true;
            }),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes as unknown as SchemaTypeDefinition[],
    templates: (templates) =>
      templates.filter(
        (template) => !singletonTypes.includes(template.id)
      ),
  },
});

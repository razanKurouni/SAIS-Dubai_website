import { defineConfig } from "sanity";
import { structureTool, type ListItemBuilder } from "sanity/structure";
import type { SchemaTypeDefinition } from "sanity";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const singletonTypes = [
  "siteHeader",
  "homepage",
  "aboutPage",
  "ourTeamPage",
  "academicsPage",
  "academicsKindergartenPage",
  "academicsElementaryPage",
  "academicsMiddleSchoolPage",
  "academicsHighSchoolPage",
  "admissionsPage",
  "admissionsApplicationPage",
  "admissionsBookTourPage",
  "admissionsFaqPage",
  "admissionsFeesPage",
  "admissionsWithdrawalPage",
  "ourCommunityPage",
  "ourCampusPage",
  "studentStaffWellbeingPage",
  "studentInclusionPage",
  "parentInvolvementPage",
  "schoolCalendarPage",
  "schoolPoliciesPage",
  "healthSafetyPage",
  "foodServicesNutritionPage",
  "medicalServicesPage",
  "schoolSuppliesUniformPage",
  "transportationSafetyPage",
  "studentLifePage",
  "studentProgramsPage",
  "extraCurricularActivitiesPage",
  "newsListingPage",
  "contactPage",
  "careersPage",
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
      structure: (S) => {
        const singletonItem = (title: string, schemaType: string, documentId: string) =>
          S.listItem()
            .title(title)
            .schemaType(schemaType)
            .child(S.document().schemaType(schemaType).documentId(documentId));

        const pageGroup = (title: string, items: ListItemBuilder[]) =>
          S.listItem()
            .title(title)
            .child(S.list().title(title).items(items));

        return S.list()
          .title("Website Content")
          .items([
            pageGroup("Global Settings", [
              singletonItem("Menu / Header", "siteHeader", "site-header-main"),
              singletonItem("Footer", "siteFooter", "site-footer"),
            ]),
            singletonItem("Homepage", "homepage", "homepage-main"),
            pageGroup("About SAIS", [
              singletonItem("About SAIS", "aboutPage", "about-page"),
              singletonItem("Our Team", "ourTeamPage", "our-team-page"),
            ]),
            pageGroup("Academics", [
              singletonItem("Academics Introduction", "academicsPage", "academics-page"),
              singletonItem("Kindergarten", "academicsKindergartenPage", "academics-kindergarten-page"),
              singletonItem("Elementary", "academicsElementaryPage", "academics-elementary-page"),
              singletonItem("Middle School", "academicsMiddleSchoolPage", "academics-middle-school-page"),
              singletonItem("High School", "academicsHighSchoolPage", "academics-high-school-page"),
            ]),
            pageGroup("Admissions", [
              singletonItem("Admissions Intro", "admissionsPage", "admissions-page"),
              singletonItem("Applications", "admissionsApplicationPage", "admissions-application-page"),
              singletonItem("Book A Tour", "admissionsBookTourPage", "admissions-book-tour-page"),
              singletonItem("FAQ's", "admissionsFaqPage", "admissions-faq-page"),
              singletonItem("Fees", "admissionsFeesPage", "admissions-fees-page"),
              singletonItem("Withdrawal", "admissionsWithdrawalPage", "admissions-withdrawal-page"),
            ]),
            pageGroup("Our Community", [
              singletonItem("Our Community", "ourCommunityPage", "our-community-page"),
              singletonItem("Our Campus", "ourCampusPage", "our-campus-page"),
              singletonItem("Student & Staff Wellbeing", "studentStaffWellbeingPage", "student-staff-wellbeing-page"),
              singletonItem("Student Inclusion", "studentInclusionPage", "student-inclusion-page"),
              singletonItem("Parent Involvement", "parentInvolvementPage", "parent-involvement-page"),
              singletonItem("School Calendar", "schoolCalendarPage", "school-calendar-page"),
              singletonItem("School Policies", "schoolPoliciesPage", "school-policies-page"),
              singletonItem("Health & Safety", "healthSafetyPage", "health-safety-page"),
              singletonItem("Food Services & Nutrition", "foodServicesNutritionPage", "food-services-nutrition-page"),
              singletonItem("Medical Services", "medicalServicesPage", "medical-services-page"),
              singletonItem("School Supplies & Uniform", "schoolSuppliesUniformPage", "school-supplies-uniform-page"),
              singletonItem("Transportation Safety Guidelines", "transportationSafetyPage", "transportation-safety-page"),
            ]),
            pageGroup("Student Life", [
              singletonItem("Student Life", "studentLifePage", "student-life-page"),
              singletonItem("Student Programs", "studentProgramsPage", "student-programs-page"),
              singletonItem("Extra Curricular Activities", "extraCurricularActivitiesPage", "extra-curricular-activities-page"),
            ]),
            pageGroup("News & Events", [
              singletonItem("Latest News Page", "newsListingPage", "news-listing-page"),
              S.listItem()
                .title("News Posts")
                .schemaType("newsPost")
                .child(S.documentTypeList("newsPost").title("News Posts")),
            ]),
            singletonItem("Contact Us", "contactPage", "contact-page"),
            singletonItem("Careers", "careersPage", "careers-page"),
            S.divider(),
            ...S.documentTypeListItems().filter((listItem) => {
              const id = listItem.getId();
              return id ? !singletonTypes.includes(id) && id !== "newsPost" : true;
            }),
          ]);
      },
    }),
  ],
  schema: {
    types: schemaTypes as unknown as SchemaTypeDefinition[],
    templates: (templates) => templates.filter((template) => !singletonTypes.includes(template.id)),
  },
  document: {
    actions: (previousActions, context) => {
      if (context.schemaType === "newsPost") {
        const deleteAction = previousActions.find((action) => action.action === "delete");

        return deleteAction
          ? [deleteAction, ...previousActions.filter((action) => action !== deleteAction)]
          : previousActions;
      }

      if (singletonTypes.includes(context.schemaType)) {
        return previousActions.filter(
          (action) => action.action !== "delete" && action.action !== "duplicate",
        );
      }

      return previousActions;
    },
  },
});

import { defineConfig } from "sanity";
import { structureTool, type ListItemBuilder, type StructureBuilder } from "sanity/structure";
import type { SchemaTypeDefinition } from "sanity";
import { schemaTypes } from "./sanity/schemas";
import { PAGE_GROUPS, PAGE_SPECS, pageDocumentId } from "./src/content/page-spec";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const SITE_SETTINGS_ID = "site-settings";

/** Document types that exist once (or as a fixed set) and must not be created or deleted from the Studio. */
const fixedTypes = ["siteSettings", "page"];

function pageItem(S: StructureBuilder, specId: string, title: string): ListItemBuilder {
  const id = pageDocumentId(specId);
  return S.listItem()
    .title(title)
    .id(id)
    .schemaType("page")
    .child(S.document().schemaType("page").documentId(id).title(title));
}

export default defineConfig({
  name: "saisDubai",
  title: "SAIS Dubai",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) => {
        const groups = PAGE_GROUPS.map((group) => {
          const pages = PAGE_SPECS.filter((spec) => spec.group === group);
          if (pages.length === 1) {
            return pageItem(S, pages[0].id, pages[0].title);
          }
          return S.listItem()
            .title(group)
            .id(group.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
            .child(S.list().title(group).items(pages.map((spec) => pageItem(S, spec.id, spec.title))));
        });

        return S.list()
          .title("Website Content")
          .items([
            S.listItem()
              .title("Site Settings (Menu & Footer)")
              .id(SITE_SETTINGS_ID)
              .schemaType("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId(SITE_SETTINGS_ID)),
            S.divider(),
            ...groups,
            S.divider(),
            S.listItem()
              .title("News Posts")
              .id("news-posts")
              .schemaType("newsPost")
              .child(S.documentTypeList("newsPost").title("News Posts")),
          ]);
      },
    }),
  ],
  schema: {
    types: schemaTypes as unknown as SchemaTypeDefinition[],
    templates: (templates) => templates.filter((template) => !fixedTypes.includes(template.schemaType)),
  },
  document: {
    actions: (previousActions, context) => {
      if (fixedTypes.includes(context.schemaType)) {
        return previousActions.filter(
          (action) => action.action !== "delete" && action.action !== "duplicate" && action.action !== "unpublish",
        );
      }

      return previousActions;
    },
  },
});

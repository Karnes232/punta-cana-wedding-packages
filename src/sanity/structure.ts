import type { StructureResolver } from "sanity/structure";

// Document IDs for singletons — one document per dataset
const SINGLETONS = {
  generalLayout: "generalLayout",
  homePage: "homePage",
  aboutPage: "aboutPage",
  howItWorksPage: "howItWorksPage",
  privacyPolicy: "privacyPolicy",
  termsOfService: "termsOfService",
  contactPage: "contactPage",
  calculatorConfig: "calculatorConfig",
} as const;

// Calculator collection types — excluded from auto-generated list
const CALCULATOR_TYPES = new Set([
  "menuOption",
  "barPackage",
  "furnitureOption",
  "decorPackage",
  "photoPackage",
  "videoPackage",
  "transportationZone",
  "entertainmentOption",
  "extraOption",
  "calculatorConfig",
]);

// All singleton document IDs — excluded from auto-generated list items
const SINGLETON_IDS = new Set<string>(Object.values(SINGLETONS));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ── Site Settings (singletons) ───────────────────────────────────────
      S.listItem()
        .title("General Layout")
        .id("generalLayout")
        .child(
          S.document()
            .schemaType("generalLayout")
            .documentId("generalLayout")
            .title("General Layout"),
        ),

      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Home Page"),
        ),

      S.listItem()
        .title("About Us Page")
        .id("aboutPage")
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("About Us Page"),
        ),

      S.listItem()
        .title("How It Works Page")
        .id("howItWorksPage")
        .child(
          S.document()
            .schemaType("howItWorksPage")
            .documentId("howItWorksPage")
            .title("How It Works Page"),
        ),

      S.listItem()
        .title("Privacy Policy")
        .id("privacyPolicy")
        .child(
          S.document()
            .schemaType("privacyPolicy")
            .documentId("privacyPolicy")
            .title("Privacy Policy"),
        ),

      S.listItem()
        .title("Terms of Service")
        .id("termsOfService")
        .child(
          S.document()
            .schemaType("termsOfService")
            .documentId("termsOfService")
            .title("Terms of Service"),
        ),

      S.listItem()
        .title("Contact Page")
        .id("contactPage")
        .child(
          S.document()
            .schemaType("contactPage")
            .documentId("contactPage")
            .title("Contact Page"),
        ),

      S.divider(),

      // ── Wedding Stories ───────────────────────────────────────────────────
      S.listItem()
        .title("Wedding Stories")
        .id("weddingStory")
        .child(
          S.documentTypeList("weddingStory")
            .title("Wedding Stories")
            .defaultOrdering([
              { field: "featured", direction: "desc" },
              { field: "publishedAt", direction: "desc" },
            ]),
        ),

      // ── Page SEO ─────────────────────────────────────────────────────────
      S.listItem()
        .title("Page SEO")
        .id("pageSeo")
        .child(
          S.documentTypeList("pageSeo")
            .title("Page SEO")
            .defaultOrdering([{ field: "pageName", direction: "asc" }]),
        ),

      S.divider(),

      // ── Wedding Calculator Pricing ────────────────────────────────────────
      S.listItem()
        .title("Wedding Calculator")
        .id("calculatorSection")
        .child(
          S.list()
            .title("Wedding Calculator Pricing")
            .items([
              S.listItem()
                .title("Configuration")
                .id("calculatorConfig")
                .child(
                  S.document()
                    .schemaType("calculatorConfig")
                    .documentId("calculatorConfig")
                    .title("Calculator Configuration"),
                ),
              S.divider(),
              S.documentTypeListItem("menuOption").title("Menu Options"),
              S.documentTypeListItem("barPackage").title("Bar Packages"),
              S.documentTypeListItem("furnitureOption").title(
                "Furniture Options",
              ),
              S.documentTypeListItem("decorPackage").title("Decor Packages"),
              S.documentTypeListItem("photoPackage").title(
                "Photography Packages",
              ),
              S.documentTypeListItem("videoPackage").title(
                "Videography Packages",
              ),
              S.documentTypeListItem("transportationZone").title(
                "Transportation Zones",
              ),
              S.documentTypeListItem("entertainmentOption").title(
                "Entertainment Options",
              ),
              S.documentTypeListItem("extraOption").title("Extra Experiences"),
            ]),
        ),

      S.divider(),

      // ── All other document types (auto-generated, excluding singletons) ──
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETON_IDS.has(item.getId() ?? "") &&
          !CALCULATOR_TYPES.has(item.getId() ?? "") &&
          item.getId() !== "pageSeo" &&
          item.getId() !== "weddingStory",
      ),
    ]);

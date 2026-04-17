import { type SchemaTypeDefinition } from "sanity";

// Localized primitive types (must be registered before any schema that uses them)
import {
  localizedString,
  localizedText,
  localizedBlock,
  blogLocalizedString,
  blogLocalizedText,
  blogLocalizedBlock,
} from "./Localized";

// Document schemas
import { generalLayout } from "./GeneralLayout";
import { homePage } from "./HomePage";
import { aboutPage } from "./AboutPage";
import { howItWorksPage } from "./HowItWorksPage";
import { privacyPolicy } from "./PrivacyPolicy";
import { termsOfService } from "./TermsOfService";
import { contactPage } from "./ContactPage";
import { blogArticle, blogCategory } from "./Blog";
import { weddingStory } from "./StoriesPage";
import { seo, pageSeo } from "./SEO";
import {
  menuOption,
  barPackage,
  furnitureOption,
  decorPackage,
  photoPackage,
  videoPackage,
  transportationZone,
  entertainmentOption,
  extraOption,
  calculatorConfig,
} from "./WeddingCalculator";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Localized primitives
    localizedString,
    localizedText,
    localizedBlock,
    blogLocalizedString,
    blogLocalizedText,
    blogLocalizedBlock,

    // Documents
    generalLayout,
    homePage,
    aboutPage,
    howItWorksPage,
    privacyPolicy,
    termsOfService,
    contactPage,
    blogArticle,
    blogCategory,
    weddingStory,

    // SEO (seo object must be registered before pageSeo uses it)
    seo,
    pageSeo,

    // Wedding Calculator pricing data
    menuOption,
    barPackage,
    furnitureOption,
    decorPackage,
    photoPackage,
    videoPackage,
    transportationZone,
    entertainmentOption,
    extraOption,
    calculatorConfig,
  ],
};

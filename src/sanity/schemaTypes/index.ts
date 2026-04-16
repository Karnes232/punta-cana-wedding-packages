import { type SchemaTypeDefinition } from 'sanity'

// Localized primitive types (must be registered before any schema that uses them)
import {
  localizedString,
  localizedText,
  localizedBlock,
  blogLocalizedString,
  blogLocalizedText,
  blogLocalizedBlock,
} from './Localized'

// Document schemas
import { generalLayout } from './GeneralLayout'
import { homePage } from './HomePage'
import { aboutPage } from './AboutPage'
import { howItWorksPage } from './HowItWorksPage'
import { privacyPolicy } from './PrivacyPolicy'
import { termsOfService } from './TermsOfService'
import { contactPage } from './ContactPage'
import { blogArticle, blogCategory } from './Blog'

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
  ],
}

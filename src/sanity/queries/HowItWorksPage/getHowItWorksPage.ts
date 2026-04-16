import { defineQuery } from 'groq'
import { client } from '@/sanity/lib/client'

export const howItWorksPageQuery = defineQuery(`
  *[_type == "howItWorksPage" && _id == "howItWorksPage"][0] {
    heroTitle { en, es },
    heroSubtitle { en, es },
    heroImage { asset, hotspot, crop, alt },

    processTitle { en, es },
    processSteps[] {
      _key,
      title { en, es },
      description { en, es },
      image { asset, hotspot, crop, alt }
    },

    paymentTitle { en, es },
    depositAmount,
    depositDescription { en, es },
    paymentScheduleNote { en, es },
    flexibilityNote { en, es },
    advanceBookingNote { en, es },

    whyTitle { en, es },
    whyBody { en, es },
    whyImage { asset, hotspot, crop, alt },
    whyPoints[] { _key, en, es },

    faqTitle { en, es },
    faqItems[] {
      _key,
      question { en, es },
      answer { en, es }
    }
  }
`)

type LocalizedString = { en?: string | null; es?: string | null } | null
type ImageAsset = { _ref: string; _type: string }
type SanityImage = {
  asset: ImageAsset
  hotspot?: { x: number; y: number }
  crop?: object
  alt?: string | null
}

export type HowItWorksPageQueryResult = {
  heroTitle: LocalizedString
  heroSubtitle: LocalizedString
  heroImage: SanityImage | null

  processTitle: LocalizedString
  processSteps: Array<{
    _key: string
    title: LocalizedString
    description: LocalizedString
    image: SanityImage | null
  }> | null

  paymentTitle: LocalizedString
  depositAmount: number | null
  depositDescription: LocalizedString
  paymentScheduleNote: LocalizedString
  flexibilityNote: LocalizedString
  advanceBookingNote: LocalizedString

  whyTitle: LocalizedString
  whyBody: LocalizedString
  whyImage: SanityImage | null
  whyPoints: Array<{ _key: string; en?: string | null; es?: string | null }> | null

  faqTitle: LocalizedString
  faqItems: Array<{
    _key: string
    question: LocalizedString
    answer: LocalizedString
  }> | null
}

export async function getHowItWorksPage(): Promise<HowItWorksPageQueryResult | null> {
  return client.fetch(howItWorksPageQuery)
}

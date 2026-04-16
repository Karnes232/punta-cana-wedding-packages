import { defineQuery } from 'groq'
import { client } from '@/sanity/lib/client'

export const generalLayoutQuery = defineQuery(`
  *[_type == "generalLayout" && _id == "generalLayout"][0] {
    brandName,
    logo {
      asset,
      alt
    },
    favicon {
      asset
    },
    phoneNumber,
    email,
    socialLinks[] {
      _key,
      platform,
      url
    },
    footerDescription {
      en,
      es
    }
  }
`)

export type GeneralLayoutQueryResult = {
  brandName: string
  logo: {
    asset: { _ref: string; _type: string }
    alt: string
  } | null
  favicon: {
    asset: { _ref: string; _type: string }
  } | null
  phoneNumber: string
  email: string
  socialLinks: Array<{
    _key: string
    platform: string
    url: string
  }> | null
  footerDescription: {
    en: string | null
    es: string | null
  } | null
}

export async function getGeneralLayout(): Promise<GeneralLayoutQueryResult | null> {
  return client.fetch(generalLayoutQuery)
}

import { defineQuery } from 'groq'
import { client } from '@/sanity/lib/client'

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    heroTitle { en, es },
    heroSubtitle { en, es },
    heroImage { asset, hotspot, crop, alt },

    storyTitle { en, es },
    storyContent { en, es },
    storyImage { asset, hotspot, crop, alt },

    venueTitle { en, es },
    venueDescription { en, es },
    venueImage { asset, hotspot, crop, alt },
    venueHighlights[] { _key, en, es },

    teamTitle { en, es },
    teamMembers[] {
      _key,
      name,
      role { en, es },
      bio { en, es },
      photo { asset, hotspot, crop, alt }
    },

    valuesTitle { en, es },
    values[] {
      _key,
      title { en, es },
      description { en, es }
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

export type AboutPageQueryResult = {
  heroTitle: LocalizedString
  heroSubtitle: LocalizedString
  heroImage: SanityImage | null

  storyTitle: LocalizedString
  storyContent: { en?: unknown[] | null; es?: unknown[] | null } | null
  storyImage: SanityImage | null

  venueTitle: LocalizedString
  venueDescription: LocalizedString
  venueImage: SanityImage | null
  venueHighlights: Array<{ _key: string; en?: string | null; es?: string | null }> | null

  teamTitle: LocalizedString
  teamMembers: Array<{
    _key: string
    name: string
    role: LocalizedString
    bio: LocalizedString
    photo: SanityImage | null
  }> | null

  valuesTitle: LocalizedString
  values: Array<{
    _key: string
    title: LocalizedString
    description: LocalizedString
  }> | null
}

export async function getAboutPage(): Promise<AboutPageQueryResult | null> {
  return client.fetch(aboutPageQuery)
}

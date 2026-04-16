import { defineQuery } from 'groq'
import { client } from '@/sanity/lib/client'

export const termsOfServiceQuery = defineQuery(`
  *[_type == "termsOfService" && _id == "termsOfService"][0] {
    title { en, es },
    content { en, es }
  }
`)

type LocalizedString = { en?: string | null; es?: string | null } | null

export type TermsOfServiceQueryResult = {
  title: LocalizedString
  content: { en?: unknown[] | null; es?: unknown[] | null } | null
} | null

export async function getTermsOfService(): Promise<TermsOfServiceQueryResult> {
  return client.fetch(termsOfServiceQuery)
}

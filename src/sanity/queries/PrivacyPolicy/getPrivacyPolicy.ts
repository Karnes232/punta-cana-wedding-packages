import { defineQuery } from "groq";
import { client } from "@/sanity/lib/client";

export const privacyPolicyQuery = defineQuery(`
  *[_type == "privacyPolicy" && _id == "privacyPolicy"][0] {
    title { en, es },
    content { en, es }
  }
`);

type LocalizedString = { en?: string | null; es?: string | null } | null;

export type PrivacyPolicyQueryResult = {
  title: LocalizedString;
  content: { en?: unknown[] | null; es?: unknown[] | null } | null;
} | null;

export async function getPrivacyPolicy(): Promise<PrivacyPolicyQueryResult> {
  return client.fetch(privacyPolicyQuery);
}

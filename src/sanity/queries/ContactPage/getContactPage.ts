import { defineQuery } from "groq";
import { client } from "@/sanity/lib/client";

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    heroTitle { en, es },
    heroSubtitle { en, es },
    heroImage { asset, hotspot, crop, alt },
    introText { en, es }
  }
`);

type LocalizedString = { en?: string | null; es?: string | null } | null;
type ImageAsset = { _ref: string; _type: string };
type SanityImage = {
  asset: ImageAsset;
  hotspot?: { x: number; y: number };
  crop?: object;
  alt?: string | null;
};

export type ContactPageQueryResult = {
  heroTitle: LocalizedString;
  heroSubtitle: LocalizedString;
  heroImage: SanityImage | null;
  introText: LocalizedString;
} | null;

export async function getContactPage(): Promise<ContactPageQueryResult> {
  return client.fetch(contactPageQuery);
}

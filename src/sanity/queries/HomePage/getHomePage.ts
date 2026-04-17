import { defineQuery } from "groq";
import { client } from "@/sanity/lib/client";

export const homePageQuery = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    heroTitle { en, es },
    heroSubtitle { en, es },
    heroImage {
      asset,
      hotspot,
      crop,
      alt { en, es }
    },
    howItWorksSteps[] {
      _key,
      title { en, es },
      description { en, es }
    },
    galleryImages[] {
      _key,
      asset,
      hotspot,
      crop,
      alt
    },
    pricingStartingFrom,
    pricingDescription { en, es },
    whyTitle { en, es },
    whyTeamPhoto {
      asset,
      hotspot,
      crop,
      alt
    },
    whyPoints[] {
      _key,
      en,
      es
    }
  }
`);

export type LocalizedString = { en?: string | null; es?: string | null } | null;
export type ImageAsset = { _ref: string; _type: string };

export type HomePageQueryResult = {
  heroTitle: LocalizedString;
  heroSubtitle: LocalizedString;
  heroImage: {
    asset: ImageAsset;
    hotspot?: { x: number; y: number };
    crop?: object;
    alt: LocalizedString;
  } | null;
  howItWorksSteps: Array<{
    _key: string;
    title: LocalizedString;
    description: LocalizedString;
  }> | null;
  galleryImages: Array<{
    _key: string;
    asset: ImageAsset;
    hotspot?: { x: number; y: number };
    crop?: object;
    alt?: string | null;
  }> | null;
  pricingStartingFrom: number | null;
  pricingDescription: LocalizedString;
  whyTitle: LocalizedString;
  whyTeamPhoto: {
    asset: ImageAsset;
    hotspot?: { x: number; y: number };
    crop?: object;
    alt?: string | null;
  } | null;
  whyPoints: Array<{
    _key: string;
    en?: string | null;
    es?: string | null;
  }> | null;
};

export async function getHomePage(): Promise<HomePageQueryResult | null> {
  return client.fetch(homePageQuery);
}

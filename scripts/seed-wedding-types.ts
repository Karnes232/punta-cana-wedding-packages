/**
 * Seed script — Wedding Types
 *
 * Creates weddingType documents in Sanity using createIfNotExists
 * (safe to run multiple times — never overwrites existing data).
 *
 * Usage:
 *   npx tsx scripts/seed-wedding-types.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing required env vars. Check .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-14",
  token,
  useCdn: false,
});

const weddingTypes = [
  {
    _id: "wedding-type-symbolic",
    _type: "weddingType",
    name: {
      _type: "localizedString",
      en: "Symbolic",
      es: "Simbólica",
    },
    description: {
      _type: "localizedText",
      en: "A beautiful, personalized ceremony that celebrates your love. Not legally binding — ideal for couples already legally married or planning a separate civil ceremony.",
      es: "Una hermosa ceremonia personalizada que celebra tu amor. No tiene validez legal — ideal para parejas ya casadas legalmente o que planean una ceremonia civil por separado.",
    },
    fee: 0,
    order: 1,
  },
  {
    _id: "wedding-type-legal",
    _type: "weddingType",
    name: {
      _type: "localizedString",
      en: "Legal",
      es: "Legal",
    },
    description: {
      _type: "localizedText",
      en: "A fully legally recognized ceremony in the Dominican Republic. Includes all required documentation, official officiant, and legal registration fees.",
      es: "Una ceremonia con plena validez legal en la República Dominicana. Incluye toda la documentación necesaria, oficial autorizado y tasas de registro legal.",
    },
    fee: 1200,
    order: 2,
  },
];

async function seed() {
  console.log(`Seeding wedding types → ${projectId} / ${dataset}\n`);

  const results = await Promise.all(
    weddingTypes.map((doc) => client.createIfNotExists(doc)),
  );

  results.forEach((doc) => {
    const wt = weddingTypes.find((w) => w._id === doc._id);
    const feeLabel = wt?.fee === 0 ? "included" : `+$${wt?.fee}`;
    console.log(
      `✓ weddingType seeded: ${wt?.name.en} (${feeLabel}) — id: ${doc._id}`,
    );
  });

  console.log(`\n✓ Done — ${results.length} wedding types seeded.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

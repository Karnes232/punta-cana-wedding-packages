/**
 * Seed script — Bridal Table packages + Hair/Makeup & Barber services
 *
 * Creates bridalTablePackage and beautyService documents in Sanity using
 * createIfNotExists (safe to run multiple times — never overwrites existing data).
 *
 * Usage:
 *   npx tsx scripts/seed-bridal-beauty.ts
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

const bridalTablePackages = [
  {
    _id: "bridal-table-classic",
    _type: "bridalTablePackage",
    name: { _type: "localizedString", en: "Classic", es: "Clásico" },
    description: {
      _type: "localizedText",
      en: "An elegant sweetheart table with fresh florals, soft linens, and candlelight for the couple.",
      es: "Una elegante mesa de novios con flores frescas, mantelería suave y velas para la pareja.",
    },
    baseCost: 800,
    addOns: [
      {
        _key: "floral-runner",
        name: {
          _type: "localizedString",
          en: "Lush Floral Runner",
          es: "Camino de Flores Exuberante",
        },
        cost: 350,
        isPerTable: false,
      },
      {
        _key: "draped-backdrop",
        name: {
          _type: "localizedString",
          en: "Draped Backdrop",
          es: "Telón Drapeado",
        },
        cost: 450,
        isPerTable: false,
      },
    ],
    order: 1,
  },
  {
    _id: "bridal-table-luxe",
    _type: "bridalTablePackage",
    name: { _type: "localizedString", en: "Luxe", es: "Lujo" },
    description: {
      _type: "localizedText",
      en: "A statement bridal table with premium florals, designer linens, custom lighting, and a full backdrop.",
      es: "Una mesa nupcial imponente con flores premium, mantelería de diseñador, iluminación personalizada y un telón completo.",
    },
    baseCost: 1800,
    addOns: [
      {
        _key: "hanging-installation",
        name: {
          _type: "localizedString",
          en: "Hanging Floral Installation",
          es: "Instalación Floral Colgante",
        },
        cost: 900,
        isPerTable: false,
      },
      {
        _key: "specialty-chairs",
        name: {
          _type: "localizedString",
          en: "Specialty Couple Chairs",
          es: "Sillas Especiales para la Pareja",
        },
        cost: 300,
        isPerTable: false,
      },
    ],
    order: 2,
  },
];

const beautyServices = [
  {
    _id: "beauty-bridal-hair-makeup",
    _type: "beautyService",
    name: {
      _type: "localizedString",
      en: "Bridal Hair & Makeup",
      es: "Peinado y Maquillaje de Novia",
    },
    description: {
      _type: "localizedText",
      en: "Professional bridal styling with a trial session, airbrush makeup, and long-wear finish.",
      es: "Estilismo nupcial profesional con sesión de prueba, maquillaje aerógrafo y acabado de larga duración.",
    },
    category: "hairMakeup",
    pricePerPerson: 250,
    order: 1,
  },
  {
    _id: "beauty-party-hair-makeup",
    _type: "beautyService",
    name: {
      _type: "localizedString",
      en: "Bridal Party Hair & Makeup",
      es: "Peinado y Maquillaje del Cortejo",
    },
    description: {
      _type: "localizedText",
      en: "Hair and makeup for bridesmaids, mothers, and guests — priced per person.",
      es: "Peinado y maquillaje para damas, madres e invitadas — precio por persona.",
    },
    category: "hairMakeup",
    pricePerPerson: 120,
    order: 2,
  },
  {
    _id: "beauty-groom-barber",
    _type: "beautyService",
    name: {
      _type: "localizedString",
      en: "Groom Barber Session",
      es: "Sesión de Barbería del Novio",
    },
    description: {
      _type: "localizedText",
      en: "Classic cut, beard shaping, and hot-towel shave for the groom.",
      es: "Corte clásico, perfilado de barba y afeitado con toalla caliente para el novio.",
    },
    category: "barber",
    pricePerPerson: 90,
    order: 3,
  },
  {
    _id: "beauty-party-barber",
    _type: "beautyService",
    name: {
      _type: "localizedString",
      en: "Groomsmen Barber Service",
      es: "Servicio de Barbería para Padrinos",
    },
    description: {
      _type: "localizedText",
      en: "On-site cuts and grooming for groomsmen and male guests — priced per person.",
      es: "Cortes y arreglo en el lugar para padrinos e invitados — precio por persona.",
    },
    category: "barber",
    pricePerPerson: 55,
    order: 4,
  },
];

async function seed() {
  console.log(
    `Seeding bridal table + beauty services → ${projectId} / ${dataset}\n`,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allDocs: any[] = [...bridalTablePackages, ...beautyServices];

  const results = await Promise.all(
    allDocs.map((doc) => client.createIfNotExists(doc)),
  );

  results.forEach((doc) => {
    console.log(
      `✓ ${(doc as { _type?: string })._type} seeded — id: ${doc._id}`,
    );
  });

  console.log(
    `\n✓ Done — ${bridalTablePackages.length} bridal table packages + ${beautyServices.length} beauty services seeded.`,
  );
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

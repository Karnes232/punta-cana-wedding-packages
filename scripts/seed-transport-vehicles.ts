/**
 * Seed script — Transport Vehicles
 *
 * Creates transport vehicle documents in Sanity using createIfNotExists
 * (safe to run multiple times — never overwrites existing data).
 *
 * Usage:
 *   npx tsx scripts/seed-transport-vehicles.ts
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

const transportVehicles = [
  {
    _id: "transport-vehicle-minivan",
    _type: "transportVehicle",
    name: {
      _type: "localizedString",
      en: "Mini-Van",
      es: "Mini-Van",
    },
    description: {
      _type: "localizedText",
      en: "Comfortable air-conditioned mini-van, ideal for smaller groups or families. Door-to-door service from your hotel.",
      es: "Mini-van climatizado y confortable, ideal para grupos pequeños o familias. Servicio puerta a puerta desde tu hotel.",
    },
    capacity: 15,
    ratePerVehicle: 180,
    order: 1,
  },
  {
    _id: "transport-vehicle-coach-bus",
    _type: "transportVehicle",
    name: {
      _type: "localizedString",
      en: "Coach Bus",
      es: "Autobús de Lujo",
    },
    description: {
      _type: "localizedText",
      en: "Full-size air-conditioned coach bus — the most economical option for large wedding parties. Reclining seats and luggage storage.",
      es: "Autobús de lujo con aire acondicionado — la opción más económica para grupos grandes. Asientos reclinables y almacenamiento de equipaje.",
    },
    capacity: 45,
    ratePerVehicle: 380,
    order: 2,
  },
  {
    _id: "transport-vehicle-sprinter",
    _type: "transportVehicle",
    name: {
      _type: "localizedString",
      en: "Luxury Sprinter",
      es: "Sprinter de Lujo",
    },
    description: {
      _type: "localizedText",
      en: "Upscale Mercedes Sprinter with leather seating and premium finishes. Perfect for VIP guests or the wedding party.",
      es: "Mercedes Sprinter de lujo con asientos de cuero y acabados premium. Perfecto para invitados VIP o el cortejo nupcial.",
    },
    capacity: 14,
    ratePerVehicle: 280,
    order: 3,
  },
  {
    _id: "transport-vehicle-party-bus",
    _type: "transportVehicle",
    name: {
      _type: "localizedString",
      en: "Party Bus",
      es: "Party Bus",
    },
    description: {
      _type: "localizedText",
      en: "Turn the ride into the party — LED lighting, sound system, and a built-in bar. Guests arrive already celebrating.",
      es: "Convierte el viaje en la fiesta — iluminación LED, sistema de sonido y bar incorporado. Los invitados llegan ya celebrando.",
    },
    capacity: 30,
    ratePerVehicle: 550,
    order: 4,
  },
  {
    _id: "transport-vehicle-luxury-suv",
    _type: "transportVehicle",
    name: {
      _type: "localizedString",
      en: "Luxury SUV",
      es: "SUV de Lujo",
    },
    description: {
      _type: "localizedText",
      en: "Premium SUV for the couple or very small VIP groups. Chilled champagne included on request.",
      es: "SUV premium para los novios o grupos VIP muy pequeños. Champagne frío incluido a solicitud.",
    },
    capacity: 6,
    ratePerVehicle: 220,
    order: 5,
  },
];

async function seed() {
  console.log(`Seeding transport vehicles → ${projectId} / ${dataset}\n`);

  const results = await Promise.all(
    transportVehicles.map((doc) => client.createIfNotExists(doc)),
  );

  results.forEach((doc) => {
    const vehicle = transportVehicles.find((v) => v._id === doc._id);
    console.log(
      `✓ transportVehicle seeded: ${vehicle?.name.en} (${vehicle?.capacity} seats · $${vehicle?.ratePerVehicle}/vehicle) — id: ${doc._id}`,
    );
  });

  console.log(`\n✓ Done — ${results.length} transport vehicles seeded.`);
  console.log(
    "  Upload vehicle photos via Sanity Studio → Wedding Calculator → Transport Vehicles",
  );
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

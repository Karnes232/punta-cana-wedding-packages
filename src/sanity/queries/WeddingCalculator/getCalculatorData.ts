import { defineQuery } from "groq";
import { client } from "@/sanity/lib/client";
import { localized } from "@/sanity/lib/localize";

// ── Raw types (as returned by Sanity) ────────────────────────────────────────

type LocalizedString = { en?: string | null; es?: string | null };
type LocalizedText = { en?: string | null; es?: string | null };

export type RawAddOn = {
  _key: string;
  name: LocalizedString;
  cost: number;
  isPerPerson?: boolean;
  isPerTable?: boolean;
};

export type RawMenuOption = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  style?: string;
  costPerPerson: number;
  order?: number;
  imageUrl?: string | null;
};

export type RawBarPackage = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  tier: string;
  costPerPersonPerHour: number;
  availableHours: number[];
  addOns?: RawAddOn[];
  order?: number;
  imageUrl?: string | null;
};

export type RawFurnitureOption = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  tableType?: string;
  chairType?: string;
  seatsPerTable: number;
  costPerTable: number;
  order?: number;
  imageUrl?: string | null;
};

export type RawDecorPackage = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  baseCost: number;
  addOns?: RawAddOn[];
  order?: number;
  imageUrl?: string | null;
  previewImageUrl?: string | null;
};

export type RawPhotoPackage = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  hours: number;
  cost: number;
  addOns?: RawAddOn[];
  order?: number;
  imageUrl?: string | null;
};

export type RawVideoPackage = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  hours: number;
  cost: number;
  addOns?: RawAddOn[];
  order?: number;
  imageUrl?: string | null;
};

export type RawTransportationZone = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  order?: number;
};

export type RawZonePricing = {
  _key: string;
  zoneId: string;
  ratePerVehicle: number;
};

export type RawTransportVehicle = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  capacity: number;
  zonePricing: RawZonePricing[];
  order?: number;
  imageUrl?: string | null;
};

export type RawEntertainmentOption = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  cost: number;
  order?: number;
  imageUrl?: string | null;
};

export type RawExtraOption = {
  _id: string;
  name: LocalizedString;
  description?: LocalizedText;
  cost: number;
  isPerPerson: boolean;
  order?: number;
  imageUrl?: string | null;
};

export type RawCalculatorConfig = {
  venueCost: number;
  coordinationCost: number;
  defaultSeatsPerTable: number;
  minimumAdvanceMonths: number;
};

export type RawCalculatorData = {
  config: RawCalculatorConfig | null;
  menuOptions: RawMenuOption[];
  barPackages: RawBarPackage[];
  furnitureOptions: RawFurnitureOption[];
  decorPackages: RawDecorPackage[];
  photoPackages: RawPhotoPackage[];
  videoPackages: RawVideoPackage[];
  transportationZones: RawTransportationZone[];
  transportVehicles: RawTransportVehicle[];
  entertainmentOptions: RawEntertainmentOption[];
  extraOptions: RawExtraOption[];
};

// ── Localized types (what components receive) ─────────────────────────────────

export type AddOn = {
  _key: string;
  name: string;
  cost: number;
  isPerPerson: boolean;
  isPerTable: boolean;
};

export type MenuOption = {
  _id: string;
  name: string;
  description: string;
  style: string;
  costPerPerson: number;
  imageUrl?: string;
};

export type BarPackage = {
  _id: string;
  name: string;
  description: string;
  tier: string;
  costPerPersonPerHour: number;
  availableHours: number[];
  addOns: AddOn[];
  imageUrl?: string;
};

export type FurnitureOption = {
  _id: string;
  name: string;
  description: string;
  tableType: string;
  chairType: string;
  seatsPerTable: number;
  costPerTable: number;
  imageUrl?: string;
};

export type DecorPackage = {
  _id: string;
  name: string;
  description: string;
  baseCost: number;
  addOns: AddOn[];
  imageUrl?: string;
  previewImageUrl?: string;
};

export type PhotoPackage = {
  _id: string;
  name: string;
  description: string;
  hours: number;
  cost: number;
  addOns: AddOn[];
  imageUrl?: string;
};

export type VideoPackage = {
  _id: string;
  name: string;
  description: string;
  hours: number;
  cost: number;
  addOns: AddOn[];
  imageUrl?: string;
};

export type TransportationZone = {
  _id: string;
  name: string;
  description: string;
};

export type ZonePricing = {
  _key: string;
  zoneId: string;
  ratePerVehicle: number;
};

export type TransportVehicle = {
  _id: string;
  name: string;
  description: string;
  capacity: number;
  zonePricing: ZonePricing[];
  imageUrl?: string;
};

export type EntertainmentOption = {
  _id: string;
  name: string;
  description: string;
  cost: number;
  imageUrl?: string;
};

export type ExtraOption = {
  _id: string;
  name: string;
  description: string;
  cost: number;
  isPerPerson: boolean;
  imageUrl?: string;
};

export type CalculatorConfig = {
  venueCost: number;
  coordinationCost: number;
  defaultSeatsPerTable: number;
  minimumAdvanceMonths: number;
};

export type CalculatorData = {
  config: CalculatorConfig;
  menuOptions: MenuOption[];
  barPackages: BarPackage[];
  furnitureOptions: FurnitureOption[];
  decorPackages: DecorPackage[];
  photoPackages: PhotoPackage[];
  videoPackages: VideoPackage[];
  transportationZones: TransportationZone[];
  transportVehicles: TransportVehicle[];
  entertainmentOptions: EntertainmentOption[];
  extraOptions: ExtraOption[];
};

// ── GROQ query ────────────────────────────────────────────────────────────────

const addOnFields = `
  _key,
  name,
  cost,
  isPerPerson,
  isPerTable
`;

const getCalculatorDataQuery = defineQuery(`{
  "config": *[_type == "calculatorConfig"][0] {
    venueCost,
    coordinationCost,
    defaultSeatsPerTable,
    minimumAdvanceMonths
  },
  "menuOptions": *[_type == "menuOption"] | order(order asc) {
    _id,
    name,
    description,
    style,
    costPerPerson,
    "imageUrl": image.asset->url
  },
  "barPackages": *[_type == "barPackage"] | order(order asc) {
    _id,
    name,
    description,
    tier,
    costPerPersonPerHour,
    availableHours,
    addOns[] { ${addOnFields} },
    "imageUrl": image.asset->url
  },
  "furnitureOptions": *[_type == "furnitureOption"] | order(order asc) {
    _id,
    name,
    description,
    tableType,
    chairType,
    seatsPerTable,
    costPerTable,
    "imageUrl": image.asset->url
  },
  "decorPackages": *[_type == "decorPackage"] | order(order asc) {
    _id,
    name,
    description,
    baseCost,
    addOns[] { ${addOnFields} },
    "imageUrl": image.asset->url,
    "previewImageUrl": previewImage.asset->url
  },
  "photoPackages": *[_type == "photoPackage"] | order(order asc) {
    _id,
    name,
    description,
    hours,
    cost,
    addOns[] { ${addOnFields} },
    "imageUrl": image.asset->url
  },
  "videoPackages": *[_type == "videoPackage"] | order(order asc) {
    _id,
    name,
    description,
    hours,
    cost,
    addOns[] { ${addOnFields} },
    "imageUrl": image.asset->url
  },
  "transportationZones": *[_type == "transportationZone"] | order(order asc) {
    _id,
    name,
    description
  },
  "transportVehicles": *[_type == "transportVehicle"] | order(order asc) {
    _id,
    name,
    description,
    capacity,
    "zonePricing": zonePricing[] {
      _key,
      "zoneId": zone._ref,
      ratePerVehicle
    },
    "imageUrl": image.asset->url
  },
  "entertainmentOptions": *[_type == "entertainmentOption"] | order(order asc) {
    _id,
    name,
    description,
    cost,
    "imageUrl": image.asset->url
  },
  "extraOptions": *[_type == "extraOption"] | order(order asc) {
    _id,
    name,
    description,
    cost,
    isPerPerson,
    "imageUrl": image.asset->url
  }
}`);

export async function getCalculatorData(): Promise<RawCalculatorData> {
  return client.fetch(getCalculatorDataQuery);
}

// ── Localize helper ───────────────────────────────────────────────────────────

function localizeAddOns(
  addOns: RawAddOn[] | undefined,
  locale: string,
): AddOn[] {
  return (addOns ?? []).map((a) => ({
    _key: a._key,
    name: localized(a.name, locale) ?? "",
    cost: a.cost ?? 0,
    isPerPerson: a.isPerPerson ?? false,
    isPerTable: a.isPerTable ?? false,
  }));
}

/**
 * Runs localized() on all name/description fields so components receive
 * plain strings instead of { en, es } objects.
 */
export function localizePricing(
  raw: RawCalculatorData,
  locale: string,
): CalculatorData {
  const fallbackConfig: CalculatorConfig = {
    venueCost: 4500,
    coordinationCost: 0,
    defaultSeatsPerTable: 10,
    minimumAdvanceMonths: 6,
  };

  return {
    config: raw.config
      ? {
          venueCost: raw.config.venueCost,
          coordinationCost: raw.config.coordinationCost,
          defaultSeatsPerTable: raw.config.defaultSeatsPerTable,
          minimumAdvanceMonths: raw.config.minimumAdvanceMonths,
        }
      : fallbackConfig,

    menuOptions: raw.menuOptions.map((m) => ({
      _id: m._id,
      name: localized(m.name, locale) ?? "",
      description: localized(m.description, locale) ?? "",
      style: m.style ?? "",
      costPerPerson: m.costPerPerson,
      imageUrl: m.imageUrl ?? undefined,
    })),

    barPackages: raw.barPackages.map((b) => ({
      _id: b._id,
      name: localized(b.name, locale) ?? "",
      description: localized(b.description, locale) ?? "",
      tier: b.tier,
      costPerPersonPerHour: b.costPerPersonPerHour,
      availableHours: b.availableHours ?? [],
      addOns: localizeAddOns(b.addOns, locale),
      imageUrl: b.imageUrl ?? undefined,
    })),

    furnitureOptions: raw.furnitureOptions.map((f) => ({
      _id: f._id,
      name: localized(f.name, locale) ?? "",
      description: localized(f.description, locale) ?? "",
      tableType: f.tableType ?? "",
      chairType: f.chairType ?? "",
      seatsPerTable: f.seatsPerTable ?? 10,
      costPerTable: f.costPerTable,
      imageUrl: f.imageUrl ?? undefined,
    })),

    decorPackages: raw.decorPackages.map((d) => ({
      _id: d._id,
      name: localized(d.name, locale) ?? "",
      description: localized(d.description, locale) ?? "",
      baseCost: d.baseCost,
      addOns: localizeAddOns(d.addOns, locale),
      imageUrl: d.imageUrl ?? undefined,
      previewImageUrl: d.previewImageUrl ?? undefined,
    })),

    photoPackages: raw.photoPackages.map((p) => ({
      _id: p._id,
      name: localized(p.name, locale) ?? "",
      description: localized(p.description, locale) ?? "",
      hours: p.hours,
      cost: p.cost,
      addOns: localizeAddOns(p.addOns, locale),
      imageUrl: p.imageUrl ?? undefined,
    })),

    videoPackages: raw.videoPackages.map((v) => ({
      _id: v._id,
      name: localized(v.name, locale) ?? "",
      description: localized(v.description, locale) ?? "",
      hours: v.hours,
      cost: v.cost,
      addOns: localizeAddOns(v.addOns, locale),
      imageUrl: v.imageUrl ?? undefined,
    })),

    transportationZones: raw.transportationZones.map((z) => ({
      _id: z._id,
      name: localized(z.name, locale) ?? "",
      description: localized(z.description, locale) ?? "",
    })),

    transportVehicles: (raw.transportVehicles ?? []).map((v) => ({
      _id: v._id,
      name: localized(v.name, locale) ?? "",
      description: localized(v.description, locale) ?? "",
      capacity: v.capacity,
      zonePricing: (v.zonePricing ?? []).map((zp) => ({
        _key: zp._key,
        zoneId: zp.zoneId,
        ratePerVehicle: zp.ratePerVehicle,
      })),
      imageUrl: v.imageUrl ?? undefined,
    })),

    entertainmentOptions: raw.entertainmentOptions.map((e) => ({
      _id: e._id,
      name: localized(e.name, locale) ?? "",
      description: localized(e.description, locale) ?? "",
      cost: e.cost,
      imageUrl: e.imageUrl ?? undefined,
    })),

    extraOptions: raw.extraOptions.map((x) => ({
      _id: x._id,
      name: localized(x.name, locale) ?? "",
      description: localized(x.description, locale) ?? "",
      cost: x.cost,
      isPerPerson: x.isPerPerson ?? true,
      imageUrl: x.imageUrl ?? undefined,
    })),
  };
}

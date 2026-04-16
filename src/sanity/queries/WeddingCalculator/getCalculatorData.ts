import { defineQuery } from 'groq'
import { client } from '@/sanity/lib/client'
import { localized } from '@/sanity/lib/localize'

// ── Raw types (as returned by Sanity) ────────────────────────────────────────

type LocalizedString = { en?: string | null; es?: string | null }
type LocalizedText   = { en?: string | null; es?: string | null }

export type RawAddOn = {
  _key:       string
  name:       LocalizedString
  cost:       number
  isPerPerson?: boolean
  isPerTable?:  boolean
}

export type RawMenuOption = {
  _id:           string
  name:          LocalizedString
  description?:  LocalizedText
  style?:        string
  costPerPerson: number
  order?:        number
}

export type RawBarPackage = {
  _id:                  string
  name:                 LocalizedString
  description?:         LocalizedText
  tier:                 string
  costPerPersonPerHour: number
  availableHours:       number[]
  addOns?:              RawAddOn[]
  order?:               number
}

export type RawFurnitureOption = {
  _id:           string
  name:          LocalizedString
  description?:  LocalizedText
  tableType?:    string
  chairType?:    string
  seatsPerTable: number
  costPerTable:  number
  order?:        number
}

export type RawDecorPackage = {
  _id:          string
  name:         LocalizedString
  description?: LocalizedText
  baseCost:     number
  addOns?:      RawAddOn[]
  order?:       number
}

export type RawPhotoPackage = {
  _id:          string
  name:         LocalizedString
  description?: LocalizedText
  hours:        number
  cost:         number
  addOns?:      RawAddOn[]
  order?:       number
}

export type RawVideoPackage = {
  _id:          string
  name:         LocalizedString
  description?: LocalizedText
  hours:        number
  cost:         number
  addOns?:      RawAddOn[]
  order?:       number
}

export type RawTransportationZone = {
  _id:              string
  name:             LocalizedString
  description?:     LocalizedText
  vehicleCapacity:  number
  ratePerVehicle:   number
  order?:           number
}

export type RawEntertainmentOption = {
  _id:          string
  name:         LocalizedString
  description?: LocalizedText
  cost:         number
  order?:       number
}

export type RawExtraOption = {
  _id:          string
  name:         LocalizedString
  description?: LocalizedText
  cost:         number
  isPerPerson:  boolean
  order?:       number
}

export type RawCalculatorConfig = {
  venueCost:              number
  coordinationCost:       number
  defaultSeatsPerTable:   number
  minimumAdvanceMonths:   number
}

export type RawCalculatorData = {
  config:               RawCalculatorConfig | null
  menuOptions:          RawMenuOption[]
  barPackages:          RawBarPackage[]
  furnitureOptions:     RawFurnitureOption[]
  decorPackages:        RawDecorPackage[]
  photoPackages:        RawPhotoPackage[]
  videoPackages:        RawVideoPackage[]
  transportationZones:  RawTransportationZone[]
  entertainmentOptions: RawEntertainmentOption[]
  extraOptions:         RawExtraOption[]
}

// ── Localized types (what components receive) ─────────────────────────────────

export type AddOn = {
  _key:        string
  name:        string
  cost:        number
  isPerPerson: boolean
  isPerTable:  boolean
}

export type MenuOption = {
  _id:           string
  name:          string
  description:   string
  style:         string
  costPerPerson: number
}

export type BarPackage = {
  _id:                  string
  name:                 string
  description:          string
  tier:                 string
  costPerPersonPerHour: number
  availableHours:       number[]
  addOns:               AddOn[]
}

export type FurnitureOption = {
  _id:           string
  name:          string
  description:   string
  tableType:     string
  chairType:     string
  seatsPerTable: number
  costPerTable:  number
}

export type DecorPackage = {
  _id:         string
  name:        string
  description: string
  baseCost:    number
  addOns:      AddOn[]
}

export type PhotoPackage = {
  _id:         string
  name:        string
  description: string
  hours:       number
  cost:        number
  addOns:      AddOn[]
}

export type VideoPackage = {
  _id:         string
  name:        string
  description: string
  hours:       number
  cost:        number
  addOns:      AddOn[]
}

export type TransportationZone = {
  _id:             string
  name:            string
  description:     string
  vehicleCapacity: number
  ratePerVehicle:  number
}

export type EntertainmentOption = {
  _id:         string
  name:        string
  description: string
  cost:        number
}

export type ExtraOption = {
  _id:         string
  name:        string
  description: string
  cost:        number
  isPerPerson: boolean
}

export type CalculatorConfig = {
  venueCost:            number
  coordinationCost:     number
  defaultSeatsPerTable: number
  minimumAdvanceMonths: number
}

export type CalculatorData = {
  config:               CalculatorConfig
  menuOptions:          MenuOption[]
  barPackages:          BarPackage[]
  furnitureOptions:     FurnitureOption[]
  decorPackages:        DecorPackage[]
  photoPackages:        PhotoPackage[]
  videoPackages:        VideoPackage[]
  transportationZones:  TransportationZone[]
  entertainmentOptions: EntertainmentOption[]
  extraOptions:         ExtraOption[]
}

// ── GROQ query ────────────────────────────────────────────────────────────────

const addOnFields = `
  _key,
  name,
  cost,
  isPerPerson,
  isPerTable
`

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
    costPerPerson
  },
  "barPackages": *[_type == "barPackage"] | order(order asc) {
    _id,
    name,
    description,
    tier,
    costPerPersonPerHour,
    availableHours,
    addOns[] { ${addOnFields} }
  },
  "furnitureOptions": *[_type == "furnitureOption"] | order(order asc) {
    _id,
    name,
    description,
    tableType,
    chairType,
    seatsPerTable,
    costPerTable
  },
  "decorPackages": *[_type == "decorPackage"] | order(order asc) {
    _id,
    name,
    description,
    baseCost,
    addOns[] { ${addOnFields} }
  },
  "photoPackages": *[_type == "photoPackage"] | order(order asc) {
    _id,
    name,
    description,
    hours,
    cost,
    addOns[] { ${addOnFields} }
  },
  "videoPackages": *[_type == "videoPackage"] | order(order asc) {
    _id,
    name,
    description,
    hours,
    cost,
    addOns[] { ${addOnFields} }
  },
  "transportationZones": *[_type == "transportationZone"] | order(order asc) {
    _id,
    name,
    description,
    vehicleCapacity,
    ratePerVehicle
  },
  "entertainmentOptions": *[_type == "entertainmentOption"] | order(order asc) {
    _id,
    name,
    description,
    cost
  },
  "extraOptions": *[_type == "extraOption"] | order(order asc) {
    _id,
    name,
    description,
    cost,
    isPerPerson
  }
}`)

export async function getCalculatorData(): Promise<RawCalculatorData> {
  return client.fetch(getCalculatorDataQuery)
}

// ── Localize helper ───────────────────────────────────────────────────────────

function localizeAddOns(addOns: RawAddOn[] | undefined, locale: string): AddOn[] {
  return (addOns ?? []).map((a) => ({
    _key:        a._key,
    name:        localized(a.name, locale) ?? '',
    cost:        a.cost ?? 0,
    isPerPerson: a.isPerPerson ?? false,
    isPerTable:  a.isPerTable  ?? false,
  }))
}

/**
 * Runs localized() on all name/description fields so components receive
 * plain strings instead of { en, es } objects.
 */
export function localizePricing(raw: RawCalculatorData, locale: string): CalculatorData {
  const fallbackConfig: CalculatorConfig = {
    venueCost: 4500,
    coordinationCost: 0,
    defaultSeatsPerTable: 10,
    minimumAdvanceMonths: 6,
  }

  return {
    config: raw.config
      ? {
          venueCost:            raw.config.venueCost,
          coordinationCost:     raw.config.coordinationCost,
          defaultSeatsPerTable: raw.config.defaultSeatsPerTable,
          minimumAdvanceMonths: raw.config.minimumAdvanceMonths,
        }
      : fallbackConfig,

    menuOptions: raw.menuOptions.map((m) => ({
      _id:           m._id,
      name:          localized(m.name, locale) ?? '',
      description:   localized(m.description, locale) ?? '',
      style:         m.style ?? '',
      costPerPerson: m.costPerPerson,
    })),

    barPackages: raw.barPackages.map((b) => ({
      _id:                  b._id,
      name:                 localized(b.name, locale) ?? '',
      description:          localized(b.description, locale) ?? '',
      tier:                 b.tier,
      costPerPersonPerHour: b.costPerPersonPerHour,
      availableHours:       b.availableHours ?? [],
      addOns:               localizeAddOns(b.addOns, locale),
    })),

    furnitureOptions: raw.furnitureOptions.map((f) => ({
      _id:           f._id,
      name:          localized(f.name, locale) ?? '',
      description:   localized(f.description, locale) ?? '',
      tableType:     f.tableType ?? '',
      chairType:     f.chairType ?? '',
      seatsPerTable: f.seatsPerTable ?? 10,
      costPerTable:  f.costPerTable,
    })),

    decorPackages: raw.decorPackages.map((d) => ({
      _id:         d._id,
      name:        localized(d.name, locale) ?? '',
      description: localized(d.description, locale) ?? '',
      baseCost:    d.baseCost,
      addOns:      localizeAddOns(d.addOns, locale),
    })),

    photoPackages: raw.photoPackages.map((p) => ({
      _id:         p._id,
      name:        localized(p.name, locale) ?? '',
      description: localized(p.description, locale) ?? '',
      hours:       p.hours,
      cost:        p.cost,
      addOns:      localizeAddOns(p.addOns, locale),
    })),

    videoPackages: raw.videoPackages.map((v) => ({
      _id:         v._id,
      name:        localized(v.name, locale) ?? '',
      description: localized(v.description, locale) ?? '',
      hours:       v.hours,
      cost:        v.cost,
      addOns:      localizeAddOns(v.addOns, locale),
    })),

    transportationZones: raw.transportationZones.map((z) => ({
      _id:             z._id,
      name:            localized(z.name, locale) ?? '',
      description:     localized(z.description, locale) ?? '',
      vehicleCapacity: z.vehicleCapacity,
      ratePerVehicle:  z.ratePerVehicle,
    })),

    entertainmentOptions: raw.entertainmentOptions.map((e) => ({
      _id:         e._id,
      name:        localized(e.name, locale) ?? '',
      description: localized(e.description, locale) ?? '',
      cost:        e.cost,
    })),

    extraOptions: raw.extraOptions.map((x) => ({
      _id:         x._id,
      name:        localized(x.name, locale) ?? '',
      description: localized(x.description, locale) ?? '',
      cost:        x.cost,
      isPerPerson: x.isPerPerson ?? true,
    })),
  }
}

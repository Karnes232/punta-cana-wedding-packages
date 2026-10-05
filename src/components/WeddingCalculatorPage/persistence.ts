import type { CalculatorData } from "@/sanity/queries/WeddingCalculator/getCalculatorData";
import { initialState, type CalculatorState } from "./useCalculatorState";
import { FORM_STEP } from "./steps";

// ── Local progress persistence ────────────────────────────────────────────────
// Saves the visitor's calculator progress in localStorage so they can resume
// after a refresh or a later visit. Storage can be unavailable (private mode,
// blocked site data), so every access is guarded and failures are ignored.

const STORAGE_KEY = "pcwp-calculator-v1";
const VERSION = 1;
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

type SavedProgress = {
  version: number;
  savedAt: number;
  state: CalculatorState;
};

export function saveProgress(state: CalculatorState) {
  try {
    const payload: SavedProgress = {
      version: VERSION,
      savedAt: Date.now(),
      state,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage unavailable or full — progress just won't persist
  }
}

export function loadProgress(): CalculatorState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as SavedProgress;
    if (saved.version !== VERSION || !saved.state) return null;
    if (Date.now() - saved.savedAt > MAX_AGE_MS) {
      clearProgress();
      return null;
    }
    return saved.state;
  } catch {
    return null;
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear
  }
}

// ── Rehydration ───────────────────────────────────────────────────────────────
// Saved selections are matched back to the current Sanity data by id, so the
// visitor always sees current prices and names (in the current locale), and
// anything removed from Sanity since the last visit is dropped.

type WithId = { _id: string };
type WithKey = { _key: string };

function byId<T extends WithId>(list: T[], saved: WithId | null | undefined) {
  if (!saved) return null;
  return list.find((x) => x._id === saved._id) ?? null;
}

function allById<T extends WithId>(list: T[], saved: WithId[] | undefined) {
  if (!saved) return [];
  return saved
    .map((s) => list.find((x) => x._id === s._id))
    .filter((x): x is T => Boolean(x));
}

function addOnsFor<T extends WithKey>(
  pkg: { addOns: T[] } | null,
  saved: WithKey[] | undefined,
) {
  if (!pkg || !saved) return [];
  return saved
    .map((s) => pkg.addOns.find((a) => a._key === s._key))
    .filter((x): x is T => Boolean(x));
}

export function rehydrateState(
  saved: CalculatorState,
  data: CalculatorData,
): CalculatorState {
  const bar = byId(data.barPackages, saved.bar);
  const decor = byId(data.decorPackages, saved.decor);
  const bridalTable = byId(data.bridalTablePackages, saved.bridalTable);
  const photo = byId(data.photoPackages, saved.photo);
  const video = byId(data.videoPackages, saved.video);

  const beautyServices = (saved.beautyServices ?? []).flatMap((b) => {
    const service = byId(data.beautyServices, b.service);
    return service && b.quantity > 0 ? [{ service, quantity: b.quantity }] : [];
  });

  // Resume anywhere from the first step up to the request form
  const currentStep =
    Number.isInteger(saved.currentStep) &&
    saved.currentStep >= 1 &&
    saved.currentStep <= FORM_STEP
      ? saved.currentStep
      : 1;

  return {
    ...initialState,
    currentStep,
    contact: { ...initialState.contact, ...saved.contact },
    date: saved.date ?? initialState.date,
    guests: saved.guests ?? initialState.guests,
    weddingType: byId(data.weddingTypes, saved.weddingType),
    stayAtProperty: Boolean(saved.stayAtProperty),
    hotel: saved.stayAtProperty
      ? null
      : byId(data.transportationZones, saved.hotel),
    venueConfirmed: Boolean(saved.venueConfirmed),
    menu: byId(data.menuOptions, saved.menu),
    platedUpgrade: Boolean(saved.platedUpgrade),
    bar,
    barHours:
      bar && bar.availableHours.includes(saved.barHours)
        ? saved.barHours
        : (bar?.availableHours[0] ?? initialState.barHours),
    barAddOns: addOnsFor(bar, saved.barAddOns),
    furniture: byId(data.furnitureOptions, saved.furniture),
    decor,
    decorAddOns: addOnsFor(decor, saved.decorAddOns),
    bridalTable,
    bridalTableAddOns: addOnsFor(bridalTable, saved.bridalTableAddOns),
    beautyServices,
    photo,
    photoAddOns: addOnsFor(photo, saved.photoAddOns),
    video,
    videoAddOns: addOnsFor(video, saved.videoAddOns),
    videoSkipped: Boolean(saved.videoSkipped),
    transportVehicle: saved.stayAtProperty
      ? null
      : byId(data.transportVehicles, saved.transportVehicle),
    entertainment: allById(data.entertainmentOptions, saved.entertainment),
    extras: allById(data.extraOptions, saved.extras),
  };
}

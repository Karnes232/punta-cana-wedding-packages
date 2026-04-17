"use client";

import { useReducer, useCallback } from "react";
import type {
  CalculatorConfig,
  MenuOption,
  BarPackage,
  FurnitureOption,
  DecorPackage,
  PhotoPackage,
  VideoPackage,
  TransportationZone,
  EntertainmentOption,
  ExtraOption,
  AddOn,
} from "@/sanity/queries/WeddingCalculator/getCalculatorData";

// ── State shape ────────────────────────────────────────────────────────────────

export type CalculatorState = {
  currentStep: number; // 1–13, 14 = summary, 15 = form, 16 = success
  date: string; // ISO date string
  guests: number;
  hotel: TransportationZone | null;

  // Step 4: always Cabeza de Toro — just confirmed boolean
  venueConfirmed: boolean;

  menu: MenuOption | null;
  bar: BarPackage | null;
  barHours: number;
  barAddOns: AddOn[];

  furniture: FurnitureOption | null;

  decor: DecorPackage | null;
  decorAddOns: AddOn[];

  photo: PhotoPackage | null;
  photoAddOns: AddOn[];

  video: VideoPackage | null;
  videoAddOns: AddOn[];
  videoSkipped: boolean;

  entertainment: EntertainmentOption[];
  extras: ExtraOption[];
};

// ── Actions ────────────────────────────────────────────────────────────────────

export type CalculatorAction =
  | { type: "SET_STEP"; step: number }
  | { type: "SET_DATE"; date: string }
  | { type: "SET_GUESTS"; guests: number }
  | { type: "SET_HOTEL"; hotel: TransportationZone }
  | { type: "SET_VENUE_CONFIRMED"; confirmed: boolean }
  | { type: "SET_MENU"; menu: MenuOption }
  | { type: "SET_BAR"; bar: BarPackage }
  | { type: "SET_BAR_HOURS"; hours: number }
  | { type: "TOGGLE_BAR_ADDON"; addon: AddOn }
  | { type: "SET_FURNITURE"; furniture: FurnitureOption }
  | { type: "SET_DECOR"; decor: DecorPackage }
  | { type: "TOGGLE_DECOR_ADDON"; addon: AddOn }
  | { type: "SET_PHOTO"; photo: PhotoPackage }
  | { type: "TOGGLE_PHOTO_ADDON"; addon: AddOn }
  | { type: "SET_VIDEO"; video: VideoPackage }
  | { type: "TOGGLE_VIDEO_ADDON"; addon: AddOn }
  | { type: "SKIP_VIDEO" }
  | { type: "TOGGLE_ENTERTAINMENT"; option: EntertainmentOption }
  | { type: "TOGGLE_EXTRA"; option: ExtraOption }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_SUMMARY" }
  | { type: "GO_TO_FORM" }
  | { type: "GO_TO_SUCCESS" };

// ── Initial state ──────────────────────────────────────────────────────────────

const SUMMARY_STEP = 14;
const FORM_STEP = 15;
const SUCCESS_STEP = 16;

const initialState: CalculatorState = {
  currentStep: 1,
  date: "",
  guests: 50,
  hotel: null,
  venueConfirmed: false,
  menu: null,
  bar: null,
  barHours: 5,
  barAddOns: [],
  furniture: null,
  decor: null,
  decorAddOns: [],
  photo: null,
  photoAddOns: [],
  video: null,
  videoAddOns: [],
  videoSkipped: false,
  entertainment: [],
  extras: [],
};

// ── Toggle helper ──────────────────────────────────────────────────────────────

function toggleItem<T extends { _key?: string; _id?: string }>(
  list: T[],
  item: T,
): T[] {
  const id =
    (item as { _key?: string; _id?: string })._key ??
    (item as { _id?: string })._id;
  const exists = list.some(
    (x) =>
      ((x as { _key?: string; _id?: string })._key ??
        (x as { _id?: string })._id) === id,
  );
  return exists
    ? list.filter(
        (x) =>
          ((x as { _key?: string; _id?: string })._key ??
            (x as { _id?: string })._id) !== id,
      )
    : [...list, item];
}

// ── Reducer ────────────────────────────────────────────────────────────────────

function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step };

    case "SET_DATE":
      return { ...state, date: action.date };

    case "SET_GUESTS":
      return { ...state, guests: action.guests };

    case "SET_HOTEL":
      return { ...state, hotel: action.hotel };

    case "SET_VENUE_CONFIRMED":
      return { ...state, venueConfirmed: action.confirmed };

    case "SET_MENU":
      return { ...state, menu: action.menu };

    case "SET_BAR":
      return {
        ...state,
        bar: action.bar,
        barHours: action.bar.availableHours[0] ?? state.barHours,
        barAddOns: [],
      };

    case "SET_BAR_HOURS":
      return { ...state, barHours: action.hours };

    case "TOGGLE_BAR_ADDON":
      return { ...state, barAddOns: toggleItem(state.barAddOns, action.addon) };

    case "SET_FURNITURE":
      return { ...state, furniture: action.furniture };

    case "SET_DECOR":
      return { ...state, decor: action.decor, decorAddOns: [] };

    case "TOGGLE_DECOR_ADDON":
      return {
        ...state,
        decorAddOns: toggleItem(state.decorAddOns, action.addon),
      };

    case "SET_PHOTO":
      return { ...state, photo: action.photo, photoAddOns: [] };

    case "TOGGLE_PHOTO_ADDON":
      return {
        ...state,
        photoAddOns: toggleItem(state.photoAddOns, action.addon),
      };

    case "SET_VIDEO":
      return {
        ...state,
        video: action.video,
        videoAddOns: [],
        videoSkipped: false,
      };

    case "TOGGLE_VIDEO_ADDON":
      return {
        ...state,
        videoAddOns: toggleItem(state.videoAddOns, action.addon),
      };

    case "SKIP_VIDEO":
      return { ...state, video: null, videoAddOns: [], videoSkipped: true };

    case "TOGGLE_ENTERTAINMENT":
      return {
        ...state,
        entertainment: toggleItem(state.entertainment, action.option),
      };

    case "TOGGLE_EXTRA":
      return {
        ...state,
        extras: toggleItem(state.extras, action.option),
      };

    case "NEXT_STEP":
      return { ...state, currentStep: Math.min(state.currentStep + 1, 13) };

    case "PREV_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };

    case "GO_TO_SUMMARY":
      return { ...state, currentStep: SUMMARY_STEP };

    case "GO_TO_FORM":
      return { ...state, currentStep: FORM_STEP };

    case "GO_TO_SUCCESS":
      return { ...state, currentStep: SUCCESS_STEP };

    default:
      return state;
  }
}

// ── calculateTotal ─────────────────────────────────────────────────────────────

export function calculateTotal(
  state: CalculatorState,
  config: CalculatorConfig,
): number {
  let total = 0;

  total += config.venueCost;
  total += config.coordinationCost;

  const g = state.guests;
  const tableCount = Math.ceil(
    g / (state.furniture?.seatsPerTable ?? config.defaultSeatsPerTable),
  );

  // Menu
  if (state.menu) {
    total += state.menu.costPerPerson * g;
  }

  // Bar
  if (state.bar) {
    total += state.bar.costPerPersonPerHour * state.barHours * g;
    for (const addon of state.barAddOns) {
      total += addon.isPerPerson ? addon.cost * g : addon.cost;
    }
  }

  // Furniture
  if (state.furniture) {
    total += state.furniture.costPerTable * tableCount;
  }

  // Decor
  if (state.decor) {
    total += state.decor.baseCost;
    for (const addon of state.decorAddOns) {
      total += addon.isPerTable ? addon.cost * tableCount : addon.cost;
    }
  }

  // Photography
  if (state.photo) {
    total += state.photo.cost;
    for (const addon of state.photoAddOns) {
      total += addon.cost;
    }
  }

  // Videography
  if (state.video && !state.videoSkipped) {
    total += state.video.cost;
    for (const addon of state.videoAddOns) {
      total += addon.cost;
    }
  }

  // Transportation
  if (state.hotel) {
    const vehicleCount = Math.ceil(g / state.hotel.vehicleCapacity);
    total += state.hotel.ratePerVehicle * vehicleCount;
  }

  // Entertainment (fixed costs)
  for (const ent of state.entertainment) {
    total += ent.cost;
  }

  // Extras
  for (const extra of state.extras) {
    total += extra.isPerPerson ? extra.cost * g : extra.cost;
  }

  return Math.round(total * 100) / 100;
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useCalculatorState(config: CalculatorConfig) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const total = calculateTotal(state, config);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: "SET_STEP", step });
  }, []);

  return {
    state,
    dispatch,
    total,
    goToStep,
    SUMMARY_STEP,
    FORM_STEP,
    SUCCESS_STEP,
  };
}

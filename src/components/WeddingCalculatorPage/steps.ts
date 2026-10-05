import type { CalculatorState } from "./useCalculatorState";

// ── Wizard step order ─────────────────────────────────────────────────────────
// Single source of truth for the order of the calculator steps. Step numbers
// (1-based) are derived from position in this array, so reordering steps is a
// matter of reordering this list.

export const STEP_IDS = [
  "contact",
  "date",
  "guests",
  "weddingType",
  "lodging",
  "hotel",
  "menu",
  "bar",
  "furniture",
  "decor",
  "bridalTable",
  "beauty",
  "photo",
  "video",
  "transport",
  "entertainment",
  "extras",
  "venue",
] as const;

export type StepId = (typeof STEP_IDS)[number];

export const TOTAL_STEPS = STEP_IDS.length;

export const SUMMARY_STEP = TOTAL_STEPS + 1;
export const FORM_STEP = TOTAL_STEPS + 2;
export const SUCCESS_STEP = TOTAL_STEPS + 3;

/** Step id for a 1-based step number, or null outside the wizard. */
export function stepIdAt(step: number): StepId | null {
  return STEP_IDS[step - 1] ?? null;
}

/** Hotel and transport don't apply when the couple stays at our property. */
export function isSkipped(id: StepId, state: CalculatorState): boolean {
  return state.stayAtProperty && (id === "hotel" || id === "transport");
}

/** 1-based step number for a step id. */
export function stepNumberOf(id: StepId): number {
  return STEP_IDS.indexOf(id) + 1;
}

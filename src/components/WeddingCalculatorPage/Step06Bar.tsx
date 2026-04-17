"use client";

import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type {
  BarPackage,
  AddOn,
} from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  packages: BarPackage[];
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step06Bar({ state, dispatch, packages }: Props) {
  const t = useTranslations("weddingCalculator.steps.bar");

  const barTotal = state.bar
    ? state.bar.costPerPersonPerHour * state.barHours * state.guests +
      state.barAddOns.reduce(
        (sum, a) => sum + (a.isPerPerson ? a.cost * state.guests : a.cost),
        0,
      )
    : 0;

  const isAddonSelected = (addon: AddOn) =>
    state.barAddOns.some((a) => a._key === addon._key);

  return (
    <StepWrapper
      stepNumber={6}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.bar}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      {/* Package selection */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {packages.map((pkg) => {
          const selected = state.bar?._id === pkg._id;
          return (
            <button
              key={pkg._id}
              onClick={() => dispatch({ type: "SET_BAR", bar: pkg })}
              className={[
                "rounded-xl border p-4 text-left transition-all duration-200",
                selected
                  ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
                  : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
              ].join(" ")}
            >
              <p
                className={`font-semibold ${selected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
              >
                {pkg.name}
              </p>
              <p className="mt-1 text-xs text-[#888888]">
                {formatUSD(pkg.costPerPersonPerHour)}
                {t("perPersonPerHour")}
              </p>
              {pkg.description && (
                <p className="mt-2 text-xs leading-relaxed text-[#AAAAAA]">
                  {pkg.description}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Hour selection */}
      {state.bar && (
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-[#333333]">
            {t("selectHours")}
          </p>
          <div className="flex gap-2">
            {state.bar.availableHours.map((h) => (
              <button
                key={h}
                onClick={() => dispatch({ type: "SET_BAR_HOURS", hours: h })}
                className={[
                  "rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                  state.barHours === h
                    ? "border-[#5B9FD9] bg-[#5B9FD9] text-white shadow-sm"
                    : "border-[#E0E0E0] bg-white text-[#555555] hover:border-[#5B9FD9]/50",
                ].join(" ")}
              >
                {t("hours", { n: h })}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons */}
      {state.bar && state.bar.addOns.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-[#333333]">
            {t("addOns")}
          </p>
          <div className="space-y-2">
            {state.bar.addOns.map((addon) => (
              <label
                key={addon._key}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-[#E0E0E0] bg-white p-3 transition-colors duration-200 hover:border-[#5B9FD9]/40"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isAddonSelected(addon)}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_BAR_ADDON", addon })
                    }
                    className="h-4 w-4 rounded border-[#E0E0E0] accent-[#5B9FD9]"
                  />
                  <span className="text-sm text-[#333333]">{addon.name}</span>
                </div>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  +{formatUSD(addon.cost)}
                  {addon.isPerPerson ? "/person" : ""}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {state.bar && (
        <p className="text-sm font-medium text-[#1A1A1A]">
          {t("barTotal")}{" "}
          <span className="text-[#5B9FD9]">{formatUSD(barTotal)}</span>
        </p>
      )}
    </StepWrapper>
  );
}

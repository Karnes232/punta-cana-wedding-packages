"use client";

import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type {
  DecorPackage,
  AddOn,
} from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  packages: DecorPackage[];
  defaultSeatsPerTable: number;
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step08Decor({
  state,
  dispatch,
  packages,
  defaultSeatsPerTable,
}: Props) {
  const t = useTranslations("weddingCalculator.steps.decor");

  const tableCount = Math.ceil(
    state.guests / (state.furniture?.seatsPerTable ?? defaultSeatsPerTable),
  );

  const decorTotal = state.decor
    ? state.decor.baseCost +
      state.decorAddOns.reduce(
        (sum, a) => sum + (a.isPerTable ? a.cost * tableCount : a.cost),
        0,
      )
    : 0;

  const isAddonSelected = (addon: AddOn) =>
    state.decorAddOns.some((a) => a._key === addon._key);

  return (
    <StepWrapper
      stepNumber={8}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.decor}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {packages.map((pkg) => {
          const selected = state.decor?._id === pkg._id;
          return (
            <button
              key={pkg._id}
              onClick={() => dispatch({ type: "SET_DECOR", decor: pkg })}
              className={[
                "rounded-xl border p-5 text-left transition-all duration-200",
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
              <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">
                {formatUSD(pkg.baseCost)}
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

      {state.decor && state.decor.addOns.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-[#333333]">
            {t("addOns")}
          </p>
          <div className="space-y-2">
            {state.decor.addOns.map((addon) => (
              <label
                key={addon._key}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-[#E0E0E0] bg-white p-3 transition-colors duration-200 hover:border-[#5B9FD9]/40"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isAddonSelected(addon)}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_DECOR_ADDON", addon })
                    }
                    className="h-4 w-4 rounded border-[#E0E0E0] accent-[#5B9FD9]"
                  />
                  <span className="text-sm text-[#333333]">{addon.name}</span>
                </div>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  +{formatUSD(addon.cost)}
                  {addon.isPerTable ? t("perTable") : ""}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {state.decor && (
        <p className="text-sm font-medium text-[#1A1A1A]">
          {t("total")}{" "}
          <span className="text-[#5B9FD9]">{formatUSD(decorTotal)}</span>
        </p>
      )}
    </StepWrapper>
  );
}

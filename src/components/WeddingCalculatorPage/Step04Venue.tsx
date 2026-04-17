"use client";

import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { CalculatorConfig } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  config: CalculatorConfig;
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step04Venue({ state, dispatch, config }: Props) {
  const t = useTranslations("weddingCalculator.steps.venue");

  return (
    <StepWrapper
      stepNumber={4}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.venueConfirmed}
    >
      <div className="max-w-lg">
        {/* Venue card */}
        <div className="rounded-2xl border border-[#5B9FD9]/20 bg-gradient-to-br from-[#F0F7FF] to-[#FAFBFF] p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5B9FD9]">
                {t("included")}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-[#1A1A1A]">
                Cabeza de Toro
              </h3>
              <p className="mt-0.5 text-sm text-[#888888]">{t("location")}</p>
            </div>
            <p className="text-lg font-semibold text-[#1A1A1A]">
              {formatUSD(config.venueCost + config.coordinationCost)}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-[#555555]">
            {t("description")}
          </p>

          {/* Feature list */}
          <ul className="mt-4 space-y-2">
            {(t.raw("features") as string[]).map((feature: string) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-[#555555]"
              >
                <span className="mt-0.5 text-[#5B9FD9]">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Confirmation checkbox */}
        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={state.venueConfirmed}
            onChange={(e) =>
              dispatch({
                type: "SET_VENUE_CONFIRMED",
                confirmed: e.target.checked,
              })
            }
            className="mt-0.5 h-4 w-4 rounded border-[#E0E0E0] accent-[#5B9FD9]"
          />
          <span className="text-sm font-medium text-[#333333]">
            {t("confirm")}
          </span>
        </label>
      </div>
    </StepWrapper>
  );
}

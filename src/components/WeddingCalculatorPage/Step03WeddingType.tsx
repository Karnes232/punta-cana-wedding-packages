"use client";

import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { WeddingType } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  weddingTypes: WeddingType[];
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step03WeddingType({
  state,
  dispatch,
  weddingTypes,
}: Props) {
  const t = useTranslations("weddingCalculator.steps.weddingType");

  return (
    <StepWrapper
      stepNumber={3}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.weddingType}
    >
      <p className="mb-6 text-sm leading-relaxed text-[#666666]">{t("help")}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {weddingTypes.map((option) => {
          const selected = state.weddingType?._id === option._id;
          return (
            <button
              key={option._id}
              onClick={() =>
                dispatch({ type: "SET_WEDDING_TYPE", weddingType: option })
              }
              className={[
                "rounded-xl border p-4 text-left transition-all duration-200",
                selected
                  ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
                  : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-2">
                <p
                  className={`text-sm font-semibold ${selected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
                >
                  {option.name}
                </p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    option.fee > 0
                      ? "bg-[#F0F7FF] text-[#5B9FD9]"
                      : "bg-[#F0FBF4] text-[#4CAF7D]"
                  }`}
                >
                  {option.fee > 0 ? `+ ${formatUSD(option.fee)}` : t("noFee")}
                </span>
              </div>
              {option.description && (
                <p className="mt-1 text-xs text-[#888888]">
                  {option.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </StepWrapper>
  );
}

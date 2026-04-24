"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { ExtraOption } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  options: ExtraOption[];
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step13Extras({ state, dispatch, options }: Props) {
  const t = useTranslations("weddingCalculator.steps.extras");

  const extrasTotal = state.extras.reduce(
    (sum, e) => sum + (e.isPerPerson ? e.cost * state.guests : e.cost),
    0,
  );
  const isSelected = (opt: ExtraOption) =>
    state.extras.some((e) => e._id === opt._id);

  return (
    <StepWrapper
      stepNumber={13}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "GO_TO_SUMMARY" })}
      onSkip={() => dispatch({ type: "GO_TO_SUMMARY" })}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const selected = isSelected(opt);
          const optionTotal = opt.isPerPerson
            ? opt.cost * state.guests
            : opt.cost;
          return (
            <label
              key={opt._id}
              className={[
                "cursor-pointer overflow-hidden rounded-xl border transition-all duration-200",
                selected
                  ? "border-[#5B9FD9] bg-[#5B9FD9]/5"
                  : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/40",
              ].join(" ")}
            >
              {opt.imageUrl && (
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={opt.imageUrl}
                    alt={opt.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
                  />
                </div>
              )}
              <div className="flex items-start gap-4 p-4">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() =>
                    dispatch({ type: "TOGGLE_EXTRA", option: opt })
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#E0E0E0] accent-[#5B9FD9]"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-semibold ${selected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
                    >
                      {opt.name}
                    </p>
                    <div className="shrink-0 text-right">
                      {opt.isPerPerson ? (
                        <>
                          <p className="text-xs text-[#888888]">
                            {t("perPerson", { cost: formatUSD(opt.cost) })}
                          </p>
                          <p className="text-sm font-semibold text-[#1A1A1A]">
                            {formatUSD(optionTotal)}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-semibold text-[#1A1A1A]">
                          {formatUSD(opt.cost)}
                        </p>
                      )}
                    </div>
                  </div>
                  {opt.description && (
                    <p className="mt-1 text-xs leading-relaxed text-[#888888]">
                      {opt.description}
                    </p>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {extrasTotal > 0 && (
        <p className="mt-5 text-sm font-medium text-[#1A1A1A]">
          {t("total")}{" "}
          <span className="text-[#5B9FD9]">{formatUSD(extrasTotal)}</span>
        </p>
      )}
    </StepWrapper>
  );
}

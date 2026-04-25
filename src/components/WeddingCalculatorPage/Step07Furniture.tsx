"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { FurnitureOption } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  options: FurnitureOption[];
  defaultSeatsPerTable: number;
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step07Furniture({
  state,
  dispatch,
  options,
  defaultSeatsPerTable,
}: Props) {
  const t = useTranslations("weddingCalculator.steps.furniture");

  const seatsPerTable = state.furniture?.seatsPerTable ?? defaultSeatsPerTable;
  const tableCount = Math.ceil(state.guests / seatsPerTable);
  const furnitureTotal = state.furniture
    ? state.furniture.costPerTable * tableCount
    : 0;

  return (
    <StepWrapper
      stepNumber={6}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.furniture}
    >
      <p className="mb-2 text-sm text-[#666666]">{t("label")}</p>
      <p className="mb-6 text-xs text-[#AAAAAA]">
        {t("tablesNeeded", { n: tableCount, g: state.guests })}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const selected = state.furniture?._id === option._id;
          const tables = Math.ceil(state.guests / option.seatsPerTable);
          return (
            <button
              key={option._id}
              onClick={() =>
                dispatch({ type: "SET_FURNITURE", furniture: option })
              }
              className={[
                "flex flex-col overflow-hidden rounded-xl border text-left transition-all duration-200",
                selected
                  ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
                  : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
              ].join(" ")}
            >
              {option.imageUrl && (
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#F0EDE8]">
                  <Image
                    src={option.imageUrl}
                    alt={option.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 400px"
                  />
                </div>
              )}
              <div className="p-5">
                <p
                  className={`font-semibold ${selected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
                >
                  {option.name}
                </p>
                <p className="mt-1 text-sm font-medium text-[#888888]">
                  {formatUSD(option.costPerTable)}
                  {t("perTable")}
                </p>
                {option.description && (
                  <p className="mt-2 text-xs leading-relaxed text-[#AAAAAA]">
                    {option.description}
                  </p>
                )}
                <p className="mt-3 text-xs font-semibold text-[#1A1A1A]">
                  {formatUSD(option.costPerTable * tables)} total
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {state.furniture && (
        <p className="mt-5 text-sm font-medium text-[#1A1A1A]">
          {t("total")}{" "}
          <span className="text-[#5B9FD9]">{formatUSD(furnitureTotal)}</span>
          <span className="ml-1 text-xs text-[#AAAAAA]">
            ({formatUSD(state.furniture.costPerTable)}/table × {tableCount}{" "}
            tables)
          </span>
        </p>
      )}
    </StepWrapper>
  );
}

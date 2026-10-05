"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import DetailsModal from "./DetailsModal";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type {
  DecorPackage,
  AddOn,
} from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  stepNumber: number;
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
  stepNumber,
  state,
  dispatch,
  packages,
  defaultSeatsPerTable,
}: Props) {
  const t = useTranslations("weddingCalculator.steps.decor");
  const [detailsPkg, setDetailsPkg] = useState<DecorPackage | null>(null);

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
      stepNumber={stepNumber}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.decor}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {packages.map((pkg) => {
          const selected = state.decor?._id === pkg._id;
          const selectPkg = () => dispatch({ type: "SET_DECOR", decor: pkg });
          return (
            <div
              key={pkg._id}
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              onClick={selectPkg}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectPkg();
                }
              }}
              className={[
                "flex cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9FD9]",
                selected
                  ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
                  : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
              ].join(" ")}
            >
              {pkg.imageUrl && (
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#F0EDE8]">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 400px"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <p
                  className={`font-semibold ${selected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
                >
                  {pkg.name}
                </p>
                <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">
                  {formatUSD(pkg.baseCost)}
                </p>
                <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-xs leading-relaxed text-[#AAAAAA]">
                  {pkg.description ?? ""}
                </p>
                {pkg.decorDetails && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailsPkg(pkg);
                    }}
                    className="mt-auto self-start pt-3 text-sm font-medium text-[#5B9FD9] underline-offset-2 hover:underline"
                  >
                    {t("seeDecor")}
                  </button>
                )}
              </div>
            </div>
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

      <DetailsModal
        open={!!detailsPkg}
        onClose={() => setDetailsPkg(null)}
        title={detailsPkg?.name ?? ""}
        closeLabel={t("closeDecor")}
        value={detailsPkg?.decorDetails ?? []}
      />
    </StepWrapper>
  );
}

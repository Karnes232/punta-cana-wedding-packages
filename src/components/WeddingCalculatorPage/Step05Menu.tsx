"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import DetailsModal from "./DetailsModal";
import {
  isPlatedEffective,
  PLATED_FORCED_BELOW,
  PLATED_SURCHARGE,
  type CalculatorAction,
  type CalculatorState,
} from "./useCalculatorState";
import type { MenuOption } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  stepNumber: number;
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  menus: MenuOption[];
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step05Menu({
  stepNumber,
  state,
  dispatch,
  menus,
}: Props) {
  const t = useTranslations("weddingCalculator.steps.menu");
  const [detailsMenu, setDetailsMenu] = useState<MenuOption | null>(null);

  const selectedMenuCost = state.menu
    ? state.menu.costPerPerson * state.guests
    : 0;
  const plated = isPlatedEffective(state);
  const platedSurcharge = plated ? selectedMenuCost * PLATED_SURCHARGE : 0;
  const showToggle = state.guests >= PLATED_FORCED_BELOW;

  return (
    <StepWrapper
      stepNumber={stepNumber}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.menu}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {menus.map((menu) => {
          const selected = state.menu?._id === menu._id;
          const selectMenu = () => dispatch({ type: "SET_MENU", menu });
          return (
            <div
              key={menu._id}
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              onClick={selectMenu}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectMenu();
                }
              }}
              className={[
                "flex cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9FD9]",
                selected
                  ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
                  : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
              ].join(" ")}
            >
              {menu.imageUrl && (
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#F0EDE8]">
                  <Image
                    src={menu.imageUrl}
                    alt={menu.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`font-semibold ${selected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
                  >
                    {menu.name}
                  </p>
                  <p className="shrink-0 text-sm font-semibold text-[#1A1A1A]">
                    {formatUSD(menu.costPerPerson)}
                    {t("perPerson")}
                  </p>
                </div>
                <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-xs leading-relaxed text-[#888888]">
                  {menu.description ?? ""}
                </p>
                {menu.menuDetails && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailsMenu(menu);
                    }}
                    className="mt-auto self-start pt-3 text-sm font-medium text-[#5B9FD9] underline-offset-2 hover:underline"
                  >
                    {t("seeMenu")}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {state.menu && (
        <div className="mt-6 rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] p-5">
          <p className="mb-3 text-sm font-medium text-[#1A1A1A]">
            {t("serviceStyle")}
          </p>
          {showToggle ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "SET_PLATED_UPGRADE", value: false })
                }
                className={[
                  "rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200",
                  !plated
                    ? "border-[#5B9FD9] bg-white text-[#5B9FD9] shadow-sm"
                    : "border-[#E0E0E0] bg-white text-[#666666] hover:border-[#5B9FD9]/50",
                ].join(" ")}
              >
                {t("buffet")}
              </button>
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "SET_PLATED_UPGRADE", value: true })
                }
                className={[
                  "rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200",
                  plated
                    ? "border-[#5B9FD9] bg-white text-[#5B9FD9] shadow-sm"
                    : "border-[#E0E0E0] bg-white text-[#666666] hover:border-[#5B9FD9]/50",
                ].join(" ")}
              >
                {t("plated")}{" "}
                <span className="text-xs text-[#AAAAAA]">
                  {t("platedSurcharge")}
                </span>
              </button>
            </div>
          ) : (
            <p className="text-xs text-[#666666]">{t("platedRequiredNote")}</p>
          )}

          <div className="mt-5 space-y-1 border-t border-[#EEEEEE] pt-4 text-sm">
            <p className="font-medium text-[#1A1A1A]">
              {t("total")}{" "}
              <span className="text-[#5B9FD9]">
                {formatUSD(selectedMenuCost + platedSurcharge)}
              </span>
              <span className="ml-1 text-xs text-[#AAAAAA]">
                ({formatUSD(state.menu.costPerPerson)}/person × {state.guests}{" "}
                guests)
              </span>
            </p>
            {plated && (
              <p className="text-xs text-[#888888]">
                {t("platedLine")}{" "}
                <span className="text-[#5B9FD9]">
                  +{formatUSD(platedSurcharge)}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      <DetailsModal
        open={!!detailsMenu}
        onClose={() => setDetailsMenu(null)}
        title={detailsMenu?.name ?? ""}
        closeLabel={t("closeMenu")}
        value={detailsMenu?.menuDetails ?? []}
      />
    </StepWrapper>
  );
}

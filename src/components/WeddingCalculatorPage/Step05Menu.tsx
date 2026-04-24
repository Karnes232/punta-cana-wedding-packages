"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { MenuOption } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
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

export default function Step05Menu({ state, dispatch, menus }: Props) {
  const t = useTranslations("weddingCalculator.steps.menu");

  const selectedMenuCost = state.menu
    ? state.menu.costPerPerson * state.guests
    : 0;

  return (
    <StepWrapper
      stepNumber={5}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.menu}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {menus.map((menu) => {
          const selected = state.menu?._id === menu._id;
          return (
            <button
              key={menu._id}
              onClick={() => dispatch({ type: "SET_MENU", menu })}
              className={[
                "overflow-hidden rounded-xl border text-left transition-all duration-200",
                selected
                  ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
                  : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
              ].join(" ")}
            >
              {menu.imageUrl && (
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={menu.imageUrl}
                    alt={menu.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
                  />
                </div>
              )}
              <div className="p-5">
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
                {menu.description && (
                  <p className="mt-2 text-xs leading-relaxed text-[#888888]">
                    {menu.description}
                  </p>
                )}
                {menu.style && (
                  <p className="mt-2 text-xs font-medium capitalize text-[#5B9FD9]">
                    {menu.style}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {state.menu && (
        <p className="mt-5 text-sm font-medium text-[#1A1A1A]">
          {t("total")}{" "}
          <span className="text-[#5B9FD9]">{formatUSD(selectedMenuCost)}</span>
          <span className="ml-1 text-xs text-[#AAAAAA]">
            ({formatUSD(state.menu.costPerPerson)}/person × {state.guests}{" "}
            guests)
          </span>
        </p>
      )}
    </StepWrapper>
  );
}

"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { BeautyService } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  services: BeautyService[];
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function StepBeauty({ state, dispatch, services }: Props) {
  const t = useTranslations("weddingCalculator.steps.beauty");

  const beautyTotal = state.beautyServices.reduce(
    (sum, b) => sum + b.service.pricePerPerson * b.quantity,
    0,
  );

  const qtyFor = (id: string) =>
    state.beautyServices.find((b) => b.service._id === id)?.quantity ?? 0;

  const setQty = (service: BeautyService, quantity: number) =>
    dispatch({
      type: "SET_BEAUTY_QUANTITY",
      service,
      quantity: Math.max(0, quantity),
    });

  const groups: { key: string; heading: string }[] = [
    { key: "hairMakeup", heading: t("hairMakeupHeading") },
    { key: "barber", heading: t("barberHeading") },
  ];

  return (
    <StepWrapper
      stepNumber={11}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      onSkip={() => dispatch({ type: "NEXT_STEP" })}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      <div className="space-y-8">
        {groups.map((group) => {
          const groupServices = services.filter(
            (s) => s.category === group.key,
          );
          if (groupServices.length === 0) return null;

          return (
            <div key={group.key}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#5B9FD9]">
                {group.heading}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {groupServices.map((service) => {
                  const qty = qtyFor(service._id);
                  const selected = qty > 0;
                  return (
                    <div
                      key={service._id}
                      className={[
                        "flex flex-col overflow-hidden rounded-xl border transition-all duration-200",
                        selected
                          ? "border-[#5B9FD9] bg-[#5B9FD9]/5"
                          : "border-[#E0E0E0] bg-white",
                      ].join(" ")}
                    >
                      {service.imageUrl && (
                        <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#F0EDE8]">
                          <Image
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm font-semibold ${selected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
                          >
                            {service.name}
                          </p>
                          <p className="shrink-0 text-sm font-semibold text-[#1A1A1A]">
                            {t("perPerson", {
                              price: formatUSD(service.pricePerPerson),
                            })}
                          </p>
                        </div>
                        {service.description && (
                          <p className="mt-1 text-xs leading-relaxed text-[#888888]">
                            {service.description}
                          </p>
                        )}

                        {/* Quantity stepper */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label={t("decrease")}
                              onClick={() => setQty(service, qty - 1)}
                              disabled={qty === 0}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E0E0E0] text-lg leading-none text-[#555555] transition-colors duration-200 hover:border-[#5B9FD9] hover:text-[#5B9FD9] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-semibold tabular-nums text-[#1A1A1A]">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label={t("increase")}
                              onClick={() => setQty(service, qty + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E0E0E0] text-lg leading-none text-[#555555] transition-colors duration-200 hover:border-[#5B9FD9] hover:text-[#5B9FD9]"
                            >
                              +
                            </button>
                            <span className="text-xs text-[#AAAAAA]">
                              {t("people")}
                            </span>
                          </div>
                          {selected && (
                            <span className="text-sm font-semibold text-[#5B9FD9] tabular-nums">
                              {formatUSD(service.pricePerPerson * qty)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {beautyTotal > 0 && (
        <p className="mt-6 text-sm font-medium text-[#1A1A1A]">
          {t("total")}{" "}
          <span className="text-[#5B9FD9]">{formatUSD(beautyTotal)}</span>
        </p>
      )}
    </StepWrapper>
  );
}

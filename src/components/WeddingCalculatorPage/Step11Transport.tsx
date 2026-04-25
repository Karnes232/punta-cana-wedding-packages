"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { TransportVehicle } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  vehicles: TransportVehicle[];
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step11Transport({ state, dispatch, vehicles }: Props) {
  const t = useTranslations("weddingCalculator.steps.transport");

  const selected = state.transportVehicle;
  const selectedZoneRate =
    selected && state.hotel
      ? (selected.zonePricing.find((zp) => zp.zoneId === state.hotel!._id)
          ?.ratePerVehicle ?? null)
      : null;
  const vehicleCount = selected
    ? Math.ceil(state.guests / selected.capacity)
    : null;
  const transportTotal =
    selectedZoneRate !== null && vehicleCount !== null
      ? selectedZoneRate * vehicleCount
      : null;

  return (
    <StepWrapper
      stepNumber={10}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      continueDisabled={!state.transportVehicle}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      {/* Hotel zone context */}
      {state.hotel && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-[#5B9FD9]/20 bg-[#F0F7FF] px-4 py-3">
          <span className="text-xs font-semibold text-[#5B9FD9]">
            {t("zone")}:
          </span>
          <span className="text-xs text-[#555555]">{state.hotel.name}</span>
        </div>
      )}

      {/* Vehicle options */}
      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => {
            const isSelected = state.transportVehicle?._id === vehicle._id;
            const count = Math.ceil(state.guests / vehicle.capacity);
            const zoneRate = state.hotel
              ? (vehicle.zonePricing.find(
                  (zp) => zp.zoneId === state.hotel!._id,
                )?.ratePerVehicle ?? null)
              : null;
            const total = zoneRate !== null ? zoneRate * count : null;

            return (
              <button
                key={vehicle._id}
                onClick={() =>
                  dispatch({ type: "SET_TRANSPORT_VEHICLE", vehicle })
                }
                className={[
                  "overflow-hidden rounded-xl border text-left transition-all duration-200",
                  isSelected
                    ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
                    : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
                ].join(" ")}
              >
                {vehicle.imageUrl && (
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#F0EDE8]">
                    <Image
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 400px"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p
                      className={`font-semibold ${isSelected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
                    >
                      {vehicle.name}
                    </p>
                    <p className="text-xs text-[#AAAAAA]">
                      {zoneRate !== null
                        ? formatUSD(zoneRate)
                        : t("noPriceForZone")}{" "}
                      {t("perVehicle")}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-[#888888]">
                    {t("capacity", { n: vehicle.capacity })}
                  </p>
                  {vehicle.description && (
                    <p className="mt-2 text-xs leading-relaxed text-[#AAAAAA]">
                      {vehicle.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-end justify-between gap-2 border-t border-[#F0F0F0] pt-3">
                    <p className="text-xs text-[#888888]">
                      {t("vehiclesNeeded", { n: count, g: state.guests })}
                    </p>
                    {total !== null && zoneRate !== null ? (
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#1A1A1A]">
                          {formatUSD(total)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-[#AAAAAA]">
                        {t("noPriceForZone")}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-[#888888]">{t("noVehicles")}</p>
      )}

      {/* Selected summary */}
      {selected &&
        transportTotal !== null &&
        vehicleCount !== null &&
        selectedZoneRate !== null && (
          <p className="mt-5 text-sm font-medium text-[#1A1A1A]">
            {t("total")}{" "}
            <span className="text-[#5B9FD9]">{formatUSD(transportTotal)}</span>
            <span className="ml-1 text-xs text-[#AAAAAA]">
              ({vehicleCount} × {formatUSD(selectedZoneRate)})
            </span>
          </p>
        )}
    </StepWrapper>
  );
}

"use client";

import { useTranslations } from "next-intl";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { CalculatorConfig } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  config: CalculatorConfig;
  total: number;
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

function Row({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <span className="text-sm text-[#555555]">{label}</span>
      <span className="shrink-0 text-sm font-medium text-[#1A1A1A]">
        {value}
      </span>
    </div>
  );
}

export default function SummaryView({ state, dispatch, config, total }: Props) {
  const t = useTranslations("weddingCalculator.summary");

  const seatsPerTable =
    state.furniture?.seatsPerTable ?? config.defaultSeatsPerTable;
  const tableCount = Math.ceil(state.guests / seatsPerTable);
  const vehicleCount = state.hotel
    ? Math.ceil(state.guests / state.hotel.vehicleCapacity)
    : 0;

  const barTotal = state.bar
    ? state.bar.costPerPersonPerHour * state.barHours * state.guests +
      state.barAddOns.reduce(
        (s, a) => s + (a.isPerPerson ? a.cost * state.guests : a.cost),
        0,
      )
    : null;

  const decorTotal = state.decor
    ? state.decor.baseCost +
      state.decorAddOns.reduce(
        (s, a) => s + (a.isPerTable ? a.cost * tableCount : a.cost),
        0,
      )
    : null;

  const photoTotal = state.photo
    ? state.photo.cost + state.photoAddOns.reduce((s, a) => s + a.cost, 0)
    : null;

  const videoTotal =
    state.video && !state.videoSkipped
      ? state.video.cost + state.videoAddOns.reduce((s, a) => s + a.cost, 0)
      : null;

  const entertainmentTotal = state.entertainment.reduce(
    (s, e) => s + e.cost,
    0,
  );
  const extrasTotal = state.extras.reduce(
    (s, e) => s + (e.isPerPerson ? e.cost * state.guests : e.cost),
    0,
  );

  const formattedDate = state.date
    ? new Date(state.date + "T12:00:00").toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {t("heading")}
        </h2>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#666666]">
          {formattedDate && <span>📅 {formattedDate}</span>}
          <span>👥 {t("guests", { n: state.guests })}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-8 rounded-2xl border border-[#EFEFEF] bg-white">
        <div className="border-b border-[#EFEFEF] px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#999999]">
            {t("breakdown")}
          </p>
        </div>
        <div className="divide-y divide-[#F5F5F5] px-6">
          <Row
            label={t("venue")}
            value={formatUSD(config.venueCost + config.coordinationCost)}
          />
          {state.menu && (
            <Row
              label={t("menu", { name: state.menu.name, n: state.guests })}
              value={formatUSD(state.menu.costPerPerson * state.guests)}
            />
          )}
          {state.bar && barTotal !== null && (
            <Row
              label={t("bar", {
                name: state.bar.name,
                h: state.barHours,
                n: state.guests,
              })}
              value={formatUSD(barTotal)}
            />
          )}
          {state.furniture && (
            <Row
              label={t("furniture", {
                name: state.furniture.name,
                n: tableCount,
              })}
              value={formatUSD(state.furniture.costPerTable * tableCount)}
            />
          )}
          {state.decor && decorTotal !== null && (
            <Row
              label={t("decor", { name: state.decor.name })}
              value={formatUSD(decorTotal)}
            />
          )}
          {state.photo && photoTotal !== null && (
            <Row
              label={t("photo", { name: state.photo.name })}
              value={formatUSD(photoTotal)}
            />
          )}
          {videoTotal !== null && state.video && (
            <Row
              label={t("video", { name: state.video.name })}
              value={formatUSD(videoTotal)}
            />
          )}
          {state.hotel && vehicleCount > 0 && (
            <Row
              label={t("transport", { n: vehicleCount })}
              value={formatUSD(state.hotel.ratePerVehicle * vehicleCount)}
            />
          )}
          {entertainmentTotal > 0 && (
            <Row
              label={t("entertainment")}
              value={formatUSD(entertainmentTotal)}
            />
          )}
          {extrasTotal > 0 && (
            <Row label={t("extras")} value={formatUSD(extrasTotal)} />
          )}
        </div>
        {/* Total */}
        <div className="flex items-center justify-between rounded-b-2xl bg-[#5B9FD9]/5 px-6 py-5">
          <p className="text-base font-semibold text-[#1A1A1A]">{t("total")}</p>
          <p className="text-2xl font-semibold text-[#5B9FD9] tabular-nums">
            {formatUSD(total)}
          </p>
        </div>
      </div>

      <p className="mb-8 text-xs text-[#AAAAAA]">{t("disclaimer")}</p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch({ type: "SET_STEP", step: 1 })}
          className="text-sm text-[#888888] transition-colors duration-200 hover:text-[#5B9FD9]"
        >
          {t("edit")}
        </button>
        <button
          onClick={() => dispatch({ type: "GO_TO_FORM" })}
          className="rounded-xl bg-[#5B9FD9] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2]"
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
}

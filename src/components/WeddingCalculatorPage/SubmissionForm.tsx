"use client";

import { useState } from "react";
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

export default function SubmissionForm({
  state,
  dispatch,
  config,
  total,
}: Props) {
  const t = useTranslations("weddingCalculator.form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const seatsPerTable =
    state.furniture?.seatsPerTable ?? config.defaultSeatsPerTable;
  const tableCount = Math.ceil(state.guests / seatsPerTable);
  const vehicleCount = state.hotel
    ? Math.ceil(state.guests / state.hotel.vehicleCapacity)
    : 0;

  // Build a plain-text summary of all selections for the form payload
  function buildSummary(): string {
    // One line per array entry; join("\n") adds breaks. Empty strings add blank lines
    // so Netlify submissions (and export CSV) read in clear sections.
    const lines: string[] = [
      `Wedding Date: ${state.date}`,
      `Guests: ${state.guests}`,
      `Hotel Area: ${state.hotel?.name ?? "Not selected"}`,
      "",
      "PRICING BREAKDOWN",
      "",
      `Venue & Coordination: ${formatUSD(config.venueCost + config.coordinationCost)}`,
    ];
    if (state.menu)
      lines.push(
        `Menu: ${state.menu.name} — ${formatUSD(state.menu.costPerPerson * state.guests)}`,
      );
    if (state.bar)
      lines.push(
        `Bar: ${state.bar.name} × ${state.barHours}h — ${formatUSD(state.bar.costPerPersonPerHour * state.barHours * state.guests)}`,
      );
    if (state.furniture)
      lines.push(
        `Furniture: ${state.furniture.name} × ${tableCount} tables — ${formatUSD(state.furniture.costPerTable * tableCount)}`,
      );
    if (state.decor)
      lines.push(
        `Decor: ${state.decor.name} — ${formatUSD(state.decor.baseCost)}`,
      );
    if (state.photo)
      lines.push(
        `Photography: ${state.photo.name} — ${formatUSD(state.photo.cost)}`,
      );
    if (state.video && !state.videoSkipped)
      lines.push(
        `Videography: ${state.video.name} — ${formatUSD(state.video.cost)}`,
      );
    if (state.hotel && vehicleCount > 0)
      lines.push(
        `Transportation: ${vehicleCount} vehicles — ${formatUSD(state.hotel.ratePerVehicle * vehicleCount)}`,
      );
    if (state.entertainment.length > 0)
      lines.push(
        `Entertainment: ${state.entertainment.map((e) => e.name).join(", ")}`,
      );
    if (state.extras.length > 0)
      lines.push(`Extras: ${state.extras.map((e) => e.name).join(", ")}`);
    lines.push("", "---", `TOTAL: ${formatUSD(total)}`);
    return lines.join("\n");
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("nameRequired");
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = t("emailRequired");
    if (!terms) e.terms = t("termsRequired");
    return e;
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("form-name", "wedding-calculator");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("whatsapp", whatsapp);
      formData.append("phone", phone);
      formData.append("weddingDate", state.date);
      formData.append("guestCount", String(state.guests));
      formData.append("estimatedTotal", formatUSD(total));
      formData.append("weddingConfig", buildSummary());
      formData.append("notes", notes);

      await fetch("/__forms.html", {
        method: "POST",
        body: formData,
      });

      dispatch({ type: "GO_TO_SUCCESS" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {t("heading")}
        </h2>
        <p className="mt-2 text-sm text-[#666666]">{t("sub")}</p>
        <p className="mt-1 text-sm font-medium text-[#5B9FD9]">
          Estimated total: {formatUSD(total)}
        </p>
      </div>

      <form
        name="wedding-calculator"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="max-w-lg space-y-5"
      >
        {/* Hidden fields for Netlify */}
        <input type="hidden" name="form-name" value="wedding-calculator" />

        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#333333]">
            {t("name")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            className="w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] shadow-sm transition-colors duration-200 focus:border-[#5B9FD9] focus:outline-none focus:ring-2 focus:ring-[#5B9FD9]/20"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#333333]">
            {t("email")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] shadow-sm transition-colors duration-200 focus:border-[#5B9FD9] focus:outline-none focus:ring-2 focus:ring-[#5B9FD9]/20"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* WhatsApp + Phone (side by side) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#333333]">
              {t("whatsapp")}
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder={t("whatsappPlaceholder")}
              className="w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] shadow-sm transition-colors duration-200 focus:border-[#5B9FD9] focus:outline-none focus:ring-2 focus:ring-[#5B9FD9]/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#333333]">
              {t("phone")}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
              className="w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] shadow-sm transition-colors duration-200 focus:border-[#5B9FD9] focus:outline-none focus:ring-2 focus:ring-[#5B9FD9]/20"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#333333]">
            {t("notes")}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("notesPlaceholder")}
            rows={4}
            className="w-full resize-none rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] shadow-sm transition-colors duration-200 focus:border-[#5B9FD9] focus:outline-none focus:ring-2 focus:ring-[#5B9FD9]/20"
          />
        </div>

        {/* Payment terms */}
        <div className="rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#E0E0E0] accent-[#5B9FD9]"
            />
            <div>
              <p className="text-sm font-medium text-[#333333]">{t("terms")}</p>
              <p className="mt-1 text-xs text-[#888888]">{t("termsDetail")}</p>
            </div>
          </label>
          {errors.terms && (
            <p className="mt-2 text-xs text-red-500">{errors.terms}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "GO_TO_SUMMARY" })}
            className="rounded-xl border border-[#E0E0E0] px-6 py-3 text-sm font-medium text-[#555555] transition-colors duration-200 hover:bg-[#F8F8F8]"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-[#5B9FD9] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t("submitting") : t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type {
  VideoPackage,
  AddOn,
} from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  packages: VideoPackage[];
};

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Step10Video({ state, dispatch, packages }: Props) {
  const t = useTranslations("weddingCalculator.steps.video");

  const videoTotal =
    state.video && !state.videoSkipped
      ? state.video.cost + state.videoAddOns.reduce((sum, a) => sum + a.cost, 0)
      : 0;

  const isAddonSelected = (addon: AddOn) =>
    state.videoAddOns.some((a) => a._key === addon._key);

  return (
    <StepWrapper
      stepNumber={9}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={() => dispatch({ type: "NEXT_STEP" })}
      onSkip={() => {
        dispatch({ type: "SKIP_VIDEO" });
        dispatch({ type: "NEXT_STEP" });
      }}
      continueDisabled={!state.video && !state.videoSkipped}
    >
      <p className="mb-6 text-sm text-[#666666]">{t("label")}</p>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {packages.map((pkg) => {
          const selected = state.video?._id === pkg._id && !state.videoSkipped;
          return (
            <button
              key={pkg._id}
              onClick={() => dispatch({ type: "SET_VIDEO", video: pkg })}
              className={[
                "flex flex-col overflow-hidden rounded-xl border text-left transition-all duration-200",
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
              <div className="p-5">
                <p
                  className={`font-semibold ${selected ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
                >
                  {pkg.name}
                </p>
                <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">
                  {formatUSD(pkg.cost)}
                </p>
                <p className="mt-0.5 text-xs text-[#888888]">
                  {t("hours", { n: pkg.hours })}
                </p>
                {pkg.description && (
                  <p className="mt-2 text-xs leading-relaxed text-[#AAAAAA]">
                    {pkg.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {state.video && !state.videoSkipped && state.video.addOns.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-[#333333]">
            {t("addOns")}
          </p>
          <div className="space-y-2">
            {state.video.addOns.map((addon) => (
              <label
                key={addon._key}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-[#E0E0E0] bg-white p-3 transition-colors duration-200 hover:border-[#5B9FD9]/40"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isAddonSelected(addon)}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_VIDEO_ADDON", addon })
                    }
                    className="h-4 w-4 rounded border-[#E0E0E0] accent-[#5B9FD9]"
                  />
                  <span className="text-sm text-[#333333]">{addon.name}</span>
                </div>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {addon.cost >= 0 ? "+" : ""}
                  {formatUSD(addon.cost)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {state.videoSkipped && (
        <p className="mb-4 rounded-xl bg-[#F5F5F5] px-4 py-3 text-sm text-[#888888]">
          Videography skipped.{" "}
          <button
            onClick={() => dispatch({ type: "SET_VIDEO", video: packages[0] })}
            className="text-[#5B9FD9] underline"
          >
            Add it back
          </button>
        </p>
      )}

      {state.video && !state.videoSkipped && (
        <p className="text-sm font-medium text-[#1A1A1A]">
          {t("total")}{" "}
          <span className="text-[#5B9FD9]">{formatUSD(videoTotal)}</span>
        </p>
      )}
    </StepWrapper>
  );
}

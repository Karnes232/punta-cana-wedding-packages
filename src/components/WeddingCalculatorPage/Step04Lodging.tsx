"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import StepWrapper from "./StepWrapper";
import PropertyDetailsModal from "./PropertyDetailsModal";
import type { CalculatorAction, CalculatorState } from "./useCalculatorState";
import type { PropertyConfig } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  stepNumber: number;
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  propertyConfig: PropertyConfig | null;
};

type Choice = "property" | "other" | null;

export default function Step04Lodging({
  stepNumber,
  state,
  dispatch,
  propertyConfig,
}: Props) {
  const t = useTranslations("weddingCalculator.steps.lodging");

  const initialChoice: Choice = state.stayAtProperty
    ? "property"
    : state.hotel
      ? "other"
      : null;

  const [choice, setChoice] = useState<Choice>(initialChoice);
  const [modalOpen, setModalOpen] = useState(false);

  const onPickProperty = () => {
    setChoice("property");
    setModalOpen(true);
  };

  const onPickOther = () => {
    setChoice("other");
    dispatch({ type: "SET_STAY_AT_PROPERTY", value: false });
  };

  const onAccept = () => {
    dispatch({ type: "SET_STAY_AT_PROPERTY", value: true });
    setModalOpen(false);
    dispatch({ type: "NEXT_STEP" });
  };

  const onContinue = () => {
    if (choice === "property") {
      dispatch({ type: "SET_STAY_AT_PROPERTY", value: true });
    } else if (choice === "other") {
      dispatch({ type: "SET_STAY_AT_PROPERTY", value: false });
    }
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <StepWrapper
      stepNumber={stepNumber}
      title={t("title")}
      onBack={() => dispatch({ type: "PREV_STEP" })}
      onContinue={onContinue}
      continueDisabled={choice === null}
    >
      <p className="mb-6 text-sm leading-relaxed text-[#666666]">
        {t("label")}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Stay at our property */}
        {propertyConfig && (
          <button
            type="button"
            onClick={onPickProperty}
            className={[
              "rounded-xl border p-5 text-left transition-all duration-200",
              choice === "property"
                ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
                : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
            ].join(" ")}
          >
            <p
              className={`font-semibold ${choice === "property" ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
            >
              {propertyConfig.stayOptionLabel}
            </p>
            <p className="mt-1 text-xs text-[#888888]">
              {propertyConfig.stayOptionSub}
            </p>
            {propertyConfig.startingPriceLabel && (
              <p className="mt-3 text-sm font-medium text-[#1A1A1A]">
                {propertyConfig.startingPriceLabel}
              </p>
            )}
            <span className="mt-3 inline-block text-xs font-medium text-[#5B9FD9] underline-offset-2 hover:underline">
              {t("seeDetails")} →
            </span>
          </button>
        )}

        {/* I already have another hotel */}
        <button
          type="button"
          onClick={onPickOther}
          className={[
            "rounded-xl border p-5 text-left transition-all duration-200 flex flex-col",
            choice === "other"
              ? "border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm"
              : "border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50",
          ].join(" ")}
        >
          <p
            className={`font-semibold ${choice === "other" ? "text-[#5B9FD9]" : "text-[#1A1A1A]"}`}
          >
            {propertyConfig?.otherOptionLabel || t("otherOption")}
          </p>
          <p className="mt-1 text-xs text-[#888888]">
            {propertyConfig?.otherOptionSub || t("otherOptionSub")}
          </p>
        </button>
      </div>

      {propertyConfig && (
        <PropertyDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAccept={onAccept}
          title={propertyConfig.name}
          images={propertyConfig.images}
          description={propertyConfig.description}
          acceptLabel={t("accept")}
          closeLabel={t("closeLabel")}
        />
      )}
    </StepWrapper>
  );
}

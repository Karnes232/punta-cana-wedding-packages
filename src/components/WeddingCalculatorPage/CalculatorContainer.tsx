"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useCalculatorState } from "./useCalculatorState";
import { TOTAL_STEPS, stepIdAt, type StepId } from "./steps";
import {
  clearProgress,
  loadProgress,
  rehydrateState,
  saveProgress,
} from "./persistence";
import ProgressBar from "./ProgressBar";
import RunningTotal from "./RunningTotal";
import StepContact from "./StepContact";
import Step01Date from "./Step01Date";
import Step02Guests from "./Step02Guests";
import Step03WeddingType from "./Step03WeddingType";
import Step04Lodging from "./Step04Lodging";
import Step03Hotel from "./Step03Hotel";
import Step04Venue from "./Step04Venue";
import Step05Menu from "./Step05Menu";
import Step06Bar from "./Step06Bar";
import Step07Furniture from "./Step07Furniture";
import Step08Decor from "./Step08Decor";
import StepBridalTable from "./StepBridalTable";
import StepBeauty from "./StepBeauty";
import Step09Photo from "./Step09Photo";
import Step10Video from "./Step10Video";
import Step11Transport from "./Step11Transport";
import Step12Entertainment from "./Step12Entertainment";
import Step13Extras from "./Step13Extras";
import SummaryView from "./SummaryView";
import SubmissionForm from "./SubmissionForm";
import SuccessScreen from "./SuccessScreen";
import WeddingPreview from "./WeddingPreview";

import type { CalculatorData } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  data: CalculatorData;
  locale: string;
};

export default function CalculatorContainer({ data }: Props) {
  const {
    state,
    dispatch,
    total,
    fullTotal,
    goToStep,
    SUMMARY_STEP,
    FORM_STEP,
    SUCCESS_STEP,
  } = useCalculatorState(data.config);
  const t = useTranslations("weddingCalculator.nav");

  // Track the highest step reached so user can click back on progress bar
  const [maxStepReached, setMaxStepReached] = useState(1);
  if (state.currentStep > maxStepReached && state.currentStep <= TOTAL_STEPS) {
    setMaxStepReached(state.currentStep);
  }

  // Resume saved progress once on mount (after hydration, since localStorage
  // isn't available during server render)
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      const next = rehydrateState(saved, data);
      dispatch({ type: "RESTORE", state: next });
      setMaxStepReached(Math.min(next.currentStep, TOTAL_STEPS));
    }
    setRestored(true);
  }, [data, dispatch]);

  // Save progress whenever the step changes (Continue, Back, Skip, progress
  // bar). Future hook point for saving partial leads to a backend.
  useEffect(() => {
    if (!restored) return;
    if (state.currentStep === SUCCESS_STEP) clearProgress();
    else saveProgress(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- save on step change only
  }, [state.currentStep, restored]);

  const startOver = () => {
    clearProgress();
    dispatch({ type: "RESET" });
    setMaxStepReached(1);
  };

  // Show full total (including venue) once the user has confirmed the venue
  const runningDisplayTotal = state.venueConfirmed ? fullTotal : total;

  const stepId = stepIdAt(state.currentStep);
  const isWizardStep = stepId !== null;
  const isSummary = state.currentStep === SUMMARY_STEP;
  const isForm = state.currentStep === FORM_STEP;
  const isSuccess = state.currentStep === SUCCESS_STEP;

  function renderStep(id: StepId) {
    const stepNumber = state.currentStep;
    switch (id) {
      case "contact":
        return (
          <StepContact
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
          />
        );
      case "date":
        return (
          <Step01Date
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            minimumAdvanceMonths={data.config.minimumAdvanceMonths}
          />
        );
      case "guests":
        return (
          <Step02Guests
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
          />
        );
      case "weddingType":
        return (
          <Step03WeddingType
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            weddingTypes={data.weddingTypes}
          />
        );
      case "lodging":
        return (
          <Step04Lodging
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            propertyConfig={data.propertyConfig}
          />
        );
      case "hotel":
        return (
          <Step03Hotel
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            zones={data.transportationZones}
          />
        );
      case "menu":
        return (
          <Step05Menu
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            menus={data.menuOptions}
          />
        );
      case "bar":
        return (
          <Step06Bar
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            packages={data.barPackages}
          />
        );
      case "furniture":
        return (
          <Step07Furniture
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            options={data.furnitureOptions}
            defaultSeatsPerTable={data.config.defaultSeatsPerTable}
          />
        );
      case "decor":
        return (
          <Step08Decor
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            packages={data.decorPackages}
            defaultSeatsPerTable={data.config.defaultSeatsPerTable}
          />
        );
      case "bridalTable":
        return (
          <StepBridalTable
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            packages={data.bridalTablePackages}
            defaultSeatsPerTable={data.config.defaultSeatsPerTable}
          />
        );
      case "beauty":
        return (
          <StepBeauty
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            services={data.beautyServices}
          />
        );
      case "photo":
        return (
          <Step09Photo
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            packages={data.photoPackages}
          />
        );
      case "video":
        return (
          <Step10Video
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            packages={data.videoPackages}
          />
        );
      case "transport":
        return (
          <Step11Transport
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            vehicles={data.transportVehicles}
          />
        );
      case "entertainment":
        return (
          <Step12Entertainment
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            options={data.entertainmentOptions}
          />
        );
      case "extras":
        return (
          <Step13Extras
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            options={data.extraOptions}
          />
        );
      case "venue":
        return (
          <Step04Venue
            stepNumber={stepNumber}
            state={state}
            dispatch={dispatch}
            config={data.config}
          />
        );
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-8 lg:pb-16">
      <div className="flex gap-12">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Progress bar (only in wizard steps) */}
          {isWizardStep && (
            <div className="mb-8">
              <ProgressBar
                currentStep={state.currentStep}
                totalSteps={TOTAL_STEPS}
                completedStep={maxStepReached}
                onStepClick={goToStep}
              />
              {(state.currentStep > 1 || maxStepReached > 1) && (
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={startOver}
                    className="text-xs text-[#AAAAAA] transition-colors duration-200 hover:text-[#5B9FD9]"
                  >
                    {t("startOver")}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile style preview (wizard steps only) */}
          {isWizardStep && (
            <div className="lg:hidden">
              <WeddingPreview decor={state.decor} variant="mobile" />
            </div>
          )}

          {/* Step content */}
          {stepId && renderStep(stepId)}

          {isSummary && (
            <SummaryView
              state={state}
              dispatch={dispatch}
              config={data.config}
              propertyConfig={data.propertyConfig}
              total={fullTotal}
            />
          )}
          {isForm && (
            <SubmissionForm
              state={state}
              dispatch={dispatch}
              config={data.config}
              propertyConfig={data.propertyConfig}
              total={fullTotal}
            />
          )}
          {isSuccess && <SuccessScreen />}
        </div>

        {/* Running total sidebar (desktop) — hidden on summary/form/success */}
        {(isWizardStep || isSummary) && (
          <div className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              {isWizardStep && (
                <WeddingPreview decor={state.decor} variant="desktop" />
              )}
              <RunningTotal total={runningDisplayTotal} />
            </div>
          </div>
        )}
      </div>

      {/* Running total mobile bar (always shown in wizard) */}
      {isWizardStep && <RunningTotal total={runningDisplayTotal} />}
    </div>
  );
}

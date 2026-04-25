"use client";

import { useState } from "react";
import { useCalculatorState } from "./useCalculatorState";
import ProgressBar from "./ProgressBar";
import RunningTotal from "./RunningTotal";
import Step01Date from "./Step01Date";
import Step02Guests from "./Step02Guests";
import Step03Hotel from "./Step03Hotel";
import Step04Venue from "./Step04Venue";
import Step05Menu from "./Step05Menu";
import Step06Bar from "./Step06Bar";
import Step07Furniture from "./Step07Furniture";
import Step08Decor from "./Step08Decor";
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

const TOTAL_STEPS = 13;

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

  // Track the highest step reached so user can click back on progress bar
  const [maxStepReached, setMaxStepReached] = useState(1);
  if (state.currentStep > maxStepReached && state.currentStep <= TOTAL_STEPS) {
    setMaxStepReached(state.currentStep);
  }

  // Show full total (including venue) once the user has confirmed the venue
  const runningDisplayTotal = state.venueConfirmed ? fullTotal : total;

  const isWizardStep =
    state.currentStep >= 1 && state.currentStep <= TOTAL_STEPS;
  const isSummary = state.currentStep === SUMMARY_STEP;
  const isForm = state.currentStep === FORM_STEP;
  const isSuccess = state.currentStep === SUCCESS_STEP;

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
            </div>
          )}

          {/* Mobile style preview (wizard steps only) */}
          {isWizardStep && (
            <div className="lg:hidden">
              <WeddingPreview decor={state.decor} variant="mobile" />
            </div>
          )}

          {/* Step content */}
          {state.currentStep === 1 && (
            <Step01Date
              state={state}
              dispatch={dispatch}
              minimumAdvanceMonths={data.config.minimumAdvanceMonths}
            />
          )}
          {state.currentStep === 2 && (
            <Step02Guests state={state} dispatch={dispatch} />
          )}
          {state.currentStep === 3 && (
            <Step03Hotel
              state={state}
              dispatch={dispatch}
              zones={data.transportationZones}
            />
          )}
          {state.currentStep === 4 && (
            <Step05Menu
              state={state}
              dispatch={dispatch}
              menus={data.menuOptions}
            />
          )}
          {state.currentStep === 5 && (
            <Step06Bar
              state={state}
              dispatch={dispatch}
              packages={data.barPackages}
            />
          )}
          {state.currentStep === 6 && (
            <Step07Furniture
              state={state}
              dispatch={dispatch}
              options={data.furnitureOptions}
              defaultSeatsPerTable={data.config.defaultSeatsPerTable}
            />
          )}
          {state.currentStep === 7 && (
            <Step08Decor
              state={state}
              dispatch={dispatch}
              packages={data.decorPackages}
              defaultSeatsPerTable={data.config.defaultSeatsPerTable}
            />
          )}
          {state.currentStep === 8 && (
            <Step09Photo
              state={state}
              dispatch={dispatch}
              packages={data.photoPackages}
            />
          )}
          {state.currentStep === 9 && (
            <Step10Video
              state={state}
              dispatch={dispatch}
              packages={data.videoPackages}
            />
          )}
          {state.currentStep === 10 && (
            <Step11Transport
              state={state}
              dispatch={dispatch}
              vehicles={data.transportVehicles}
            />
          )}
          {state.currentStep === 11 && (
            <Step12Entertainment
              state={state}
              dispatch={dispatch}
              options={data.entertainmentOptions}
            />
          )}
          {state.currentStep === 12 && (
            <Step13Extras
              state={state}
              dispatch={dispatch}
              options={data.extraOptions}
            />
          )}
          {state.currentStep === 13 && (
            <Step04Venue
              state={state}
              dispatch={dispatch}
              config={data.config}
            />
          )}

          {isSummary && (
            <SummaryView
              state={state}
              dispatch={dispatch}
              config={data.config}
              total={fullTotal}
            />
          )}
          {isForm && (
            <SubmissionForm
              state={state}
              dispatch={dispatch}
              config={data.config}
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

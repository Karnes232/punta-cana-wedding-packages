'use client'

import { useTranslations } from 'next-intl'
import StepWrapper from './StepWrapper'
import type { CalculatorAction, CalculatorState } from './useCalculatorState'

type Props = {
  state:    CalculatorState
  dispatch: React.Dispatch<CalculatorAction>
}

const MIN_GUESTS = 10
const MAX_GUESTS = 500

export default function Step02Guests({ state, dispatch }: Props) {
  const t = useTranslations('weddingCalculator.steps.guests')

  const setGuests = (value: number) => {
    const clamped = Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, value))
    dispatch({ type: 'SET_GUESTS', guests: clamped })
  }

  return (
    <StepWrapper
      stepNumber={2}
      title={t('title')}
      onBack={() => dispatch({ type: 'PREV_STEP' })}
      onContinue={() => dispatch({ type: 'NEXT_STEP' })}
    >
      <p className="mb-6 text-sm leading-relaxed text-[#666666]">{t('help')}</p>

      <div className="max-w-xs">
        <label className="mb-2 block text-sm font-medium text-[#333333]">
          {t('label')}
        </label>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuests(state.guests - 5)}
            disabled={state.guests <= MIN_GUESTS}
            aria-label="Decrease"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E0E0E0] text-lg font-medium text-[#555555] transition-all duration-200 hover:border-[#5B9FD9] hover:text-[#5B9FD9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <input
            type="number"
            min={MIN_GUESTS}
            max={MAX_GUESTS}
            value={state.guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10) || MIN_GUESTS)}
            className="w-24 rounded-xl border border-[#E0E0E0] bg-white px-3 py-3 text-center text-lg font-semibold text-[#1A1A1A] shadow-sm transition-colors duration-200 focus:border-[#5B9FD9] focus:outline-none focus:ring-2 focus:ring-[#5B9FD9]/20"
          />

          <button
            onClick={() => setGuests(state.guests + 5)}
            disabled={state.guests >= MAX_GUESTS}
            aria-label="Increase"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E0E0E0] text-lg font-medium text-[#555555] transition-all duration-200 hover:border-[#5B9FD9] hover:text-[#5B9FD9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>

        <p className="mt-3 text-xs text-[#AAAAAA]">
          {t('min')} · {t('max')}
        </p>
      </div>
    </StepWrapper>
  )
}

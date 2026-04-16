'use client'

import { useTranslations } from 'next-intl'
import StepWrapper from './StepWrapper'
import type { CalculatorAction, CalculatorState } from './useCalculatorState'

type Props = {
  state:    CalculatorState
  dispatch: React.Dispatch<CalculatorAction>
  minimumAdvanceMonths: number
}

function getMinDate(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return d.toISOString().split('T')[0]
}

export default function Step01Date({ state, dispatch, minimumAdvanceMonths }: Props) {
  const t    = useTranslations('weddingCalculator.steps.date')
  const minDate = getMinDate(minimumAdvanceMonths)

  const handleContinue = () => {
    if (state.date && state.date >= minDate) {
      dispatch({ type: 'NEXT_STEP' })
    }
  }

  const isValid = state.date && state.date >= minDate

  return (
    <StepWrapper
      stepNumber={1}
      title={t('title')}
      onContinue={handleContinue}
      continueDisabled={!isValid}
    >
      <p className="mb-6 text-sm leading-relaxed text-[#666666]">{t('help')}</p>

      <div className="max-w-sm">
        <label className="mb-2 block text-sm font-medium text-[#333333]">
          {t('label')}
        </label>
        <input
          type="date"
          min={minDate}
          value={state.date}
          onChange={(e) => dispatch({ type: 'SET_DATE', date: e.target.value })}
          className="w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] shadow-sm transition-colors duration-200 focus:border-[#5B9FD9] focus:outline-none focus:ring-2 focus:ring-[#5B9FD9]/20"
        />
        {state.date && state.date < minDate && (
          <p className="mt-2 text-xs text-red-500">{t('tooSoon')}</p>
        )}
      </div>
    </StepWrapper>
  )
}

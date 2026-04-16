'use client'

import { useTranslations } from 'next-intl'
import StepWrapper from './StepWrapper'
import type { CalculatorAction, CalculatorState } from './useCalculatorState'

type Props = {
  state:    CalculatorState
  dispatch: React.Dispatch<CalculatorAction>
}

function formatUSD(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n)
}

export default function Step11Transport({ state, dispatch }: Props) {
  const t = useTranslations('weddingCalculator.steps.transport')

  if (!state.hotel) {
    return (
      <StepWrapper
        stepNumber={11}
        title={t('title')}
        onBack={() => dispatch({ type: 'PREV_STEP' })}
        onContinue={() => dispatch({ type: 'NEXT_STEP' })}
      >
        <p className="text-sm text-[#888888]">
          No hotel area selected. This step uses the area you chose in Step 3.
        </p>
      </StepWrapper>
    )
  }

  const vehicleCount   = Math.ceil(state.guests / state.hotel.vehicleCapacity)
  const transportTotal = state.hotel.ratePerVehicle * vehicleCount

  return (
    <StepWrapper
      stepNumber={11}
      title={t('title')}
      onBack={() => dispatch({ type: 'PREV_STEP' })}
      onContinue={() => dispatch({ type: 'NEXT_STEP' })}
    >
      <p className="mb-6 text-sm text-[#666666]">{t('label')}</p>

      <div className="max-w-md rounded-2xl border border-[#5B9FD9]/20 bg-[#F0F7FF] p-6">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5B9FD9]">{t('zone')}</p>
          <p className="mt-1 text-xl font-semibold text-[#1A1A1A]">{state.hotel.name}</p>
          {state.hotel.description && (
            <p className="mt-1 text-sm text-[#666666]">{state.hotel.description}</p>
          )}
        </div>

        <div className="space-y-3 border-t border-[#5B9FD9]/20 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#666666]">{t('capacity', { n: state.hotel.vehicleCapacity })}</span>
            <span className="font-medium text-[#1A1A1A]">{formatUSD(state.hotel.ratePerVehicle)}{t('perVehicle')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#666666]">{t('vehiclesNeeded', { n: vehicleCount, g: state.guests })}</span>
            <span className="font-medium text-[#1A1A1A]">{vehicleCount} × {formatUSD(state.hotel.ratePerVehicle)}</span>
          </div>
          <div className="flex justify-between border-t border-[#5B9FD9]/20 pt-3">
            <span className="font-semibold text-[#1A1A1A]">{t('total')}</span>
            <span className="text-lg font-semibold text-[#5B9FD9]">{formatUSD(transportTotal)}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#AAAAAA]">
        Want to change your area? Go back to Step 3.
      </p>
    </StepWrapper>
  )
}

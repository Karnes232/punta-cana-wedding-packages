'use client'

import { useTranslations } from 'next-intl'
import StepWrapper from './StepWrapper'
import type { CalculatorAction, CalculatorState } from './useCalculatorState'
import type { TransportationZone } from '@/sanity/queries/WeddingCalculator/getCalculatorData'

type Props = {
  state:    CalculatorState
  dispatch: React.Dispatch<CalculatorAction>
  zones:    TransportationZone[]
}

export default function Step03Hotel({ state, dispatch, zones }: Props) {
  const t = useTranslations('weddingCalculator.steps.hotel')

  return (
    <StepWrapper
      stepNumber={3}
      title={t('title')}
      onBack={() => dispatch({ type: 'PREV_STEP' })}
      onContinue={() => dispatch({ type: 'NEXT_STEP' })}
      continueDisabled={!state.hotel}
    >
      <p className="mb-6 text-sm leading-relaxed text-[#666666]">{t('help')}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {zones.map((zone) => {
          const selected = state.hotel?._id === zone._id
          return (
            <button
              key={zone._id}
              onClick={() => dispatch({ type: 'SET_HOTEL', hotel: zone })}
              className={[
                'rounded-xl border p-4 text-left transition-all duration-200',
                selected
                  ? 'border-[#5B9FD9] bg-[#5B9FD9]/5 shadow-sm'
                  : 'border-[#E0E0E0] bg-white hover:border-[#5B9FD9]/50',
              ].join(' ')}
            >
              <p className={`text-sm font-semibold ${selected ? 'text-[#5B9FD9]' : 'text-[#1A1A1A]'}`}>
                {zone.name}
              </p>
              {zone.description && (
                <p className="mt-1 text-xs text-[#888888]">{zone.description}</p>
              )}
              <p className="mt-2 text-xs font-medium text-[#AAAAAA]">
                ${zone.ratePerVehicle}/vehicle · {zone.vehicleCapacity} seats
              </p>
            </button>
          )
        })}
      </div>
    </StepWrapper>
  )
}

'use client'

import { useTranslations } from 'next-intl'

type Props = {
  currentStep:  number
  totalSteps:   number
  completedStep: number  // highest step the user has visited
  onStepClick:  (step: number) => void
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  completedStep,
  onStepClick,
}: Props) {
  const t = useTranslations('weddingCalculator.progress')

  return (
    <div className="w-full">
      {/* Label */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium text-[#999999]">
          {t('step', { current: currentStep, total: totalSteps })}
        </p>
        <p className="text-xs font-medium text-[#5B9FD9]">
          {Math.round((currentStep / totalSteps) * 100)}%
        </p>
      </div>

      {/* Bar */}
      <div className="relative h-1.5 w-full rounded-full bg-[#EFEFEF]">
        <div
          className="absolute left-0 top-0 h-1.5 rounded-full bg-[#5B9FD9] transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Dot indicators (desktop only) */}
      <div className="mt-3 hidden items-center justify-between md:flex">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1
          const done    = step < currentStep
          const active  = step === currentStep
          const reachable = step <= completedStep
          return (
            <button
              key={step}
              onClick={() => reachable ? onStepClick(step) : undefined}
              disabled={!reachable}
              aria-label={`Step ${step}`}
              className={[
                'h-2 w-2 rounded-full transition-all duration-200',
                active    ? 'scale-150 bg-[#5B9FD9]'  : '',
                done      ? 'bg-[#5B9FD9] opacity-60'  : '',
                !done && !active ? 'bg-[#DDDDDD]'       : '',
                reachable && !active ? 'cursor-pointer hover:opacity-80' : 'cursor-default',
              ].join(' ')}
            />
          )
        })}
      </div>
    </div>
  )
}

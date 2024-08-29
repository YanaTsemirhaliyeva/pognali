import { memo } from 'react'

import styles from './PlanStepTitle.module.scss'

export function PlanStepTitleComponent({
  step,
  title,
}: {
  step: number
  title: string
}) {
  return (
    <h3 className={`${step === 2 ? `${styles['plan-title']} ${styles['plan-title--br-none']}` : `${styles['plan-title']}`}`}>
      Шаг {step}. <br /> {title}
    </h3>
  )
}

export const PlanStepTitle = memo(PlanStepTitleComponent)

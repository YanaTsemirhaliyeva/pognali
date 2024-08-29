import { memo } from 'react'

import { STEP_LIST } from './step-list'
import styles from './StepList.module.scss'

export function StepListComponent({ activeItem }: { activeItem: string }) {
  return (
    <ul className={styles['step-list']}>
      {STEP_LIST.map((step, i) => {
        const isActive = activeItem.toLowerCase() === step.toLowerCase()
        const className = isActive
          ? `${styles['step-list__item']} ${styles['step-list__item--active']}`
          : styles['step-list__item']

        return (
          <li key={i} className={className}>
            {step.toUpperCase()}
          </li>
        )
      })}
    </ul>
  )
}

export const StepList = memo(StepListComponent)

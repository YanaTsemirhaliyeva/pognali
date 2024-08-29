'use client'

import { memo } from 'react'
import { useForm } from '@/store/form'
import { BtnForm } from '@/ui/btn-form/BtnForm'
import { Checkbox } from '@/ui/checkbox/Checkbox'
import { InputWithBtns } from '@/ui/input-with-btns/InputWithBtns'

import { Calendar } from '../calendar/Calendar'
import { PlanStepDesc } from '../plan-step-desc/PlanStepDesc'
import { PlanStepTitle } from '../plan-step-title/PlanStepTitle'
import { StepList } from '../step-list/StepList'
import {
  INPUT_COMPANION,
  INPUT_DURATION,
  INPUT_WITH_CHILDREN,
  TITLE_DATA
} from './date-of-stay'
import styles from './DatesOfStay.module.scss'

export function DatesOfStayComponent() {
  const { step, title, activeItem, description } = TITLE_DATA
  const { activeStep, setActiveStep } = useForm()

  return (
    <div className={styles['date-stay']}>
      <div className={styles['date-stay__header']}>
        <div className={styles['date-stay__text']}>
          <PlanStepTitle step={step} title={title} />
          <PlanStepDesc text={description} />
        </div>
        <StepList activeItem={activeItem} />
      </div>
      <div className={styles['date-stay__inputs']}>
        <div className={styles['date-stay__companion']}>
          <InputWithBtns
            name={INPUT_COMPANION.name}
            label={INPUT_COMPANION.label}
            unit={INPUT_COMPANION.unit}
          />
        </div>
        <div className={styles['date-stay__duration']}>
          <InputWithBtns
            name={INPUT_DURATION.name}
            label={INPUT_DURATION.label}
            unit={INPUT_DURATION.unit}
          />
        </div>
        <div className={styles['date-stay__children']}>
          <Checkbox
            name={INPUT_WITH_CHILDREN.name}
            label={INPUT_WITH_CHILDREN.label}
          />
        </div>
      </div>
      <div className={styles['date-stay__calendar']}>
        <Calendar />
      </div>
      <BtnForm
        title="Следующий шаг"
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </div>
  )
}

export const DatesOfStay = memo(DatesOfStayComponent)

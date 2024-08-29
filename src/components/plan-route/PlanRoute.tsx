import { useForm } from '@/store/form'
import { BtnForm } from '@/ui/btn-form/BtnForm'
import { BtnPrevStep } from '@/ui/btn-prev-step/BtnPrevStep'
import { SelectCountryBtns } from '@/ui/select-country-btns/SelectCountryBtns'

import { PlanStepDesc } from '../plan-step-desc/PlanStepDesc'
import { PlanStepTitle } from '../plan-step-title/PlanStepTitle'
import { StepList } from '../step-list/StepList'
import { TITLE_DATA } from './plan-route'
import styles from './PlanRoute.module.scss'

export function PlanRoute() {
  const { step, title, description, activeItem } = TITLE_DATA
  const { activeStep, setActiveStep } = useForm()

  return (
    <div className={styles['route']}>
      <div className={styles['route__header']}>
        <div className={styles['route__text']}>
          <PlanStepTitle step={step} title={title} />
          <PlanStepDesc text={description} />
        </div>
        <StepList activeItem={activeItem} />
      </div>
      <div className={styles['route__content']}>
        <SelectCountryBtns name="select" />
        <SelectCountryBtns name="add" />
      </div>
      <div className={styles['route__btns']}>
        <BtnForm
          title="Следующий шаг"
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <BtnPrevStep activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
    </div>
  )
}

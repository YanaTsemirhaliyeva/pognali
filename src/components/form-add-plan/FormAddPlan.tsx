'use client'

import { memo, useEffect } from 'react'
import { useCards } from '@/store/cards'
import { useForm } from '@/store/form'
import { getUserCardDataLS, getUserCardIdLS } from '@/utils'

import { DatesOfStay } from '../dates-of-stay/DatesOfStay'
import { Entertainment } from '../entertainment/Entertainment'
import { PlanRoute } from '../plan-route/PlanRoute'
import { StepPoints } from '../step-points/StepPoints'
import styles from './FormAddPlan.module.scss'

export function FormAddPlanComponent() {
  const { activeStep } = useForm()
  const { setCardId, setCardData } = useCards()

  useEffect(() => {
    const { userCardId } = getUserCardIdLS()
    const { userCardData } = getUserCardDataLS()

    const dataLS = {
      data: userCardData ? userCardData : null,
      id: userCardId ? userCardId : ''
    }
    setCardData(dataLS.data)
    setCardId(dataLS.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={styles['add-plan']}>
      <div className={styles['add-plan__content']}>
        <header className={styles['add-plan__header']}>
          <h2 className={styles['add-plan__title']}>Добавить план:</h2>
          <StepPoints />
        </header>
        <form>
          <ul className={styles['add-plan__list']}>
            {activeStep === 1 && (
              <li
                className={`${styles['add-plan__item']} ${styles['add-plan__item--date-of-stay']}`}
              >
                <DatesOfStay />
              </li>
            )}
            {activeStep === 2 && (
              <li className={styles['add-plan__item']}>
                <PlanRoute />
              </li>
            )}
            {activeStep === 3 && (
              <li className={styles['add-plan__item']}>
                <Entertainment />
              </li>
            )}
          </ul>
        </form>
      </div>
    </section>
  )
}

export const FormAddPlan = memo(FormAddPlanComponent)

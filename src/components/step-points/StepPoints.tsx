import { memo, useEffect, useState } from 'react'
import { useForm } from '@/store/form'

import styles from './StepPoints.module.scss'

export function StepPointsComponent() {
  const [windowSize, setWindowSize] = useState<{
    width?: number
    height?: number
  }>({})
  const { activeStep } = useForm()

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isDesktop = (windowSize.width || Infinity) >= 1024

  return (
    <>
      {!isDesktop ? (
        <ul className={styles['step']}>
          {[1, 2, 3].map((step) => {
            const className =
              step === activeStep
                ? `${styles['step__item--active']} ${styles['step__item']}`
                : `${styles['step__item']}`
            return <li key={step} className={className}></li>
          })}
        </ul>
      ) : null}
    </>
  )
}

export const StepPoints = memo(StepPointsComponent)

import Image from 'next/image'

import styles from './BtnPrevStep.module.scss'

export function BtnPrevStep({
  activeStep,
  setActiveStep
}: {
  activeStep: number
  setActiveStep: (arg: number) => void
}) {
  return (
    <button
      className={styles['btn-prev']}
      type="button"
      onClick={() => setActiveStep(activeStep - 1)}
    >
      <Image
        src="img/icons/triangle.svg"
        alt="назад"
        width={11}
        height={14}
        className={styles['btn-prev__icon']}
      />
      <span>На шаг назад</span>
    </button>
  )
}

import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useForm } from '@/store/form'

import { INPUT_DATA } from './const'
import styles from './InputWithBtn.module.scss'

export function InputWithBtnsComponent({
  name,
  label,
  unit
}: {
  name: string
  label: string
  unit: string
}) {
  const { setCompanion, setDuration, companion, duration } = useForm()

  const isCompanion = name === INPUT_DATA.companion
  const activeValue = isCompanion ? companion : duration
  const [inputValue, setInputValue] = useState<number>(activeValue)

  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (name === INPUT_DATA.duration) {
      setInputValue(duration)
    }
  }, [duration, name])

  const companionConditionLess = companion > INPUT_DATA.companionMin
  const companionConditionMore = companion < INPUT_DATA.companionMax

  const durationConditionLess = duration > INPUT_DATA.durationMin
  const durationConditionMore = duration < INPUT_DATA.durationMax

  const handleInputLessChange = () => {
    if (isCompanion && companionConditionLess) {
      setInputValue(inputValue - 1)
      setCompanion(companion - 1)
    }
    if (!isCompanion && durationConditionLess) {
      setInputValue(inputValue - 1)
      setDuration(duration - 1)
    }
  }

  const handleInputMoreChange = () => {
    if (isCompanion && companionConditionMore) {
      setInputValue(inputValue + 1)
      setCompanion(companion + 1)
    }
    if (!isCompanion && durationConditionMore) {
      setInputValue(inputValue + 1)
      setDuration(duration + 1)
    }
  }

  const handleInputValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = +evt.target.value
    setInputValue(newValue)
  }

  const handleInputValueBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = +evt.target.value
    if (isCompanion) {
      if (newValue < INPUT_DATA.companionMin) {
        setInputValue(INPUT_DATA.companionMin)
        setCompanion(INPUT_DATA.companionMin)
      } else if (newValue > INPUT_DATA.companionMax) {
        setInputValue(INPUT_DATA.companionMax)
        setCompanion(INPUT_DATA.companionMax)
      } else {
        setCompanion(newValue)
      }
    } else {
      if (newValue < INPUT_DATA.durationMin) {
        setInputValue(INPUT_DATA.durationMin)
        setDuration(INPUT_DATA.durationMin)
      } else if (newValue > INPUT_DATA.durationMax) {
        setInputValue(INPUT_DATA.durationMax)
        setDuration(INPUT_DATA.durationMax)
      } else {
        setDuration(newValue)
      }
    }
  }

  const handleEnterClick = (evt: KeyboardEvent<HTMLInputElement>) => {
    const { target } = evt
    if (
      evt.key === 'Enter' &&
      target instanceof HTMLInputElement &&
      ref.current
    ) {
      ref.current.blur()
    }
  }

  const btnLessCompanionDisabled = companion === INPUT_DATA.companionMin
  const btnLessDurationDisabled = duration === INPUT_DATA.durationMin

  const btnMoreCompanionDisabled = companion === INPUT_DATA.companionMax
  const btnMoreDurationDisabled = duration === INPUT_DATA.durationMax

  return (
    <div className={styles.input}>
      <label htmlFor={name} className={styles['input__label']}>
        {label.toUpperCase()}:
      </label>
      <span className={styles['input__label-unit']}>{unit.toUpperCase()}</span>
      <div className={styles['input__input-wrapper']}>
        <input
          className={styles['input__input']}
          type="number"
          id={name}
          name={name}
          value={inputValue || ''}
          ref={ref}
          onChange={handleInputValueChange}
          onBlur={handleInputValueBlur}
          onKeyDown={handleEnterClick}
        />
        <button
          aria-label="less"
          type="button"
          className={`${styles['input__button']} ${styles['input__button--less']}`}
          onClick={handleInputLessChange}
          disabled={
            isCompanion ? btnLessCompanionDisabled : btnLessDurationDisabled
          }
        />
        <button
          aria-label="more"
          type="button"
          className={`${styles['input__button']} ${styles['input__button--more']}`}
          onClick={handleInputMoreChange}
          disabled={
            isCompanion ? btnMoreCompanionDisabled : btnMoreDurationDisabled
          }
        />
      </div>
    </div>
  )
}

const MemoizedInputWithBtnsComponent = memo(InputWithBtnsComponent)

MemoizedInputWithBtnsComponent.displayName = 'InputWithBtnsComponent'

export const InputWithBtns = (props: {
  name: string
  label: string
  unit: string
}) => {
  const memoizedProps = useMemo(
    () => ({
      name: props.name,
      label: props.label,
      unit: props.unit
    }),
    [props.name, props.label, props.unit]
  )

  return <MemoizedInputWithBtnsComponent {...memoizedProps} />
}

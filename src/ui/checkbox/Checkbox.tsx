'use client'

import { ChangeEvent, KeyboardEvent, memo } from 'react'
import Image from 'next/image'
import { useForm } from '@/store/form'

import styles from './Checkbox.module.scss'

export function CheckboxComponent({
  name,
  label
}: {
  name: string
  label: string
}) {
  const { children, setChildren } = useForm()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChildren(event.target.checked)
  }

  const handleEnterClick = (evt: KeyboardEvent<HTMLInputElement>) => {
    const { target } = evt
    if (evt.key === 'Enter' && target instanceof HTMLInputElement) {
      setChildren(!children)
    }
  }

  const handleClick = () => {
    setChildren(!children)
  }

  return (
    <label htmlFor={name} className={styles.checkbox}>
      <input
        type="checkbox"
        name={name}
        id={name}
        className="visually-hidden"
        checked={children}
        onChange={handleChange}
        onKeyDown={handleEnterClick}
        onClick={handleClick}
      />
      <span className={styles['checkbox__custom-input']}>
        {children && (
          <Image
            src="img/icons/tick.svg"
            alt="check children attribute"
            className={styles['checkbox__custom-check']}
            width={12}
            height={12}
          />
        )}
      </span>
      <span className={styles['checkbox__label']}>{label}</span>
    </label>
  )
}

export const Checkbox = memo(CheckboxComponent)

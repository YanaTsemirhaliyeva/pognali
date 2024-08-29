'use client'

import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ReactSVG } from 'react-svg'

import styles from './CheckboxFilters.module.scss'

export function CheckboxFilters({
  name,
  label,
  stateChecked,
  src
}: {
  name?: string
  label?: string
  stateChecked: boolean
  src?: string
}) {
  const [checked, setChecked] = useState<boolean>(stateChecked)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleEnterClick = (evt: KeyboardEvent<HTMLInputElement>) => {
    const { target } = evt
    if (evt.key === 'Enter' && target instanceof HTMLInputElement) {
      setChecked(!checked)
    }
  }

  return (
    <div>
      {src ? (
        <label
          htmlFor={name}
          className={`${src ? styles['checkbox-filters'] + ' ' + styles['checkbox-filters--svg'] : styles['checkbox-filters']}`}
        >
          <input
            type="checkbox"
            name={name}
            id={name}
            className="visually-hidden"
            checked={checked}
            onChange={handleChange}
            onKeyDown={handleEnterClick}
          />
          <span className={styles['checkbox-filters__custom-input-svg']}>
            <ReactSVG
              className={`${styles['checkbox-filters__svg']}`}
              src={src}
            />
          </span>
        </label>
      ) : (
        <label htmlFor={name} className={styles['checkbox-filters']}>
          <input
            type="checkbox"
            name={name}
            id={name}
            className="visually-hidden"
            checked={checked}
            onChange={handleChange}
            onKeyDown={handleEnterClick}
          />
          <span className={styles['checkbox-filters__custom-input']}>
            <ReactSVG
              src="img/icons/tick.svg"
              className={styles['checkbox-filters__custom-check']}
            />
          </span>
          <span className={styles['checkbox-filters__label']}>{label}</span>
        </label>
      )}
    </div>
  )
}

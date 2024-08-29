import { RefObject } from 'react'
import { ReactSVG } from 'react-svg'

import styles from './BtnSelect.module.scss'

export function BtnSelect({
  ref,
  name,
  isActive,
  onClick,
  country,
  handleSelectAdd
}: {
  ref?: RefObject<HTMLButtonElement>
  isActive?: boolean
  name?: string
  onClick?: () => void
  country?: string
  handleSelectAdd?: () => void
}) {
  // .opened нажата кнопка 'Выбрать страну', открыт поиск страны по алфавиту

  return name === 'select' ? (
    <button
      type="button"
      name={name}
      onClick={onClick ? onClick : undefined}
      ref={ref}
      className={`${isActive ? styles['btn-select'] + ' ' + styles['btn-select--select'] + ' ' + styles['opened'] : styles['btn-select'] + ' ' + styles['btn-select--select']}`}
      data-country-chose={country ? true : ''}
    >
      <span>{country ? country : 'Выберите страну'}</span>
      <ReactSVG
        className={
          styles['btn-select__icon'] + ' ' + styles['btn-select__icon--arrow']
        }
        src="img/icons/icon-arrow-back.svg"
      />
      <ReactSVG
        className={
          styles['btn-select__icon'] + ' ' + styles['btn-select__icon--close']
        }
        src="img/icons/icon-close.svg"
      />
    </button>
  ) : (
    <button
      type="button"
      name={name}
      className={styles['btn-select'] + ' ' + styles['btn-select--add']}
      onClick={handleSelectAdd}
    >
      <span>Добавить страну</span>
      <ReactSVG
        className={
          styles['btn-select__icon'] + ' ' + styles['btn-select__icon--add']
        }
        src="img/icons/icon-plus.svg"
      />
    </button>
  )
}

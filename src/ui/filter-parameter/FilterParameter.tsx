'use client'

import { CheckboxFilters } from '@/ui/checkbox-filters/CheckboxFilters'

import styles from './FilterParameter.module.scss'

export function FilterParameter({
  parameters,
  svg
}: {
  svg?: boolean
  parameters?: {
    title?: string
    src?: string
    label?: string
    value?: string
    name?: string
    stateChecked: boolean
  }[]
}) {
  return (
    <div className={styles['filter-parameter__wrapper']}>
      {parameters?.length ? (
        <ul
          className={`${svg ? styles['filter-parameter__list'] + ' ' + styles['filter-parameter__list--svg'] : styles['filter-parameter__list']}`}
        >
          {parameters.map((parameter) => (
            <li
              key={parameter.name}
              className={styles['filter-parameter__item']}
            >
              <CheckboxFilters {...parameter} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

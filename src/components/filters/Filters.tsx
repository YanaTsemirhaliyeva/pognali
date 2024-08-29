'use client'

import { Accordion } from '@/ui/accordion/Accordion'

import { PARAMETERS } from './filters-data'
import styles from './Filters.module.scss'

export function Filters() {
  return (
    <section className={styles['filters']}>
      <div className={styles['filters__container']}>
        <h2 className={styles['filters__title']}>
          Подберите идеального попутчика
        </h2>
        <form
          className={styles['filters__form']}
          action="catalog.html"
          method="get"
        >
          <Accordion parametersList={PARAMETERS} />
          <div className={styles['filters__button-wrapper']}>
            <button
              className={styles['filters__button']}
              type="button"
              aria-label="Приступить к поиску"
            >
              <span>Показать</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

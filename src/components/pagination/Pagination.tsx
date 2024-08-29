import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCards } from '@/store/cards'
import { createArray } from '@/utils'

import container from '../../styles/container.module.scss'
import styles from './Pagination.module.scss'

export function Pagination() {
  const { totalCardsCount, activePage, setActivePage, setPagination } =
    useCards()
  const [currentPage, setCurrentPage] = useState<number>(activePage)
  const itemsPerPage = 4
  const totalPages = Math.ceil(totalCardsCount / itemsPerPage)
  const pageArray = createArray(totalPages)

  useEffect(() => {
    setActivePage(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(activePage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage])

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
    setPagination(true)
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
    setPagination(true)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setPagination(true)
  }

  return (
    <>
      {totalCardsCount > 4 ? (
        <section className={styles['pagination']}>
          <div className={container['main-containerk']}>
            <div className={styles['pagination__inner']}>
              <ul className={styles['pagination__list']}>
                {pageArray.length > 0 &&
                  pageArray.map((elem) => {
                    return (
                      <li className={styles['pagination__item']} key={elem}>
                        <button
                          className={`${styles['pagination__link']} ${currentPage === elem ? styles['pagination__link--current'] : ''}`}
                          onClick={() => handlePageChange(elem)}
                          type="button"
                        >
                          {elem}
                        </button>
                      </li>
                    )
                  })}
              </ul>
              <ul className={styles['pagination__direction']}>
                <li
                  className={`${styles['pagination__arrow-item']} ${styles['pagination__arrow--prev']}`}
                >
                  <button
                    className={`${styles['pagination__arrow']} ${styles['pagination__arrow--prev']}`}
                    type="button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <Image
                      src="img/icons/arrow.svg"
                      width={14}
                      height={20}
                      alt="Назад."
                      className={styles['pagination__arrow-img']}
                    />
                  </button>
                </li>
                <li
                  className={`${styles['pagination__arrow-item']} ${styles['pagination__arrow--next']}`}
                >
                  <button
                    className={`${styles['pagination__arrow']} ${styles['pagination__arrow--next']}`}
                    type="button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <Image
                      src="img/icons/arrow-right.svg"
                      width={14}
                      height={20}
                      alt="Вперед."
                      className={styles['pagination__arrow-img']}
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

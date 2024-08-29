import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TRANSPORT_DATA } from '@/const'
import { useCards } from '@/store/cards'

import { BtnLike } from '../btn-like/BtnLike'
import { LevelTreveler } from '../level-treveler/LevelTreveler'
import styles from './Cards.module.scss'

export function Cards() {
  const {
    cards,
    cardId,
    activePage,
    totalCardsCount,
    setActivePage,
    cardsToShow,
    setCardsToShow,
    getTravelerCards,
    pagination,
    setPagination
  } = useCards()

  useEffect(() => {
    if (activePage === 1 || pagination) {
      setCardsToShow(cards)
    } else {
      const newCards = cards.filter(
        (card) =>
          !cardsToShow.some(
            (existingCard) => existingCard.cardId === card.cardId
          )
      )
      setCardsToShow([...cardsToShow, ...newCards])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, activePage])

  const handleClickShowMore = async () => {
    setActivePage(activePage + 1)
    setPagination(false)
    await getTravelerCards()
  }

  const itemsPerPage = 4
  const totalPages = Math.ceil(totalCardsCount / itemsPerPage)

  return (
    <section className={styles['card']}>
      <h2 className={styles['visually-hidden']}>Попутчики</h2>
      {cardsToShow &&
        cardsToShow.length > 0 &&
        cardsToShow.map((card) => {
          return (
            <article key={card.cardId} className={styles['card__item']}>
              <Link className={styles['card__img']} href={'#'}>
                <div className={styles['card__image']}>
                  <Image
                    src={card.avatarUrl}
                    width={70}
                    height={70}
                    alt={card.name}
                  />
                </div>
              </Link>
              <Link href={'#'} className={styles['card__title']}>
                <span className={styles['card__status']}></span>
                <span className={styles['card__title-name']}>{card.name}</span>
              </Link>
              {cardId !== card.cardId && <BtnLike />}

              {card.hashTags.length > 0 && (
                <p
                  className={`${styles['card__hashtags']} ${styles['hashtags']}`}
                >
                  {card.hashTags.length > 0 &&
                    card.hashTags.map((hashtag, i) => (
                      <span key={i}>{hashtag}</span>
                    ))}
                </p>
              )}
              <fieldset
                className={`${styles['card__country']} ${styles['card__flag']}`}
              >
                <legend className={styles['card__country-title']}>
                  хочет посетить:
                </legend>
                <ul
                  className={`${styles['card__country-list']} ${styles['card__flag-list']} ${styles['card__flag-list--column']}`}
                >
                  {card.countryList.map((country, i) => {
                    return (
                      <li
                        key={i}
                        className={`${styles['card__flag-item']} ${styles['card__flag-item--column']}`}
                      >
                        <Image
                          className={styles['card__flag-item-img']}
                          src={country.countryData.flags.png}
                          alt={country.countryData.name.rus}
                          width={35}
                          height={20}
                        />
                        <p className={styles['card__flag-text']}>
                          {country.countryData.name.rus}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </fieldset>
              <fieldset
                className={`${styles['card__transport']} ${styles['transport']}`}
              >
                <legend className={styles['transport-title']}>транспорт:</legend>
                <ul
                  className={`${styles['card__transport-list']} ${styles['transport__list']} ${styles['transport__list--cards']}`}
                >
                  {TRANSPORT_DATA.map((item, i) => {
                    const activeBtn = card?.transport.find(
                      (elem) => item.title === elem
                    )

                    return (
                      <li
                        key={i}
                        className={`${styles['transport__item']} ${styles['transport__item--catalog']} ${styles['tooltip']}`}
                      >
                        <span className={styles['visually-hidden']}>
                          {item.tooltip}
                        </span>
                        <div
                          className={
                            !activeBtn
                              ? `${styles['transport__item-button']}`
                              : `${styles['transport__item-button']} ${styles['transport__item-button--active']}`
                          }
                        >
                          <Image
                            className={styles['transport__svg']}
                            src={`img/icons/${item.title}.svg`}
                            alt={item.tooltip}
                            width={23}
                            height={22}
                          />
                        </div>
                        <span className={styles['tooltip__text']}>
                          {item.tooltip}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </fieldset>
              <div className={styles['card__level']}>
                <LevelTreveler />
              </div>
              {cardId !== card.cardId && (
                <button className={styles['card__button']}>Позвать!</button>
              )}
            </article>
          )
        })}

      {activePage < totalPages && (
        <button
          className={styles['card__add']}
          type="button"
          onClick={handleClickShowMore}
        >
          Показать еще
        </button>
      )}
    </section>
  )
}

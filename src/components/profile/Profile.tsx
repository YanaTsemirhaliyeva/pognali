import Image from 'next/image'
import { TRANSPORT_DATA } from '@/const'

import container from '../../styles/container.module.scss'
import { Hashtags } from '../hashtags/Hashtags'
import { TransportBtn } from '../transport-btn/TransportBtn'
import styles from './Profile.module.scss'

export function Profile() {
  return (
    <section className={styles['profile']}>
      <div className={styles['profile__title-wrapper']}>
        <div className={styles['profile__title-inner']}>
          <h2 className={styles['profile__title']}>направления</h2>
        </div>
      </div>
      <div className={container['main-container']}>
        <div className={styles['profile__container']}>
          <div className={styles['profile__level']}>
            <Image
              src="img/index/level80.svg"
              alt="Уровень пользователя."
              width={95}
              height={95}
              className={styles['img__index-desktop']}
            />
            <Image
              src="img/index/level-mobile.svg"
              alt="Уровень пользователя."
              width={95}
              height={95}
              className={styles['img__index-mobile']}
            />
          </div>
          <div className={styles['profile__picture']}>
            <Image
              src="img/avatars/demin-desktop.png"
              width={220}
              height={237}
              alt="Аватар Петра Демина."
              className={styles['profile__image']}
            />
          </div>
          <button className={styles['profile__button']} type="button">
            <span className={styles['profile__button-text']}>Сменить фото</span>
          </button>
          <Hashtags />
          <fieldset className={styles['profile__transport']}>
            <legend className={styles['profile__transport-title']}>
              транспорт
            </legend>
            <ul className={styles['transport__list']}>
              {TRANSPORT_DATA.map((transport) => {
                const { title, tooltip } = transport

                return (
                  <li
                    className={`${styles['transport__item']} ${styles['transport__item--catalog']} ${styles['tooltip']}`}
                    key={title}
                  >
                    <TransportBtn title={title} tooltip={tooltip} />
                  </li>
                )
              })}
            </ul>
          </fieldset>
        </div>
      </div>
    </section>
  )
}

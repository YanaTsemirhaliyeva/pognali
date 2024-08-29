import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppRoute } from '@/const'
import { ReactSVG } from 'react-svg'

import container from '../../styles/container.module.scss'
import styles from './Footer.module.scss'

export default function Footer() {
  const path = usePathname()

  return (
    <footer className={styles.footer}>
      <div className={container['main-container']}>
        <div className={styles.wrapper}>
          <Link
            className={styles['logo-link']}
            href={path !== AppRoute.Index ? AppRoute.Index : '#'}
          >
            <Image
              className={styles.logo}
              src="img/logo-full-dark.svg"
              width="200"
              height="50"
              alt="Погнали?"
            />
            <Image
              className={styles['logo-mobile']}
              src="img/logo-mobile-dark.svg"
              width="96"
              height="15"
              alt="Погнали?"
            />
          </Link>
          <ul className={styles.social}>
            <li className={styles['social__item']}>
              <Link className={styles['social__link']} href="#">
                <ReactSVG
                  className={styles['social__img']}
                  src="img/icons/icon-telegram.svg"
                />
              </Link>
            </li>
            <li className={styles['social__item']}>
              <Link className={styles['social__link']} href="#">
                <ReactSVG
                  className={styles['social__img']}
                  src="img/icons/icon-vk.svg"
                />
              </Link>
            </li>
            <li className={styles['social__item']}>
              <Link className={styles['social__link']} href="#">
                <ReactSVG
                  className={styles['social__img']}
                  src="img/icons/icon-youtube.svg"
                />
              </Link>
            </li>
          </ul>
          <span className={styles.devider}></span>
        </div>
      </div>
    </footer>
  )
}

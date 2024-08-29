import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppRoute } from '@/const'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from 'body-scroll-lock'
import FocusTrap from 'focus-trap-react'
import { toast } from 'react-hot-toast'
import { ReactSVG } from 'react-svg'

import container from '../../styles/container.module.scss'
import CustomLink from '../../ui/link/CustomLink'
import styles from './Header.module.scss'

export default function Header() {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen && menuRef.current) {
      disableBodyScroll(menuRef.current)
    } else if (menuRef.current) {
      enableBodyScroll(menuRef.current)
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [isOpen])

  const handleBurgerClick = () => setIsOpen(!isOpen)
  const handleCloseMenu = () => setIsOpen(false)

  const handleLinkClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    if (!localStorage.getItem('userCardId')) {
      evt.preventDefault()
      toast.error('Пожалуйста, заполните форму перед просмотром попутчиков.')
    }
  }

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const breakpointTablet = window.matchMedia('(min-width: 1024px)')

    const checkBreakpointSize = (
      event: MediaQueryListEvent | MediaQueryList
    ) => {
      if (event.matches) {
        setIsOpen(false)
      }
    }

    checkBreakpointSize(breakpointTablet)
    breakpointTablet.addEventListener('change', checkBreakpointSize)

    return () => {
      breakpointTablet.removeEventListener('change', checkBreakpointSize)
    }
  }, [])

  return (
    <>
      <header className={`${styles.header} ${isOpen ? styles['is-open'] : ''}`}>
        <FocusTrap active={isOpen}>
          <div className={container['main-container']}>
            <nav className={styles.nav}>
              <Link
                className={styles['nav__logo']}
                href={path !== AppRoute.Index ? AppRoute.Index : '#'}
                onClick={handleCloseMenu}
              >
                <Image
                  className={styles.logo}
                  src="img/logo-full.svg"
                  width={200}
                  height={50}
                  alt="Погнали?"
                  priority={true}
                />
                <ReactSVG
                  src="img/logo-mobile.svg"
                  width={96}
                  height={15}
                  className={styles['logo-mobile']}
                />
              </Link>
              <button
                className={`${styles.burger} ${isOpen ? styles['is-open'] : ''}`}
                onClick={handleBurgerClick}
              >
                <span className={styles['burger__top-line']}></span>
                <span className={styles['burger__bottom-line']}></span>
              </button>

              <div className={styles['nav__wrapper']} ref={menuRef}>
                <span className={styles['nav__line']}></span>
                <ul className={styles['nav__list']}>
                  <li className={styles['nav__item']}>
                    <CustomLink
                      extraClass={`${styles['nav__link']} ${styles['nav__link--primiry']}`}
                      href="#"
                      onClick={handleCloseMenu}
                    >
                      О сервисе
                    </CustomLink>
                  </li>
                  <li className={styles['nav__item']}>
                    <CustomLink
                      extraClass={`${styles['nav__link']} ${styles['nav__link--primiry']}`}
                      href={AppRoute.Form}
                      onClick={handleCloseMenu}
                    >
                      Направления
                    </CustomLink>
                  </li>
                  <li className={styles['nav__item']}>
                    <CustomLink
                      extraClass={`${styles['nav__link']} ${styles['nav__link--primiry']}`}
                      href={AppRoute.Catalog}
                      onClick={(evt) => {
                        handleCloseMenu()
                        handleLinkClick(evt)
                      }}
                    >
                      Попутчики
                    </CustomLink>
                  </li>
                </ul>
                <ul className={styles['nav__list-secondary']}>
                  <li className={styles['nav__item']}>
                    <a className={styles['nav__link']} href="tel:88005558628">
                      <ReactSVG
                        src="img/icons/icon-phone.svg"
                        className={styles['nav__icon']}
                      />
                      <span className={styles['nav__text']}>
                        8 800 555-86-28
                      </span>
                    </a>
                  </li>
                  <li className={styles['nav__item']}>
                    <a
                      className={styles['nav__link']}
                      href="mailto:mail@htmlacademy.ru"
                    >
                      <ReactSVG
                        src="img/icons/icon-mail.svg"
                        className={styles['nav__icon']}
                      />
                      <span className={styles['nav__text']}>
                        mail@htmlacademy.ru
                      </span>
                    </a>
                  </li>
                </ul>
                <ul className={styles['social']}>
                  <li className={styles['social__item']}>
                    <a className={styles['social__link']} href="#">
                      <ReactSVG
                        className={styles['social__icon']}
                        src="img/icons/icon-telegram.svg"
                      />
                    </a>
                  </li>
                  <li className={styles['social__item']}>
                    <a className={styles['social__link']} href="#">
                      <ReactSVG
                        className={styles['social__icon']}
                        src="img/icons/icon-vk.svg"
                      />
                    </a>
                  </li>
                  <li className={styles['social__item']}>
                    <a className={styles['social__link']} href="#">
                      <ReactSVG
                        className={styles['social__icon']}
                        src="img/icons/icon-youtube.svg"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </FocusTrap>
      </header>
      <div className={styles.overlay}></div>
    </>
  )
}

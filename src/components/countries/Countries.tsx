'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCards } from '@/store/cards'
import { useCountries } from '@/store/countries'
import { ReactSVG } from 'react-svg'
import { v4 as uuidv4 } from 'uuid'

import container from '../../styles/container.module.scss'
import CountriesContent from './countries-item/CountriesContent'
import styles from './Countries.module.scss'
import CountriesComponent from './countries/CountriesComponent'
import Letters from './letter/Letters'

interface FilteredCountry {
  country: string
  continent: string[]
}

interface CountriesDataTypes {
  letter: string
  countries: FilteredCountry[]
}

export default function Countries() {
  const { getCountries, countries, loading } = useCountries()
  const { setActivePage, setActiveContinents, activeContinents } = useCards()

  const [activeButtons, setActiveButtons] = useState<string[]>(activeContinents)
  const [isCountriesOpen, setIsCountriesOpen] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [activeLetter, setActiveLetter] = useState<string>('А')

  useEffect(() => {
    if (
      Object.keys(countries).length === 0 &&
      countries.constructor === Object
    ) {
      getCountries()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setActiveContinents(activeButtons)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeButtons])

  useEffect(() => {
    const breakpointTablet = window.matchMedia(
      '(min-width: 768px) and (max-width: 1024px)'
    )
    const breakpointMobile = window.matchMedia('(max-width: 767px)')

    const checkTabletBreakpointSize = (
      event: MediaQueryListEvent | MediaQueryList
    ) => {
      if (event.matches) {
        setIsTablet(true)
      } else {
        setIsTablet(false)
      }
    }

    const checkMobileBreakpointSize = (
      event: MediaQueryListEvent | MediaQueryList
    ) => {
      if (event.matches) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    checkTabletBreakpointSize(breakpointTablet)
    checkMobileBreakpointSize(breakpointMobile)
    breakpointTablet.addEventListener('change', checkTabletBreakpointSize)
    breakpointMobile.addEventListener('change', checkMobileBreakpointSize)

    return () => {
      breakpointTablet.removeEventListener('change', checkTabletBreakpointSize)
      breakpointMobile.removeEventListener('change', checkMobileBreakpointSize)
    }
  }, [])

  const handleFilterButtonClick = (buttonName: string) => {
    setActiveButtons((prev) => {
      if (prev.includes(buttonName)) {
        return prev.filter((name) => name !== buttonName)
      } else {
        return [...prev, buttonName]
      }
    })
  }

  const handleCounriesVisibleClick = () => {
    setIsCountriesOpen(!isCountriesOpen)
  }

  const handleChooseCountry = () => {
    setIsCountriesOpen(!isCountriesOpen)
    setActivePage(1)
  }

  const exclusions: string[] = useMemo(
    () => ['Ь', 'Ъ', 'Ы', 'Ё', 'Ж', 'Й', 'Ц', 'Щ'],
    []
  )
  const countriesData: CountriesDataTypes[] = useMemo(
    () =>
      Object.entries(countries)
        .filter(([letter]) => !exclusions.includes(letter))
        .map(([letter, arrayData]) => ({
          letter,
          countries: arrayData.map((country) => ({
            country: country.name.rus,
            continent: country.continent
          }))
        })),
    [countries, exclusions]
  )

  const getFilteredCountries = useMemo(
    () => (continents: string[]) => {
      if (continents.length === 0) return countriesData
      return countriesData.map(({ letter, countries }) => ({
        letter,
        countries: countries.filter((country) => {
          const isAmericaSelected = continents.includes(
            'North_America, South_America'
          )
          const otherContinents = continents.filter(
            (cont) => cont !== 'North_America, South_America'
          )
          const isOtherContinentSelected = otherContinents.some((cont) =>
            country.continent.includes(cont)
          )

          if (
            isAmericaSelected &&
            (country.continent.includes('North_America') ||
              country.continent.includes('South_America'))
          ) {
            return true
          }
          return isOtherContinentSelected
        })
      }))
    },
    [countriesData]
  )

  const filteredCountries = useMemo(
    () => getFilteredCountries(activeButtons),
    [getFilteredCountries, activeButtons]
  )

  const letterArray = useMemo(() => {
    return countriesData.map(({ letter }) => letter)
  }, [countriesData])

  const filteredByLetterCountries = useMemo(
    () =>
      filteredCountries
        .filter((country) => country.letter === activeLetter)
        .flatMap(({ countries }) => countries),
    [activeLetter, filteredCountries]
  )

  return (
    <>
      {loading ? null : (
        <section className={styles.countries}>
          <div className={container['main-container']}>
            <div className={styles['countries__wrapper']}>
              <div
                className={`${styles['countries__filter-wrapper']} ${isCountriesOpen ? styles['countries__filter-wrapper--open'] : ''}`}
              >
                <ReactSVG
                  className={styles['countries__filter-image']}
                  src="img/icons/icon-filter.svg"
                />
                <p
                  className={styles['countries__filter-text']}
                  onClick={handleCounriesVisibleClick}
                >
                  Фильтрация по странам:
                </p>
                {/* по хорошему это надо в отдельный компонент, но не успеваю уже нормально сделать */}
                {!isMobile && (
                  <div className={styles['countries__buttons-wrapper']}>
                    <button
                      className={`${styles['countries__button']} ${activeButtons.includes('Europe') ? styles['countries__button--active'] : ''}`}
                      onClick={() => handleFilterButtonClick('Europe')}
                      type="button"
                    >
                      Европа
                    </button>
                    <button
                      className={`${styles['countries__button']} ${activeButtons.includes('Asia') ? styles['countries__button--active'] : ''}`}
                      onClick={() => handleFilterButtonClick('Asia')}
                      type="button"
                    >
                      Азия
                    </button>
                    <button
                      className={`${styles['countries__button']} ${activeButtons.includes('North_America, South_America') ? styles['countries__button--active'] : ''}`}
                      onClick={() =>
                        handleFilterButtonClick('North_America, South_America')
                      }
                      type="button"
                    >
                      Америка
                    </button>
                    <button
                      className={`${styles['countries__button']} ${activeButtons.includes('Oceania') ? styles['countries__button--active'] : ''}`}
                      onClick={() => handleFilterButtonClick('Oceania')}
                      type="button"
                    >
                      Острова
                    </button>
                  </div>
                )}
                <button
                  className={styles['countries__show-button']}
                  onClick={handleCounriesVisibleClick}
                >
                  {!isCountriesOpen ? (
                    <>
                      <span>Показать все</span>
                      <ReactSVG src="img/icons/icon-points.svg" />
                    </>
                  ) : (
                    (isTablet || isMobile) && (
                      <>
                        <span>свернуть</span>
                        <ReactSVG src="img/icons/icon-close-2.svg" />
                      </>
                    )
                  )}
                </button>
              </div>

              {isCountriesOpen && !isTablet && !isMobile && (
                <ul className={`${styles['countries__list']}`}>
                  {filteredCountries.map(({ letter, countries }) => (
                    <li className={styles['countries__item']} key={letter}>
                      <CountriesContent
                        onChoose={handleChooseCountry}
                        letter={letter}
                        countries={countries}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {isCountriesOpen && (
                <div className={styles['countries__content-container']}>
                  <div className={styles['countries__content-wrapper']}>
                    {/* по хорошему это надо в отдельный компонент, но не успеваю уже нормально сделать */}
                    {isMobile && (
                      <div className={styles['countries__buttons-wrapper']}>
                        <button
                          className={`${styles['countries__button']} ${activeButtons.includes('Europe') ? styles['countries__button--active'] : ''}`}
                          onClick={() => handleFilterButtonClick('Europe')}
                          type="button"
                        >
                          Европа
                        </button>
                        <button
                          className={`${styles['countries__button']} ${activeButtons.includes('Asia') ? styles['countries__button--active'] : ''}`}
                          onClick={() => handleFilterButtonClick('Asia')}
                          type="button"
                        >
                          Азия
                        </button>
                        <button
                          className={`${styles['countries__button']} ${activeButtons.includes('North_America, South_America') ? styles['countries__button--active'] : ''}`}
                          onClick={() =>
                            handleFilterButtonClick(
                              'North_America, South_America'
                            )
                          }
                          type="button"
                        >
                          Америка
                        </button>
                        <button
                          className={`${styles['countries__button']} ${activeButtons.includes('Oceania') ? styles['countries__button--active'] : ''}`}
                          onClick={() => handleFilterButtonClick('Oceania')}
                          type="button"
                        >
                          Острова
                        </button>
                      </div>
                    )}
                    <ul className={styles['countries__letters-list']}>
                      {letterArray.map((letter) => (
                        <Letters
                          letter={letter}
                          setActiveLetter={setActiveLetter}
                          activeLetter={activeLetter}
                          key={letter}
                        />
                      ))}
                    </ul>
                    <ul className={styles['countries__countries-list']}>
                      {filteredByLetterCountries.map((country) => (
                        <CountriesComponent
                          country={country}
                          key={uuidv4()}
                          onChoose={handleChooseCountry}
                        />
                      ))}
                    </ul>
                  </div>
                  <button
                    className={styles['countries__hide-button']}
                    onClick={handleCounriesVisibleClick}
                  >
                    Свернуть
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

import { useEffect } from 'react'
import { useCountries } from '@/store/countries'

import { Country } from '@/types/countries'

import styles from './CountryList.module.scss'

export function CountryList({
  setActiveAlpabet,
  index,
  changeSelectedCountries
}: {
  setActiveAlpabet: () => void
  index?: number
  changeSelectedCountries?: (arg: number, arg2: Country) => void
}) {
  const { getCountries, countries, loading, activeLetter, setCurrentCountry } =
    useCountries((state) => ({
      getCountries: state.getCountries,
      countries: state.countries,
      loading: state.loading,
      activeLetter: state.activeLetter,
      setCurrentCountry: state.setCurrentCountry
    }))

  useEffect(() => {
    if (Object.keys(countries).length === 0) {
      getCountries()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCountryChoice = (item: Country) => {
    setCurrentCountry(item.name.rus)
    setActiveAlpabet()
    if (typeof index !== 'undefined' && changeSelectedCountries) {
      changeSelectedCountries(index, item)
    }
  }

  return (
    <div className={styles['country-list']}>
      {loading ? null : (
        <ul className={styles['country-list__list']}>
          {activeLetter &&
            Object.keys(countries).length !== 0 &&
            countries[activeLetter].map((item) => (
              <li
                className={styles['country-list__item']}
                key={item.name.common}
              >
                <button
                  className={styles['country-list__button']}
                  type="button"
                  onClick={() => handleCountryChoice(item)}
                >
                  {item.name.rus}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

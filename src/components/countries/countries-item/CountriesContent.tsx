import { useCards } from '@/store/cards'

import styles from './CountriesContent.module.scss'

interface FilteredCountry {
  country: string
  continent: string[]
}

interface CountriesContentProps {
  letter: string
  countries: FilteredCountry[]
  onChoose: () => void
}

export default function CountriesContent({
  letter,
  countries,
  onChoose
}: CountriesContentProps) {
  const { setActiveCountries } = useCards()

  const handleChangeLocation = (country: string) => {
    setActiveCountries([country])
    onChoose()
  }

  return (
    <>
      <p className={styles.letter}>{letter}</p>
      <ul className={styles.list}>
        {countries.map(({ country }) => (
          <li className={styles.item} key={country}>
            <button
              className={styles.button}
              onClick={() => handleChangeLocation(country)}
            >
              {country}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

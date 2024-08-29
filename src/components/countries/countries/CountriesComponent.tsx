import { useCards } from '@/store/cards'

import styles from './Countries.module.scss'

interface FilteredCountry {
  country: string
  continent: string[]
}
interface CountriesComponentProps {
  country: FilteredCountry
  onChoose: () => void
}

export default function CountriesComponent({
  country,
  onChoose
}: CountriesComponentProps) {
  const { setActiveCountries, setActiveContinents, activeContinents } =
    useCards()

  const handleChangeLocation = (country: string, continent: string[]) => {
    setActiveCountries([country])

    if (JSON.stringify(activeContinents) !== JSON.stringify(continent)) {
      setActiveContinents(continent)
    }
    onChoose()
  }

  return (
    <li>
      <button
        className={styles.button}
        onClick={() => handleChangeLocation(country.country, country.continent)}
      >
        {country.country}
      </button>
    </li>
  )
}

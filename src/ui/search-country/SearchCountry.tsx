import { AlphabetBtns } from '@/ui/alphabet-btns/AlphabetBtns'
import { CountryList } from '@/ui/country-list/CountryList'

import { Country } from '@/types/countries'

import styles from './SearchCountry.module.scss'

export function SearchCountry({
  setActiveAlphabet,
  index,
  changeSelectedCountries
}: {
  setActiveAlphabet: () => void
  index?: number
  changeSelectedCountries?: (arg: number, arg2: Country) => void
}) {
  return (
    <div className={styles['search-country']}>
      <AlphabetBtns />
      <CountryList
        setActiveAlpabet={setActiveAlphabet}
        index={index}
        changeSelectedCountries={changeSelectedCountries}
      />
    </div>
  )
}

import { useCountries } from '@/store/countries'

import { ALPHABET } from './alphabet-btns'
import styles from './AlphabetBtns.module.scss'

export function AlphabetBtns() {
  const { setActiveLetter, activeLetter } = useCountries()

  const handleClickSelect = (letter: string) => {
    setActiveLetter(letter)
  }

  return (
    <div className={styles['alphabet-btns']}>
      {ALPHABET.map((letter, id) => (
        <button
          onClick={() => handleClickSelect(letter)}
          key={id}
          type="button"
          className={`${activeLetter === letter ? styles['alphabet-btns__button'] + ' ' + styles['selected'] : styles['alphabet-btns__button']}`}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}

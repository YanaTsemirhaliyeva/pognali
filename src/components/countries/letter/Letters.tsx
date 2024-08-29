import { Dispatch } from 'react'

import styles from './Letters.module.scss'

interface LettersProps {
  letter: string
  setActiveLetter: Dispatch<string>
  activeLetter: string
}

export default function Letters({
  letter,
  setActiveLetter,
  activeLetter
}: LettersProps) {
  const handleLetterClick = () => setActiveLetter(letter)

  return (
    <li className={styles.item}>
      <button
        className={`${styles['letter']} ${activeLetter === letter && styles['letter--active']}`}
        onClick={handleLetterClick}
      >
        {letter}
      </button>
    </li>
  )
}

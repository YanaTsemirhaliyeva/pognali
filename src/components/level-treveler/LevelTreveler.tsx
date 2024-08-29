import { useEffect, useState } from 'react'

import styles from './LevelTreveler.module.scss'

export function LevelTreveler() {
  const [level, setLevel] = useState(0)

  useEffect(() => {
    const randomLevel = Math.floor(Math.random() * 101)
    setLevel(randomLevel)
  }, [])

  return (
    <fieldset className={styles['level-treveler']}>
      <legend
        className={`${styles['level-treveler__subtitle']} ${styles['level-treveler__subtitle--level']}`}
      >
        левел:
      </legend>
      <p className={styles['level-treveler__level']}>
        <svg
          className={styles['level-treveler__level-pie']}
          width="45"
          height="45"
          strokeDasharray={`${level} 100`}
          viewBox="0 0 31.83 31.83"
          aria-hidden="true"
        >
          <circle r="15.915" cx="15.915" cy="15.915" strokeWidth="3"></circle>
        </svg>
        <span className={styles['level-treveler__level-number']}>{level}</span>
        <span className={styles['level-treveler__level-text']}>level</span>
      </p>
    </fieldset>
  )
}

import { useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './BtnLike.module.scss'

export function BtnLike() {
  const [likesCount, setlikesCount] = useState<number>(0)
  const [btnActive, setBtnActive] = useState<boolean>(Math.random() >= 0.5)

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 2001)
    setlikesCount(randomNumber)
  }, [])

  const btnClassName = btnActive
    ? `${styles['cards__likes']} ${styles['cards__likes--active']}`
    : `${styles['cards__likes']}`

  return (
    <div className={styles['likes']}>
      <button className={btnClassName} onClick={() => setBtnActive(!btnActive)}>
        {!btnActive && (
          <Image
            src="img/icons/heart.svg"
            className={styles['likes__icon-no-active']}
            width={20}
            height={17}
            alt="Like."
          />
        )}
        {btnActive && (
          <Image
            src="img/icons/heart-fill.svg"
            className={styles['likes__icon-active']}
            width={20}
            height={17}
            alt="Like."
          />
        )}
        <span className={styles['visually-hidden']}>Поставить лайк.</span>
      </button>
      <span
        className={`${styles['likes__value']} ${styles['likes__value--demin']}`}
      >
        {btnActive ? likesCount + 1 : likesCount}
      </span>
    </div>
  )
}

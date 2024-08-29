'use client'

import { useState } from 'react'
import { useForm } from '@/store/form'
import { ReactSVG } from 'react-svg'

import styles from './TransportBtn.module.scss'

export function TransportBtn({
  title,
  tooltip
}: {
  title: string
  tooltip: string
}) {
  const { setTransport, transport } = useForm()
  const isActive = transport?.includes(title)

  const [activeBtn, setActiveBtn] = useState<boolean>(isActive)
  const btnClassName = !activeBtn
    ? `${styles['transport__item-button']}`
    : `${styles['transport__item-button']} ${styles['transport__item-button--active']}`

  const handleBtnClick = () => {
    setActiveBtn(!activeBtn)
    setTransport(title)
  }

  return (
    <>
      <span className={styles['visually-hidden']}>{title}</span>
      <button className={btnClassName} type="button" onClick={handleBtnClick}>
        <ReactSVG
          className={styles['transport__svg']}
          src={`img/icons/${title}.svg`}
        />
      </button>
      <span className={styles['tooltip__text']}>{tooltip}</span>
    </>
  )
}

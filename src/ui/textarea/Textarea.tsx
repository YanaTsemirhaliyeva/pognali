import { ChangeEvent, useState } from 'react'
import Image from 'next/image'

import styles from './Textarea.module.scss'

interface TextareaProps {
  isNoLine?: boolean
  title: string
  flag: string
  onTextareaBlur: (arg1: string, arg2: string) => void
  value: string
}

export default function Textarea({
  isNoLine,
  title,
  flag,
  onTextareaBlur,
  value: initialValue
}: TextareaProps) {
  const [value, setValue] = useState(initialValue)
  const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onTextareaBlur(title, event.target.value)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  return (
    <label
      className={`${styles.label} ${!isNoLine ? styles['label--line'] : ''}`}
    >
      <span className={styles.title}>{title}</span>
      <textarea
        className={styles.textarea}
        maxLength={200}
        placeholder="План действий"
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        //name={''} //если нужно добавь
        //id={''} //если нужно добавь
      />
      <span
        className={`${styles['flag-wrapper']} ${!isNoLine ? styles['flag-wrapper--line'] : ''}`}
      >
        <Image
          className={styles.flag}
          src={flag}
          width={70}
          height={47}
          alt={`флаг ${title}`}
        />
      </span>
    </label>
  )
}

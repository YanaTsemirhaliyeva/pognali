'use client'

import { ChangeEvent, memo, useState } from 'react'
import { useForm } from '@/store/form'

import styles from './Hashtags.module.scss'

export function HashtagsComponent() {
  const { setHashTags } = useForm()
  const [inputValue, setInputValue] = useState('')

  const handleInputBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value
    setInputValue(input)

    let tags = input
      .split(/[\s#]+/)
      .filter((tag) => tag.trim() !== '')
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`))
    tags = tags.length > 6 ? tags.slice(0, 6) : tags

    setHashTags(tags)
  }

  return (
    <div className={styles['profile__hashtags']}>
      <h3 className={styles['profile__hashtags-title']}>тэги</h3>
      <textarea
        className={styles['profile__hashtags-textarea']}
        placeholder="#бургер #бар #футбол #концерт #крафт"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onBlur={handleInputBlur}
      ></textarea>
    </div>
  )
}

export const Hashtags = memo(HashtagsComponent)

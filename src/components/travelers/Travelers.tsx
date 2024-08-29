'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppRoute } from '@/const'
import { useCards } from '@/store/cards'

import { PostData } from '@/types/postData'

import { Cards } from '../cards/Cards'
import { Pagination } from '../pagination/Pagination'
import styles from './Travelers.module.scss'

export default function Travelers() {
  const {
    cardId,
    cards,
    loading,
    activePage,
    setActivePage,
    activeContinents,
    activeCountries,
    setActiveCountries,
    setCardId,
    getTravelerCards
  } = useCards()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const condition = (cards && cards.length === 0) || cardId.length === 0

  useEffect(() => {
    setActivePage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId, activeContinents])

  useEffect(() => {
    if (activeCountries?.length) {
      params.set('countries', activeCountries.join(', '))
    }
    if (activeContinents?.length) {
      params.set('continents', activeContinents.join(', '))
    }
    params.set('page', activePage.toString())
    window.history.pushState(null, '', `?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeContinents, activeCountries, activePage])

  useEffect(() => {
    if (typeof window !== 'undefined' && !cardId) {
      const userCardIdDataString = localStorage.getItem('userCardId')
      const userCardDataString = localStorage.getItem('userCardData')
      let userCardId: string | null = null
      let userCardData: PostData | null = null
      if (userCardDataString) {
        userCardData = JSON.parse(userCardDataString)
      }
      if (userCardIdDataString) {
        userCardId = JSON.parse(userCardIdDataString)
      }
      if (userCardData && userCardId) {
        setCardId(userCardId)
        setActiveCountries(
          userCardData.countryList.map((country) => country.name)
        )
      }

      if (!userCardId) {
        router.push(AppRoute.Form)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, router, cardId])

  useEffect(() => {
    if (!localStorage.getItem('userCardId')) {
      router.push(AppRoute.Form)
    }
    if (cardId) {
      getTravelerCards()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, activeCountries, activeContinents])

  if (loading && cards.length === 0) {
    return <>Loading...</>
  }

  return (
    <>
      {condition ? null : (
        <div className={styles['trevelers']}>
          <Cards />
          <Pagination />
        </div>
      )}
    </>
  )
}

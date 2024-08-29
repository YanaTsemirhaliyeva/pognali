import { BACKEND_URL } from '@/const'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { CardsResponse, UseCards } from '@/types/cards'

export const useCards = create<UseCards>()(
  immer((set) => ({
    cards: [],
    totalCardsCount: 0,
    cardId: '',
    userData: null,
    setCardId: (id) => set({ cardId: id }),
    setCardData: (data) => set({ userData: data }),
    loading: false,
    activePage: 1,
    setActivePage: (page) => set({ activePage: page }),
    activeCountries: [],
    setActiveCountries: (countries) => set({ activeCountries: countries }),
    activeContinents: [],
    setActiveContinents: (continents) => set({ activeContinents: continents }),
    getTravelerCards: async () => {
      set((state) => {
        state.loading = true
      })
      let cardId
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let restQuery: any = {
        countries: '',
        page: 1
      }

      set((state) => {
        cardId = state.cardId
        restQuery = {
          page: state.activePage
        }

        if (state.activeContinents?.length > 0) {
          restQuery.continents = state.activeContinents.join(',')
        }

        if (state.activeCountries?.length > 0) {
          restQuery.countries = state.activeCountries.join(',')
        }
      })

      const url = new URL(`${BACKEND_URL}cards/${cardId}`)

      const params = new URLSearchParams(restQuery)

      url.search = params.toString()

      try {
        const response = await fetch(url.toString())
        if (!response.ok) {
          localStorage.removeItem('userCardId')
          localStorage.removeItem('userCardData')
        }
        const json = (await response.json()) as CardsResponse
        set((state) => {
          state.cards = json.cardList
          state.totalCardsCount = json.totalCardsCount
          state.loading = false
        })
      } catch (error) {
        // не всегда срабатывает
        if (typeof window !== 'undefined') {
          localStorage.removeItem('userCardId')
          localStorage.removeItem('userCardData')
        }
        set((state) => {
          state.cardId = ''
          state.userData = null
          state.cards = []
        })
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    },
    cardsToShow: [],
    setCardsToShow: (cards) => set({ cardsToShow: cards }),
    pagination: false,
    setPagination: (arg) => set({ pagination: arg })
  }))
)

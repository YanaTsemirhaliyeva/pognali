import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { Countries, UseCountries } from '@/types/countries'

export const useCountries = create<UseCountries>()(
  immer((set) => ({
    countries: {},
    activeLetter: 'А',
    currentCountries: [],
    setCurrentCountries: (countries) =>
      set(() => ({
        currentCountries: countries
      })),
    setActiveLetter: (letter) =>
      set(() => ({
        activeLetter: letter
      })),
    currentCountry: null,
    setCurrentCountry: (country) =>
      set(() => ({
        currentCountry: country
      })),
    currentContinents: [],
    setCurrentContinents: (continents) =>
      set(() => ({
        currentContinents: continents
      })),
    loading: false,
    getCountries: async () => {
      set((state) => {
        state.loading = true
      })
      try {
        const response = await fetch(
          'https://lets-go-8s43.onrender.com/countries/'
        )
        const json = (await response.json()) as Countries
        set((state) => {
          state.countries = json
          state.loading = false
        })
      } catch (error) {
        toast.error('Ошибка при получении списка стран')
      } finally {
        set((state) => {
          state.loading = false
        })
      }
    }
  }))
)

import { InitialValues } from '@/const'
import { createPostAPI } from '@/service/postUserCard'
import { create } from 'zustand'

import { UseForm } from '@/types/formData'
import { PostData } from '@/types/postData'

export const useForm = create<UseForm>()((set) => ({
  companion: InitialValues.companion,
  setCompanion: (count) =>
    set(() => ({
      companion: count
    })),
  duration: InitialValues.duration,
  setDuration: (count) =>
    set(() => ({
      duration: count
    })),
  children: InitialValues.children,
  setChildren: (arg) =>
    set(() => ({
      children: arg
    })),
  startDate: InitialValues.startDate,
  setStartDate: (date) =>
    set(() => ({
      startDate: date
    })),
  endDate: InitialValues.endDate,
  setEndDate: (date) =>
    set(() => ({
      endDate: date
    })),
  startDateCalendar: null,
  setStartDateCalendar: (date) =>
    set(() => ({
      startDateCalendar: date
    })),
  endDateCalendar: null,
  setEndDateCalendar: (date) =>
    set(() => ({
      endDateCalendar: date
    })),
  countryList: [],
  setCountryList: (countries) =>
    set(() => ({
      countryList: countries
    })),
  hashTags: [],
  setHashTags: (hashtags) =>
    set(() => ({
      hashTags: hashtags
    })),
  transport: [],
  setTransport: (title) =>
    set((state) => {
      const isTransportExist = state.transport.includes(title)
      const newTransport = isTransportExist
        ? state.transport.filter((item) => item !== title)
        : [...state.transport, title]
      return { transport: newTransport }
    }),
  activeStep: InitialValues.activeStep,
  setActiveStep: (step) =>
    set(() => ({
      activeStep: step
    })),
  createPost: async (data: PostData) => {
    set({ loading: true })
    try {
      const response = await createPostAPI(data)
      return response
    } catch (error) {
      console.error('Ошибка отправки данных:', error)
      throw error
    } finally {
      set({ loading: false })
    }
  },
  loading: false,
  reset: () =>
    set(() => ({
      companion: InitialValues.companion,
      duration: InitialValues.duration,
      children: InitialValues.children,
      startDate: InitialValues.startDate,
      endDate: InitialValues.endDate,
      startDateCalendar: null,
      endDateCalendar: null,
      countryList: [],
      hashTags: [],
      transport: [],
      activeStep: InitialValues.activeStep
    }))
}))

import { PostData, PostResponse } from './postData'

export type CountryList = {
  name: string
  description: string
}

export type UseForm = {
  companion: number
  setCompanion: (arg: number) => void
  duration: number
  setDuration: (arg: number) => void
  children: boolean
  setChildren: (arg: boolean) => void
  startDate: string | null
  setStartDate: (arg: string | null) => void
  endDate: string | null
  setEndDate: (arg: string | null) => void
  startDateCalendar: Date | null
  setStartDateCalendar: (arg: Date | null) => void
  endDateCalendar: Date | null
  setEndDateCalendar: (arg: Date | null) => void
  countryList: CountryList[]
  setCountryList: (arg: CountryList[]) => void
  hashTags: string[]
  setHashTags: (arg: string[]) => void
  transport: string[]
  setTransport: (arg: string) => void
  activeStep: number
  setActiveStep: (arg: number) => void
  createPost: (data: PostData) => Promise<PostResponse>
  loading: boolean
  reset: () => void
}

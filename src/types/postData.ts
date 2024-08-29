export type PostData = {
  companionCount: number
  children: boolean
  startDate: string
  endDate: string
  countryList: {
    name: string
    description: string
  }[]
  hashTags: string[]
  transport: string[]
}

export type PostResponse = {
  data: PostData | null
  id: string
}

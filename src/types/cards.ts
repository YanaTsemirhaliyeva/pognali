import { Country } from './countries'
import { PostData } from './postData'

export type UseCards = {
  cards: Card[]
  totalCardsCount: number
  cardId: string
  userData: PostData | null
  setCardId: (id: string) => void
  setCardData: (data: PostData | null) => void
  loading: boolean
  activePage: number
  setActivePage: (page: number) => void
  activeCountries: string[]
  setActiveCountries: (countries: string[]) => void
  activeContinents: string[]
  setActiveContinents: (continents: string[]) => void
  getTravelerCards: () => Promise<void>
  cardsToShow: Card[]
  setCardsToShow: (cards: Card[]) => void
  pagination: boolean
  setPagination: (pagination: boolean) => void
}

type CountryList = {
  countryData: Country
  description: string
}

export type Card = {
  cardId: string
  name: string
  avatarUrl: string
  countryList: CountryList[]
  hashTags: string[]
  transport: string[]
}

export type CardsResponse = {
  cardList: Card[]
  totalCardsCount: number
}

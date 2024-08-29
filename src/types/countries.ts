export interface Country {
  flags: {
    png: string
    svg: string
  }
  name: {
    common: string
    rus: string
  }
  continent: string[]
  island: boolean
}

export type Countries = {
  [key: string]: Country[]
}

export type UseCountries = {
  countries: Countries
  currentCountries: Country[]
  setCurrentCountries: (countries: Country[] | Country) => void
  activeLetter: string | null
  setActiveLetter: (letter: string) => void
  currentCountry: string | null
  setCurrentCountry: (country: string) => void
  currentContinents: string[]
  setCurrentContinents: (continents: string[]) => void
  loading: boolean
  getCountries: () => Promise<void>
}

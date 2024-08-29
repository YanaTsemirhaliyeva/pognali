// для динамической вставки путей (для продакшена и локальной версии)

export const isProd = process.env.NODE_ENV === 'production'
export const basePath = isProd ? '/intern-pognali-1-2' : ''

export const BACKEND_URL = 'https://lets-go-8s43.onrender.com/'

export enum AppRoute {
  Index = '/',
  Catalog = '/catalog',
  Form = '/form'
}

export const InitialValues = {
  companion: 2,
  duration: 3,
  activeStep: 1,
  children: true,
  startDate: null,
  endDate: null
}

export const TRANSPORT_DATA = [
  {
    title: 'plane',
    tooltip: 'Авиаперелет'
  },
  {
    title: 'bus',
    tooltip: 'Автотранспорт'
  },
  {
    title: 'bike',
    tooltip: 'Велосипед'
  },
  {
    title: 'walk',
    tooltip: 'Пешком'
  }
]

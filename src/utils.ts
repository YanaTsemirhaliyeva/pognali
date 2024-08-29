import { PostData } from './types/postData'

export const imageLoader = ({ src = '', width = 0, quality = 100 }) => {
  return `img/layout/${src}?w=${width}&q=${quality || 75}`
}

export const getUserCardIdLS = () => {
  const data = localStorage.getItem('userCardId')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userCardId = data ? JSON.parse(data) : ''
  return {
    userCardId: userCardId as string
  }
}

export const getUserCardDataLS = () => {
  const data = localStorage.getItem('userCardData')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userCardData = data ? JSON.parse(data) : null
  return {
    userCardData: userCardData as PostData
  }
}

export function debounce<F extends (arg1: string, arg2: string) => void>(
  func: F,
  wait: number
): (arg1: string, arg2: string) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return function executedFunction(arg1: string, arg2: string) {
    const later = () => {
      timeout = undefined
      func(arg1, arg2)
    }
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

export const createArray = (numPages: number) => {
  const array: number[] = []
  for (let i = 1; i <= numPages; i++) {
    array.push(i)
  }
  return array
}

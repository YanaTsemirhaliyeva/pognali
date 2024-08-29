import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import './globals.scss'

import { basePath } from '@/const'

import LayoutClient from '@/components/layout-client/LayoutClient'

const roboto = Roboto({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  adjustFontFallback: false
})

export const metadata: Metadata = {
  title: 'Погнали',
  description: 'Сервис для поиска попутчиков в путешествиях',
  keywords: ['поиск', 'попутчик', 'путешествие', 'сервис', 'мир', 'маршрут'],
  authors: ['Ванин', 'Исаенко', 'Кривцова', 'Темиргалиева'].map((name) => ({
    name
  })),
  creator: 'LigaA interns'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" type="image/svg+xml" href={`${basePath}/icon.svg`} />
      </head>
      <body className={roboto.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}

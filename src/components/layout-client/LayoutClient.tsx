'use client'

import { memo, PropsWithChildren } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { AppRoute, isProd } from '@/const'
import { Toaster } from 'react-hot-toast'

import Footer from '../footer/Footer'
import Header from '../header/Header'
import styles from './LayoutClient.module.scss'

export default function LayoutClientComponent({
  children
}: PropsWithChildren<unknown>) {
  const path = usePathname()

  isProd && path === AppRoute.Index && redirect(AppRoute.Form)

  return (
    <div className={styles.layout}>
      {path !== AppRoute.Index && <Header />}
      <main className={styles.main}>{children}</main>
      {path !== AppRoute.Index && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1d2e5b',
            color: '#ffffff',
            border: '1px solid #ffffff'
          }
        }}
      />
    </div>
  )
}

export const LayoutClient = memo(LayoutClientComponent)

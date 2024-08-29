import { Suspense } from 'react'

import Countries from '@/components/countries/Countries'
import { Filters } from '@/components/filters/Filters'
import Travelers from '@/components/travelers/Travelers'
import UnderHeader from '@/components/under-header/under-header'
import container from '@/styles/container.module.scss'

import styles from './page.module.scss'

export default function Catalog() {
  return (
    <Suspense>
      <UnderHeader title={'Попутчики'} />
      <Countries />
      <div className={`${styles['catalog']} ${container['main-container']}`}>
        <Travelers />
        <Filters />
      </div>
    </Suspense>
  )
}

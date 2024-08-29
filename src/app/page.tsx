import Image from 'next/image'
import Link from 'next/link'
import { AppRoute } from '@/const'

import styles from './page.module.scss'

export default function Home() {
  return (
    <div className={styles.main}>
      <Image
        src="img/logo-full.svg"
        alt="Логотип компании"
        width={202}
        height={50}
        priority
      />
      <ol className={styles['main__link-list']}>
        <li>
          <Link className={styles['main__page-link']} href={AppRoute.Catalog}>
            Попутчики
          </Link>
        </li>
        <li>
          <Link className={styles['main__page-link']} href={AppRoute.Form}>
            Форма
          </Link>
        </li>
      </ol>
    </div>
  )
}

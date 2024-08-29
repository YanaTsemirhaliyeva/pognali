import container from '../../styles/container.module.scss'
import styles from './under-header.module.scss'

type TUnderHeaderProps = {
  title: string
}

export default function UnderHeader({ title }: TUnderHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={container['main-container']}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  )
}

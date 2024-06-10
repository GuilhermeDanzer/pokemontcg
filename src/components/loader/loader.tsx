import { ReactNode } from 'react'
import styles from './loader.module.css'

export default function Loader() {
  return (
    <div className={styles.loaderContainer} data-testid="loading-indicator">
      <div className={styles.loader} />
    </div>
  )
}

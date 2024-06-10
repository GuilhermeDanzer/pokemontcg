import { ReactNode } from 'react'
import styles from './card.module.css'

interface CardProps {
  children: ReactNode
  dataTestId: string
}

export default function Card({ children, dataTestId }: CardProps) {
  return (
    <div className={styles.card} data-testid={dataTestId}>
      {children}
    </div>
  )
}

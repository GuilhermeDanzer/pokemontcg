import { ReactNode } from 'react'
import styles from './section.module.css'

interface SectionProps {
  children: ReactNode
  testId?: string
}

export default function Section({ children, testId }: SectionProps) {
  return (
    <div data-testid={testId} className={styles.section}>
      {children}
    </div>
  )
}

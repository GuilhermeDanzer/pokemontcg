'use client'
import React, { useTransition } from 'react'
import styles from './languageSelector.module.css'
import { BR, US } from 'country-flag-icons/react/3x2'
import { useRouter, usePathname, useParams } from 'next/navigation'

const LanguageSelector: React.FC = () => {
  const [_, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  const onSelectChange = (language: string) => {
    const newPathname = pathname.replace(/\/(en|br)/, `/${language}`)

    startTransition(() => {
      router.replace(newPathname)
    })
  }

  return (
    <div className={styles.container}>
      <US
        data-testid="us-flag"
        onClick={() => onSelectChange('en')}
        cursor={'pointer'}
        width={30}
      />
      <BR
        data-testid="br-flag"
        onClick={() => onSelectChange('br')}
        cursor={'pointer'}
        width={30}
      />
    </div>
  )
}

export default LanguageSelector

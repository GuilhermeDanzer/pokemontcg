'use client'
import Image from 'next/image'
import styles from './page.module.css'
import SkeletonCard from '@/src/components/skeletons/SkeletonCard'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePokemon } from '@/src/context/pokemonContext'
import Card from '@/src/components/card/card'

export default function Home() {
  const index = useTranslations('Index')
  const info = useTranslations('Info')
  const {
    cardList,
    loading,
    fetchCards,
    searchCards,
    currentPage,
    totalPages,
  } = usePokemon()
  const [ratio] = useState(240 / 330)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (cardList.length < 1) {
      fetchCards()
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      searchCards(searchQuery, 1)
    } else {
      fetchCards(1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      if (searchQuery) {
        searchCards(searchQuery, currentPage - 1)
      } else {
        fetchCards(currentPage - 1)
      }
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      if (searchQuery) {
        searchCards(searchQuery, currentPage + 1)
      } else {
        fetchCards(currentPage + 1)
      }
    }
  }

  return (
    <div>
      <h1 className={styles.title} data-testid="title">
        {index('title')}
      </h1>
      <form>
        <input
          type="text"
          placeholder="Search for Pokémon cards"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} type="button">
          Search
        </button>
      </form>
      <div className={styles.cardContainer}>
        {loading
          ? Array.from({ length: 40 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : cardList.map((card, index) => (
              <Link href={`/details/${card.id}`} key={card.id}>
                <Card key={card.id} dataTestId={`pokemon-card-${index}`}>
                  <Image
                    src={card.images.small}
                    alt={card.name}
                    width={500}
                    height={500 * ratio}
                    className={styles.image}
                    quality={100}
                    data-testid={`pokemon-image-${index}`}
                  />
                  <h2 data-testid={`pokemon-name-${index}`}>{card.name}</h2>
                  <p data-testid={`pokemon-id-${index}`}>ID: {card.id}</p>
                  <p data-testid={`pokemon-type-${index}`}>
                    {info('types')}: {card.types.join(', ')}
                  </p>
                </Card>
              </Link>
            ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{index('pages', { currentPage, totalPages })}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

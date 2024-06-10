'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { PokemonCard, PokemonCardDetail } from '@/src/interfaces/pokemon'
import {
  fetchPokemonCards,
  fetchPokemonCardDetails,
  searchPokemonCards,
} from './api'

interface PokemonContextType {
  cardList: PokemonCard[]
  loading: boolean
  currentPokemon: PokemonCardDetail | null
  fetchCards: (page?: number) => void
  searchCards: (query: string, page?: number) => void
  fetchCardDetails: (id: string) => void
  currentPage: number
  totalPages: number
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined)

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cardList, setCardList] = useState<PokemonCard[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPokemon, setCurrentPokemon] =
    useState<PokemonCardDetail | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const pageSize = 40

  const fetchCards = async (page: number = 1) => {
    setLoading(true)
    const response = await fetchPokemonCards(page, pageSize)
    const { data, totalCount } = response
    const filteredList = data.filter(card => card.supertype === 'Pokémon')
    setCardList(filteredList)
    setCurrentPage(page)
    setTotalPages(Math.ceil(totalCount / pageSize))
    setLoading(false)
  }

  const searchCards = async (query: string, page: number = 1) => {
    setLoading(true)
    const response = await searchPokemonCards(query, page, pageSize)
    const { data, totalCount } = response
    const filteredList = data.filter(card => card.supertype === 'Pokémon')
    setCardList(filteredList)
    setCurrentPage(page)
    setTotalPages(Math.ceil(totalCount / pageSize))
    setLoading(false)
  }

  const fetchCardDetails = async (id: string) => {
    setLoading(true)
    const { data } = await fetchPokemonCardDetails(id)
    setCurrentPokemon(data)
    setLoading(false)
  }

  return (
    <PokemonContext.Provider
      value={{
        cardList,
        loading,
        currentPokemon,
        fetchCards,
        searchCards,
        fetchCardDetails,
        currentPage,
        totalPages,
      }}>
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemon = () => {
  const context = useContext(PokemonContext)
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider')
  }
  return context
}

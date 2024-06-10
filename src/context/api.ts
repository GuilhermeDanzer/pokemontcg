import axios from 'axios'
import {
  PokemonCardListApiResponse,
  PokemonCardDetailApiResponse,
} from '@/src/interfaces/pokemon'

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const searchPokemonCards = async (
  query: string = '',
  page: number = 1,
  pageSize: number = 20
): Promise<PokemonCardListApiResponse> => {
  const response = await axios.get(
    `${baseUrl}/cards?page=${page}&pageSize=${pageSize}&q=name:${query}&select=id,name,types,supertype,images&orderby=name`,
    {
      headers: { 'X-Api-Key': apiKey },
    }
  )
  return response.data as PokemonCardListApiResponse
}

export const fetchPokemonCards = async (
  page: number = 1,
  pageSize: number = 20
): Promise<PokemonCardListApiResponse> => {
  const response = await axios.get(
    `${baseUrl}/cards?page=${page}&pageSize=${pageSize}&select=id,name,types,images,supertype&orderBy=name`,
    {
      headers: { 'X-Api-Key': apiKey },
    }
  )
  return response.data as PokemonCardListApiResponse
}

export const fetchPokemonCardDetails = async (
  id: string
): Promise<PokemonCardDetailApiResponse> => {
  const response = await axios.get(
    `${baseUrl}/cards/${id}?select=name,id,images,attacks,weaknesses,resistances,types`,
    {
      headers: { 'X-Api-Key': apiKey },
    }
  )
  return response.data as PokemonCardDetailApiResponse
}

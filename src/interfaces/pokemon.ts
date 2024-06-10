export interface PokemonCard {
  id: string
  name: string
  types: string[]
  supertype: string
  images: { small: string; large: string }
}

export interface PokemonCardDetail extends PokemonCard {
  resistances: { type: string; value: string }[] | null
  weaknesses: { type: string; value: string }[] | null
  attacks: PokemonAttack[]
}

export interface PokemonAttack {
  cost: string[]
  name: string
  damage: string
  text: string
  convertedEnergyCost: number
}

export interface PokemonCardListApiResponse {
  data: PokemonCard[]
  page: number
  pageSize: number
  count: number
  totalCount: number
}

export interface PokemonCardDetailApiResponse {
  data: PokemonCardDetail
}

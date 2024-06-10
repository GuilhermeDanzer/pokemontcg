import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { usePokemon } from '@/src/context/pokemonContext'
import { IntlProvider } from 'next-intl'
import messages from '@/src/messages/en.json'
import messagesBr from '@/src/messages/br.json'

import Details from '@/src/app/[locale]/details/[id]/page'
let locale = 'en'

jest.mock('@/context/pokemonContext', () => ({
  usePokemon: jest.fn(() => ({
    currentPokemon: {
      name: 'Pikachu',
      id: 25,
      types: ['Electric'],
      resistances: [{ type: 'Water' }],
      weaknesses: [{ type: 'Ground' }],
      images: { large: '/pikachu.png' },
      attacks: [
        {
          name: 'Thunderbolt',
          convertedEnergyCost: 1,
          cost: ['Lightning'],
          damage: '40',
          text: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.',
        },
      ],
    },
    loading: true,
    fetchCardDetails: jest.fn(),
  })),
}))
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
}))

const mockUsePokemon = usePokemon as jest.Mock
describe('Details', () => {
  it('Renders loading state', () => {
    render(
      <IntlProvider messages={messages} locale={locale}>
        <Details params={{ id: '1', locale }} />
      </IntlProvider>
    )

    const loadingIndicator = screen.getByTestId('loading-indicator')
    expect(loadingIndicator).toBeInTheDocument()
  })

  it('Renders current pokemon', () => {
    mockUsePokemon.mockReturnValueOnce({
      currentPokemon: {
        name: 'Pikachu',
        id: 25,
        types: ['Electric'],
        resistances: [{ type: 'Water' }],
        weaknesses: [{ type: 'Ground' }],
        images: { large: '/pikachu.png' },
        attacks: [
          {
            name: 'Thunderbolt',
            convertedEnergyCost: 1,
            cost: ['Lightning'],
            damage: '40',
            text: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.',
          },
        ],
      },
      loading: false,
      fetchCardDetails: jest.fn(),
    })
    render(
      <IntlProvider messages={messages} locale={locale}>
        <Details params={{ id: '25', locale }} />
      </IntlProvider>
    )

    const backButton = screen.getByTestId('back-button')
    expect(backButton).toBeInTheDocument()

    const pokemonImage = screen.getByTestId('pokemon-image')
    expect(pokemonImage).toBeInTheDocument()

    const pokemonDetails = screen.getByTestId('pokemon-details')
    expect(pokemonDetails).toBeInTheDocument()
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-id')).toHaveTextContent('ID: 25')
    expect(screen.getByTestId('pokemon-types')).toHaveTextContent(
      'Types: Electric'
    )
    expect(screen.getByTestId('pokemon-resistances')).toHaveTextContent(
      'Resistances: Water'
    )
    expect(screen.getByTestId('pokemon-weaknesses')).toHaveTextContent(
      'Weaknesses: Ground'
    )

    const openModalButton = screen.getByTestId('open-modal-button')
    fireEvent.click(openModalButton)

    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
    expect(screen.getByTestId('attack-name-0')).toHaveTextContent('Thunderbolt')
    expect(screen.getByTestId('attack-energy-0')).toHaveTextContent(
      'Energy cost: 1 [Lightning]'
    )
    expect(screen.getByTestId('attack-damage-0')).toHaveTextContent(
      'Damage: 40'
    )
    expect(screen.getByTestId('attack-effect-0')).toHaveTextContent(
      'Effect: Flip a coin. If heads, the Defending Pokémon is now Paralyzed.'
    )
    const closeModalButton = screen.getByTestId('close-modal-button')
    fireEvent.click(closeModalButton)
    expect(modal).not.toBeInTheDocument()
  })
  it('Renders current pokemon in Portuguese', () => {
    mockUsePokemon.mockReturnValueOnce({
      currentPokemon: {
        name: 'Pikachu',
        id: 25,
        types: ['Electric'],
        resistances: [{ type: 'Water' }],
        weaknesses: [{ type: 'Ground' }],
        images: { large: '/pikachu.png' },
        attacks: [
          {
            name: 'Thunderbolt',
            convertedEnergyCost: 1,
            cost: ['Lightning'],
            damage: '40',
            text: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.',
          },
        ],
      },
      loading: false,
      fetchCardDetails: jest.fn(),
    })
    locale = 'br'
    render(
      <IntlProvider messages={messagesBr} locale={locale}>
        <Details params={{ id: '25', locale }} />
      </IntlProvider>
    )

    const backButton = screen.getByTestId('back-button')
    expect(backButton).toBeInTheDocument()

    const pokemonImage = screen.getByTestId('pokemon-image')
    expect(pokemonImage).toBeInTheDocument()

    const pokemonDetails = screen.getByTestId('pokemon-details')
    expect(pokemonDetails).toBeInTheDocument()
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-id')).toHaveTextContent('ID: 25')
    expect(screen.getByTestId('pokemon-types')).toHaveTextContent(
      'Tipos: Electric'
    )
    expect(screen.getByTestId('pokemon-resistances')).toHaveTextContent(
      'Resistências: Water'
    )
    expect(screen.getByTestId('pokemon-weaknesses')).toHaveTextContent(
      'Fraquezas: Ground'
    )

    const openModalButton = screen.getByTestId('open-modal-button')
    fireEvent.click(openModalButton)

    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
    expect(screen.getByTestId('attack-name-0')).toHaveTextContent('Thunderbolt')
    expect(screen.getByTestId('attack-energy-0')).toHaveTextContent(
      'Custo de energia: 1 [Lightning]'
    )
    expect(screen.getByTestId('attack-damage-0')).toHaveTextContent('Dano: 40')
    expect(screen.getByTestId('attack-effect-0')).toHaveTextContent(
      'Efeito: Flip a coin. If heads, the Defending Pokémon is now Paralyzed.'
    )

    const closeModalButton = screen.getByTestId('close-modal-button')
    fireEvent.click(closeModalButton)
    expect(modal).not.toBeInTheDocument()
  })
})

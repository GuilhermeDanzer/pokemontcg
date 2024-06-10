import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/src/app/[locale]/page'
import { usePokemon } from '@/src/context/pokemonContext'
import { IntlProvider } from 'next-intl'
import messages from '@/src/messages/en.json'
import messagesBr from '@/src/messages/br.json'
import LanguageSelector from '../components/languageSelector/languageSelector'

let locale = 'en'

jest.mock('@/context/pokemonContext', () => ({
  usePokemon: jest.fn(() => ({
    cardList: [],
    loading: false,
    fetchCards: jest.fn(),
  })),
}))
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
}))

const mockUsePokemon = usePokemon as jest.Mock
describe('Home', () => {
  it('Renders loading state', () => {
    mockUsePokemon.mockReturnValueOnce({
      cardList: [],
      loading: true,
      fetchCards: jest.fn(),
    })

    render(
      <IntlProvider messages={messages} locale={locale}>
        <Home />
      </IntlProvider>
    )

    const loadingIndicator = screen.getAllByTestId('skeleton-card')
    expect(loadingIndicator).toHaveLength(40)
  })

  it('Renders with fetched data in english', () => {
    const dummyCardList = [
      {
        id: 1,
        name: 'Charmander',
        types: ['Fire'],
        images: { small: '/charmander.png' },
      },
      {
        id: 2,
        name: 'Bulbasaur',
        types: ['Grass', 'Poison'],
        images: { small: '/bulbasaur.png' },
      },
    ]
    mockUsePokemon.mockReturnValueOnce({
      cardList: dummyCardList,
      loading: false,
      fetchCards: jest.fn(),
    })

    render(
      <IntlProvider messages={messages} locale={locale}>
        <Home />
      </IntlProvider>
    )

    const title = screen.getByTestId('title')
    expect(title).toHaveTextContent(`Pokemon, Gotta Catch 'Em All!`)
    const charmanderCard = screen.getByTestId('pokemon-card-0')
    const bulbasaurCard = screen.getByTestId('pokemon-card-1')
    expect(charmanderCard).toBeInTheDocument()
    expect(bulbasaurCard).toBeInTheDocument()

    expect(screen.getByTestId('pokemon-name-0')).toHaveTextContent('Charmander')
    expect(screen.getByTestId('pokemon-id-0')).toHaveTextContent('ID: 1')
    expect(screen.getByTestId('pokemon-type-0')).toHaveTextContent(
      'Types: Fire'
    )

    expect(screen.getByTestId('pokemon-name-1')).toHaveTextContent('Bulbasaur')
    expect(screen.getByTestId('pokemon-id-1')).toHaveTextContent('ID: 2')
    expect(screen.getByTestId('pokemon-type-1')).toHaveTextContent(
      'Types: Grass, Poison'
    )
  })

  it('Change language to Portuguese', () => {
    const dummyCardList = [
      {
        id: 1,
        name: 'Charmander',
        types: ['Fire'],
        images: { small: '/charmander.png' },
      },
      {
        id: 2,
        name: 'Bulbasaur',
        types: ['Grass', 'Poison'],
        images: { small: '/bulbasaur.png' },
      },
    ]
    mockUsePokemon.mockReturnValueOnce({
      cardList: dummyCardList,
      loading: false,
      fetchCards: jest.fn(),
    })
    locale = 'br'
    render(
      <IntlProvider messages={messagesBr} locale={locale}>
        <LanguageSelector />
        <Home />
      </IntlProvider>
    )
    const title = screen.getByTestId('title')
    expect(title).toHaveTextContent('Pokemon, Temos que pegar')
    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    expect(screen.getByTestId('pokemon-name-0')).toHaveTextContent('Charmander')
    expect(screen.getByTestId('pokemon-id-0')).toHaveTextContent('ID: 1')
    expect(screen.getByTestId('pokemon-type-0')).toHaveTextContent(
      'Tipos: Fire'
    )

    expect(screen.getByTestId('pokemon-name-1')).toHaveTextContent('Bulbasaur')
    expect(screen.getByTestId('pokemon-id-1')).toHaveTextContent('ID: 2')
    expect(screen.getByTestId('pokemon-type-1')).toHaveTextContent(
      'Tipos: Grass, Poison'
    )
  })
})

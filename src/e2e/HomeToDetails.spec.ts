import { test, expect } from '@playwright/test'

test('Navigate from Home to Details screen and verify Pokemon information', async ({
  page,
}) => {
  await page.goto('http://localhost:3000')
  await page.waitForSelector('[data-testid="title"]')
  const pokemonName = await page.textContent('[data-testid="pokemon-name-0"]')
  const pokemonId = await page.textContent('[data-testid="pokemon-id-0"]')
  await page.click('[data-testid="pokemon-card-0"]')

  await page.waitForSelector('[data-testid="details-screen"]')
  await page.waitForLoadState('networkidle')
  await page.$('[data-testid="back-button"]')
  const detailsPokemonName = await page.textContent(
    '[data-testid="pokemon-name"]'
  )
  const detailsPokemonId = await page.textContent('[data-testid="pokemon-id"]')
  expect(detailsPokemonName).toBe(pokemonName)
  expect(detailsPokemonId).toBe(pokemonId)
})

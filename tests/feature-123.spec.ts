import { test, expect } from '@playwright/test'

test.describe('Content Pillars — 4th card (Templates & starter systems)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Content Pillars section renders exactly 4 cards', async ({ page }) => {
    const cards = page.locator('[data-testid="pillar-card"]')
    await expect(cards).toHaveCount(4)
  })

  test('4th card displays correct heading, description, and topics', async ({ page }) => {
    const cards = page.locator('[data-testid="pillar-card"]')
    const fourthCard = cards.nth(3)

    await expect(fourthCard.getByRole('heading', { name: 'Templates & starter systems' })).toBeVisible()
    await expect(fourthCard.getByText('Ready-to-use assets to help you implement faster and stop starting from scratch.')).toBeVisible()
    await expect(fourthCard.getByText('Onboarding checklist')).toBeVisible()
    await expect(fourthCard.getByText('SOP prompt pack')).toBeVisible()
    await expect(fourthCard.getByText('Workflow templates')).toBeVisible()
    await expect(fourthCard.getByText('Starter tool stack')).toBeVisible()
  })

  test('4th card links to /templates', async ({ page }) => {
    const cards = page.locator('[data-testid="pillar-card"]')
    const fourthCard = cards.nth(3)
    const link = fourthCard.getByRole('link', { name: 'Browse →' })
    await expect(link).toHaveAttribute('href', '/templates')
  })

  test('grid container has md:grid-cols-4 class', async ({ page }) => {
    const grid = page.locator('[data-testid="pillar-card"]').first().locator('..')
    await expect(grid).toHaveClass(/md:grid-cols-4/)
  })

  test('first 3 existing cards are unchanged', async ({ page }) => {
    const cards = page.locator('[data-testid="pillar-card"]')
    await expect(cards.nth(0).getByRole('heading', { name: 'Client Onboarding & Delivery' })).toBeVisible()
    await expect(cards.nth(1).getByRole('heading', { name: 'Internal Ops & SOPs' })).toBeVisible()
    await expect(cards.nth(2).getByRole('heading', { name: 'Tools & Stacks' })).toBeVisible()
  })
})

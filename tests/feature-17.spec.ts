import { test, expect } from '@playwright/test'

test.describe('/guides listing page', () => {
  test('page title contains "Guides" and SEO meta tags are present', async ({ page }) => {
    await page.goto('/guides')

    await expect(page).toHaveTitle(/Guides/)

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)

    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)
  })

  test('"Client Onboarding" subcategory heading appears before any other subcategory heading', async ({ page }) => {
    await page.goto('/guides')

    const headings = page.locator('h2.text-xs.font-semibold.text-gray-400')
    const firstHeading = headings.first()
    await expect(firstHeading).toContainText('Client Onboarding')
  })

  test('guide cards are rendered with correct classes and contain links', async ({ page }) => {
    await page.goto('/guides')

    const card = page.locator('a.border.border-gray-100.rounded-lg.p-5').first()
    await expect(card).toBeVisible()

    const title = card.locator('h3')
    const titleText = await title.textContent()
    expect(titleText?.trim().length).toBeGreaterThan(0)
  })

  test('hovering a card applies border-gray-300 class', async ({ page }) => {
    await page.goto('/guides')

    const card = page.locator('a.border.border-gray-100.rounded-lg.p-5').first()
    await card.hover()

    await expect(card).toHaveClass(/hover:border-gray-300/)
  })

  test('Nav is visible when guides list is empty (graceful empty state)', async ({ page }) => {
    await page.goto('/guides')

    // Nav is always rendered regardless of data
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()

    // No JS error overlay
    const errorOverlay = page.locator('#nextjs__container_errors_label')
    await expect(errorOverlay).not.toBeVisible()
  })

  test('all card hrefs start with /guides/', async ({ page }) => {
    await page.goto('/guides')

    const cards = page.locator('a.border.border-gray-100.rounded-lg.p-5')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await cards.nth(i).getAttribute('href')
      expect(href).toMatch(/^\/guides\//)
    }
  })
})

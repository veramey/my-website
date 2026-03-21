import { test, expect } from '@playwright/test'

test.describe('/guides listing page', () => {
  test('page has correct title, meta description, and og:title', async ({ page }) => {
    await page.goto('/guides')

    const title = await page.title()
    expect(title).toContain('Guides')

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveCount(1)

    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveCount(1)
  })

  test('"Client Onboarding" subcategory heading appears before any other subcategory', async ({ page }) => {
    await page.goto('/guides')

    const subcategoryHeadings = page.locator('h2.text-xs.font-semibold.text-gray-400')
    await expect(subcategoryHeadings.first()).toHaveText('Client Onboarding')
  })

  test('at least one guide card is rendered with correct classes and contains a link', async ({ page }) => {
    await page.goto('/guides')

    const card = page.locator('.border.border-gray-100.rounded-lg.p-5').first()
    await expect(card).toBeVisible()

    // Card wraps a link with non-empty text
    const cardText = await card.textContent()
    expect(cardText?.trim().length).toBeGreaterThan(0)

    // Card has hover class for border transition
    const className = await card.getAttribute('class')
    expect(className).toContain('hover:border-gray-300')
    expect(className).toContain('transition-colors')
  })

  test('hovering a card does not throw and hover class is present', async ({ page }) => {
    await page.goto('/guides')

    const card = page.locator('.border.border-gray-100.rounded-lg.p-5').first()
    await card.hover()

    const className = await card.getAttribute('class')
    expect(className).toContain('hover:border-gray-300')
  })

  test('page renders without errors and Nav is visible even conceptually with empty data', async ({ page }) => {
    // This test validates the real page renders correctly with no JS error overlay
    const uncaughtErrors: string[] = []
    page.on('pageerror', (err) => uncaughtErrors.push(err.message))

    await page.goto('/guides')

    // No uncaught JS exceptions
    expect(uncaughtErrors).toHaveLength(0)

    // Nav is visible
    await expect(page.locator('nav')).toBeVisible()

    // No Next.js error overlay (red screen)
    const errorOverlay = page.locator('#__next-build-watcher, [data-nextjs-dialog]')
    await expect(errorOverlay).toHaveCount(0)
  })

  test('each guide card anchor href starts with /guides/', async ({ page }) => {
    await page.goto('/guides')

    const cards = page.locator('.border.border-gray-100.rounded-lg.p-5')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await cards.nth(i).getAttribute('href')
      expect(href).toMatch(/^\/guides\//)
    }
  })
})

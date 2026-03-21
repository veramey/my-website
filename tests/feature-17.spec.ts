import { test, expect } from '@playwright/test'

test.describe('Guides listing page (/guides)', () => {
  test('page title contains "Guides" and SEO meta tags are present', async ({ page }) => {
    await page.goto('/guides')

    await expect(page).toHaveTitle(/Guides/)

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)

    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)
  })

  test('"Client Onboarding" subcategory heading appears first', async ({ page }) => {
    await page.goto('/guides')

    const subcategoryHeadings = page.locator('.text-xs.font-semibold.text-gray-400')
    const firstHeading = subcategoryHeadings.first()
    await expect(firstHeading).toHaveText(/Client Onboarding/i)
  })

  test('at least one guide card is rendered with correct classes and a non-empty title', async ({ page }) => {
    await page.goto('/guides')

    const card = page.locator('.border.border-gray-100.rounded-lg.p-5').first()
    await expect(card).toBeVisible()

    const titleText = await card.locator('h3').innerText()
    expect(titleText.trim().length).toBeGreaterThan(0)
  })

  test('guide card href resolves to an internal /guides/ path', async ({ page }) => {
    await page.goto('/guides')

    const cardLinks = page.locator('.border.border-gray-100.rounded-lg.p-5')
    const count = await cardLinks.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await cardLinks.nth(i).getAttribute('href')
      expect(href).toMatch(/^\/guides\//)
    }
  })

  test('page renders without errors and Nav is visible when guides list is populated', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/guides')

    await expect(page.getByRole('navigation')).toBeVisible()
    expect(errors).toHaveLength(0)
  })
})

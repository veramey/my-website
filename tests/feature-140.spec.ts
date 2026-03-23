import { test, expect } from '@playwright/test'

test.describe('Issue #140 — Need-based route cards grid on /start-here', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/start-here')
  })

  test('4 route cards render with correct structure', async ({ page }) => {
    const grid = page.locator('.grid.grid-cols-1.sm\\:grid-cols-2')
    const cards = grid.locator('> div')
    await expect(cards).toHaveCount(4)

    for (let i = 0; i < 4; i++) {
      const card = cards.nth(i)
      // heading
      const heading = card.locator('h3')
      await expect(heading).toBeVisible()
      const headingClass = await heading.getAttribute('class')
      expect(headingClass).toContain('font-semibold')
      expect(headingClass).toContain('text-gray-900')
      // two body lines (pain and outcome)
      const bodyLines = card.locator('p')
      expect(await bodyLines.count()).toBeGreaterThanOrEqual(2)
      for (let j = 0; j < 2; j++) {
        const cls = await bodyLines.nth(j).getAttribute('class')
        expect(cls).toContain('text-sm')
        expect(cls).toContain('text-gray-600')
      }
      // CTA link pill
      const cta = card.getByRole('link')
      await expect(cta).toBeVisible()
    }
  })

  test('CTA links are <a> elements pointing to valid internal routes', async ({ page }) => {
    const grid = page.locator('.grid.grid-cols-1.sm\\:grid-cols-2')
    const cards = grid.locator('> div')

    const hrefs: string[] = []
    for (let i = 0; i < 4; i++) {
      const cta = cards.nth(i).getByRole('link')
      // getByRole('link') resolves to <a> elements only
      const tagName = await cta.evaluate((el) => el.tagName.toLowerCase())
      expect(tagName).toBe('a')
      const href = await cta.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href!.startsWith('/')).toBe(true)
      hrefs.push(href!)
    }

    // All 4 hrefs should be distinct internal paths
    const unique = new Set(hrefs)
    expect(unique.size).toBe(4)
  })

  test('each CTA link navigates to a page without error', async ({ page }) => {
    const grid = page.locator('.grid.grid-cols-1.sm\\:grid-cols-2')
    const cards = grid.locator('> div')

    const hrefs: string[] = []
    for (let i = 0; i < 4; i++) {
      const href = await cards.nth(i).getByRole('link').getAttribute('href')
      hrefs.push(href!)
    }

    for (const href of hrefs) {
      const response = await page.goto(href)
      expect(response?.status()).not.toBe(404)
      // Page renders some content
      await expect(page.locator('main')).toBeVisible()
    }
  })

  test('grid is single-column on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/start-here')

    const grid = page.locator('.grid.grid-cols-1.sm\\:grid-cols-2')
    const cards = grid.locator('> div')

    const box0 = await cards.nth(0).boundingBox()
    const box1 = await cards.nth(1).boundingBox()
    expect(box0).toBeTruthy()
    expect(box1).toBeTruthy()
    // In single-column layout, card 1 is below card 0 (different y, same x)
    expect(box1!.y).toBeGreaterThan(box0!.y)
    expect(Math.abs(box0!.x - box1!.x)).toBeLessThan(4)
  })

  test('grid is two-column on sm+ viewport (640px)', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 812 })
    await page.goto('/start-here')

    const grid = page.locator('.grid.grid-cols-1.sm\\:grid-cols-2')
    const cards = grid.locator('> div')

    const box0 = await cards.nth(0).boundingBox()
    const box1 = await cards.nth(1).boundingBox()
    expect(box0).toBeTruthy()
    expect(box1).toBeTruthy()
    // In two-column layout, card 0 and card 1 share roughly the same top y
    expect(Math.abs(box0!.y - box1!.y)).toBeLessThan(4)
    // And card 1 is to the right of card 0
    expect(box1!.x).toBeGreaterThan(box0!.x)
  })

  test('Block 1, Block 3, and Block 4 remain untouched', async ({ page }) => {
    // Block 1 heading
    await expect(page.getByRole('heading', { name: 'What this site is about' })).toBeVisible()
    // Block 3 heading
    await expect(page.getByText('If you want quick wins', { exact: false })).toBeVisible()
    // Block 4 heading
    await expect(page.getByText("If you're choosing tools", { exact: false })).toBeVisible()
  })

  test('old numbered-list markup is gone from Block 2', async ({ page }) => {
    // The old newVisitorPath was not an <ol> but verify no <ol> exists anywhere
    const olCount = await page.locator('ol').count()
    expect(olCount).toBe(0)
    // Also confirm the numbered step indicators (e.g. "01", "02") are gone
    await expect(page.getByText('01', { exact: true })).not.toBeVisible()
    await expect(page.getByText('02', { exact: true })).not.toBeVisible()
  })
})

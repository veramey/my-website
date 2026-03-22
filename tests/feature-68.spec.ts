import { test, expect } from '@playwright/test'

test.describe('start-here SEO meta tags', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/start-here')
  })

  test('og:url meta tag is present with correct content', async ({ page }) => {
    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', 'https://www.aiopagency.com/start-here')
  })

  test('canonical link is present with correct href', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://www.aiopagency.com/start-here')
  })

  test('exactly one og:url meta tag exists', async ({ page }) => {
    const ogUrlTags = page.locator('meta[property="og:url"]')
    await expect(ogUrlTags).toHaveCount(1)
  })

  test('exactly one canonical link exists', async ({ page }) => {
    const canonicalLinks = page.locator('link[rel="canonical"]')
    await expect(canonicalLinks).toHaveCount(1)
  })
})

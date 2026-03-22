import { test, expect } from '@playwright/test'

test.describe('SEO: og:url and canonical on /guides', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides')
  })

  test('og:url meta tag is present with correct value', async ({ page }) => {
    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveCount(1)
    await expect(ogUrl).toHaveAttribute('content', 'https://www.aiopagency.com/guides')
  })

  test('canonical link tag is present with correct href', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveCount(1)
    await expect(canonical).toHaveAttribute('href', 'https://www.aiopagency.com/guides')
  })

  test('og:url and canonical each appear exactly once (no duplicates)', async ({ page }) => {
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  })
})

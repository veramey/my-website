import { test, expect } from '@playwright/test'

test.describe('SEO: og:url and canonical on /tools', () => {
  test('og:url meta tag is present with correct content', async ({ page }) => {
    await page.goto('/tools')
    const ogUrl = page.locator('head meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', 'https://www.aiopagency.com/tools')
  })

  test('canonical link is present with correct href', async ({ page }) => {
    await page.goto('/tools')
    const canonical = page.locator('head link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://www.aiopagency.com/tools')
  })

  test('both og:url and canonical are present simultaneously and not duplicated', async ({ page }) => {
    await page.goto('/tools')
    const ogUrlTags = page.locator('head meta[property="og:url"]')
    const canonicalTags = page.locator('head link[rel="canonical"]')
    await expect(ogUrlTags).toHaveCount(1)
    await expect(canonicalTags).toHaveCount(1)
  })

  test('canonical href is unchanged when query string is present', async ({ page }) => {
    await page.goto('/tools?ref=test')
    const canonical = page.locator('head link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://www.aiopagency.com/tools')
  })
})

import { test, expect } from '@playwright/test'

test.describe('Newsletter page SEO tags (issue #69)', () => {
  test('has og:url meta tag pointing to canonical URL', async ({ page }) => {
    await page.goto('/newsletter')
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
    expect(ogUrl).toBe('https://www.aiopagency.com/newsletter')
  })

  test('has canonical link tag pointing to canonical URL', async ({ page }) => {
    await page.goto('/newsletter')
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBe('https://www.aiopagency.com/newsletter')
  })

  test('both og:url and canonical are present in the same page load', async ({ page }) => {
    await page.goto('/newsletter')
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(ogUrl).toBe('https://www.aiopagency.com/newsletter')
    expect(canonical).toBe('https://www.aiopagency.com/newsletter')
  })

  test('no duplicate og:url or canonical tags', async ({ page }) => {
    await page.goto('/newsletter')
    const ogUrlCount = await page.locator('meta[property="og:url"]').count()
    const canonicalCount = await page.locator('link[rel="canonical"]').count()
    expect(ogUrlCount).toBe(1)
    expect(canonicalCount).toBe(1)
  })
})

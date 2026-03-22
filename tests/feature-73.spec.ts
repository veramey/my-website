import { test, expect } from '@playwright/test'

const PAGE_URL = '/tools/best-ai-tools-small-agencies'
const CANONICAL = 'https://www.aiopagency.com/tools/best-ai-tools-small-agencies'

test.describe('SEO: og:url and canonical on best-ai-tools-small-agencies', () => {
  test('canonical link tag is present and correct', async ({ page }) => {
    await page.goto(PAGE_URL)
    const href = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(href).toBe(CANONICAL)
  })

  test('og:url meta tag is present and correct', async ({ page }) => {
    await page.goto(PAGE_URL)
    const content = await page.locator('meta[property="og:url"]').getAttribute('content')
    expect(content).toBe(CANONICAL)
  })

  test('only one canonical tag exists', async ({ page }) => {
    await page.goto(PAGE_URL)
    const count = await page.locator('link[rel="canonical"]').count()
    expect(count).toBe(1)
  })

  test('og:url and canonical href are identical', async ({ page }) => {
    await page.goto(PAGE_URL)
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href')
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
    expect(canonicalHref).toBe(ogUrl)
  })

  test('canonical points to correct URL when visiting with trailing slash', async ({ page }) => {
    await page.goto(PAGE_URL + '/')
    const href = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(href).toBe(CANONICAL)
  })
})

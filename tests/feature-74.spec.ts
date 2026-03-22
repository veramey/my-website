import { test, expect } from '@playwright/test'

const PAGE_URL = '/tools/best-ai-meeting-assistants-agencies'
const CANONICAL = 'https://www.aiopagency.com/tools/best-ai-meeting-assistants-agencies'

test.describe('SEO: og:url and canonical on best-ai-meeting-assistants-agencies', () => {
  test('og:url meta tag is present with correct content', async ({ page }) => {
    await page.goto(PAGE_URL)
    const ogUrl = page.locator('head meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', CANONICAL)
  })

  test('canonical link tag is present with correct href', async ({ page }) => {
    await page.goto(PAGE_URL)
    const canonical = page.locator('head link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', CANONICAL)
  })

  test('exactly one canonical link tag exists in head', async ({ page }) => {
    await page.goto(PAGE_URL)
    const canonicals = page.locator('head link[rel="canonical"]')
    await expect(canonicals).toHaveCount(1)
  })
})

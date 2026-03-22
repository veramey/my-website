import { test, expect } from '@playwright/test'

const PAGE_URL = '/templates/client-onboarding-ai-checklist'
const CANONICAL_URL = 'https://www.aiopagency.com/templates/client-onboarding-ai-checklist'

test.describe('SEO: og:url and canonical on client-onboarding-ai-checklist', () => {
  test('og:url meta tag is present with correct content', async ({ page }) => {
    await page.goto(PAGE_URL)
    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', CANONICAL_URL)
  })

  test('canonical link tag is present with correct href', async ({ page }) => {
    await page.goto(PAGE_URL)
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', CANONICAL_URL)
  })

  test('og:url and canonical values match exactly', async ({ page }) => {
    await page.goto(PAGE_URL)
    const ogUrlContent = await page.locator('meta[property="og:url"]').getAttribute('content')
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(ogUrlContent).toBe(canonicalHref)
  })

  test('og:url uses https and has no trailing slash', async ({ page }) => {
    await page.goto(PAGE_URL)
    const ogUrlContent = await page.locator('meta[property="og:url"]').getAttribute('content')
    expect(ogUrlContent).toMatch(/^https:\/\//)
    expect(ogUrlContent).not.toMatch(/\/$/)
    expect(ogUrlContent).toBe(CANONICAL_URL)
  })

  test('exactly one canonical link tag exists', async ({ page }) => {
    await page.goto(PAGE_URL)
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  })
})

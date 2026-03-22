import { test, expect } from '@playwright/test'

const PAGE_PATH = '/guides/automate-client-onboarding-small-agency'
const CANONICAL_URL = 'https://www.aiopagency.com/guides/automate-client-onboarding-small-agency'

test.describe('SEO: og:url and canonical on automate-client-onboarding guide', () => {
  test('canonical link tag has correct href', async ({ page }) => {
    await page.goto(PAGE_PATH)
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', CANONICAL_URL)
  })

  test('og:url meta tag has correct content', async ({ page }) => {
    await page.goto(PAGE_PATH)
    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', CANONICAL_URL)
  })

  test('existing Head tags (title, og:title, og:description) are still present and non-empty', async ({ page }) => {
    await page.goto(PAGE_PATH)

    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)

    const ogTitle = page.locator('meta[property="og:title"]')
    const ogTitleContent = await ogTitle.getAttribute('content')
    expect(ogTitleContent).toBeTruthy()
    expect(ogTitleContent!.length).toBeGreaterThan(0)

    const ogDescription = page.locator('meta[property="og:description"]')
    const ogDescContent = await ogDescription.getAttribute('content')
    expect(ogDescContent).toBeTruthy()
    expect(ogDescContent!.length).toBeGreaterThan(0)
  })

  test('canonical and og:url point to URL without trailing slash even when accessed with trailing slash', async ({ page }) => {
    await page.goto(PAGE_PATH + '/')

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', CANONICAL_URL)

    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', CANONICAL_URL)
  })
})

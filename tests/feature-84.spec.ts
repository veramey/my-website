import { test, expect } from '@playwright/test'

const PAGES = [
  {
    path: '/guides/automate-client-onboarding-small-agency',
    canonicalUrl: 'https://www.aiopagency.com/guides/automate-client-onboarding-small-agency',
  },
  {
    path: '/tools/best-ai-tools-small-agencies',
    canonicalUrl: 'https://www.aiopagency.com/tools/best-ai-tools-small-agencies',
  },
  {
    path: '/tools/best-ai-meeting-assistants-agencies',
    canonicalUrl: 'https://www.aiopagency.com/tools/best-ai-meeting-assistants-agencies',
  },
]

for (const { path, canonicalUrl } of PAGES) {
  test(`canonical tag present on ${path}`, async ({ page }) => {
    await page.goto(path)
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', canonicalUrl)
  })

  test(`canonical href matches og:url on ${path}`, async ({ page }) => {
    await page.goto(path)
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonicalHref).toBe(ogUrl)
  })
}

test('homepage has no canonical tag', async ({ page }) => {
  await page.goto('/')
  const canonical = page.locator('link[rel="canonical"]')
  await expect(canonical).toHaveCount(0)
})

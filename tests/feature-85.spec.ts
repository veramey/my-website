import { test, expect } from '@playwright/test'

const pages = [
  { path: '/start-here', url: 'https://www.aiopagency.com/start-here' },
  { path: '/newsletter', url: 'https://www.aiopagency.com/newsletter' },
  { path: '/guides', url: 'https://www.aiopagency.com/guides' },
  { path: '/tools', url: 'https://www.aiopagency.com/tools' },
  {
    path: '/templates/client-onboarding-ai-checklist',
    url: 'https://www.aiopagency.com/templates/client-onboarding-ai-checklist',
  },
]

for (const { path, url } of pages) {
  test(`${path} has correct og:url and canonical tags`, async ({ page }) => {
    await page.goto(path)

    const ogUrl = await page.locator('head meta[property="og:url"]').getAttribute('content')
    expect(ogUrl).toBe(url)

    const canonical = await page.locator('head link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBe(url)
  })

  test(`${path} og:url and canonical have no trailing slash and use https://`, async ({ page }) => {
    await page.goto(path)

    const ogUrl = await page.locator('head meta[property="og:url"]').getAttribute('content')
    expect(ogUrl).not.toMatch(/\/$/)
    expect(ogUrl).toMatch(/^https:\/\//)
    expect(ogUrl).not.toMatch(/^http:\/\/[^s]/)

    const canonical = await page.locator('head link[rel="canonical"]').getAttribute('href')
    expect(canonical).not.toMatch(/\/$/)
    expect(canonical).toMatch(/^https:\/\//)
    expect(canonical).not.toMatch(/^http:\/\/[^s]/)
  })
}

test('/guides index has correct og:url and canonical', async ({ page }) => {
  await page.goto('/guides')

  const ogUrl = await page.locator('head meta[property="og:url"]').getAttribute('content')
  expect(ogUrl).toBe('https://www.aiopagency.com/guides')

  const canonical = await page.locator('head link[rel="canonical"]').getAttribute('href')
  expect(canonical).toBe('https://www.aiopagency.com/guides')
})

test('/templates/client-onboarding-ai-checklist has correct og:url and canonical', async ({ page }) => {
  await page.goto('/templates/client-onboarding-ai-checklist')

  const ogUrl = await page.locator('head meta[property="og:url"]').getAttribute('content')
  expect(ogUrl).toBe('https://www.aiopagency.com/templates/client-onboarding-ai-checklist')

  const canonical = await page.locator('head link[rel="canonical"]').getAttribute('href')
  expect(canonical).toBe('https://www.aiopagency.com/templates/client-onboarding-ai-checklist')
})

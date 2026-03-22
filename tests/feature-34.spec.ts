import { test, expect } from '@playwright/test'

test.describe('Issue #34 — startHereCards hrefs fix', () => {
  test('startHereCards have correct hrefs: /tools, /guides, /newsletter', async ({ page }) => {
    await page.goto('/')

    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    await expect(startHereSection.locator('a[href="/tools"]')).toBeVisible()
    await expect(startHereSection.locator('a[href="/guides"]')).toBeVisible()
    await expect(startHereSection.locator('a[href="/newsletter"]')).toBeVisible()
  })

  test('all startHereCards links return 200', async ({ request }) => {
    const hrefs = ['/tools', '/guides', '/newsletter']
    for (const href of hrefs) {
      const response = await request.get(href)
      expect(response.status(), `Expected ${href} to return 200`).toBe(200)
    }
  })

  test('Content Highlights block renders exactly 3 cards', async ({ page }) => {
    await page.goto('/')

    const featuredSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Featured', level: 2 }),
    })

    await expect(featuredSection.locator('a')).toHaveCount(3)
  })

  test('Start Here Callout block renders exactly 3 cards', async ({ page }) => {
    await page.goto('/')

    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    await expect(startHereSection.locator('a')).toHaveCount(3)
  })

  test('no href is shared between featuredContent and startHereCards', async ({ page }) => {
    await page.goto('/')

    const featuredSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Featured', level: 2 }),
    })
    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    const featuredHrefs = await featuredSection.locator('a').evaluateAll(
      (els) => els.map((el) => el.getAttribute('href'))
    )
    const startHereHrefs = await startHereSection.locator('a').evaluateAll(
      (els) => els.map((el) => el.getAttribute('href'))
    )

    const overlap = featuredHrefs.filter((href) => startHereHrefs.includes(href))
    expect(overlap).toHaveLength(0)
  })

  test('featuredContent hrefs are unchanged', async ({ page }) => {
    await page.goto('/')

    const featuredSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Featured', level: 2 }),
    })

    await expect(featuredSection.locator('a[href="/tools/best-ai-tools-small-agencies"]')).toBeVisible()
    await expect(featuredSection.locator('a[href="/guides/automate-client-onboarding-small-agency"]')).toBeVisible()
    await expect(featuredSection.locator('a[href="/tools/best-ai-meeting-assistants-agencies"]')).toBeVisible()
  })
})

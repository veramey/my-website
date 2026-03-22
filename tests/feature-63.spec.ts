import { test, expect } from '@playwright/test'

test.describe('Issue #63 — Resolve duplicate href conflict between Block 3 and Block 4', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Block 3 Featured renders all 3 cards with correct hrefs', async ({ page }) => {
    const featured = page.locator('section').filter({ hasText: 'Featured' })
    const links = featured.locator('a')
    const hrefs = await links.evaluateAll((anchors) =>
      anchors.map((a) => a.getAttribute('href'))
    )
    expect(hrefs).toContain('/tools/best-ai-tools-small-agencies')
    expect(hrefs).toContain('/guides/automate-client-onboarding-small-agency')
    expect(hrefs).toContain('/tools/best-ai-meeting-assistants-agencies')
    expect(hrefs).toHaveLength(3)
  })

  test('Block 4 Start Here card 03 links to /templates/client-onboarding-ai-checklist', async ({ page }) => {
    const startHere = page.locator('section').filter({ hasText: 'Start Here' })
    const card03 = startHere.locator('a').filter({ hasText: '03' })
    await expect(card03).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('Block 4 Start Here card 03 template page returns 200', async ({ page }) => {
    const response = await page.request.get('/templates/client-onboarding-ai-checklist')
    expect(response.status()).toBe(200)
  })

  test('Block 4 Start Here cards have no hrefs overlapping with Block 3 Featured', async ({ page }) => {
    const featured = page.locator('section').filter({ hasText: 'Featured' })
    const featuredHrefs = await featured.locator('a').evaluateAll((anchors) =>
      anchors.map((a) => a.getAttribute('href'))
    )

    const startHere = page.locator('section').filter({ hasText: 'Start Here' })
    const startHereHrefs = await startHere.locator('a').evaluateAll((anchors) =>
      anchors.map((a) => a.getAttribute('href'))
    )

    const overlap = startHereHrefs.filter((href) => featuredHrefs.includes(href))
    expect(overlap).toHaveLength(0)
  })

  test('Block 4 card 02 does not duplicate Block 3 card 02', async ({ page }) => {
    const featured = page.locator('section').filter({ hasText: 'Featured' })
    const featuredLinks = featured.locator('a')
    const block3Card2Href = await featuredLinks.nth(1).getAttribute('href')

    const startHere = page.locator('section').filter({ hasText: 'Start Here' })
    const startHereLinks = startHere.locator('a')
    const block4Card2Href = await startHereLinks.nth(1).getAttribute('href')

    expect(block4Card2Href).not.toBe(block3Card2Href)
    expect(block3Card2Href).toBe('/guides/automate-client-onboarding-small-agency')
  })
})

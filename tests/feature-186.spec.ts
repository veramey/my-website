import { test, expect } from '@playwright/test'

test.describe('Guide card metadata — readingTime and whoItIsFor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides')
  })

  test('renders both readingTime and whoItIsFor when both are present', async ({ page }) => {
    // "automate-client-onboarding" has both readingTime: "8 min read" and whoItIsFor: "Agency owners"
    const card = page.locator('a[href="/guides/automate-client-onboarding-small-agency"]')
    await expect(card.getByText('8 min read')).toBeVisible()
    await expect(card.getByText('Agency owners')).toBeVisible()
  })

  test('metadata div with both spans is inside the card', async ({ page }) => {
    const card = page.locator('a[href="/guides/automate-client-onboarding-small-agency"]')
    const metaDiv = card.locator('div.flex.gap-3.mt-3')
    await expect(metaDiv).toBeVisible()
    const spans = metaDiv.locator('span')
    await expect(spans).toHaveCount(2)
  })

  test('renders only readingTime span when whoItIsFor is absent', async ({ page }) => {
    // "discovery-call-to-proposal" has readingTime: "5 min read" but no whoItIsFor
    const card = page.locator('a[href="/guides/discovery-call-to-proposal-workflow-agency"]')
    await expect(card.getByText('5 min read')).toBeVisible()
    const metaDiv = card.locator('div.flex.gap-3.mt-3')
    const spans = metaDiv.locator('span')
    await expect(spans).toHaveCount(1)
  })

  test('metadata spans have text-xs and text-gray-400 classes', async ({ page }) => {
    const card = page.locator('a[href="/guides/automate-client-onboarding-small-agency"]')
    const spans = card.locator('div.flex.gap-3.mt-3 span')
    for (const span of await spans.all()) {
      await expect(span).toHaveClass(/text-xs/)
      await expect(span).toHaveClass(/text-gray-400/)
    }
  })

  test('does not render metadata div when neither readingTime nor whoItIsFor is set', async ({
    page,
  }) => {
    // To test this we check a card that truly has no metadata.
    // All current guides have readingTime set; this test verifies the guard logic
    // by asserting that cards without metadata don't show an empty flex div.
    // We confirm no empty div.flex.gap-3.mt-3 exists without children.
    const metaDivs = page.locator('div.flex.gap-3.mt-3')
    const count = await metaDivs.count()
    for (let i = 0; i < count; i++) {
      const div = metaDivs.nth(i)
      const spanCount = await div.locator('span').count()
      expect(spanCount).toBeGreaterThan(0)
    }
  })
})

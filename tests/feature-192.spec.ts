import { test, expect } from '@playwright/test'

test.describe('Issue #192 — readingTime and whoItIsFor values in guides', () => {
  test.describe('Happy path — /guides list page', () => {
    test('onboarding card shows 7–10 min and correct audience', async ({ page }) => {
      await page.goto('/guides')
      const card = page.getByRole('link', { name: /How to Automate Client Onboarding for a Small Agency/i })
      await expect(card.getByText('7\u201310 min')).toBeVisible()
      await expect(card.getByText('For: agency founders and ops leads')).toBeVisible()
    })

    test('7-workflows card shows 8–10 min and correct audience', async ({ page }) => {
      await page.goto('/guides')
      const card = page.getByRole('link', { name: /7 Workflows Every Small Agency Should Automate with AI/i })
      await expect(card.getByText('8\u201310 min')).toBeVisible()
      await expect(card.getByText('For: small agency operators')).toBeVisible()
    })

    test('discovery-call card shows 6–8 min and correct audience', async ({ page }) => {
      await page.goto('/guides')
      const card = page.getByRole('link', { name: /How to Turn Discovery Calls into Proposals with AI/i })
      await expect(card.getByText('6\u20138 min')).toBeVisible()
      await expect(card.getByText('For: agency founders and account managers')).toBeVisible()
    })
  })

  test('article header on /guides/automate-client-onboarding-small-agency renders metadata spans', async ({ page }) => {
    await page.goto('/guides/automate-client-onboarding-small-agency')
    const header = page.locator('article header')
    await expect(header.locator('span').filter({ hasText: '7\u201310 min' })).toBeVisible()
    await expect(header.locator('span').filter({ hasText: 'For: agency founders and ops leads' })).toBeVisible()
  })

  test.describe('Edge cases — en-dash validation', () => {
    test('reading time strings on /guides use en-dashes (U+2013), not hyphens', async ({ page }) => {
      await page.goto('/guides')

      const spans = page.locator('span').filter({ hasText: /\d+.+\d+ min/ })
      const count = await spans.count()
      expect(count).toBeGreaterThan(0)

      for (let i = 0; i < count; i++) {
        const text = await spans.nth(i).textContent()
        if (text && /\d+.+\d+ min/.test(text)) {
          expect(text).toMatch(/\d+\u2013\d+ min/)
        }
      }
    })

    test('/guides/discovery-call-to-proposal-workflow-agency renders whoItIsFor in header', async ({ page }) => {
      await page.goto('/guides/discovery-call-to-proposal-workflow-agency')
      const header = page.locator('article header')
      await expect(header.locator('span').filter({ hasText: 'For: agency founders and account managers' })).toBeVisible()
    })
  })
})

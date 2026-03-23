import { test, expect } from '@playwright/test'

test.describe('Guide cards metadata — issue #184', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides')
  })

  test('onboarding guide card displays reading time', async ({ page }) => {
    const card = page.getByRole('link', { name: /How to Automate Client Onboarding for a Small Agency/i })
    await expect(card).toContainText('7–10 min')
  })

  test('onboarding guide card displays "who it is for" label', async ({ page }) => {
    const card = page.getByRole('link', { name: /How to Automate Client Onboarding for a Small Agency/i })
    await expect(card).toContainText('For: agency founders and ops leads')
  })

  test('discovery-call guide card displays "who it is for" label', async ({ page }) => {
    const card = page.getByRole('link', { name: /How to Turn Discovery Calls into Proposals with AI/i })
    await expect(card).toContainText('For: agency founders and account managers')
  })

  test('7-workflows guide card displays "who it is for" label', async ({ page }) => {
    const card = page.getByRole('link', { name: /7 Workflows Every Small Agency Should Automate with AI/i })
    await expect(card).toContainText('For: small agency operators')
  })

  test('all three guide cards render both metadata fields without fallback text', async ({ page }) => {
    const cards = page.getByRole('link').filter({ hasText: /For:/ })
    await expect(cards).toHaveCount(3)

    for (const card of await cards.all()) {
      const text = await card.textContent()
      expect(text).not.toContain('undefined')
      expect(text).toMatch(/\d+–\d+ min/)
      expect(text).toMatch(/For: /)
    }
  })

  test('7-workflows reading time uses en-dash (U+2013), not a hyphen', async ({ page }) => {
    const card = page.getByRole('link', { name: /7 Workflows Every Small Agency Should Automate with AI/i })
    await expect(card).toContainText('8\u201310 min')
  })
})

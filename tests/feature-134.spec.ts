import { test, expect } from '@playwright/test'

test.describe('Issue #134 — Home page content updates', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('fourth content pillar renders with heading and topics', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Templates & Starter Systems' })).toBeVisible()
    await expect(page.getByText('Onboarding checklists')).toBeVisible()
  })

  test('fourth pillar links to /templates', async ({ page }) => {
    const link = page.getByRole('link', { name: /Browse →/ }).filter({ has: page.locator('xpath=ancestor::div[.//h3[contains(text(), "Templates & Starter Systems")]]') })
    // Find Browse link inside Templates pillar card
    const pillarsSection = page.locator('section').filter({ hasText: 'Content Pillars' })
    const templatesPillar = pillarsSection.locator('div').filter({ hasText: 'Templates & Starter Systems' }).first()
    const browseLink = templatesPillar.getByRole('link', { name: /Browse/ })
    await expect(browseLink).toHaveAttribute('href', '/templates')
  })

  test('featured resource cards show whoItIsFor text', async ({ page }) => {
    const featuredSection = page.locator('section').filter({ hasText: 'Featured' }).first()
    const forTexts = featuredSection.locator('p').filter({ hasText: /^For:/ })
    const count = await forTexts.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const text = await forTexts.nth(i).textContent()
      expect(text).toBeTruthy()
      expect(text!.trim()).not.toBe('For:')
    }
  })

  test('featured resource cards show category pill above title', async ({ page }) => {
    const featuredSection = page.locator('section').filter({ hasText: 'Featured' }).first()
    const cards = featuredSection.locator('a')
    const cardCount = await cards.count()
    expect(cardCount).toBeGreaterThan(0)
    for (let i = 0; i < cardCount; i++) {
      const pill = cards.nth(i).locator('span').first()
      await expect(pill).toBeVisible()
      const text = await pill.textContent()
      expect(['Guide', 'Tools', 'Template'].some(cat => text?.includes(cat))).toBe(true)
    }
  })

  test('trust block shows all three updated strings', async ({ page }) => {
    await expect(page.getByText('Built for operators, not spectators')).toBeVisible()
    await expect(page.getByText('No news. No hype. Only implementation.')).toBeVisible()
    await expect(page.getByText('Designed for lean teams that ship')).toBeVisible()
  })

  test('content pillar grid shows Templates pillar at 375px viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Templates & Starter Systems' })).toBeVisible()
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(375)
  })
})

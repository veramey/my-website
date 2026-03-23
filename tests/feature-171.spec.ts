import { test, expect } from '@playwright/test'

const PAGE = '/guides/automate-client-onboarding-small-agency'
const META_TEXT = '7–10 min read · For: 2–10 person agencies'

test.describe('Issue 171 — reading time metadata row in onboarding guide header', () => {
  test('reading time metadata renders with exact text', async ({ page }) => {
    await page.goto(PAGE)
    const metaP = page.locator('header p').filter({ hasText: META_TEXT })
    await expect(metaP).toBeVisible()
  })

  test('metadata row is the third <p> inside <header>', async ({ page }) => {
    await page.goto(PAGE)
    const thirdP = page.locator('header p').nth(2)
    await expect(thirdP).toHaveText(META_TEXT)
  })

  test('metadata row carries text-sm and text-gray-400 classes', async ({ page }) => {
    await page.goto(PAGE)
    const metaP = page.locator('header p').filter({ hasText: '7–10 min read' })
    await expect(metaP).toHaveClass(/text-sm/)
    await expect(metaP).toHaveClass(/text-gray-400/)
  })

  test('metadata text is not duplicated elsewhere on the page', async ({ page }) => {
    await page.goto(PAGE)
    const matches = page.getByText(META_TEXT, { exact: true })
    await expect(matches).toHaveCount(1)
  })

  test('metadata row is visible on 375 px mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(PAGE)
    const metaP = page.locator('header p').filter({ hasText: META_TEXT })
    await expect(metaP).toBeVisible()
    const box = await metaP.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeLessThanOrEqual(375)
  })
})

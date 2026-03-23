import { test, expect } from '@playwright/test'

test.describe('Issue 122 — Core Problem block on home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('section heading "Where small agencies lose time" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Where small agencies lose time' })).toBeVisible()
  })

  test('all 4 pain cards are present in the DOM', async ({ page }) => {
    await expect(page.getByText('Messy onboarding')).toBeVisible()
    await expect(page.getByText('Inconsistent delivery')).toBeVisible()
    await expect(page.getByText('Undocumented processes')).toBeVisible()
    await expect(page.getByText('Too much admin work')).toBeVisible()
  })

  test('CTA link "Read the onboarding guide" points to the correct path', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Read the onboarding guide' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/guides/automate-client-onboarding-small-agency')
  })

  test('intro paragraph starts with "Most small agencies don\'t have an AI problem" and is fully visible', async ({ page }) => {
    const para = page.getByText(/Most small agencies don't have an AI problem/)
    await expect(para).toBeVisible()
    // Verify the full text is rendered (not truncated)
    await expect(para).toContainText('This site helps fix that with practical systems.')
  })

  test('on 375px mobile viewport, pain cards stack vertically without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const cards = page.locator('text=Messy onboarding, text=Inconsistent delivery, text=Undocumented processes, text=Too much admin work')

    // Check no horizontal scrollbar (scrollWidth <= clientWidth)
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasOverflow).toBe(false)

    // All 4 cards must be visible without horizontal scrolling
    await expect(page.getByText('Messy onboarding')).toBeVisible()
    await expect(page.getByText('Inconsistent delivery')).toBeVisible()
    await expect(page.getByText('Undocumented processes')).toBeVisible()
    await expect(page.getByText('Too much admin work')).toBeVisible()
  })
})

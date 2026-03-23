import { test, expect } from '@playwright/test'

const PAGE = '/guides/automate-client-onboarding-small-agency'

test.describe('Issue #153 — Common Mistakes and Simple Stack sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE)
  })

  // Happy path

  test('Common Mistakes section renders with all 5 list items', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Common Mistakes when automating onboarding' })).toBeVisible()

    const items = page.locator('ol li')
    await expect(items).toHaveCount(5)

    const texts = await items.allInnerTexts()
    expect(texts.some(t => t.toLowerCase().includes('automating before the process is defined'))).toBe(true)
    expect(texts.some(t => t.toLowerCase().includes('skipping the human review step'))).toBe(true)
  })

  test('Common Mistakes section link has correct href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Get the AI onboarding checklist →' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('Simple Stack section renders both tool columns with list items', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Simple stack for this workflow' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Minimal (free)' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Full stack (under $100/mo)' })).toBeVisible()

    const asides = page.locator('section').filter({ hasText: 'Simple stack for this workflow' }).locator('aside')
    await expect(asides).toHaveCount(2)

    // Each aside has at least one list item
    for (let i = 0; i < 2; i++) {
      const listItems = asides.nth(i).locator('li')
      const count = await listItems.count()
      expect(count).toBeGreaterThanOrEqual(1)
    }
  })

  test('Simple Stack section link has correct href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'See full tool recommendations →' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/tools/best-ai-tools-small-agencies')
  })

  // Edge cases

  test('New sections appear after Step 4 / Handoff and before Putting It All Together', async ({ page }) => {
    const headings = page.getByRole('heading', { level: 2 })
    const texts = await headings.allInnerTexts()

    const handoffIdx = texts.findIndex(t => t.includes('Handoff'))
    const mistakesIdx = texts.findIndex(t => t.includes('Common Mistakes when automating onboarding'))
    const stackIdx = texts.findIndex(t => t.includes('Simple stack for this workflow'))
    const closingIdx = texts.findIndex(t => t.includes('Putting It All Together'))

    expect(handoffIdx).toBeGreaterThanOrEqual(0)
    expect(mistakesIdx).toBeGreaterThan(handoffIdx)
    expect(stackIdx).toBeGreaterThan(mistakesIdx)
    expect(closingIdx).toBeGreaterThan(stackIdx)
  })

  test('Stack cards are side-by-side on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(PAGE)

    const asides = page.locator('section').filter({ hasText: 'Simple stack for this workflow' }).locator('aside')
    const first = await asides.nth(0).boundingBox()
    const second = await asides.nth(1).boundingBox()

    expect(first).not.toBeNull()
    expect(second).not.toBeNull()
    // Both asides start at approximately the same vertical position
    expect(Math.abs(first!.y - second!.y)).toBeLessThanOrEqual(10)
  })
})

import { test, expect } from '@playwright/test'

test.describe('Issue 198 — Sample Issues block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/newsletter')
  })

  test('"Sample issues" heading renders with correct styles', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Sample issues', level: 2 })
    await expect(heading).toBeVisible()
    await expect(heading).toHaveClass(/text-2xl/)
    await expect(heading).toHaveClass(/font-bold/)
    await expect(heading).toHaveClass(/text-gray-900/)
  })

  test('Three bordered cards render with correct titles', async ({ page }) => {
    const cards = page.locator('.border-t-2.border-gray-900.pt-4')
    // The "What you get" section also uses this pattern — select only those inside the Sample Issues section
    const section = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Sample issues' }) })
    const sectionCards = section.locator('.border-t-2.border-gray-900.pt-4')
    await expect(sectionCards).toHaveCount(3)

    await expect(section.getByText('Clean up client onboarding with one form and one prompt')).toBeVisible()
    await expect(section.getByText('A lean AI stack under $100/month')).toBeVisible()
    await expect(section.getByText('SOP drafting workflow for small teams')).toBeVisible()
  })

  test('"Join now" anchor link is present and points to #signup', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Join now' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '#signup')
  })

  test('#signup element exists on the page', async ({ page }) => {
    const signupSection = page.locator('#signup')
    await expect(signupSection).toBeAttached()
  })

  test('Cards stack vertically on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    const section = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Sample issues' }) })
    const grid = section.locator('.grid')
    // On mobile the grid should not have md:grid-cols-3 applied — cards stack single column
    // Verify all three cards are visible and stacked (each takes full width)
    const sectionCards = section.locator('.border-t-2.border-gray-900.pt-4')
    await expect(sectionCards).toHaveCount(3)
    const boxes = await sectionCards.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().left)
    )
    // All cards should start at the same x position (single column)
    expect(boxes[0]).toBeCloseTo(boxes[1], 0)
    expect(boxes[1]).toBeCloseTo(boxes[2], 0)
  })

  test('Cards render side-by-side at md breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    const section = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Sample issues' }) })
    const sectionCards = section.locator('.border-t-2.border-gray-900.pt-4')
    const boxes = await sectionCards.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().left)
    )
    // Cards should have different x positions (multi-column layout)
    expect(boxes[0]).toBeLessThan(boxes[1])
    expect(boxes[1]).toBeLessThan(boxes[2])
  })
})

import { test, expect } from '@playwright/test'

test.describe('About page — Block 5: Why This Approach Works', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  // Happy path: heading renders
  test('Block 5 section renders with correct heading', async ({ page }) => {
    await expect(page.getByText('Why this approach works')).toBeVisible()
  })

  // Happy path: all three list items render with correct bold span text
  test('all three list items render with correct bold text', async ({ page }) => {
    await expect(page.getByText('Practical, no-fluff content.')).toBeVisible()
    await expect(page.getByText('Built for lean teams, not enterprise.')).toBeVisible()
    await expect(page.getByText('Implementation-first — every piece has a next action.')).toBeVisible()
  })

  // Happy path: ul contains exactly three li elements
  test('ul contains exactly three list items', async ({ page }) => {
    const block5 = page.locator('section.bg-gray-50.border-t').filter({
      hasText: 'Why this approach works',
    })
    await expect(block5.locator('ul li')).toHaveCount(3)
  })

  // Happy path: CTA link renders with correct text and href
  test('CTA link has correct text and href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Download the starter kit →' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  // Edge case: Block 5 appears after Block 4 in DOM order
  test('Block 5 appears after Block 4 (What You\'ll Find Here) in DOM order', async ({ page }) => {
    const sections = page.locator('main section')
    const count = await sections.count()

    let block4Index = -1
    let block5Index = -1

    for (let i = 0; i < count; i++) {
      const text = await sections.nth(i).textContent()
      if (text?.includes("What You'll Find Here")) block4Index = i
      if (text?.includes('Why this approach works')) block5Index = i
    }

    expect(block4Index).toBeGreaterThanOrEqual(0)
    expect(block5Index).toBeGreaterThanOrEqual(0)
    expect(block5Index).toBeGreaterThan(block4Index)
  })

  // Edge case: Block 5 section element itself has bg-gray-50 and border-t classes
  test('Block 5 section has bg-gray-50 and border-t CSS classes', async ({ page }) => {
    const section = page.locator('section.bg-gray-50.border-t').filter({
      hasText: 'Why this approach works',
    })
    await expect(section).toBeVisible()
  })
})

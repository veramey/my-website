import { test, expect } from '@playwright/test'

test.describe('/services page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services')
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Services — AI Ops for Small Agencies')
  })

  test('has canonical link pointing to the services URL', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://www.aiopagency.com/services')
  })

  test('renders AI Ops Audit and AI Ops Setup service cards with Coming soon badge', async ({ page }) => {
    await expect(page.getByText('AI Ops Audit')).toBeVisible()
    await expect(page.getByText('AI Ops Setup')).toBeVisible()

    const comingSoonBadges = page.getByText(/coming soon/i)
    await expect(comingSoonBadges).toHaveCount(2)
  })

  test('service cards are not wrapped in an anchor tag', async ({ page }) => {
    // Neither card heading should be inside an <a> element
    const auditCard = page.getByText('AI Ops Audit')
    const setupCard = page.getByText('AI Ops Setup')

    // Verify the cards exist but are not links
    await expect(auditCard).toBeVisible()
    await expect(setupCard).toBeVisible()

    const auditLink = page.locator('a', { has: page.getByText('AI Ops Audit') })
    await expect(auditLink).toHaveCount(0)

    const setupLink = page.locator('a', { has: page.getByText('AI Ops Setup') })
    await expect(setupLink).toHaveCount(0)
  })

  test('page is indexable — no noindex in robots meta', async ({ page }) => {
    const robotsMeta = page.locator('meta[name="robots"]')
    const count = await robotsMeta.count()
    if (count > 0) {
      const content = await robotsMeta.getAttribute('content')
      expect(content).not.toContain('noindex')
    }
    // If no robots meta tag exists, the page is indexable by default — test passes
  })

  test('service cards stack on mobile and display side-by-side on desktop', async ({ page, browser }) => {
    // Mobile: 375 × 812
    await page.setViewportSize({ width: 375, height: 812 })
    const auditCard = page.getByText('AI Ops Audit')
    const setupCard = page.getByText('AI Ops Setup')

    const auditBox = await auditCard.boundingBox()
    const setupBox = await setupCard.boundingBox()

    expect(auditBox).not.toBeNull()
    expect(setupBox).not.toBeNull()

    // On mobile, cards stack vertically — setupCard should be below auditCard
    expect(setupBox!.y).toBeGreaterThan(auditBox!.y)

    // Desktop: 1280 × 800
    await page.setViewportSize({ width: 1280, height: 800 })

    const auditBoxDesktop = await auditCard.boundingBox()
    const setupBoxDesktop = await setupCard.boundingBox()

    expect(auditBoxDesktop).not.toBeNull()
    expect(setupBoxDesktop).not.toBeNull()

    // On desktop, cards are side-by-side — they share the same vertical row
    expect(Math.abs(auditBoxDesktop!.y - setupBoxDesktop!.y)).toBeLessThan(10)
  })
})

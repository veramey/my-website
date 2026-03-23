import { test, expect } from '@playwright/test'

test.describe("Block 4 'What You'll Find Here' on /about", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test("'What You'll Find Here' heading is visible", async ({ page }) => {
    await expect(page.getByRole('heading', { name: "What You'll Find Here" })).toBeVisible()
  })

  test('all four list links are present and point to correct hrefs', async ({ page }) => {
    const section = page.locator('section').filter({ hasText: "What You'll Find Here" })
    const items = section.locator('ul li')
    await expect(items).toHaveCount(4)

    const guidesLink = items.nth(0).getByRole('link', { name: 'Guides' })
    await expect(guidesLink).toBeVisible()
    await expect(guidesLink).toHaveAttribute('href', '/guides')

    const toolsLink = items.nth(1).getByRole('link', { name: 'Tool roundups' })
    await expect(toolsLink).toBeVisible()
    await expect(toolsLink).toHaveAttribute('href', '/tools')

    const templatesLink = items.nth(2).getByRole('link', { name: 'Templates' })
    await expect(templatesLink).toBeVisible()
    await expect(templatesLink).toHaveAttribute('href', '/templates')

    const newsletterLink = items.nth(3).getByRole('link', { name: 'Newsletter' })
    await expect(newsletterLink).toBeVisible()
    await expect(newsletterLink).toHaveAttribute('href', '/newsletter')
  })

  test("CTA 'Browse resources →' is visible and links to /guides", async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Browse resources →' })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/guides')
  })

  test('Block 4 appears after Block 3 (Core Beliefs) in DOM order', async ({ page }) => {
    const sections = page.locator('main section')
    const count = await sections.count()

    let coreBeliefIndex = -1
    let whatYoullFindIndex = -1

    for (let i = 0; i < count; i++) {
      const text = await sections.nth(i).textContent()
      if (text?.includes('Core Beliefs')) coreBeliefIndex = i
      if (text?.includes("What You'll Find Here")) whatYoullFindIndex = i
    }

    expect(coreBeliefIndex).toBeGreaterThanOrEqual(0)
    expect(whatYoullFindIndex).toBeGreaterThanOrEqual(0)
    expect(whatYoullFindIndex).toBeGreaterThan(coreBeliefIndex)
  })

  test('list links have correct classes font-medium and text-gray-900', async ({ page }) => {
    const section = page.locator('section').filter({ hasText: "What You'll Find Here" })
    const links = section.locator('ul li a')
    const count = await links.count()
    expect(count).toBe(4)

    for (let i = 0; i < count; i++) {
      const cls = await links.nth(i).getAttribute('class')
      expect(cls).toContain('font-medium')
      expect(cls).toContain('text-gray-900')
      expect(cls).toContain('hover:underline')
    }
  })
})

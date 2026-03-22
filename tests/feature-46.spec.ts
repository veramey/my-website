import { test, expect } from '@playwright/test'

test.describe('Issue #46 — Content Pillars href values use anchor URLs', () => {
  test('Client Onboarding & Delivery pillar links to /guides#onboarding', async ({ page }) => {
    await page.goto('/')

    const pillarsSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Content Pillars', level: 2 }),
    })

    await expect(pillarsSection.locator('a[href="/guides#onboarding"]')).toBeVisible()
  })

  test('Internal Ops & SOPs pillar links to /guides#internal-ops', async ({ page }) => {
    await page.goto('/')

    const pillarsSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Content Pillars', level: 2 }),
    })

    await expect(pillarsSection.locator('a[href="/guides#internal-ops"]')).toBeVisible()
  })

  test('Tools & Stacks pillar links to /tools (unchanged)', async ({ page }) => {
    await page.goto('/')

    const pillarsSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Content Pillars', level: 2 }),
    })

    await expect(pillarsSection.locator('a[href="/tools"]')).toBeVisible()
  })

  test('all three pillar href values are distinct', async ({ page }) => {
    await page.goto('/')

    const pillarsSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Content Pillars', level: 2 }),
    })

    const hrefs = await pillarsSection.locator('a').evaluateAll(
      (els) => els.map((el) => el.getAttribute('href'))
    )

    const unique = new Set(hrefs)
    expect(unique.size).toBe(hrefs.length)
  })

  test('clicking Client Onboarding & Delivery pillar navigates to /guides#onboarding', async ({ page }) => {
    await page.goto('/')

    await page.click('a[href="/guides#onboarding"]')

    await expect(page).toHaveURL(/\/guides#onboarding/)
  })
})

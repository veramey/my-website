import { test, expect } from '@playwright/test'

test.describe('Guides topic pill navigation (#222)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides')
  })

  test('all four pill links render with correct text and hrefs', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Topic navigation"]')
    await expect(nav).toBeVisible()

    const links = nav.locator('a')
    await expect(links).toHaveCount(4)

    await expect(nav.getByRole('link', { name: 'Onboarding' })).toHaveAttribute('href', '#onboarding')
    await expect(nav.getByRole('link', { name: 'Internal Ops' })).toHaveAttribute('href', '#internal-ops')
    await expect(nav.getByRole('link', { name: 'Delivery' })).toHaveAttribute('href', '#delivery')
    await expect(nav.getByRole('link', { name: 'Automation' })).toHaveAttribute('href', '#automation')
  })

  test('pill nav is positioned between description paragraph and card grid', async ({ page }) => {
    const description = page.locator('main p').first()
    const nav = page.locator('nav[aria-label="Topic navigation"]')
    const firstCard = page.locator('main a[href^="/guides/"]').first()

    const descBox = await description.boundingBox()
    const navBox = await nav.boundingBox()
    const cardBox = await firstCard.boundingBox()

    expect(descBox).not.toBeNull()
    expect(navBox).not.toBeNull()
    expect(cardBox).not.toBeNull()

    expect(navBox!.y).toBeGreaterThan(descBox!.y + descBox!.height - 1)
    expect(cardBox!.y).toBeGreaterThan(navBox!.y + navBox!.height - 1)
  })

  test('clicking Delivery pill sets URL hash to #delivery', async ({ page }) => {
    await page.getByRole('link', { name: 'Delivery' }).click()
    await expect(page).toHaveURL(/\#delivery$/)
  })

  test('"Delivery & Client Work" section has id="delivery"', async ({ page }) => {
    const section = page.locator('#delivery')
    await expect(section).toBeAttached()
  })

  test('pills remain visible at 375px viewport width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/guides')

    const nav = page.locator('nav[aria-label="Topic navigation"]')
    await expect(nav).toBeVisible()

    for (const name of ['Onboarding', 'Internal Ops', 'Delivery', 'Automation']) {
      const pill = nav.getByRole('link', { name })
      await expect(pill).toBeVisible()
      const box = await pill.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(375 + 1)
    }
  })
})

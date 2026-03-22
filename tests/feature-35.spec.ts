import { test, expect } from '@playwright/test'

test.describe('Homepage Content Pillars href values (issue #35)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('exactly three pillar elements are rendered', async ({ page }) => {
    const pillarLinks = page.getByRole('link', { name: /Browse →/ })
    await expect(pillarLinks).toHaveCount(3)
  })

  test('"Client Onboarding & Delivery" pillar link points to /guides#onboarding', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Browse →' }).nth(0)
    const href = await link.getAttribute('href')
    expect(href).toContain('#onboarding')
    expect(href).toBe('/guides#onboarding')
  })

  test('"Internal Ops & SOPs" pillar link points to /guides#internal-ops', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Browse →' }).nth(1)
    const href = await link.getAttribute('href')
    expect(href).toContain('#internal-ops')
    expect(href).toBe('/guides#internal-ops')
  })

  test('"Tools & Stacks" pillar link points to /tools with no hash fragment', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Browse →' }).nth(2)
    const href = await link.getAttribute('href')
    expect(href).toBe('/tools')
    expect(href).not.toContain('#')
  })

  test('clicking "Client Onboarding & Delivery" pillar navigates to /guides#onboarding', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Browse →' }).nth(0)
    await link.click()
    await page.waitForURL('**/guides#onboarding')
    expect(page.url()).toMatch(/#onboarding$/)
    const section = page.locator('#onboarding')
    await expect(section).toBeVisible()
  })
})

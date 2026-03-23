import { test, expect } from '@playwright/test'

test.describe('Issue 185 — Topic pill navigation on /guides', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides')
  })

  test('all four pill links render with correct text and hrefs', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Topic navigation"]')
    await expect(nav).toBeVisible()

    const pills = nav.locator('a')
    await expect(pills).toHaveCount(4)

    await expect(nav.getByText('Onboarding')).toHaveAttribute('href', '#onboarding')
    await expect(nav.getByText('Internal Ops')).toHaveAttribute('href', '#internal-ops')
    await expect(nav.getByText('Delivery')).toHaveAttribute('href', '#delivery')
    await expect(nav.getByText('Automation')).toHaveAttribute('href', '#automation')
  })

  test('nav appears after intro paragraph and before card grid', async ({ page }) => {
    const description = page.locator('p', {
      hasText: 'How-to articles, workflow systems',
    })
    const nav = page.locator('nav[aria-label="Topic navigation"]')
    const grid = page.locator('.grid').first()

    const descBox = await description.boundingBox()
    const navBox = await nav.boundingBox()
    const gridBox = await grid.boundingBox()

    expect(descBox).not.toBeNull()
    expect(navBox).not.toBeNull()
    expect(gridBox).not.toBeNull()

    expect(navBox!.y).toBeGreaterThan(descBox!.y)
    expect(gridBox!.y).toBeGreaterThan(navBox!.y)
  })

  test('clicking Onboarding pill updates URL hash', async ({ page }) => {
    await page.getByRole('link', { name: 'Onboarding' }).click()
    await expect(page).toHaveURL(/\/guides#onboarding/)
  })

  test('Delivery & Client Work cards are under the delivery anchor', async ({ page }) => {
    const deliverySection = page.locator('#delivery')
    await expect(deliverySection).toBeVisible()
    // The section heading should identify itself as Delivery & Client Work
    await expect(deliverySection.locator('h2')).toContainText('Delivery')
  })

  test('pills are keyboard-navigable and update URL hash on Enter', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Topic navigation"]')
    const internalOpsPill = nav.getByText('Internal Ops')

    await internalOpsPill.focus()
    await expect(internalOpsPill).toBeFocused()
    await internalOpsPill.press('Enter')
    await expect(page).toHaveURL(/\/guides#internal-ops/)
  })
})

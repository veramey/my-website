import { test, expect } from '@playwright/test'

test.describe('Sample Issues block on /newsletter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/newsletter')
  })

  // Happy Path: heading renders
  test('Sample Issues section heading renders', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sample issues' })).toBeVisible()
  })

  // Happy Path: all three cards render with correct titles
  test('three issue cards render with correct titles', async ({ page }) => {
    await expect(page.getByText('Clean up client onboarding with one form and one prompt')).toBeVisible()
    await expect(page.getByText('A lean AI stack under $100/month')).toBeVisible()
    await expect(page.getByText('SOP drafting workflow for small teams')).toBeVisible()
  })

  // Happy Path: "Join now" link navigates to #signup section
  test('"Join now" anchor link navigates to the signup section', async ({ page }) => {
    await page.getByRole('link', { name: 'Join now' }).click()
    await expect(page).toHaveURL(/\#signup/)
    await expect(page.locator('#signup')).toBeVisible()
  })

  // Edge Case: cards have correct border styling
  test('cards have correct border styling classes', async ({ page }) => {
    const cards = page.locator('section').filter({ hasText: 'Sample issues' }).locator('.border-t-2.border-gray-900.pt-4')
    await expect(cards).toHaveCount(3)
  })

  // Edge Case: "Join now" is an anchor tag pointing to #signup
  test('"Join now" link is an anchor tag with href="#signup"', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Join now' })
    await expect(link).toHaveAttribute('href', '#signup')
  })
})

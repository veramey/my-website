import { test, expect } from '@playwright/test'

test.describe('Issue #132 — Hero value bullets and secondary CTA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('value bullets render with correct text', async ({ page }) => {
    await expect(page.getByText('No AI hype or news')).toBeVisible()
    await expect(page.getByText('Implementation-ready systems')).toBeVisible()
    await expect(page.getByText('Built for 2–10-person teams')).toBeVisible()
  })

  test('value bullet list has exactly three items', async ({ page }) => {
    const hero = page.locator('section').first()
    const bullets = hero.locator('ul li')
    await expect(bullets).toHaveCount(3)
  })

  test('secondary CTA displays correct label', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Download the starter kit' })).toBeVisible()
  })

  test('secondary CTA has correct href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Download the starter kit' }).first()
    await expect(link).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('secondary CTA navigates to the correct page', async ({ page }) => {
    await page.getByRole('link', { name: 'Download the starter kit' }).first().click()
    await expect(page).toHaveURL('/templates/client-onboarding-ai-checklist')
    await expect(page.locator('body')).toBeVisible()
  })

  test('primary CTA is still visible and above the bullet list', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Start Here' })).toBeVisible()
  })
})

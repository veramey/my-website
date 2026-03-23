import { test, expect } from '@playwright/test'

test.describe('Issue 132 — Hero block: value bullets and secondary CTA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('value bullets render below CTA buttons', async ({ page }) => {
    const ul = page.locator('section').first().locator('ul')
    await expect(ul).toBeVisible()

    const items = ul.locator('li')
    await expect(items).toHaveCount(3)
    await expect(items.nth(0)).toHaveText('No AI hype or news')
    await expect(items.nth(1)).toHaveText('Implementation-ready systems')
    await expect(items.nth(2)).toHaveText('Built for 2–10-person teams')
  })

  test('secondary CTA has correct label', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Download the starter kit' })).toBeVisible()
  })

  test('secondary CTA href points to /templates/client-onboarding-ai-checklist', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Download the starter kit' })
    await expect(link).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('secondary CTA navigates to the template page', async ({ page }) => {
    await page.getByRole('link', { name: 'Download the starter kit' }).click()
    await expect(page).toHaveURL('/templates/client-onboarding-ai-checklist')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('primary CTA (Start Here) is still visible and above the bullet list', async ({ page }) => {
    const startHereLink = page.getByRole('link', { name: 'Start Here' })
    await expect(startHereLink).toBeVisible()

    const startHereBB = await startHereLink.boundingBox()
    const ul = page.locator('section').first().locator('ul')
    const ulBB = await ul.boundingBox()

    expect(startHereBB).not.toBeNull()
    expect(ulBB).not.toBeNull()
    // Primary CTA appears above the bullet list
    expect(startHereBB!.y).toBeLessThan(ulBB!.y)
  })
})

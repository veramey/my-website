import { test, expect } from '@playwright/test'

test.describe('Start Here cards href fix (#65)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Card #1 links to specific tools article', async ({ page }) => {
    const card1 = page.locator('a[href="/tools/best-ai-tools-small-agencies"]').first()
    await expect(card1).toBeVisible()
  })

  test('Card #2 links to specific guides article', async ({ page }) => {
    const card2 = page.locator('a[href="/guides/automate-client-onboarding-small-agency"]').first()
    await expect(card2).toBeVisible()
  })

  test('Card #3 href remains unchanged', async ({ page }) => {
    const card3 = page.locator('a[href="/templates/client-onboarding-ai-checklist"]').first()
    await expect(card3).toBeVisible()
  })

  test('No Start Here card links to section root /tools', async ({ page }) => {
    const startHereSection = page.getByRole('heading', { name: 'Start Here' }).locator('../..')
    const rootToolsLink = startHereSection.locator('a[href="/tools"]')
    await expect(rootToolsLink).toHaveCount(0)
  })

  test('No Start Here card links to section root /guides', async ({ page }) => {
    const startHereSection = page.getByRole('heading', { name: 'Start Here' }).locator('../..')
    const rootGuidesLink = startHereSection.locator('a[href="/guides"]')
    await expect(rootGuidesLink).toHaveCount(0)
  })

  test('Clicking Card #1 navigates to the correct page', async ({ page }) => {
    await page.click('a[href="/tools/best-ai-tools-small-agencies"]')
    await expect(page).toHaveURL('/tools/best-ai-tools-small-agencies')
  })
})

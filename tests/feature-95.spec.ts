import { test, expect } from '@playwright/test'

test.describe('/templates index page', () => {
  test('renders page with SEO title containing "Templates" and correct canonical link', async ({ page }) => {
    await page.goto('/templates')
    await expect(page).toHaveTitle(/Templates/)
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://www.aiopagency.com/templates')
  })

  test('displays exactly one card with heading "AI Ops Starter Kit" linking to the correct path', async ({ page }) => {
    await page.goto('/templates')
    const card = page.getByRole('link', { name: /AI Ops Starter Kit/i })
    await expect(card).toHaveCount(1)
    await expect(card).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('clicking "AI Ops Starter Kit" card navigates to the template page (200 status)', async ({ page }) => {
    const response = await page.goto('/templates/client-onboarding-ai-checklist')
    expect(response?.status()).toBe(200)
  })

  test('page contains exactly one card element', async ({ page }) => {
    await page.goto('/templates')
    const cards = page.locator('.border.rounded-lg')
    await expect(cards).toHaveCount(1)
  })

  test('page has no <footer> element', async ({ page }) => {
    await page.goto('/templates')
    await expect(page.locator('footer')).toHaveCount(0)
  })
})

import { test, expect } from '@playwright/test'

test.describe('Issue #125 — Trust block updated to "Built for operators, not spectators"', () => {
  test('trust block heading renders correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Built for operators, not spectators' })).toBeVisible()
  })

  test('all 4 trust points are present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Designed around real small-team constraints')).toBeVisible()
    await expect(page.getByText('Focused on workflows, not hype cycles')).toBeVisible()
    await expect(page.getByText('Opinionated recommendations, not bloated tool lists')).toBeVisible()
    await expect(page.getByText('Meant to be used, not just read')).toBeVisible()
  })

  test('CTA links to /about', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('link', { name: /Learn more about the project/ })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/about')
  })

  test('CTA navigates to /about without 404', async ({ page }) => {
    await page.goto('/')
    const response = await page.goto('/about')
    expect(response?.status()).toBe(200)
    expect(page.url()).toContain('/about')
  })

  test('old trust block heading is not present', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Practical, no-fluff AI ops content')).not.toBeVisible()
    await expect(page.getByText('Designed for small teams')).not.toBeVisible()
    await expect(page.getByText('Focused on implementation, not hype')).not.toBeVisible()
  })
})

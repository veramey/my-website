import { test, expect } from '@playwright/test'

test.describe('/guides — Coming next block (issue #224)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides')
  })

  test('"Coming next" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Coming next' })).toBeVisible()
  })

  test('Coming next section contains exactly four list items with correct titles', async ({ page }) => {
    await expect(page.getByText('Proposal workflow guide')).toBeVisible()
    await expect(page.getByText('SOP writing workflow guide')).toBeVisible()
    await expect(page.getByText('Internal reporting system guide')).toBeVisible()
    await expect(page.getByText('Client follow-up automation guide')).toBeVisible()

    const items = page.locator('ul').filter({ hasText: 'Proposal workflow guide' }).locator('li')
    await expect(items).toHaveCount(4)
  })

  test('"Join newsletter for new guides" link points to /newsletter', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Join newsletter for new guides' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/newsletter')
  })

  test('Coming next section appears after existing guide content', async ({ page }) => {
    const main = page.locator('main')
    const sections = main.locator('section')
    const count = await sections.count()
    // The Coming next section is the last section
    const lastSection = sections.nth(count - 1)
    await expect(lastSection.getByRole('heading', { name: 'Coming next' })).toBeVisible()
  })

  test('Coming next section is fully visible on mobile viewport without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/guides')

    const heading = page.getByRole('heading', { name: 'Coming next' })
    await expect(heading).toBeVisible()
    await expect(page.getByText('Proposal workflow guide')).toBeVisible()
    await expect(page.getByText('Client follow-up automation guide')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Join newsletter for new guides' })).toBeVisible()
  })
})

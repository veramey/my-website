import { test, expect } from '@playwright/test'

test.describe('Coming Next block on /guides', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides')
  })

  test('"Coming next" section renders with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Coming next' })).toBeVisible()
  })

  test('all four upcoming guide titles are listed', async ({ page }) => {
    const section = page.locator('section').filter({ hasText: 'Coming next' })
    const items = section.locator('ul li')
    await expect(items).toHaveCount(4)
    await expect(items.nth(0)).toHaveText('Proposal workflow guide')
    await expect(items.nth(1)).toHaveText('SOP writing workflow guide')
    await expect(items.nth(2)).toHaveText('Internal reporting system guide')
    await expect(items.nth(3)).toHaveText('Client follow-up automation guide')
  })

  test('newsletter CTA link is present and points to /newsletter', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Join newsletter for new guides' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/newsletter')
  })

  test('"Coming next" section appears after existing guide content', async ({ page }) => {
    const main = page.locator('main')
    const sections = main.locator('section')
    const count = await sections.count()
    // The Coming Next section must be the last section in main
    const lastSection = sections.nth(count - 1)
    await expect(lastSection.getByRole('heading', { name: 'Coming next' })).toBeVisible()
  })

  test('newsletter CTA navigates to /newsletter via client-side routing', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Join newsletter for new guides' })
    await link.click()
    await expect(page).toHaveURL('/newsletter')
  })
})

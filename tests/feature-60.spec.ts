import { test, expect } from '@playwright/test'

test.describe('Start Here cards — correct hrefs (issue #60)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('card 01 links to /tools/best-ai-tools-small-agencies', async ({ page }) => {
    const link = page.getByRole('link', { name: /best ai tools for small agencies/i })
    await expect(link).toHaveAttribute('href', '/tools/best-ai-tools-small-agencies')
  })

  test('card 02 links to /guides/automate-client-onboarding-small-agency', async ({ page }) => {
    const link = page.getByRole('link', { name: /how to automate client onboarding/i })
    await expect(link).toHaveAttribute('href', '/guides/automate-client-onboarding-small-agency')
  })

  test('card 03 links to /templates/client-onboarding-ai-checklist', async ({ page }) => {
    const link = page.getByRole('link', { name: /ai ops starter kit/i })
    await expect(link).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('no card still points to section roots /tools, /guides, or /newsletter', async ({ page }) => {
    await expect(page.locator('a[href="/tools"]')).toHaveCount(0)
    await expect(page.locator('a[href="/guides"]')).toHaveCount(0)
    await expect(page.locator('a[href="/newsletter"]')).toHaveCount(0)
  })

  test('card titles and numbering are unchanged', async ({ page }) => {
    await expect(page.getByText('01')).toBeVisible()
    await expect(page.getByText('02')).toBeVisible()
    await expect(page.getByText('03')).toBeVisible()
    await expect(page.getByText(/best ai tools for small agencies/i)).toBeVisible()
    await expect(page.getByText(/how to automate client onboarding/i)).toBeVisible()
    await expect(page.getByText(/ai ops starter kit/i)).toBeVisible()
  })

  test('card 01 navigates to the tools article (HTTP 200)', async ({ page }) => {
    await page.getByRole('link', { name: /best ai tools for small agencies/i }).click()
    await expect(page).toHaveURL('/tools/best-ai-tools-small-agencies')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('card 02 navigates to the guides article (HTTP 200)', async ({ page }) => {
    await page.getByRole('link', { name: /how to automate client onboarding/i }).click()
    await expect(page).toHaveURL('/guides/automate-client-onboarding-small-agency')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('card 03 navigates to the template page (HTTP 200)', async ({ page }) => {
    await page.getByRole('link', { name: /ai ops starter kit/i }).click()
    await expect(page).toHaveURL('/templates/client-onboarding-ai-checklist')
    await expect(page.locator('h1')).toBeVisible()
  })
})

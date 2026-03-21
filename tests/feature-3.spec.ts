import { test, expect } from '@playwright/test'

test.describe('Newsletter page (/newsletter)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/newsletter')
  })

  test('renders page title and headline', async ({ page }) => {
    await expect(page).toHaveTitle(/Newsletter/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Weekly AI systems for small agencies')
  })

  test('renders subheadline', async ({ page }) => {
    await expect(page.getByText('Practical workflows, tools and templates to help lean teams automate delivery and internal ops.')).toBeVisible()
  })

  test('renders what you get benefits', async ({ page }) => {
    await expect(page.getByText('1 practical workflow')).toBeVisible()
    await expect(page.getByText('1 tool recommendation')).toBeVisible()
    await expect(page.getByText('1 useful template or idea')).toBeVisible()
    await expect(page.getByText('No hype, no AI spam')).toBeVisible()
  })

  test('renders signup form with accessible label', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Join the newsletter' })).toBeVisible()
    await expect(page.getByLabel('Email address')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Join the newsletter' })).toBeVisible()
  })

  test('shows success message after form submission', async ({ page }) => {
    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the newsletter' }).click()
    await expect(page.getByText("You're in.")).toBeVisible()
    await expect(page.getByText('Thanks for subscribing. First issue coming your way soon.')).toBeVisible()
  })

  test('hides form after successful submission', async ({ page }) => {
    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the newsletter' }).click()
    await expect(page.getByLabel('Email address')).not.toBeVisible()
  })

  test('nav is present on the page', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('link', { name: 'AI Ops Agency' })).toBeVisible()
  })
})

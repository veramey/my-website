import { test, expect } from '@playwright/test'

const PAGE = '/tools/best-ai-meeting-assistants-agencies'

test('page renders with correct title and meta description', async ({ page }) => {
  await page.goto(PAGE)

  const title = await page.title()
  expect(title).toContain('AI Meeting Assistants')

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')
  expect(description).toBeTruthy()
  expect(description!.length).toBeLessThanOrEqual(160)
})

test('page has category label and main heading', async ({ page }) => {
  await page.goto(PAGE)

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByText('Tools', { exact: true })).toBeVisible()
})

test('all four tools are present as section headings', async ({ page }) => {
  await page.goto(PAGE)

  await expect(page.getByRole('heading', { name: /Fathom/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Fireflies/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Otter/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Grain/i })).toBeVisible()
})

test('tool callout blocks appear for each tool', async ({ page }) => {
  await page.goto(PAGE)

  const callouts = page.locator('.bg-gray-50.border.border-gray-100.rounded-lg.p-5')
  await expect(callouts).toHaveCount(4)

  for (let i = 0; i < 4; i++) {
    await expect(callouts.nth(i)).toBeVisible()
  }
})

test('each tool callout contains pricing and best-for info', async ({ page }) => {
  await page.goto(PAGE)

  const pricingItems = page.getByText(/Pricing:/i)
  const count = await pricingItems.count()
  expect(count).toBe(4)

  const bestForItems = page.getByText(/Best for:/i)
  const bestForCount = await bestForItems.count()
  expect(bestForCount).toBe(4)
})

test('internal link to onboarding guide is present and descriptive', async ({ page }) => {
  await page.goto(PAGE)

  const link = page.locator('a[href="/guides/automate-client-onboarding-small-agency"]')
  await expect(link).toBeVisible()

  const text = await link.textContent()
  expect(text!.length).toBeGreaterThan(4)
  expect(text?.toLowerCase().trim()).not.toBe('here')
  expect(text?.toLowerCase().trim()).not.toBe('click here')

  await expect(link).toHaveClass(/text-blue-600/)
  await expect(link).toHaveClass(/underline/)
})

test('navigation is present on the page', async ({ page }) => {
  await page.goto(PAGE)

  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Start Here' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Guides' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Tools' })).toBeVisible()
})

import { test, expect } from '@playwright/test'

test.describe('Best AI Tools article (/tools/best-ai-tools-small-agencies)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies')
  })

  test('renders page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Best AI Tools for Small Agencies/)
  })

  test('renders h1 heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Best AI Tools for Small Agencies')
  })

  test('renders category label', async ({ page }) => {
    await expect(page.getByText('Tools', { exact: true })).toBeVisible()
  })

  test('renders intro paragraph', async ({ page }) => {
    await expect(page.getByText(/Small agencies don/)).toBeVisible()
  })

  test('renders Meeting Assistants section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Meeting Assistants' })).toBeVisible()
    await expect(page.getByText(/Fireflies\.ai/)).toBeVisible()
    await expect(page.getByText(/Fathom/)).toBeVisible()
  })

  test('renders Writing and Drafting section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Writing and Drafting' })).toBeVisible()
    await expect(page.getByText(/Claude \(Anthropic\)/)).toBeVisible()
  })

  test('renders Client Onboarding section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Client Onboarding' })).toBeVisible()
    await expect(page.getByText(/Tally/)).toBeVisible()
    await expect(page.getByText(/Typeform/)).toBeVisible()
  })

  test('renders SOPs section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SOPs and Internal Documentation' })).toBeVisible()
    await expect(page.getByText(/Notion/)).toBeVisible()
  })

  test('renders Workflow Automation section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Workflow Automation' })).toBeVisible()
    await expect(page.getByText(/Make/)).toBeVisible()
    await expect(page.getByText(/Zapier/)).toBeVisible()
  })

  test('renders How to Choose section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'How to Choose Your Stack' })).toBeVisible()
  })

  test('internal link to automate onboarding guide is present', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'how to automate client onboarding for a small agency' })).toBeVisible()
  })

  test('nav is present on the page', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible()
  })
})

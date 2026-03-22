import { test, expect } from '@playwright/test'

const PAGE = '/templates/client-onboarding-ai-checklist'

test.describe('Issue #48 — /templates/client-onboarding-ai-checklist', () => {
  test('all six sections render on page load', async ({ page }) => {
    await page.goto(PAGE)

    // Section 1 — Hero
    await expect(page.getByRole('heading', { name: /AI Ops Starter Kit/i, level: 1 })).toBeVisible()

    // Section 2 — Problem
    await expect(page.getByText(/what problem it solves/i)).toBeVisible()

    // Section 3 — Audience
    await expect(page.getByText(/who it.?s for/i)).toBeVisible()

    // Section 4 — What's inside (eyebrow label)
    await expect(page.getByText(/what.?s inside/i)).toBeVisible()
    await expect(page.getByText(/10 workflow templates/i)).toBeVisible()
    await expect(page.getByText(/starter tool stack/i)).toBeVisible()
    await expect(page.getByText(/onboarding checklist/i)).toBeVisible()
    await expect(page.getByText(/SOP prompt pack/i)).toBeVisible()

    // Section 5 — How to use it
    await expect(page.getByText(/how to use it/i)).toBeVisible()

    // Section 6 — Download CTA
    await expect(page.getByRole('heading', { name: /Get the AI Ops Starter Kit/i })).toBeVisible()
  })

  test('download CTA form shows confirmation without page reload', async ({ page }) => {
    await page.goto(PAGE)

    const urlBefore = page.url()

    await page.getByLabel(/email address/i).fill('test@example.com')
    await page.getByRole('button', { name: /download free/i }).click()

    await expect(page.getByText(/thank you/i)).toBeVisible()
    expect(page.url()).toBe(urlBefore)
  })

  test('<Head> contains all required SEO tags', async ({ page }) => {
    await page.goto(PAGE)

    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)

    await expect(page.locator('meta[name="description"]')).toHaveCount(1)
    await expect(page.locator('meta[name="viewport"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1)

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveCount(1)
    const href = await canonical.getAttribute('href')
    expect(href).toMatch(/\/templates\/client-onboarding-ai-checklist$/)
  })

  test('email input enforces required validation — empty submit does not show confirmation', async ({ page }) => {
    await page.goto(PAGE)

    // Submit without filling in email
    await page.getByRole('button', { name: /download free/i }).click()

    // Success message must not appear
    await expect(page.getByText(/thank you/i)).not.toBeVisible()
  })

  test('email input is accessible via label', async ({ page }) => {
    await page.goto(PAGE)

    // Confirm label links to the input
    const label = page.locator('label[for="download-email"]')
    await expect(label).toBeVisible()

    const input = page.locator('#download-email')
    await expect(input).toHaveAttribute('type', 'email')
  })
})

import { test, expect } from '@playwright/test'

// Happy path: guide detail pages show reading time and audience label from guides.ts
test.describe('Guide metadata — readingTime and whoItIsFor on detail pages', () => {
  test('automate-client-onboarding: shows reading time', async ({ page }) => {
    await page.goto('/guides/automate-client-onboarding-small-agency')
    await expect(page.getByText('7\u201310 min')).toBeVisible()
  })

  test('automate-client-onboarding: shows who it is for', async ({ page }) => {
    await page.goto('/guides/automate-client-onboarding-small-agency')
    await expect(page.getByText('For: agency founders and ops leads')).toBeVisible()
  })

  test('discovery-call-to-proposal: shows reading time', async ({ page }) => {
    await page.goto('/guides/discovery-call-to-proposal-workflow-agency')
    await expect(page.getByText('6\u20138 min')).toBeVisible()
  })

  test('discovery-call-to-proposal: shows who it is for', async ({ page }) => {
    await page.goto('/guides/discovery-call-to-proposal-workflow-agency')
    await expect(page.getByText('For: agency founders and account managers')).toBeVisible()
  })

  test('7-workflows: shows reading time', async ({ page }) => {
    await page.goto('/guides/7-workflows-automate-small-agency')
    await expect(page.getByText('8\u201310 min')).toBeVisible()
  })

  test('7-workflows: shows who it is for', async ({ page }) => {
    await page.goto('/guides/7-workflows-automate-small-agency')
    await expect(page.getByText('For: small agency operators')).toBeVisible()
  })
})

// Happy path: guides index shows reading time badge and audience label on cards
test('guides index: at least one card shows reading time and For: label', async ({ page }) => {
  await page.goto('/guides')
  await expect(page.getByText('7\u201310 min').first()).toBeVisible()
  await expect(page.getByText('For: agency founders and ops leads').first()).toBeVisible()
})

// Edge case: reading time values use en-dash (–) not hyphen (-)
test.describe('Reading time uses en-dash, not hyphen', () => {
  test('automate-client-onboarding: reading time has en-dash', async ({ page }) => {
    await page.goto('/guides/automate-client-onboarding-small-agency')
    // Exact string "7–10 min" with en-dash U+2013
    await expect(page.getByText('7\u201310 min', { exact: true })).toBeVisible()
  })

  test('discovery-call-to-proposal: reading time has en-dash', async ({ page }) => {
    await page.goto('/guides/discovery-call-to-proposal-workflow-agency')
    await expect(page.getByText('6\u20138 min', { exact: true })).toBeVisible()
  })

  test('7-workflows: reading time has en-dash', async ({ page }) => {
    await page.goto('/guides/7-workflows-automate-small-agency')
    await expect(page.getByText('8\u201310 min', { exact: true })).toBeVisible()
  })
})

// Edge case: metadata elements are not empty when values are present
test.describe('No empty metadata placeholder elements', () => {
  test('automate-client-onboarding: metadata spans are non-empty', async ({ page }) => {
    await page.goto('/guides/automate-client-onboarding-small-agency')
    // Both spans must have non-empty text content
    const readingTimeSpan = page.getByText('7\u201310 min', { exact: true })
    const audienceSpan = page.getByText('For: agency founders and ops leads', { exact: true })
    await expect(readingTimeSpan).not.toBeEmpty()
    await expect(audienceSpan).not.toBeEmpty()
  })
})

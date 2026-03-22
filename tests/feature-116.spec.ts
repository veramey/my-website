import { test, expect } from '@playwright/test'

test.describe('Issue #116 — Phase 2 guide articles registered in guides.ts', () => {
  test('discovery-call article card appears under "Delivery & Client Work" with correct description', async ({ page }) => {
    await page.goto('/guides')
    const section = page.locator('section').filter({ hasText: 'Delivery & Client Work' })
    await expect(section.getByRole('heading', { name: 'How to Turn Discovery Calls into Proposals with AI' })).toBeVisible()
    await expect(section.getByText('discovery call recording to polished proposal in under 45 minutes')).toBeVisible()
  })

  test('7-workflows article card appears under "Internal Operations" with correct description', async ({ page }) => {
    await page.goto('/guides')
    const section = page.locator('section').filter({ hasText: 'Internal Operations' })
    await expect(section.getByRole('heading', { name: '7 Workflows Every Small Agency Should Automate with AI' })).toBeVisible()
    await expect(section.getByText('7 highest-ROI automations for small agencies')).toBeVisible()
  })

  test('clicking the discovery-call card navigates to the guide page with an h1', async ({ page }) => {
    await page.goto('/guides')
    await page.getByRole('heading', { name: 'How to Turn Discovery Calls into Proposals with AI' }).click()
    await expect(page).toHaveURL('/guides/discovery-call-to-proposal-workflow-agency')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('clicking the 7-workflows card navigates to the guide page with an h1', async ({ page }) => {
    await page.goto('/guides')
    await page.getByRole('heading', { name: '7 Workflows Every Small Agency Should Automate with AI' }).click()
    await expect(page).toHaveURL('/guides/7-workflows-automate-small-agency')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('"Delivery & Client Work" section appears before "Internal Operations" in the DOM', async ({ page }) => {
    await page.goto('/guides')
    const deliveryIndex = await page.locator('h2').evaluateAll((headings) =>
      headings.findIndex((h) => h.textContent?.includes('Delivery & Client Work'))
    )
    const internalIndex = await page.locator('h2').evaluateAll((headings) =>
      headings.findIndex((h) => h.textContent?.includes('Internal Operations'))
    )
    expect(deliveryIndex).toBeGreaterThanOrEqual(0)
    expect(internalIndex).toBeGreaterThanOrEqual(0)
    expect(deliveryIndex).toBeLessThan(internalIndex)
  })

  test('new guide cards have correct href attributes', async ({ page }) => {
    await page.goto('/guides')
    const discoveryLink = page.locator('a[href="/guides/discovery-call-to-proposal-workflow-agency"]')
    const workflowsLink = page.locator('a[href="/guides/7-workflows-automate-small-agency"]')
    await expect(discoveryLink).toBeVisible()
    await expect(workflowsLink).toBeVisible()
  })
})

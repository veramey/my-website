import { test, expect } from '@playwright/test'

const PAGE = '/guides/automate-client-onboarding-small-agency'
const METADATA_TEXT = '7–10 min read · For: 2–10 person agencies'

test.describe('Issue #167 — Reading time metadata row in onboarding guide header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE)
  })

  test('reading time metadata row is visible in the article header', async ({ page }) => {
    const header = page.locator('header')
    const metadata = header.getByText(METADATA_TEXT)
    await expect(metadata).toBeVisible()
  })

  test('metadata row appears after the subheadline', async ({ page }) => {
    const header = page.locator('header')
    const paragraphs = header.locator('p')
    const count = await paragraphs.count()
    expect(count).toBeGreaterThanOrEqual(2)

    // The last paragraph should be the metadata row
    const lastP = paragraphs.nth(count - 1)
    await expect(lastP).toHaveText(METADATA_TEXT)

    // At least one paragraph before it (the subheadline) should exist
    const secondToLast = paragraphs.nth(count - 2)
    const text = await secondToLast.textContent()
    expect(text).not.toBe(METADATA_TEXT)
  })

  test('metadata row has correct styling classes', async ({ page }) => {
    const header = page.locator('header')
    const metadata = header.getByText(METADATA_TEXT)
    await expect(metadata).toHaveClass(/mt-3/)
    await expect(metadata).toHaveClass(/text-sm/)
    await expect(metadata).toHaveClass(/text-gray-400/)
  })

  test('existing header content is unchanged', async ({ page }) => {
    const header = page.locator('header')
    await expect(header.getByRole('heading', { level: 1 })).toContainText(
      'How to Automate Client Onboarding for a Small Agency'
    )
    await expect(
      header.getByText(/Most small agencies waste hours every time they onboard a new client/)
    ).toBeVisible()
  })

  test('metadata row does not appear outside the header', async ({ page }) => {
    // Count occurrences inside header
    const inHeader = page.locator('header').getByText(METADATA_TEXT)
    await expect(inHeader).toHaveCount(1)

    // Count occurrences on entire page — should only be the one inside header
    const allOccurrences = page.getByText(METADATA_TEXT, { exact: true })
    await expect(allOccurrences).toHaveCount(1)
  })
})

import { test, expect } from '@playwright/test'

test.describe('/guides — readingTime and whoItIsFor metadata on guide cards (issue #223)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides')
  })

  test('at least one guide card displays readingTime as a span with text-xs text-gray-400', async ({ page }) => {
    const readingTimeSpan = page.locator('span.text-xs.text-gray-400').filter({ hasText: /min/ }).first()
    await expect(readingTimeSpan).toBeVisible()
    const text = await readingTimeSpan.textContent()
    expect(text?.trim().length).toBeGreaterThan(0)
  })

  test('at least one guide card displays whoItIsFor as a span with text-xs text-gray-400', async ({ page }) => {
    const whoItIsForSpan = page.locator('span.text-xs.text-gray-400').filter({ hasText: /For:/ }).first()
    await expect(whoItIsForSpan).toBeVisible()
    const text = await whoItIsForSpan.textContent()
    expect(text?.trim().length).toBeGreaterThan(0)
  })

  test('metadata row appears below description within each guide card', async ({ page }) => {
    const firstCard = page.locator('a.group').first()

    const description = firstCard.locator('p.text-sm.text-gray-500')
    const metadataRow = firstCard.locator('div.flex.gap-3.mt-3')

    await expect(description).toBeVisible()
    await expect(metadataRow).toBeVisible()

    // Assert DOM order: description precedes the metadata row
    const descBox = await description.boundingBox()
    const metaBox = await metadataRow.boundingBox()
    expect(descBox!.y).toBeLessThan(metaBox!.y)
  })

  test('no empty spans with text-xs text-gray-400 exist inside metadata rows', async ({ page }) => {
    const metadataSpans = page.locator('div.flex.gap-3.mt-3 span.text-xs.text-gray-400')
    const count = await metadataSpans.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const text = await metadataSpans.nth(i).textContent()
      expect(text?.trim().length).toBeGreaterThan(0)
    }
  })

  test('guide detail page does not contain the flex gap-3 mt-3 metadata row', async ({ page }) => {
    await page.goto('/guides/automate-client-onboarding-small-agency')
    const metadataRow = page.locator('div.flex.gap-3.mt-3')
    await expect(metadataRow).toHaveCount(0)
  })
})

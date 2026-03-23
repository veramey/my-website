import { test, expect } from '@playwright/test'

const PAGE_URL = '/templates/client-onboarding-ai-checklist'

test.describe('Block 8 — FAQ section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL)
  })

  test('FAQ section renders all 5 Q&A pairs', async ({ page }) => {
    const dl = page.locator('dl')
    await expect(dl).toBeVisible()

    const dts = dl.locator('dt')
    const dds = dl.locator('dd')
    await expect(dts).toHaveCount(5)
    await expect(dds).toHaveCount(5)

    await expect(dts.first()).toBeVisible()
    const firstDtText = await dts.first().textContent()
    expect(firstDtText).toBeTruthy()
    expect(firstDtText!.trim().length).toBeGreaterThan(0)
  })

  test('FAQ section has bg-gray-50 background', async ({ page }) => {
    const faqSection = page.locator('section.bg-gray-50').filter({ has: page.locator('dl') })
    await expect(faqSection).toBeVisible()
    await expect(faqSection).toHaveClass(/bg-gray-50/)
  })

  test('"Download free" CTA in FAQ section links to #download-form', async ({ page }) => {
    const faqSection = page.locator('section.bg-gray-50').filter({ has: page.locator('dl') })
    const cta = faqSection.locator('a[href="#download-form"]')
    await expect(cta).toBeVisible()
    await expect(cta).toHaveText('Download free')
    await expect(cta).toHaveClass(/bg-gray-900/)
    await expect(cta).toHaveClass(/text-white/)
  })

  test('FAQ item styling is applied correctly — no accordion markup', async ({ page }) => {
    const dl = page.locator('dl')
    const items = dl.locator('div')
    await expect(items).toHaveCount(5)

    // Check first item classes
    const firstItem = items.first()
    await expect(firstItem).toHaveClass(/border-t/)
    await expect(firstItem).toHaveClass(/border-gray-100/)
    await expect(firstItem).toHaveClass(/py-5/)

    // Check dt and dd classes on first item
    const firstDt = firstItem.locator('dt')
    await expect(firstDt).toHaveClass(/text-sm/)
    await expect(firstDt).toHaveClass(/font-semibold/)
    await expect(firstDt).toHaveClass(/text-gray-900/)
    await expect(firstDt).toHaveClass(/mb-1/)

    const firstDd = firstItem.locator('dd')
    await expect(firstDd).toHaveClass(/text-sm/)
    await expect(firstDd).toHaveClass(/text-gray-500/)

    // No accordion elements
    await expect(page.locator('details')).toHaveCount(0)
    await expect(page.locator('summary')).toHaveCount(0)
  })

  test('"Download free" CTA scrolls email capture form into view', async ({ page }) => {
    const faqSection = page.locator('section.bg-gray-50').filter({ has: page.locator('dl') })
    const cta = faqSection.locator('a[href="#download-form"]')
    await cta.click()

    const downloadForm = page.locator('#download-form')
    await expect(downloadForm).toBeVisible()
    await expect(downloadForm).toBeInViewport()
  })
})

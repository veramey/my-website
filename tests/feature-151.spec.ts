import { test, expect } from '@playwright/test'

const PAGE = '/templates/client-onboarding-ai-checklist'

test.describe('Issue #151 — Block 8 (FAQ) and Block 9 (Final CTA)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE)
  })

  test('FAQ block renders all 5 Q&A pairs', async ({ page }) => {
    const dl = page.locator('dl')
    await expect(dl).toBeVisible()
    const dts = dl.locator('dt')
    const dds = dl.locator('dd')
    await expect(dts).toHaveCount(5)
    await expect(dds).toHaveCount(5)
  })

  test('FAQ "Download free" CTA links to #download-form', async ({ page }) => {
    const faqSection = page.locator('section.bg-gray-50').filter({ has: page.locator('dl') })
    const cta = faqSection.getByRole('link', { name: 'Download free' })
    await expect(cta).toHaveAttribute('href', '#download-form')
  })

  test('Final CTA block renders correct heading and subtext', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Download the AI Ops Starter Kit' })).toBeVisible()
    await expect(page.getByText('Turn your onboarding from improvised to repeatable.')).toBeVisible()
  })

  test('Final CTA "Download free" button has correct styling classes and href', async ({ page }) => {
    const finalCtaSection = page.locator('section.bg-white').filter({
      has: page.getByRole('heading', { name: 'Download the AI Ops Starter Kit' }),
    })
    const btn = finalCtaSection.getByRole('link', { name: 'Download free' })
    await expect(btn).toHaveAttribute('href', '#download-form')
    await expect(btn).toHaveClass(/px-6/)
    await expect(btn).toHaveClass(/py-3/)
    await expect(btn).toHaveClass(/bg-gray-900/)
    await expect(btn).toHaveClass(/text-white/)
    await expect(btn).toHaveClass(/text-base/)
    await expect(btn).toHaveClass(/font-medium/)
    await expect(btn).toHaveClass(/rounded/)
    await expect(btn).toHaveClass(/hover:bg-gray-700/)
    await expect(btn).toHaveClass(/transition-colors/)
  })

  test('FAQ section has bg-gray-50 and Final CTA section has bg-white', async ({ page }) => {
    const faqSection = page.locator('section').filter({ has: page.locator('dl') })
    await expect(faqSection).toHaveClass(/bg-gray-50/)

    const finalCtaSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Download the AI Ops Starter Kit' }),
    })
    await expect(finalCtaSection).toHaveClass(/bg-white/)
  })

  test('email capture section has id="download-form"', async ({ page }) => {
    const downloadSection = page.locator('#download-form')
    await expect(downloadSection).toBeAttached()
  })
})

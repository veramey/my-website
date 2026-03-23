import { test, expect } from '@playwright/test'

const PAGE = '/templates/client-onboarding-ai-checklist'

test.describe('Block 7 — Asset Preview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE)
  })

  test('renders section label "What\'s in the package"', async ({ page }) => {
    const label = page.getByText("What's in the package")
    await expect(label).toBeVisible()
    await expect(label).toHaveClass(/text-xs/)
    await expect(label).toHaveClass(/font-semibold/)
    await expect(label).toHaveClass(/text-gray-400/)
    await expect(label).toHaveClass(/uppercase/)
    await expect(label).toHaveClass(/tracking-widest/)
  })

  test('renders at least 2 asset cards each with label and format text', async ({ page }) => {
    // Scope to Block 7 section (contains the "What's in the package" label)
    const block7 = page.locator('section').filter({ hasText: "What's in the package" })
    const cards = block7.locator('.border-t-2.border-gray-900')
    await expect(cards).toHaveCount(4)

    // Each card should show both label and format
    await expect(block7.getByText('10 workflow templates')).toBeVisible()
    await expect(block7.getByText('Google Docs / Notion')).toBeVisible()
    await expect(block7.getByText('Onboarding checklist')).toBeVisible()
    await expect(block7.getByText('PDF + editable doc')).toBeVisible()
  })

  test('supporting copy paragraphs are present', async ({ page }) => {
    await expect(page.getByText('Ready to use in Notion, Google Docs, or any workspace')).toBeVisible()
    await expect(page.getByText('Most teams get their first workflow running in under an hour')).toBeVisible()
  })

  test('CTA "Get the full package" links to #download-form and scrolls to email form', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Get the full package' })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#download-form')
    await cta.click()
    await expect(page.locator('#download-form')).toBeInViewport()
  })

  test('Block 6 precedes Block 7 which precedes #download-form in DOM order', async ({ page }) => {
    const block6 = page.locator('section.bg-gray-50').filter({ hasText: "What you'll get out of it" })
    const block7 = page.locator('section').filter({ hasText: "What's in the package" }).first()
    const emailCapture = page.locator('#download-form')

    const block6Box = await block6.boundingBox()
    const block7Box = await block7.boundingBox()
    const emailBox = await emailCapture.boundingBox()

    expect(block6Box!.y).toBeLessThan(block7Box!.y)
    expect(block7Box!.y).toBeLessThan(emailBox!.y)
  })
})

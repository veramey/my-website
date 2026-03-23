import { test, expect } from '@playwright/test'

const PAGE = '/templates/client-onboarding-ai-checklist'

test.describe('Block 6 — Expected Outcomes', () => {
  test('renders correct heading and outcome list items', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}${PAGE}`)

    const heading = page.getByText('After using this kit, you should be able to:')
    await expect(heading).toBeVisible()

    const ul = page.locator('ul').filter({ has: page.locator('li') }).first()
    const items = ul.locator('li')
    await expect(items).toHaveCount(5)

    // Each li has a bullet span and body text
    const firstItem = items.nth(0)
    await expect(firstItem.locator('span').first()).toBeVisible()
    await expect(firstItem.locator('span').nth(1)).toBeVisible()
  })

  test('CTA "Download free" in Block 6 links to #download-form', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}${PAGE}`)

    // Find the "Download free" link inside the Expected Outcomes section
    const block6 = page.locator('section').filter({ hasText: 'After using this kit, you should be able to:' })
    const cta = block6.getByRole('link', { name: 'Download free' })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#download-form')
  })
})

test.describe('Block 7 — Asset Preview', () => {
  test('renders heading, format note, and time-to-value line', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}${PAGE}`)

    await expect(page.getByText("What's in the package")).toBeVisible()
    await expect(page.getByText('Ready to use in Notion, Google Docs, or any workspace')).toBeVisible()
    await expect(page.getByText('Most teams get their first workflow running in under an hour')).toBeVisible()
  })

  test('CTA "Get the full package" links to #download-form', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}${PAGE}`)

    const cta = page.getByRole('link', { name: 'Get the full package' })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#download-form')
  })

  test('asset cards use border-t-2 border-gray-900 pt-4 styling', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}${PAGE}`)

    const block7 = page.locator('section').filter({ hasText: "What's in the package" })
    const firstCard = block7.locator('.border-t-2.border-gray-900.pt-4').first()
    await expect(firstCard).toBeVisible()
  })
})

test.describe('Block ordering', () => {
  test('"How to use it" precedes Block 6 which precedes Block 7 in DOM order', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}${PAGE}`)

    const sections = page.locator('main section')
    const count = await sections.count()

    // Find indices by heading content
    let howToUseIndex = -1
    let block6Index = -1
    let block7Index = -1

    for (let i = 0; i < count; i++) {
      const text = await sections.nth(i).textContent()
      if (text?.includes('How to use it')) howToUseIndex = i
      if (text?.includes('After using this kit, you should be able to:')) block6Index = i
      if (text?.includes("What's in the package")) block7Index = i
    }

    expect(howToUseIndex).toBeGreaterThanOrEqual(0)
    expect(block6Index).toBeGreaterThanOrEqual(0)
    expect(block7Index).toBeGreaterThanOrEqual(0)
    expect(howToUseIndex).toBeLessThan(block6Index)
    expect(block6Index).toBeLessThan(block7Index)
  })
})

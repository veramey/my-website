import { test, expect } from '@playwright/test'

test.describe('Issue #47 — anchor id attributes on guides index subcategory sections', () => {
  test('section#onboarding exists and contains "Client Onboarding" heading', async ({ page }) => {
    await page.goto('/guides#onboarding')

    const section = page.locator('section#onboarding')
    await expect(section).toBeAttached()

    const heading = section.locator('h2')
    await expect(heading).toContainText('Client Onboarding')
  })

  test('section#internal-ops exists and contains "Internal Operations" heading', async ({ page }) => {
    await page.goto('/guides#internal-ops')

    const section = page.locator('section#internal-ops')
    await expect(section).toBeAttached()

    const heading = section.locator('h2')
    await expect(heading).toContainText('Internal Operations')
  })

  test('clicking "Client Onboarding & Delivery" pillar card navigates to /guides#onboarding with section visible', async ({ page }) => {
    await page.goto('/')

    const pillarLink = page.getByRole('link', { name: /Client Onboarding & Delivery/i })
    await pillarLink.click()

    await expect(page).toHaveURL(/\/guides#onboarding/)

    const section = page.locator('section#onboarding')
    await expect(section).toBeVisible()
  })

  test('"Delivery & Client Work" section renders without an id attribute', async ({ page }) => {
    await page.goto('/guides')

    const sections = page.locator('section')
    const count = await sections.count()

    let found = false
    for (let i = 0; i < count; i++) {
      const heading = sections.nth(i).locator('h2')
      const text = await heading.textContent()
      if (text && text.includes('Delivery & Client Work')) {
        const id = await sections.nth(i).getAttribute('id')
        expect(id).toBeNull()
        found = true
        break
      }
    }
    expect(found).toBe(true)
  })

  test('"Team Productivity" section renders without an id attribute', async ({ page }) => {
    await page.goto('/guides')

    const sections = page.locator('section')
    const count = await sections.count()

    let found = false
    for (let i = 0; i < count; i++) {
      const heading = sections.nth(i).locator('h2')
      const text = await heading.textContent()
      if (text && text.includes('Team Productivity')) {
        const id = await sections.nth(i).getAttribute('id')
        expect(id).toBeNull()
        found = true
        break
      }
    }
    expect(found).toBe(true)
  })

  test('section#internal-ops heading present with JavaScript disabled (SSR)', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()

    await page.goto('/guides#internal-ops')

    const section = page.locator('section#internal-ops')
    await expect(section).toBeAttached()

    const heading = section.locator('h2')
    await expect(heading).toContainText('Internal Operations')

    await context.close()
  })
})

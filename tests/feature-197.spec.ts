import { test, expect } from '@playwright/test'

test.describe('Newsletter page — issue #197', () => {
  test('#signup anchor resolves on the newsletter page', async ({ page }) => {
    await page.goto('/newsletter#signup')
    const signupSection = page.locator('#signup')
    await expect(signupSection).toBeVisible()
  })

  test('"Who It\'s For" section renders with correct text', async ({ page }) => {
    await page.goto('/newsletter')
    const text = 'This newsletter is for small agencies, operators, and service teams that want more leverage and less noise.'
    await expect(page.getByText(text, { exact: true })).toBeVisible()
  })

  test('"Who It\'s For" section has correct styling classes', async ({ page }) => {
    await page.goto('/newsletter')
    const text = 'This newsletter is for small agencies, operators, and service teams that want more leverage and less noise.'
    const section = page.locator('section', { has: page.getByText(text, { exact: true }) })
    await expect(section).toHaveClass(/bg-gray-50/)
    await expect(section).toHaveClass(/border-t/)
    await expect(section).toHaveClass(/border-gray-100/)
  })

  test('"Who It\'s For" section contains no CTA button or link', async ({ page }) => {
    await page.goto('/newsletter')
    const text = 'This newsletter is for small agencies, operators, and service teams that want more leverage and less noise.'
    const section = page.locator('section', { has: page.getByText(text, { exact: true }) })
    await expect(section.locator('a, button')).toHaveCount(0)
  })

  test('"Who It\'s For" section appears after "What You Get" section in DOM order', async ({ page }) => {
    await page.goto('/newsletter')
    const sections = page.locator('main section')
    const count = await sections.count()

    let whatYouGetIndex = -1
    let whoItsForIndex = -1

    for (let i = 0; i < count; i++) {
      const text = await sections.nth(i).textContent()
      if (text?.includes('What you get')) whatYouGetIndex = i
      if (text?.includes('This newsletter is for small agencies')) whoItsForIndex = i
    }

    expect(whatYouGetIndex).toBeGreaterThanOrEqual(0)
    expect(whoItsForIndex).toBeGreaterThan(whatYouGetIndex)
  })
})

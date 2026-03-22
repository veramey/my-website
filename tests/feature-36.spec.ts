import { test, expect } from '@playwright/test'

test.describe('Guides index anchor IDs (issue #36)', () => {
  test('section#onboarding exists on /guides', async ({ page }) => {
    await page.goto('/guides')
    const section = page.locator('section#onboarding')
    await expect(section).toBeAttached()
  })

  test('section#internal-ops exists on /guides', async ({ page }) => {
    await page.goto('/guides')
    const section = page.locator('section#internal-ops')
    await expect(section).toBeAttached()
  })

  test('homepage Client Onboarding pillar links to /guides#onboarding and scrolls to section', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: /Client Onboarding & Delivery/i })
    await expect(link).toHaveAttribute('href', '/guides#onboarding')
    await link.click()
    await page.waitForURL('**/guides#onboarding')
    const section = page.locator('section#onboarding')
    await expect(section).toBeAttached()
  })

  test('direct navigation to /guides#internal-ops lands on section#internal-ops', async ({ page }) => {
    await page.goto('/guides#internal-ops')
    const section = page.locator('section#internal-ops')
    await expect(section).toBeAttached()
    // Verify the section is near the top of the viewport after load
    const boundingBox = await section.boundingBox()
    expect(boundingBox).not.toBeNull()
    const scrollY = await page.evaluate(() => window.scrollY)
    const sectionTop = boundingBox!.y + scrollY
    // The scroll position should be within reasonable distance of the section
    expect(Math.abs(scrollY - sectionTop)).toBeLessThan(200)
  })

  test('mapped subcategory sections have non-empty id attributes', async ({ page }) => {
    await page.goto('/guides')
    const onboardingId = await page.locator('section#onboarding').getAttribute('id')
    const internalOpsId = await page.locator('section#internal-ops').getAttribute('id')
    expect(onboardingId).toBe('onboarding')
    expect(internalOpsId).toBe('internal-ops')
  })
})

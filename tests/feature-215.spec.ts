import { test, expect } from '@playwright/test'

test.describe('Newsletter page section order (issue #215)', () => {
  test('Who It\'s For precedes Sample Issues in DOM order', async ({ page }) => {
    await page.goto('/newsletter')

    const whoHeading = page.locator('h2:has-text("Who it\'s for")')
    const sampleHeading = page.locator('h2:has-text("Sample issues")')

    const whoBox = await whoHeading.boundingBox()
    const sampleBox = await sampleHeading.boundingBox()

    expect(whoBox).not.toBeNull()
    expect(sampleBox).not.toBeNull()
    expect(whoBox!.y).toBeLessThan(sampleBox!.y)
  })

  test('Full section order matches spec: What You Get → Who It\'s For → Sample Issues → Signup', async ({ page }) => {
    await page.goto('/newsletter')

    const whatHeading = page.locator('h2:has-text("What you get")')
    const whoHeading = page.locator('h2:has-text("Who it\'s for")')
    const sampleHeading = page.locator('h2:has-text("Sample issues")')
    const signupSection = page.locator('#signup')

    const whatBox = await whatHeading.boundingBox()
    const whoBox = await whoHeading.boundingBox()
    const sampleBox = await sampleHeading.boundingBox()
    const signupBox = await signupSection.boundingBox()

    expect(whatBox!.y).toBeLessThan(whoBox!.y)
    expect(whoBox!.y).toBeLessThan(sampleBox!.y)
    expect(sampleBox!.y).toBeLessThan(signupBox!.y)
  })

  test('Signup section remains after Sample Issues', async ({ page }) => {
    await page.goto('/newsletter')

    const sampleHeading = page.locator('h2:has-text("Sample issues")')
    const signupSection = page.locator('#signup')

    const sampleBox = await sampleHeading.boundingBox()
    const signupBox = await signupSection.boundingBox()

    expect(signupBox!.y).toBeGreaterThan(sampleBox!.y)
  })

  test('No duplicate or missing sections — exactly one of each heading', async ({ page }) => {
    await page.goto('/newsletter')

    await expect(page.locator('h2:has-text("What you get")')).toHaveCount(1)
    await expect(page.locator('h2:has-text("Who it\'s for")')).toHaveCount(1)
    await expect(page.locator('h2:has-text("Sample issues")')).toHaveCount(1)
  })

  test('Section order is correct on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/newsletter')

    const whoHeading = page.locator('h2:has-text("Who it\'s for")')
    const sampleHeading = page.locator('h2:has-text("Sample issues")')

    const whoBox = await whoHeading.boundingBox()
    const sampleBox = await sampleHeading.boundingBox()

    expect(whoBox!.y).toBeLessThan(sampleBox!.y)
  })
})

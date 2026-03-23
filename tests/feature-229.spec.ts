import { test, expect } from '@playwright/test'

const WHO_TEXT =
  'This newsletter is for small agencies, operators, and service teams that want more leverage and less noise.'

test.describe('Newsletter page — Who It\'s For block and signup anchor', () => {
  // Happy path: "Who It's For" block renders with correct text
  test('Who It\'s For block renders with correct text', async ({ page }) => {
    await page.goto('/newsletter')
    const section = page.locator('section.bg-gray-50.border-t.border-gray-100').filter({ hasText: WHO_TEXT })
    await expect(section).toBeVisible()
    await expect(section.locator('p').filter({ hasText: WHO_TEXT })).toBeVisible()
  })

  // Happy path: "Who It's For" block has no CTA
  test('Who It\'s For block has no CTA (no a, button, or submit)', async ({ page }) => {
    await page.goto('/newsletter')
    const section = page.locator('section.bg-gray-50.border-t.border-gray-100').filter({ hasText: WHO_TEXT })
    await expect(section.locator('a')).toHaveCount(0)
    await expect(section.locator('button')).toHaveCount(0)
    await expect(section.locator('[type="submit"]')).toHaveCount(0)
  })

  // Happy path: signup anchor resolves correctly
  test('section#signup exists and is present in DOM', async ({ page }) => {
    await page.goto('/newsletter#signup')
    const signupSection = page.locator('section#signup')
    await expect(signupSection).toBeAttached()
    await expect(signupSection).toBeVisible()
  })

  // Edge case: "Who It's For" block appears after "What You Get" section
  test('Who It\'s For block appears after What You Get section in DOM order', async ({ page }) => {
    await page.goto('/newsletter')
    const sections = page.locator('main section')
    const count = await sections.count()

    let whatYouGetIndex = -1
    let whoItsForIndex = -1

    for (let i = 0; i < count; i++) {
      const text = await sections.nth(i).innerText()
      if (text.includes('What you get') && whatYouGetIndex === -1) {
        whatYouGetIndex = i
      }
      if (text.includes(WHO_TEXT) && whoItsForIndex === -1) {
        whoItsForIndex = i
      }
    }

    expect(whatYouGetIndex).toBeGreaterThanOrEqual(0)
    expect(whoItsForIndex).toBeGreaterThan(whatYouGetIndex)
  })

  // Edge case: anchor link from external referral preserves #signup hash
  test('navigating to /newsletter#signup preserves the hash and section is present', async ({ page }) => {
    await page.goto('/newsletter#signup')
    expect(page.url()).toContain('#signup')
    await expect(page.locator('section#signup')).toBeAttached()
  })
})

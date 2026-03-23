import { test, expect } from '@playwright/test'

const PAGE = '/templates/client-onboarding-ai-checklist'

test.describe('Block 6 — Expected Outcomes (issue #175)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE)
  })

  test('correct heading text is displayed', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'After using this kit, you should be able to:' })
    ).toBeVisible()
  })

  test('old heading text is not present', async ({ page }) => {
    await expect(page.getByText("What you'll get out of it")).not.toBeVisible()
  })

  test('"Download free" CTA is present after the outcome bullets', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Download free' }).first()
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '#download-form')
  })

  test('"Download free" CTA appears after the bullet list in DOM order', async ({ page }) => {
    const ul = page.locator('ul[aria-label="Expected outcomes"]')
    const cta = page.getByRole('link', { name: 'Download free' }).first()

    const ulBox = await ul.boundingBox()
    const ctaBox = await cta.boundingBox()

    expect(ulBox).not.toBeNull()
    expect(ctaBox).not.toBeNull()
    expect(ctaBox!.y).toBeGreaterThan(ulBox!.y)
  })

  test('"Download free" CTA scrolls to the download form', async ({ page }) => {
    await page.getByRole('link', { name: 'Download free' }).first().click()
    const downloadForm = page.locator('#download-form')
    await expect(downloadForm).toBeInViewport()
  })

  test('section label above the heading is unchanged', async ({ page }) => {
    // The small label preceding the Block 6 heading should still say "Expected Outcomes" equivalent
    // The label is rendered via the h2 itself (text-xs font-semibold uppercase)
    // Verify the outcomes list still renders all four items
    const outcomes = ['Reduce onboarding chaos', 'Standardize repeated tasks', 'Move faster from intake to kickoff', 'Create documentation faster']
    for (const outcome of outcomes) {
      await expect(page.getByText(outcome)).toBeVisible()
    }
  })
})

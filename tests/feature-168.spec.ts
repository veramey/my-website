import { test, expect } from '@playwright/test'

const PAGE = '/guides/automate-client-onboarding-small-agency'

test.describe('Workflow Overview diagram', () => {
  test('nav[aria-label="Workflow steps"] exists between header and Step 1', async ({ page }) => {
    await page.goto(PAGE)

    const nav = page.getByRole('navigation', { name: 'Workflow steps' })
    await expect(nav).toBeVisible()

    // Confirm Step 1 heading exists
    const step1 = page.getByRole('heading', { name: 'Step 1: Set Up Your Intake Form' })
    await expect(step1).toBeVisible()
  })

  test('all four step labels are visible at desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(PAGE)

    await expect(page.getByText('Intake form')).toBeVisible()
    await expect(page.getByText('AI brief generation')).toBeVisible()
    await expect(page.getByText('Kickoff prep')).toBeVisible()
    await expect(page.getByText('Follow-up handoff')).toBeVisible()
  })

  test('desktop arrow connectors visible and mobile connectors not visible at 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(PAGE)

    // Desktop arrows (→) should be visible
    const desktopArrows = page.locator('span.hidden.md\\:block')
    await expect(desktopArrows.first()).toBeVisible()

    // Mobile arrows (↓) should not be visible
    const mobileArrows = page.locator('span.block.md\\:hidden')
    await expect(mobileArrows.first()).not.toBeVisible()
  })

  test('mobile layout shows down-arrows and hides right-arrows at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(PAGE)

    // All four step boxes visible
    await expect(page.getByText('Intake form')).toBeVisible()
    await expect(page.getByText('AI brief generation')).toBeVisible()
    await expect(page.getByText('Kickoff prep')).toBeVisible()
    await expect(page.getByText('Follow-up handoff')).toBeVisible()

    // Mobile arrows (↓) should be visible
    const mobileArrows = page.locator('span.block.md\\:hidden')
    await expect(mobileArrows.first()).toBeVisible()

    // Desktop arrows (→) should not be visible
    const desktopArrows = page.locator('span.hidden.md\\:block')
    await expect(desktopArrows.first()).not.toBeVisible()
  })

  test('existing page content is unchanged', async ({ page }) => {
    await page.goto(PAGE)

    // Hero heading
    await expect(page.getByRole('heading', { name: 'How to Automate Client Onboarding for a Small Agency' })).toBeVisible()

    // Step headings
    await expect(page.getByRole('heading', { name: 'Step 1: Set Up Your Intake Form' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Step 2: AI-Assisted Processing of Responses' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Step 3: Automated Kickoff Prep' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Step 4: Follow-Up Handoff' })).toBeVisible()
  })
})

import { test, expect } from '@playwright/test'

const GUIDE_URL = '/guides/automate-client-onboarding-small-agency'

test.describe('Reading time metadata and Workflow Overview — onboarding guide', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(GUIDE_URL)
  })

  test('reading time metadata renders correctly', async ({ page }) => {
    const readingTime = page.getByText('7–10 min read · For: 2–10 person agencies')
    await expect(readingTime).toBeVisible()
  })

  test('workflow overview nav is present with all four steps', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Workflow steps"]')
    await expect(nav).toBeVisible()

    await expect(nav.getByText('Intake form')).toBeVisible()
    await expect(nav.getByText('AI brief generation')).toBeVisible()
    await expect(nav.getByText('Kickoff prep')).toBeVisible()
    await expect(nav.getByText('Follow-up handoff')).toBeVisible()
  })

  test('desktop connectors are visible at 1024px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })

    const desktopArrows = page.locator('nav[aria-label="Workflow steps"] span').filter({ hasText: '→' })
    await expect(desktopArrows).toHaveCount(3)
    for (const arrow of await desktopArrows.all()) {
      await expect(arrow).toBeVisible()
    }

    const mobileArrows = page.locator('nav[aria-label="Workflow steps"] span').filter({ hasText: '↓' })
    for (const arrow of await mobileArrows.all()) {
      await expect(arrow).toBeHidden()
    }
  })

  test('mobile layout shows vertical connectors at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })

    const mobileArrows = page.locator('nav[aria-label="Workflow steps"] span').filter({ hasText: '↓' })
    await expect(mobileArrows).toHaveCount(3)
    for (const arrow of await mobileArrows.all()) {
      await expect(arrow).toBeVisible()
    }

    const desktopArrows = page.locator('nav[aria-label="Workflow steps"] span').filter({ hasText: '→' })
    for (const arrow of await desktopArrows.all()) {
      await expect(arrow).toBeHidden()
    }
  })

  test('existing guide content is unchanged', async ({ page }) => {
    await expect(page.getByText('Step 1: Set Up Your Intake Form')).toBeVisible()
    await expect(page.getByText('Step 2: AI-Assisted Processing of Responses')).toBeVisible()
    await expect(page.getByText('Step 3: Automated Kickoff Prep')).toBeVisible()
    await expect(page.getByText('Step 4: Follow-Up Handoff')).toBeVisible()
    await expect(page.getByText('How to Automate Client Onboarding for a Small Agency')).toBeVisible()
  })
})

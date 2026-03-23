import { test, expect } from '@playwright/test'

test.describe('Why Templates Matter section on /templates', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/templates')
  })

  test('section heading renders', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Why templates matter' })).toBeVisible()
  })

  test('all three bullet points render with correct text', async ({ page }) => {
    await expect(page.getByText('Remove blank-page work — start from a working structure, not from zero')).toBeVisible()
    await expect(page.getByText('Standardize repeated tasks — every client gets the same quality experience')).toBeVisible()
    await expect(page.getByText('Implement faster — spend time adapting, not building from scratch')).toBeVisible()
  })

  test('CTA link is visible and points to correct href', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Get the starter kit' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('CTA link navigates without 404', async ({ page }) => {
    await page.getByRole('link', { name: 'Get the starter kit' }).click()
    await expect(page).not.toHaveURL(/.*404.*/)
    expect(page.url()).toContain('/templates/client-onboarding-ai-checklist')
  })

  test('section appears after the template cards grid in the DOM', async ({ page }) => {
    const cardsGrid = page.locator('div.mt-14')
    const section = page.locator('section.border-t')
    const cardsBox = await cardsGrid.boundingBox()
    const sectionBox = await section.boundingBox()
    expect(cardsBox).not.toBeNull()
    expect(sectionBox).not.toBeNull()
    expect(sectionBox!.y).toBeGreaterThan(cardsBox!.y)
  })

  test('CTA uses filled button styles', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Get the starter kit' })
    await expect(link).toHaveClass(/bg-gray-900/)
    await expect(link).toHaveClass(/text-white/)
    await expect(link).toHaveClass(/rounded/)
  })
})

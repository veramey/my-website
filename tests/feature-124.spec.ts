import { test, expect } from '@playwright/test'

test.describe('Issue #124 — Featured Resources cards with labels and who it\'s for', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('each card shows its label badge', async ({ page }) => {
    await expect(page.getByText('Guide', { exact: true })).toBeVisible()
    await expect(page.getByText('Template', { exact: true })).toBeVisible()
    await expect(page.getByText('Tools', { exact: true })).toBeVisible()
  })

  test('each card shows the correct who it\'s for line', async ({ page }) => {
    await expect(page.getByText('For teams whose new projects still start with chaos')).toBeVisible()
    await expect(page.getByText('For teams that want practical assets, not theory')).toBeVisible()
    await expect(page.getByText('For teams that want a lean stack under control')).toBeVisible()
  })

  test('CTAs link to correct destinations', async ({ page }) => {
    const readGuide = page.getByRole('link', { name: 'Read guide →' })
    await expect(readGuide).toHaveAttribute('href', '/guides/automate-client-onboarding-small-agency')

    const downloadKit = page.getByRole('link', { name: 'Download kit →' })
    await expect(downloadKit).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')

    const exploreTools = page.getByRole('link', { name: 'Explore tools →' })
    await expect(exploreTools).toHaveAttribute('href', '/tools/best-ai-tools-small-agencies')
  })

  test('CTA text matches spec exactly', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Read guide →' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Download kit →' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Explore tools →' })).toBeVisible()
  })

  test('exactly 3 featured resource cards render in Block 3', async ({ page }) => {
    const featuredSection = page.locator('section').filter({ has: page.getByText('Featured') })
    const cards = featuredSection.locator('div.border')
    await expect(cards).toHaveCount(3)
  })
})

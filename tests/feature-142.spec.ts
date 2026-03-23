import { test, expect } from '@playwright/test'

test.describe('Issue #142 — 3-CTA conversion block above footer on /start-here', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/start-here')
  })

  test('all three CTAs are visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Download the AI Ops Starter Kit' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Join the newsletter' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Join the audit waitlist' })).toBeVisible()
  })

  test('primary button links to /templates/client-onboarding-ai-checklist', async ({ page }) => {
    const primaryLink = page.getByRole('link', { name: 'Download the AI Ops Starter Kit' })
    await expect(primaryLink).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('secondary button links to /newsletter', async ({ page }) => {
    const secondaryLink = page.getByRole('link', { name: 'Join the newsletter' })
    await expect(secondaryLink).toHaveAttribute('href', '/newsletter')
  })

  test('tertiary text-link links to /services', async ({ page }) => {
    const tertiaryLink = page.getByRole('link', { name: 'Join the audit waitlist' })
    await expect(tertiaryLink).toHaveAttribute('href', '/services')
  })

  test('CTA block appears immediately before the footer', async ({ page }) => {
    const ctaSection = page.locator('section').filter({ hasText: 'Download the AI Ops Starter Kit' })
    const footer = page.locator('footer')
    await expect(ctaSection).toBeVisible()
    await expect(footer).toBeVisible()

    const ctaBox = await ctaSection.boundingBox()
    const footerBox = await footer.boundingBox()
    expect(ctaBox).not.toBeNull()
    expect(footerBox).not.toBeNull()
    expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(footerBox!.y + 1)
  })

  test('CTAs stack vertically at 375px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/start-here')

    const primaryLink = page.getByRole('link', { name: 'Download the AI Ops Starter Kit' })
    const secondaryLink = page.getByRole('link', { name: 'Join the newsletter' })
    const tertiaryLink = page.getByRole('link', { name: 'Join the audit waitlist' })

    const primaryBox = await primaryLink.boundingBox()
    const secondaryBox = await secondaryLink.boundingBox()
    const tertiaryBox = await tertiaryLink.boundingBox()

    expect(primaryBox).not.toBeNull()
    expect(secondaryBox).not.toBeNull()
    expect(tertiaryBox).not.toBeNull()

    // In column layout, each item should have roughly similar x position and increasing y
    expect(secondaryBox!.y).toBeGreaterThan(primaryBox!.y)
    expect(tertiaryBox!.y).toBeGreaterThan(secondaryBox!.y)
  })

  test('CTAs display in a row at 640px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 812 })
    await page.goto('/start-here')

    const primaryLink = page.getByRole('link', { name: 'Download the AI Ops Starter Kit' })
    const secondaryLink = page.getByRole('link', { name: 'Join the newsletter' })

    const primaryBox = await primaryLink.boundingBox()
    const secondaryBox = await secondaryLink.boundingBox()

    expect(primaryBox).not.toBeNull()
    expect(secondaryBox).not.toBeNull()

    // In row layout, items should have similar y positions (within 10px)
    expect(Math.abs(primaryBox!.y - secondaryBox!.y)).toBeLessThan(10)
    // And secondary should be to the right of primary
    expect(secondaryBox!.x).toBeGreaterThan(primaryBox!.x)
  })

  test('primary button navigates client-side to /templates/client-onboarding-ai-checklist', async ({ page }) => {
    const navigationPromise = page.waitForURL('**/templates/client-onboarding-ai-checklist')
    await page.getByRole('link', { name: 'Download the AI Ops Starter Kit' }).click()
    await navigationPromise
    expect(page.url()).toContain('/templates/client-onboarding-ai-checklist')
  })

  test('secondary button navigates client-side to /newsletter', async ({ page }) => {
    const navigationPromise = page.waitForURL('**/newsletter')
    await page.getByRole('link', { name: 'Join the newsletter' }).click()
    await navigationPromise
    expect(page.url()).toContain('/newsletter')
  })

  test('tertiary link navigates client-side to /services', async ({ page }) => {
    const navigationPromise = page.waitForURL('**/services')
    await page.getByRole('link', { name: 'Join the audit waitlist' }).click()
    await navigationPromise
    expect(page.url()).toContain('/services')
  })
})

import { test, expect } from '@playwright/test'

test.describe('Issue 120 — Hero value bullets and secondary CTA update', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('value bullets render below CTA buttons in correct order', async ({ page }) => {
    const primaryBtn = page.getByRole('link', { name: 'Start Here' })
    const secondaryBtn = page.getByRole('link', { name: 'Download the starter kit' })

    const bullet1 = page.getByText('No hype — only practical systems')
    const bullet2 = page.getByText('Built for small teams, not enterprise')
    const bullet3 = page.getByText('Guides, templates, and tool stacks you can use this week')

    await expect(primaryBtn).toBeVisible()
    await expect(secondaryBtn).toBeVisible()
    await expect(bullet1).toBeVisible()
    await expect(bullet2).toBeVisible()
    await expect(bullet3).toBeVisible()

    // Verify DOM order: buttons come before bullets
    const primaryBtnBox = await primaryBtn.boundingBox()
    const bullet1Box = await bullet1.boundingBox()
    expect(primaryBtnBox!.y).toBeLessThan(bullet1Box!.y)

    const secondaryBtnBox = await secondaryBtn.boundingBox()
    expect(secondaryBtnBox!.y).toBeLessThan(bullet1Box!.y)
  })

  test('secondary CTA has correct text and href', async ({ page }) => {
    const secondaryBtn = page.getByRole('link', { name: 'Download the starter kit' })
    await expect(secondaryBtn).toBeVisible()
    await expect(secondaryBtn).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('secondary CTA navigates to /templates/client-onboarding-ai-checklist with 200 response', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse((resp) => resp.url().includes('/templates/client-onboarding-ai-checklist') && resp.status() === 200),
      page.getByRole('link', { name: 'Download the starter kit' }).click(),
    ])
    expect(response.status()).toBe(200)
  })

  test('primary CTA is unchanged', async ({ page }) => {
    const primaryBtn = page.getByRole('link', { name: 'Start Here' })
    await expect(primaryBtn).toBeVisible()
    await expect(primaryBtn).toHaveAttribute('href', '/start-here')
    // Primary button must not be "Download the starter kit"
    await expect(primaryBtn).not.toHaveText('Download the starter kit')
  })

  test('bullet text does not appear inside CTA button elements', async ({ page }) => {
    const primaryBtn = page.getByRole('link', { name: 'Start Here' })
    const secondaryBtn = page.getByRole('link', { name: 'Download the starter kit' })

    await expect(primaryBtn).not.toContainText('No hype')
    await expect(primaryBtn).not.toContainText('Built for small teams')
    await expect(primaryBtn).not.toContainText('Guides, templates')
    await expect(secondaryBtn).not.toContainText('No hype')
    await expect(secondaryBtn).not.toContainText('Built for small teams')
    await expect(secondaryBtn).not.toContainText('Guides, templates')
  })
})

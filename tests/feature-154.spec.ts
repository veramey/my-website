import { test, expect } from '@playwright/test'

const PAGE = '/guides/automate-client-onboarding-small-agency'

test.describe('Final CTA block — issue #154', () => {
  test('renders "What to do next" heading', async ({ page }) => {
    await page.goto(PAGE)
    await expect(page.getByRole('heading', { name: 'What to do next' })).toBeVisible()
  })

  test('all three CTA card titles are visible', async ({ page }) => {
    await page.goto(PAGE)
    await expect(page.getByText('Get the checklist')).toBeVisible()
    await expect(page.getByText('Browse the tools')).toBeVisible()
    await expect(page.getByText('Get weekly workflows')).toBeVisible()
  })

  test('all three links point to the correct hrefs', async ({ page }) => {
    await page.goto(PAGE)
    await expect(page.getByRole('link', { name: 'Download the client onboarding AI checklist' })).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
    await expect(page.getByRole('link', { name: 'Browse best AI tools for small agencies' })).toHaveAttribute('href', '/tools/best-ai-tools-small-agencies')
    await expect(page.getByRole('link', { name: 'Join the newsletter for weekly AI ops workflows' })).toHaveAttribute('href', '/newsletter')
  })

  test('CTA block appears after "Putting It All Together" section', async ({ page }) => {
    await page.goto(PAGE)
    const puttingItTogether = page.getByRole('heading', { name: 'Putting It All Together' })
    const whatToDoNext = page.getByRole('heading', { name: 'What to do next' })

    const puttingBox = await puttingItTogether.boundingBox()
    const ctaBox = await whatToDoNext.boundingBox()

    expect(puttingBox).not.toBeNull()
    expect(ctaBox).not.toBeNull()
    expect(ctaBox!.y).toBeGreaterThan(puttingBox!.y)
  })

  test('each CTA card has the correct aria-label', async ({ page }) => {
    await page.goto(PAGE)
    await expect(page.getByRole('link', { name: 'Download the client onboarding AI checklist' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Browse best AI tools for small agencies' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Join the newsletter for weekly AI ops workflows' })).toBeVisible()
  })

  test('existing article h1 is still present', async ({ page }) => {
    await page.goto(PAGE)
    await expect(page.getByRole('heading', { name: 'How to Automate Client Onboarding for a Small Agency' })).toBeVisible()
  })
})

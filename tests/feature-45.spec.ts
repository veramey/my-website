import { test, expect } from '@playwright/test'

test.describe('Issue #45 — startHereCards href fixes', () => {
  test('card 01 (Best AI tools for small agencies) links to /tools', async ({ page }) => {
    await page.goto('/')

    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    const card1 = startHereSection.locator('a[href="/tools"]')
    await expect(card1).toBeVisible()
    await expect(card1).toContainText('Best AI tools for small agencies')
  })

  test('card 02 (How to automate client onboarding) links to /guides', async ({ page }) => {
    await page.goto('/')

    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    const card2 = startHereSection.locator('a[href="/guides"]')
    await expect(card2).toBeVisible()
    await expect(card2).toContainText('How to automate client onboarding')
  })

  test('card 03 (AI Ops Starter Kit) links to /newsletter', async ({ page }) => {
    await page.goto('/')

    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    const card3 = startHereSection.locator('a[href="/newsletter"]')
    await expect(card3).toBeVisible()
    await expect(card3).toContainText('AI Ops Starter Kit')
  })

  test('no href overlap between featuredContent and startHereCards', async ({ page }) => {
    await page.goto('/')

    const featuredSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Featured', level: 2 }),
    })
    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    const featuredHrefs = await featuredSection.locator('a').evaluateAll(
      (els) => els.map((el) => el.getAttribute('href'))
    )
    const startHereHrefs = await startHereSection.locator('a').evaluateAll(
      (els) => els.map((el) => el.getAttribute('href'))
    )

    const overlap = featuredHrefs.filter((href) => startHereHrefs.includes(href))
    expect(overlap).toHaveLength(0)
  })

  test('startHereCards do not contain old broken href /templates/client-onboarding-ai-checklist', async ({ page }) => {
    await page.goto('/')

    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    const brokenLink = startHereSection.locator('a[href="/templates/client-onboarding-ai-checklist"]')
    await expect(brokenLink).toHaveCount(0)
  })

  test('startHereCards do not contain old specific article hrefs from featuredContent', async ({ page }) => {
    await page.goto('/')

    const startHereSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Start Here', level: 2 }),
    })

    await expect(startHereSection.locator('a[href="/tools/best-ai-tools-small-agencies"]')).toHaveCount(0)
    await expect(startHereSection.locator('a[href="/guides/automate-client-onboarding-small-agency"]')).toHaveCount(0)
    await expect(startHereSection.locator('a[href="/tools/best-ai-meeting-assistants-agencies"]')).toHaveCount(0)
  })
})

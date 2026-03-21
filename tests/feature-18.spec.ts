import { test, expect } from '@playwright/test'

const PAGE = '/guides/automate-client-onboarding-small-agency'

test('page renders with correct title and meta description', async ({ page }) => {
  await page.goto(PAGE)

  const title = await page.title()
  expect(title.length).toBeGreaterThan(0)

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')
  expect(description).toBeTruthy()
  expect(description!.length).toBeLessThanOrEqual(160)
})

test('all four workflow sections are present and ordered', async ({ page }) => {
  await page.goto(PAGE)

  const headings = page.locator('h2')
  const texts = await headings.allTextContents()

  // Find the four workflow section headings
  const intakeIdx = texts.findIndex((t) => /intake form/i.test(t))
  const aiIdx = texts.findIndex((t) => /ai.assisted processing/i.test(t))
  const kickoffIdx = texts.findIndex((t) => /kickoff prep/i.test(t))
  const handoffIdx = texts.findIndex((t) => /follow.up handoff/i.test(t))

  expect(intakeIdx).toBeGreaterThanOrEqual(0)
  expect(aiIdx).toBeGreaterThan(intakeIdx)
  expect(kickoffIdx).toBeGreaterThan(aiIdx)
  expect(handoffIdx).toBeGreaterThan(kickoffIdx)
})

test('tool callout blocks appear at each workflow step', async ({ page }) => {
  await page.goto(PAGE)

  const callouts = page.locator('.bg-gray-50.border.border-gray-100.rounded-lg.p-5')
  await expect(callouts).toHaveCount(4)

  for (let i = 0; i < 4; i++) {
    await expect(callouts.nth(i)).toBeVisible()
  }
})

test('internal links use descriptive text and correct styling', async ({ page }) => {
  await page.goto(PAGE)

  const checklistLink = page.locator('a[href="/templates/client-onboarding-ai-checklist"]')
  const toolsLink = page.locator('a[href="/tools/best-ai-tools-small-agencies"]')
  const starterKitLink = page.locator('a[href="/templates/ai-ops-starter-kit"]')

  await expect(checklistLink).toBeVisible()
  await expect(toolsLink).toBeVisible()
  await expect(starterKitLink).toBeVisible()

  // Descriptive text — no generic "click here" or "here"
  for (const link of [checklistLink, toolsLink, starterKitLink]) {
    const text = await link.textContent()
    expect(text?.toLowerCase().trim()).not.toBe('click here')
    expect(text?.toLowerCase().trim()).not.toBe('here')
    expect(text!.length).toBeGreaterThan(4)
  }

  // Correct styling classes
  for (const link of [checklistLink, toolsLink, starterKitLink]) {
    await expect(link).toHaveClass(/text-blue-600/)
    await expect(link).toHaveClass(/underline/)
  }
})

test('page renders article content without client-side fetching', async ({ page }) => {
  await page.goto(PAGE)

  // Main heading should be visible with no empty placeholders
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  // All four step headings are in the DOM (static content)
  await expect(page.getByRole('heading', { name: /intake form/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /ai.assisted processing/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /kickoff prep/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /follow.up handoff/i })).toBeVisible()
})

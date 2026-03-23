import { test, expect } from '@playwright/test'

const PAGE = '/templates/client-onboarding-ai-checklist'

test('section#download-form exists and contains the h2', async ({ page }) => {
  await page.goto(PAGE)
  const section = page.locator('section#download-form')
  await expect(section).toBeAttached()
  await expect(section.getByRole('heading', { name: 'Get the AI Ops Starter Kit' })).toBeVisible()
})

test('anchor URL #download-form scrolls the section into view', async ({ page }) => {
  await page.goto(PAGE + '#download-form')
  const section = page.locator('section#download-form')
  await expect(section).toBeInViewport()
})

test('expectedOutcomes renders all 4 bullet items', async ({ page }) => {
  await page.goto(PAGE)
  const list = page.getByRole('list', { name: 'Expected outcomes' })
  await expect(list.getByRole('listitem')).toHaveCount(4)
  await expect(page.getByText('Reduce onboarding chaos')).toBeVisible()
  await expect(page.getByText('Standardize repeated tasks')).toBeVisible()
  await expect(page.getByText('Move faster from intake to kickoff')).toBeVisible()
  await expect(page.getByText('Create documentation faster')).toBeVisible()
})

test('in-page anchor link changes hash to #download-form without errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto(PAGE)
  await page.evaluate(() => {
    const a = document.createElement('a')
    a.href = '#download-form'
    a.click()
  })
  await expect(page).toHaveURL(new RegExp('#download-form$'))
  await expect(page.locator('section#download-form')).toBeInViewport()
  expect(errors).toHaveLength(0)
})

test('expectedOutcomes block shows exactly 4 items — no duplicates or missing', async ({ page }) => {
  await page.goto(PAGE)
  const items = page.getByRole('list', { name: 'Expected outcomes' }).getByRole('listitem')
  await expect(items).toHaveCount(4)
})

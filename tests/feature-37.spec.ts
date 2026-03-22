import { test, expect } from '@playwright/test'

const PAGE = '/templates/client-onboarding-ai-checklist'

test('hero heading renders correctly', async ({ page }) => {
  await page.goto(PAGE)
  await expect(page.getByRole('heading', { level: 1, name: 'AI Ops Starter Kit for Small Agencies' })).toBeVisible()
})

test('all six section headings are present', async ({ page }) => {
  await page.goto(PAGE)

  await expect(page.getByRole('heading', { name: 'AI Ops Starter Kit for Small Agencies' })).toBeVisible()
  await expect(page.getByText('What problem it solves')).toBeVisible()
  await expect(page.getByText("Who it's for")).toBeVisible()
  await expect(page.getByText("What's inside")).toBeVisible()
  await expect(page.getByText('How to use it')).toBeVisible()
  await expect(page.getByText('Free Download')).toBeVisible()
})

test("what's inside lists all four items", async ({ page }) => {
  await page.goto(PAGE)

  await expect(page.getByText('10 workflow templates')).toBeVisible()
  await expect(page.getByText('Starter tool stack')).toBeVisible()
  await expect(page.getByText('Onboarding checklist')).toBeVisible()
  await expect(page.getByText('SOP prompt pack')).toBeVisible()
})

test('download CTA section is present', async ({ page }) => {
  await page.goto(PAGE)

  await expect(page.getByRole('heading', { name: 'Get the AI Ops Starter Kit' })).toBeVisible()
  await expect(page.getByText('Free Download')).toBeVisible()
})

test('Nav component renders with at least one internal link', async ({ page }) => {
  await page.goto(PAGE)

  const nav = page.locator('nav')
  await expect(nav).toBeVisible()

  const internalLinks = nav.locator('a[href="/"]')
  await expect(internalLinks.first()).toBeVisible()
})

test('eyebrow label styling is applied', async ({ page }) => {
  await page.goto(PAGE)

  const eyebrow = page.locator('.text-xs.font-semibold.text-gray-400.uppercase.tracking-widest').first()
  await expect(eyebrow).toBeVisible()
})

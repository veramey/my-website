import { test, expect } from '@playwright/test'

const PAGE = '/about'

test.describe('Block 5 — Why This Approach Works', () => {
  test('Block 5 heading renders correctly', async ({ page }) => {
    await page.goto(PAGE)
    await expect(page.getByRole('heading', { name: 'Why This Approach Works' })).toBeVisible()
  })

  test('three list items render with correct bold spans', async ({ page }) => {
    await page.goto(PAGE)

    await expect(page.getByText('Practical, no-fluff content.')).toBeVisible()
    await expect(page.getByText('Built for lean teams, not enterprise.')).toBeVisible()
    await expect(page.getByText('Implementation-first — every piece has a next action.')).toBeVisible()
  })

  test('CTA link points to correct href', async ({ page }) => {
    await page.goto(PAGE)

    const cta = page.getByRole('link', { name: 'Download the starter kit →' })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/templates/client-onboarding-ai-checklist')
  })

  test('Block ordering preserved — Block 5 appears after Block 4', async ({ page }) => {
    await page.goto(PAGE)

    const block4Heading = page.getByRole('heading', { name: "What You'll Find Here" })
    const block5Heading = page.getByRole('heading', { name: 'Why This Approach Works' })

    await expect(block4Heading).toBeVisible()
    await expect(block5Heading).toBeVisible()

    const block4Box = await block4Heading.boundingBox()
    const block5Box = await block5Heading.boundingBox()

    expect(block4Box!.y).toBeLessThan(block5Box!.y)
  })

  test('existing blocks 1–3 are unchanged', async ({ page }) => {
    await page.goto(PAGE)

    await expect(page.getByText('Who You Are')).toBeVisible()
    await expect(page.getByText('Why This Project')).toBeVisible()
    await expect(page.getByText('Core Beliefs')).toBeVisible()

    await expect(page.getByText('Practical over trendy.')).toBeVisible()
    await expect(page.getByText('Systems over chaos.')).toBeVisible()
    await expect(page.getByText('Implementation over inspiration.')).toBeVisible()
  })
})

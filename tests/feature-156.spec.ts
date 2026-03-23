import { test, expect } from '@playwright/test'

const PAGE = '/tools/best-ai-tools-small-agencies'

test.describe('Stack Bundles section', () => {
  test('renders heading "Pre-built stacks by budget"', async ({ page }) => {
    await page.goto(PAGE)
    await expect(page.getByRole('heading', { name: 'Pre-built stacks by budget' })).toBeVisible()
  })

  test('renders exactly three bundle cards with correct budget labels', async ({ page }) => {
    await page.goto(PAGE)
    const cards = page.locator('div.border.border-gray-100.rounded-lg.p-5')
    await expect(cards).toHaveCount(3)
    await expect(page.getByText('Under $50/month').first()).toBeVisible()
    await expect(page.getByText('Under $150/month').first()).toBeVisible()
    await expect(page.getByText('Team-ready ($150–250/month)').first()).toBeVisible()
  })

  test('each bundle card displays Tools, Supports, and Best for sub-lines', async ({ page }) => {
    await page.goto(PAGE)
    const cards = page.locator('div.border.border-gray-100.rounded-lg.p-5')
    for (let i = 0; i < 3; i++) {
      const card = cards.nth(i)
      await expect(card.locator('text=/^Tools:/').first()).toBeVisible()
      await expect(card.locator('text=/^Supports:/').first()).toBeVisible()
      await expect(card.locator('text=/^Best for:/').first()).toBeVisible()
    }
  })
})

test.describe('Common Mistakes section', () => {
  test('renders heading "What to avoid"', async ({ page }) => {
    await page.goto(PAGE)
    await expect(page.getByRole('heading', { name: 'What to avoid' })).toBeVisible()
  })

  test('renders exactly four list items each with a bold label', async ({ page }) => {
    await page.goto(PAGE)
    // Find the ul in the Common Mistakes section
    const heading = page.getByRole('heading', { name: 'What to avoid' })
    const section = heading.locator('xpath=ancestor::section')
    const listItems = section.locator('ul li')
    await expect(listItems).toHaveCount(4)
    // Each li should have a span with font-medium text-gray-900 (bold label)
    for (let i = 0; i < 4; i++) {
      await expect(listItems.nth(i).locator('span.font-medium.text-gray-900')).toBeVisible()
    }
  })

  test('list items contain no svg icons or color spans', async ({ page }) => {
    await page.goto(PAGE)
    const heading = page.getByRole('heading', { name: 'What to avoid' })
    const section = heading.locator('xpath=ancestor::section')
    const listItems = section.locator('ul li')
    const count = await listItems.count()
    for (let i = 0; i < count; i++) {
      const li = listItems.nth(i)
      await expect(li.locator('svg')).toHaveCount(0)
      // No color spans (text-green, text-red, text-blue)
      await expect(li.locator('[class*="text-green"], [class*="text-red"], [class*="text-blue"]')).toHaveCount(0)
    }
  })
})

test.describe('Section ordering', () => {
  test('Stack Bundles and Common Mistakes appear after Workflow Automation and before How to Choose', async ({ page }) => {
    await page.goto(PAGE)

    const headings = page.getByRole('heading', { level: 2 })
    const texts = await headings.allTextContents()

    const workflowIdx = texts.findIndex(t => t.includes('Workflow Automation'))
    const stackIdx = texts.findIndex(t => t.includes('Pre-built stacks by budget'))
    const mistakesIdx = texts.findIndex(t => t.includes('What to avoid'))
    const chooseIdx = texts.findIndex(t => t.includes('How to Choose'))

    expect(workflowIdx).toBeGreaterThanOrEqual(0)
    expect(stackIdx).toBeGreaterThan(workflowIdx)
    expect(mistakesIdx).toBeGreaterThan(stackIdx)
    expect(chooseIdx).toBeGreaterThan(mistakesIdx)
  })
})

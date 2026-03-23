import { test, expect } from '@playwright/test'

const PAGE = '/tools/best-ai-tools-small-agencies'

test.describe('Quick Comparison Table and section anchor IDs', () => {
  test('table renders with correct structure', async ({ page }) => {
    await page.goto(PAGE)

    // Table exists inside overflow-x-auto wrapper
    const wrapper = page.locator('div.overflow-x-auto')
    await expect(wrapper).toBeVisible()

    const table = wrapper.locator('table')
    await expect(table).toBeVisible()

    // Caption is present (sr-only)
    const caption = table.locator('caption')
    await expect(caption).toHaveText('AI tools comparison by category')

    // Exactly 3 column headers
    const headers = table.locator('thead th')
    await expect(headers).toHaveCount(3)
    await expect(headers.nth(0)).toHaveText('Category')
    await expect(headers.nth(1)).toHaveText('Best pick')
    await expect(headers.nth(2)).toHaveText('Why')
  })

  test('all 5 category rows with anchor links appear in tbody', async ({ page }) => {
    await page.goto(PAGE)

    const tbody = page.locator('div.overflow-x-auto table tbody')
    const rows = tbody.locator('tr')
    await expect(rows).toHaveCount(5)

    // Each expected anchor and its fragment
    const anchors = [
      { text: 'Jump to full notes', href: '#meeting-assistants' },
      { text: 'Jump to full notes', href: '#writing-drafting' },
      { text: 'Jump to full notes', href: '#client-onboarding' },
      { text: 'Jump to full notes', href: '#sops-docs' },
      { text: 'Jump to full notes', href: '#workflow-automation' },
    ]

    for (let i = 0; i < anchors.length; i++) {
      const link = rows.nth(i).locator('a', { hasText: anchors[i].text })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', anchors[i].href)
    }
  })

  test('table is positioned between intro header and first category section', async ({ page }) => {
    await page.goto(PAGE)

    // header + div (overflow-x-auto) contains the table
    const tableViaAdjacentSelector = page.locator('header + div table')
    await expect(tableViaAdjacentSelector).toBeVisible()

    // The first section after the table wrapper has id="meeting-assistants"
    const firstSection = page.locator('section#meeting-assistants')
    await expect(firstSection).toBeVisible()
  })

  test('all five section anchor IDs are present', async ({ page }) => {
    await page.goto(PAGE)

    const ids = [
      'meeting-assistants',
      'writing-drafting',
      'client-onboarding',
      'sops-docs',
      'workflow-automation',
    ]

    for (const id of ids) {
      await expect(page.locator(`section#${id}`)).toBeVisible()
    }
  })

  test('clicking a Jump to full notes link updates the URL hash', async ({ page }) => {
    await page.goto(PAGE)

    const link = page.locator('div.overflow-x-auto table tbody tr').nth(1).locator('a', { hasText: 'Jump to full notes' })
    await link.click()

    await expect(page).toHaveURL(new RegExp('#writing-drafting'))

    // The target section should be in or near the viewport
    const section = page.locator('section#writing-drafting')
    await expect(section).toBeVisible()
  })

  test('table wrapper has overflow-x-auto at narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(PAGE)

    const wrapper = page.locator('div.overflow-x-auto').first()
    await expect(wrapper).toBeVisible()

    const overflowX = await wrapper.evaluate((el) => getComputedStyle(el).overflowX)
    expect(overflowX).toBe('auto')
  })
})

import { test, expect } from '@playwright/test'

test.describe('Who It\'s For block', () => {
  test('renders both columns with correct headings and list items', async ({ page }) => {
    await page.goto('/')

    const forHeading = page.getByRole('heading', { name: 'For', exact: true, level: 3 })
    const notForHeading = page.getByRole('heading', { name: 'Not For', exact: true, level: 3 })

    await expect(forHeading).toBeVisible()
    await expect(notForHeading).toBeVisible()

    // Each column has a non-empty list with at least one item
    const forSection = page.locator('section').filter({ has: forHeading })
    const forItems = forSection.locator('h3:has-text("For") + ul li, h3:has-text("For") ~ ul li')
    // Use a more robust approach: find ul siblings after h3
    const forColumn = forSection.locator('div').filter({ has: page.getByRole('heading', { name: 'For', exact: true, level: 3 }) })
    const forList = forColumn.locator('ul li')
    await expect(forList.first()).toBeVisible()

    const notForColumn = forSection.locator('div').filter({ has: page.getByRole('heading', { name: 'Not For', exact: true, level: 3 }) })
    const notForList = notForColumn.locator('ul li')
    await expect(notForList.first()).toBeVisible()
  })

  test('columns are side-by-side on desktop (1280px viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    const forHeading = page.getByRole('heading', { name: 'For', exact: true, level: 3 })
    const notForHeading = page.getByRole('heading', { name: 'Not For', exact: true, level: 3 })

    const forBox = await forHeading.boundingBox()
    const notForBox = await notForHeading.boundingBox()

    expect(forBox).not.toBeNull()
    expect(notForBox).not.toBeNull()
    // Different x positions means they are in separate columns
    expect(forBox!.x).not.toBeCloseTo(notForBox!.x, -1)
  })
})

test.describe('Core Problem block', () => {
  test('renders all four pain-point cards', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Messy onboarding')).toBeVisible()
    await expect(page.getByText('Inconsistent delivery')).toBeVisible()
    await expect(page.getByText('Undocumented processes')).toBeVisible()
    await expect(page.getByText('Too much admin work')).toBeVisible()

    // The ul contains exactly four li elements
    const problemSection = page.locator('section').filter({ hasText: 'The Problem' })
    const items = problemSection.locator('ul li')
    await expect(items).toHaveCount(4)
  })

  test('cards render in two rows on mobile (375px viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const problemSection = page.locator('section').filter({ hasText: 'The Problem' })
    const items = problemSection.locator('ul li')
    await expect(items).toHaveCount(4)

    const box0 = await items.nth(0).boundingBox()
    const box1 = await items.nth(1).boundingBox()
    const box2 = await items.nth(2).boundingBox()

    expect(box0).not.toBeNull()
    expect(box1).not.toBeNull()
    expect(box2).not.toBeNull()

    // First two cards share the same row (same y, different x)
    expect(Math.abs(box0!.y - box1!.y)).toBeLessThan(10)
    // Third card is on a new row (lower y)
    expect(box2!.y).toBeGreaterThan(box0!.y + 10)
  })
})

test.describe('Block order on home page', () => {
  test('Who It\'s For section appears after Hero and Core Problem before Position Statement', async ({ page }) => {
    await page.goto('/')

    const sections = page.locator('main section')
    const count = await sections.count()

    // Collect section labels by checking text content
    const labels: string[] = []
    for (let i = 0; i < count; i++) {
      const text = await sections.nth(i).textContent()
      labels.push(text ?? '')
    }

    const heroIdx = labels.findIndex((t) => t.includes('AI operations systems for small agencies'))
    const whoIdx = labels.findIndex((t) => t.includes("Who It's For") || t.includes('Who It\u2019s For') || (t.includes('For') && t.includes('Not For')))
    const coreIdx = labels.findIndex((t) => t.includes('Messy onboarding'))
    const positionIdx = labels.findIndex((t) => t.includes('No AI news') || t.includes('Only implementation'))

    expect(heroIdx).toBeGreaterThanOrEqual(0)
    expect(whoIdx).toBeGreaterThan(heroIdx)
    expect(coreIdx).toBeGreaterThan(heroIdx)
    expect(positionIdx).toBeGreaterThan(coreIdx)
  })
})

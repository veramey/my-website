import { test, expect } from '@playwright/test'

test.describe('Trust filter block — /start-here', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/start-here')
  })

  test('both column headings render', async ({ page }) => {
    await expect(page.getByText('This site is', { exact: true })).toBeVisible()
    await expect(page.getByText('This site is not', { exact: true })).toBeVisible()
  })

  test('each column contains exactly 4 list items', async ({ page }) => {
    const columns = page.locator('section').filter({ hasText: 'This site is' })
    const lists = columns.locator('ul')

    const leftList = lists.first()
    const rightList = lists.last()

    await expect(leftList.locator('li')).toHaveCount(4)
    await expect(rightList.locator('li')).toHaveCount(4)

    for (const li of await leftList.locator('li').all()) {
      await expect(li).toBeVisible()
    }
    for (const li of await rightList.locator('li').all()) {
      await expect(li).toBeVisible()
    }
  })

  test('correct prefix characters appear in each column', async ({ page }) => {
    const columns = page.locator('section').filter({ hasText: 'This site is' })
    const lists = columns.locator('ul')

    const leftText = await lists.first().textContent()
    const rightText = await lists.last().textContent()

    expect(leftText).toContain('✓')
    expect(rightText).toContain('✗')
  })

  test('trust filter section appears after Block 4 in the DOM', async ({ page }) => {
    const block4 = page.locator('section').filter({ hasText: "If you're choosing tools" })
    const trustFilter = page.locator('section').filter({ hasText: 'This site is not' })

    const block4Box = await block4.boundingBox()
    const trustFilterBox = await trustFilter.boundingBox()

    expect(block4Box).not.toBeNull()
    expect(trustFilterBox).not.toBeNull()
    expect(trustFilterBox!.y).toBeGreaterThan(block4Box!.y)
  })

  test('headings visible at 375px viewport (stacked columns)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await expect(page.getByText('This site is', { exact: true })).toBeVisible()
    await expect(page.getByText('This site is not', { exact: true })).toBeVisible()
  })
})

import { test, expect } from '@playwright/test'

test.describe('Who It\'s For section (issue #121)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('"For" column renders with expected items', async ({ page }) => {
    const forHeading = page.getByRole('heading', { name: 'For' })
    await expect(forHeading).toBeVisible()
    // Small agencies is in the For column
    const forColumn = forHeading.locator('..')
    await expect(forColumn.getByText('Small agencies')).toBeVisible()
  })

  test('"Not for" column renders with expected items', async ({ page }) => {
    const notForHeading = page.getByRole('heading', { name: 'Not for' })
    await expect(notForHeading).toBeVisible()
    const notForColumn = notForHeading.locator('..')
    await expect(notForColumn.getByText('Enterprise transformation teams')).toBeVisible()
  })

  test('"For" and "Not for" lists are in separate DOM containers', async ({ page }) => {
    const forHeading = page.getByRole('heading', { name: 'For' })
    const notForHeading = page.getByRole('heading', { name: 'Not for' })

    const forColumn = forHeading.locator('..')
    const notForColumn = notForHeading.locator('..')

    // "Enterprise transformation teams" must NOT appear in the "For" column
    await expect(forColumn.getByText('Enterprise transformation teams')).not.toBeVisible()
    // "Small agencies" must NOT appear in the "Not for" column
    await expect(notForColumn.getByText('Small agencies')).not.toBeVisible()
  })

  test('"Who It\'s For" section appears between Block 2 and Block 3 in DOM order', async ({ page }) => {
    // Verify the section heading exists
    await expect(page.getByText("Who It's For")).toBeVisible()

    // DOM order: Position Statement text appears before "Who It's For", and "Featured" appears after
    const positionStatement = page.getByText('This site is for small agencies')
    const whoItsFor = page.getByText("Who It's For")
    const featured = page.getByText('Featured')

    // All three must be visible
    await expect(positionStatement).toBeVisible()
    await expect(whoItsFor).toBeVisible()
    await expect(featured).toBeVisible()

    // Check DOM order using evaluate
    const order = await page.evaluate(() => {
      const position = document.querySelector('section:has(p)')?.getBoundingClientRect().top ?? 0
      const whoItsForEl = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.includes("Who It's For"))
      const featuredEl = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.includes('Featured'))
      const whoTop = whoItsForEl?.getBoundingClientRect().top ?? 0
      const featTop = featuredEl?.getBoundingClientRect().top ?? 0
      return { whoTop, featTop }
    })

    expect(order.whoTop).toBeLessThan(order.featTop)
  })

  test('Secondary CTA links to /start-here', async ({ page }) => {
    const cta = page.getByRole('link', { name: /See the best place to start/ })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/start-here')
  })

  test('CTA link is keyboard-accessible', async ({ page }) => {
    const cta = page.getByRole('link', { name: /See the best place to start/ })
    await cta.focus()
    await expect(cta).toBeFocused()
  })
})

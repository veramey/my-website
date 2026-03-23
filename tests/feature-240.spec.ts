import { test, expect } from '@playwright/test'

test.describe('/about — Block 4 heading style (issue #240)', () => {
  test('heading "What you\'ll find here" has correct small-caps classes', async ({ page }) => {
    await page.goto('/about')

    const heading = page.getByRole('heading', { name: "What you'll find here" })
    await expect(heading).toBeVisible()

    await expect(heading).toHaveClass(/text-xs/)
    await expect(heading).toHaveClass(/font-semibold/)
    await expect(heading).toHaveClass(/text-gray-400/)
    await expect(heading).toHaveClass(/uppercase/)
    await expect(heading).toHaveClass(/tracking-widest/)
    await expect(heading).toHaveClass(/mb-6/)
  })

  test('heading "What you\'ll find here" does not have old incorrect classes', async ({ page }) => {
    await page.goto('/about')

    const heading = page.getByRole('heading', { name: "What you'll find here" })
    await expect(heading).not.toHaveClass(/text-2xl/)
    await expect(heading).not.toHaveClass(/font-bold/)
    await expect(heading).not.toHaveClass(/text-gray-900/)
  })

  test('all section h2 headings share the same text-xs class at narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/about')

    const heading = page.getByRole('heading', { name: "What you'll find here" })
    await expect(heading).toHaveClass(/text-xs/)
    await expect(heading).not.toHaveClass(/text-2xl/)
  })
})

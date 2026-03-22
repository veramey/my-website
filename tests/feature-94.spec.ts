import { test, expect } from '@playwright/test'

test.describe('About page — three content sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('all three section headings render with correct label style', async ({ page }) => {
    const headings = ['Who You Are', 'Why This Project', 'Core Beliefs']
    for (const text of headings) {
      const h2 = page.getByRole('heading', { level: 2, name: text })
      await expect(h2).toBeVisible()
      await expect(h2).toHaveClass(/text-xs/)
      await expect(h2).toHaveClass(/font-semibold/)
      await expect(h2).toHaveClass(/text-gray-400/)
      await expect(h2).toHaveClass(/uppercase/)
      await expect(h2).toHaveClass(/tracking-widest/)
    }
  })

  test('Section 3 lists all three core beliefs', async ({ page }) => {
    const section = page.getByRole('heading', { level: 2, name: 'Core Beliefs' }).locator('../..')
    await expect(section.getByText(/practical over trendy/i)).toBeVisible()
    await expect(section.getByText(/systems over chaos/i)).toBeVisible()
    await expect(section.getByText(/implementation over inspiration/i)).toBeVisible()
  })

  test('alternating background pattern is applied correctly', async ({ page }) => {
    // Section 1 wrapper has bg-gray-50
    const section1Wrapper = page.locator('div.border-t.border-gray-100.bg-gray-50').first()
    await expect(section1Wrapper).toBeVisible()
    await expect(section1Wrapper).toHaveClass(/bg-gray-50/)

    // Section 2 wrapper does NOT have bg-gray-50
    const whoYouAreH2 = page.getByRole('heading', { level: 2, name: 'Who You Are' })
    const whyProjectH2 = page.getByRole('heading', { level: 2, name: 'Why This Project' })

    // Section 2 is the direct parent div of the Why This Project section
    const section2Wrapper = whyProjectH2.locator('../../..')
    await expect(section2Wrapper).not.toHaveClass(/bg-gray-50/)

    // Section 3 wrapper has bg-gray-50
    const coreBeliefH2 = page.getByRole('heading', { level: 2, name: 'Core Beliefs' })
    const section3Wrapper = coreBeliefH2.locator('../../..')
    await expect(section3Wrapper).toHaveClass(/bg-gray-50/)

    // Silence unused variable warning
    void whoYouAreH2
  })

  test('content sections appear below the hero', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 })
    const firstSectionH2 = page.getByRole('heading', { level: 2, name: 'Who You Are' })

    const h1Box = await h1.boundingBox()
    const h2Box = await firstSectionH2.boundingBox()

    expect(h1Box).not.toBeNull()
    expect(h2Box).not.toBeNull()
    expect(h1Box!.y).toBeLessThan(h2Box!.y)
  })

  test('Section 1 body copy container is constrained to max-w-2xl', async ({ page }) => {
    const whoYouAreH2 = page.getByRole('heading', { level: 2, name: 'Who You Are' })
    // The max-w-2xl div is a sibling of the h2, inside the section
    const section = whoYouAreH2.locator('..')
    const constrainedDiv = section.locator('div.max-w-2xl')
    await expect(constrainedDiv).toBeVisible()
    await expect(constrainedDiv).toHaveClass(/max-w-2xl/)
  })
})

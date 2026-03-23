import { test, expect } from '@playwright/test'

test.describe('/about — Block 5 heading style (issue #217)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('Why This Approach Works heading has correct classes', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Why This Approach Works' })
    await expect(heading).toBeVisible()

    const className = await heading.getAttribute('class')
    expect(className).toContain('text-xs')
    expect(className).toContain('font-semibold')
    expect(className).toContain('text-gray-400')
    expect(className).toContain('uppercase')
    expect(className).toContain('tracking-widest')
    expect(className).toContain('mb-6')
  })

  test('Why This Approach Works heading does NOT have old incorrect classes', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Why This Approach Works' })
    const className = await heading.getAttribute('class')

    expect(className).not.toContain('text-2xl')
    expect(className).not.toContain('font-bold')
    expect(className).not.toContain('text-gray-900')
  })

  test('section content beneath Why This Approach Works still renders', async ({ page }) => {
    await expect(page.getByText('Practical, no-fluff content.')).toBeVisible()
    await expect(page.getByText('Built for lean teams, not enterprise.')).toBeVisible()
    await expect(page.getByText('Implementation-first — every piece has a next action.')).toBeVisible()
  })

  test('Why This Approach Works heading visually matches other section headings', async ({ page }) => {
    const block5Heading = page.getByRole('heading', { name: 'Why This Approach Works' })
    const coreBeliefs = page.getByRole('heading', { name: 'Core Beliefs' })

    const block5Class = await block5Heading.getAttribute('class')
    const coreClass = await coreBeliefs.getAttribute('class')

    expect(block5Class).toBe(coreClass)
  })
})

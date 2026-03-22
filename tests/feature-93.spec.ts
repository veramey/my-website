import { test, expect } from '@playwright/test'

test.describe('About page (/about)', () => {
  test('has correct title and meta description', async ({ page }) => {
    await page.goto('/about')

    await expect(page).toHaveTitle('About — AI Ops for Small Agencies')

    const description = page.locator('meta[name="description"]')
    const content = await description.getAttribute('content')
    expect(content).not.toBeNull()
    expect(content!.length).toBeGreaterThanOrEqual(140)
    expect(content!.length).toBeLessThanOrEqual(160)
  })

  test('renders nav and hero h1 with page label', async ({ page }) => {
    await page.goto('/about')

    await expect(page.locator('nav')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: 'About this project' })).toBeVisible()

    const label = page.locator('p.uppercase', { hasText: /about/i })
    await expect(label).toBeVisible()
  })

  test('renders footer with About and Newsletter links', async ({ page }) => {
    await page.goto('/about')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Newsletter' })).toBeVisible()
  })

  test('canonical and og:url are correct', async ({ page }) => {
    await page.goto('/about')

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://www.aiopagency.com/about')

    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', 'https://www.aiopagency.com/about')
  })

  test('no horizontal overflow on 375px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/about')

    await expect(page.locator('nav')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: 'About this project' })).toBeVisible()

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const innerWidth = await page.evaluate(() => window.innerWidth)
    expect(scrollWidth).toBe(innerWidth)
  })
})

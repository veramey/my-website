import { test, expect } from '@playwright/test'

test.describe('Issue #59 — og:url and canonical tags on home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('og:url meta tag is present with correct content', async ({ page }) => {
    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute('content', 'https://www.aiopagency.com/')
  })

  test('canonical link tag is present with correct href', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://www.aiopagency.com/')
  })

  test('og:url uses https and ends with trailing slash', async ({ page }) => {
    const content = await page.locator('meta[property="og:url"]').getAttribute('content')
    expect(content).toBe('https://www.aiopagency.com/')
    expect(content).toMatch(/^https:\/\//)
    expect(content).toMatch(/\/$/)
  })

  test('canonical href uses https and ends with trailing slash', async ({ page }) => {
    const href = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(href).toBe('https://www.aiopagency.com/')
    expect(href).toMatch(/^https:\/\//)
    expect(href).toMatch(/\/$/)
  })

  test('exactly one og:url tag exists', async ({ page }) => {
    const count = await page.locator('meta[property="og:url"]').count()
    expect(count).toBe(1)
  })

  test('exactly one canonical link tag exists', async ({ page }) => {
    const count = await page.locator('link[rel="canonical"]').count()
    expect(count).toBe(1)
  })

  test('existing og:title tag is unchanged', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', 'AI Ops for Small Agencies')
  })

  test('existing og:description tag is unchanged', async ({ page }) => {
    const ogDesc = page.locator('meta[property="og:description"]')
    await expect(ogDesc).toHaveAttribute(
      'content',
      'Practical AI operations systems for small agencies. No hype — only actionable workflows, tools, and templates.'
    )
  })
})

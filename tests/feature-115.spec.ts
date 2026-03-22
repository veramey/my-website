import { test, expect } from '@playwright/test'

test.describe('Issue #115 — Two new Best Tools entries on /tools', () => {
  test('new tool cards are visible on /tools', async ({ page }) => {
    await page.goto('/tools')

    await expect(page.getByRole('link', { name: 'Best AI Stack for Small Agencies Under $150/Month' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Best AI Tools for SOPs and Internal Documentation (2026)' })).toBeVisible()
  })

  test('new card descriptions render correctly', async ({ page }) => {
    await page.goto('/tools')

    await expect(page.getByText('A lean but fully functional AI ops stack for small agencies — covering writing, meetings, automation, and workspace tools.')).toBeVisible()
    await expect(page.getByText('The tools that actually make building and maintaining SOPs fast — for agencies that want to standardize without the overhead.')).toBeVisible()
  })

  test('new card hrefs point to correct slugs', async ({ page }) => {
    await page.goto('/tools')

    const stackLink = page.getByRole('link', { name: 'Best AI Stack for Small Agencies Under $150/Month' })
    await expect(stackLink).toHaveAttribute('href', '/tools/best-ai-stack-agencies-under-150')

    const sopLink = page.getByRole('link', { name: 'Best AI Tools for SOPs and Internal Documentation (2026)' })
    await expect(sopLink).toHaveAttribute('href', '/tools/best-ai-tools-sops-small-agencies')
  })

  test('all four cards render under a single Best Tools section header', async ({ page }) => {
    await page.goto('/tools')

    const bestToolsHeadings = page.getByRole('heading', { name: 'Best Tools' })
    await expect(bestToolsHeadings).toHaveCount(1)

    const section = page.locator('section').filter({ has: page.getByText('Best Tools') })
    await expect(section.getByRole('link')).toHaveCount(4)
  })

  test('new slugs return 200', async ({ page }) => {
    const stackResponse = await page.goto('/tools/best-ai-stack-agencies-under-150')
    expect(stackResponse?.status()).toBe(200)

    const sopResponse = await page.goto('/tools/best-ai-tools-sops-small-agencies')
    expect(sopResponse?.status()).toBe(200)
  })
})

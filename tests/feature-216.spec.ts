import { test, expect } from '@playwright/test'

test.describe('About page Block 4 CTA text (#216)', () => {
  test('shows "Browse resources →" link pointing to /guides', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/about`)
    const link = page.getByRole('link', { name: 'Browse resources →' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/guides')
  })

  test('"Browse resources →" navigates to /guides without 404', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/about`)
    await page.getByRole('link', { name: 'Browse resources →' }).click()
    await expect(page).toHaveURL(`${baseURL}/guides`)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('old text "Browse all guides →" does not appear on /about', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/about`)
    await expect(page.getByText('Browse all guides →')).not.toBeVisible()
  })
})

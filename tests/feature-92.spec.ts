import { test, expect } from '@playwright/test'

test.describe('/services waitlist form', () => {
  test('form renders with email input and submit button', async ({ page }) => {
    await page.goto('/services')
    await expect(page.getByLabel('Email address')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Join waitlist' })).toBeVisible()
  })

  test('submit button is disabled and shows loading text while submitting', async ({ page }) => {
    await page.goto('/services')

    // Intercept the Telegram API call and delay it so we can observe loading state
    await page.route('**/api.telegram.org/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join waitlist' }).click()

    // During the delay the button should be disabled and show loading text
    await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled()
  })

  test('successful submission shows inline success message without page reload', async ({ page }) => {
    await page.goto('/services')

    await page.route('**/api.telegram.org/**', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    )

    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join waitlist' }).click()

    await expect(page.getByText("You're on the list.")).toBeVisible()
    // Form should be replaced by success message — no navigation occurred
    await expect(page).toHaveURL(/\/services/)
  })

  test('empty email field prevents submission via browser validation', async ({ page }) => {
    await page.goto('/services')

    // Track whether the Telegram API was called
    let apiCalled = false
    await page.route('**/api.telegram.org/**', (route) => {
      apiCalled = true
      return route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.getByRole('button', { name: 'Join waitlist' }).click()

    // Native browser validation prevents the request from being sent
    expect(apiCalled).toBe(false)
    // The form should still be visible (no success message)
    await expect(page.getByLabel('Email address')).toBeVisible()
  })

  test('network failure shows inline error message without page reload', async ({ page }) => {
    await page.goto('/services')

    await page.route('**/api.telegram.org/**', (route) => route.abort())

    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join waitlist' }).click()

    await expect(page.getByText('Something went wrong — try again.')).toBeVisible()
    await expect(page).toHaveURL(/\/services/)
  })
})

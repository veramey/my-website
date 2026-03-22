import { test, expect } from '@playwright/test'

test.describe('/services waitlist form', () => {
  test('form renders with email input and submit button', async ({ page }) => {
    await page.goto('/services')
    await expect(page.getByLabel('Email address')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Join the waitlist' })).toBeVisible()
  })

  test('shows loading state on submit', async ({ page }) => {
    await page.goto('/services')

    // Intercept the Telegram API call so we can observe the loading state
    await page.route('**/api.telegram.org/**', async (route) => {
      // Delay response to catch loading state
      await new Promise((resolve) => setTimeout(resolve, 300))
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the waitlist' }).click()

    // Button should be disabled or show loading text during request
    const button = page.getByRole('button', { name: /Sending|Join the waitlist/ })
    await expect(button).toBeDisabled()
  })

  test('shows inline success message after successful submission', async ({ page }) => {
    await page.goto('/services')

    await page.route('**/api.telegram.org/**', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    )

    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the waitlist' }).click()

    await expect(page.getByText("You're on the list.")).toBeVisible()
    // Page should not have navigated away
    await expect(page).toHaveURL('/services')
  })

  test('shows inline error message on failed submission', async ({ page }) => {
    await page.goto('/services')

    await page.route('**/api.telegram.org/**', (route) =>
      route.fulfill({ status: 400, body: JSON.stringify({ ok: false, description: 'Bad Request' }) })
    )

    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the waitlist' }).click()

    await expect(page.getByText('Something went wrong — try again.')).toBeVisible()
    // Page should not have navigated away
    await expect(page).toHaveURL('/services')
  })

  test('error resets when user starts typing after an error', async ({ page }) => {
    await page.goto('/services')

    await page.route('**/api.telegram.org/**', (route) =>
      route.fulfill({ status: 400, body: JSON.stringify({ ok: false }) })
    )

    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the waitlist' }).click()
    await expect(page.getByText('Something went wrong — try again.')).toBeVisible()

    // Typing should clear the error
    await page.getByLabel('Email address').type('a')
    await expect(page.getByText('Something went wrong — try again.')).not.toBeVisible()
  })

  test('empty email does not submit (native validation)', async ({ page }) => {
    await page.goto('/services')

    let requestMade = false
    await page.route('**/api.telegram.org/**', (route) => {
      requestMade = true
      route.continue()
    })

    // Click submit without filling email
    await page.getByRole('button', { name: 'Join the waitlist' }).click()

    // Native browser validation prevents submission — no network request
    expect(requestMade).toBe(false)
    // Success message should NOT appear
    await expect(page.getByText("You're on the list.")).not.toBeVisible()
  })
})

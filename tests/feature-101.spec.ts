import { test, expect } from '@playwright/test'

test.describe('/services waitlist form', () => {
  test('shows inline success message after successful submission', async ({ page }) => {
    await page.route('**/api.telegram.org/**', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.goto('/services')
    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the waitlist' }).click()

    await expect(page.getByText("You're on the list.")).toBeVisible()
    expect(page.url()).toContain('/services')
  })

  test('shows loading state during submission', async ({ page }) => {
    await page.route('**/api.telegram.org/**', (route) => {
      setTimeout(() => route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }), 500)
    })

    await page.goto('/services')
    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the waitlist' }).click()

    await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled()
  })

  test('Telegram request body contains services-specific prefix and email', async ({ page }) => {
    let capturedBody = ''

    await page.route('**/api.telegram.org/**', async (route) => {
      capturedBody = route.request().postData() ?? ''
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.goto('/services')
    await page.getByLabel('Email address').fill('agency@test.com')
    await page.getByRole('button', { name: 'Join the waitlist' }).click()

    await expect(page.getByText("You're on the list.")).toBeVisible()

    expect(capturedBody).toContain('🛎️ New services waitlist signup:')
    expect(capturedBody).toContain('agency%40test.com')
  })

  test('shows inline error message on Telegram API failure', async ({ page }) => {
    await page.route('**/api.telegram.org/**', (route) => {
      route.fulfill({ status: 500, body: JSON.stringify({ ok: false }) })
    })

    await page.goto('/services')
    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Join the waitlist' }).click()

    await expect(page.getByText('Something went wrong — try again.')).toBeVisible()
    await expect(page.getByLabel('Email address')).toBeVisible()
    expect(page.url()).toContain('/services')
  })

  test('has exactly one email input and one submit button', async ({ page }) => {
    await page.goto('/services')

    const emailInputs = page.locator('input[type="email"]')
    await expect(emailInputs).toHaveCount(1)

    const submitButtons = page.getByRole('button', { name: 'Join the waitlist' })
    await expect(submitButtons).toHaveCount(1)
  })
})

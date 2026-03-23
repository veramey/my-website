import { test, expect } from '@playwright/test'

test.describe('Newsletter page — Final CTA block (issue #231)', () => {
  test.beforeEach(async ({ page }) => {
    // Mock Telegram API so form submissions succeed without real credentials
    await page.route('https://api.telegram.org/**', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })
    await page.goto('/newsletter')
  })

  // Happy path: top form submits successfully
  test('top form submits and shows success message', async ({ page }) => {
    const topInput = page.locator('#email')
    await topInput.fill('test@example.com')
    await page.getByRole('button', { name: 'Join the newsletter' }).click()
    await expect(page.getByText("You're in.")).toBeVisible()
    // CTA form should still be present (not affected)
    await expect(page.locator('#email-cta')).toBeVisible()
  })

  // Happy path: Final CTA form submits independently
  test('Final CTA form submits independently and shows success message', async ({ page }) => {
    const ctaInput = page.locator('#email-cta')
    await ctaInput.fill('cta@example.com')
    await page.getByRole('button', { name: 'Subscribe' }).click()
    // Success message appears in CTA section
    await expect(page.getByText("You're in.").last()).toBeVisible()
    // Top form input is still present and unaffected
    await expect(page.locator('#email')).toBeVisible()
  })

  // Happy path: Final CTA section renders with correct heading
  test('Final CTA section renders with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Get one useful AI ops idea per week' })).toBeVisible()
  })

  // Edge case: no duplicate DOM ids
  test('no duplicate DOM ids for email or email-cta', async ({ page }) => {
    const emailCount = await page.locator('[id="email"]').count()
    const ctaCount = await page.locator('[id="email-cta"]').count()
    expect(emailCount).toBe(1)
    expect(ctaCount).toBe(1)
  })

  // Edge case: label htmlFor matches input id in CTA form
  test('CTA form label has htmlFor="email-cta"', async ({ page }) => {
    const label = page.locator('label[for="email-cta"]')
    await expect(label).toBeVisible()
  })
})

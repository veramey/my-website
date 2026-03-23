import { test, expect } from '@playwright/test'

test.describe('Newsletter page — Final CTA block', () => {
  test('Final CTA section renders with correct heading', async ({ page }) => {
    await page.goto('/newsletter')

    const ctaSection = page.locator('section.bg-gray-50.border-t')
    await expect(ctaSection).toBeVisible()
    await expect(ctaSection.getByRole('heading', { name: 'Get one useful AI ops idea per week' })).toBeVisible()
  })

  test('Bottom CTA form submits successfully and shows confirmation', async ({ page }) => {
    await page.route('**/api.telegram.org/**', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.goto('/newsletter')

    const ctaInput = page.locator('#email-cta')
    await ctaInput.fill('cta@example.com')
    await page.getByRole('button', { name: 'Subscribe' }).click()

    const ctaSection = page.locator('section.bg-gray-50.border-t')
    await expect(ctaSection.getByText("You're in.")).toBeVisible()
  })

  test('Both forms operate independently', async ({ page }) => {
    await page.route('**/api.telegram.org/**', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.goto('/newsletter')

    // Submit the top form
    const topInput = page.locator('#email')
    await topInput.fill('top@example.com')
    await page.getByRole('button', { name: 'Join the newsletter' }).click()
    await expect(page.locator('#email')).not.toBeVisible() // replaced by success message

    // CTA input should still be empty and visible
    await expect(page.locator('#email-cta')).toBeVisible()
    await expect(page.locator('#email-cta')).toHaveValue('')
  })

  test('No duplicate id attributes on email inputs', async ({ page }) => {
    await page.goto('/newsletter')

    const emailCount = await page.locator('[id="email"]').count()
    const emailCtaCount = await page.locator('[id="email-cta"]').count()

    expect(emailCount).toBe(1)
    expect(emailCtaCount).toBe(1)
  })

  test('CTA label is correctly associated with email-cta input', async ({ page }) => {
    await page.goto('/newsletter')

    const label = page.locator('label[for="email-cta"]')
    await expect(label).toBeVisible()

    // Clicking the label should focus the input
    await label.click()
    await expect(page.locator('#email-cta')).toBeFocused()
  })
})

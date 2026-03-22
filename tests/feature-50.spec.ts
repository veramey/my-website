/**
 * Issue #50 — CI/CD Pipeline Verification
 *
 * This issue is a CI/CD pipeline verification task, NOT a user-facing UI feature.
 * The test cases in the issue target GitHub Actions workflow runs and PR merge
 * status observable via the GitHub UI — they cannot be automated via Playwright
 * against the local dev server.
 *
 * The tests below confirm the site itself is unaffected by any CI/CD changes
 * (i.e. no regressions were introduced) without duplicating smoke tests.
 */

import { test, expect } from '@playwright/test'

test.describe('Issue #50 — no UI regressions from CI/CD changes', () => {
  test('home page returns HTTP 200', async ({ request }) => {
    const response = await request.get('/')
    expect(response.status()).toBe(200)
  })

  test('home page title is non-empty', async ({ page }) => {
    await page.goto('/')
    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)
  })
})

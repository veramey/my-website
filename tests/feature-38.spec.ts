import { test, expect } from '@playwright/test'

const PAGE = '/templates/client-onboarding-ai-checklist'

test.describe('Client Onboarding AI Checklist page — SEO and download form', () => {
  test('SEO meta tags are present and correct', async ({ page }) => {
    await page.goto(PAGE)

    // <title> is non-empty
    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)

    // <meta name="description"> exists with content
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(0)

    // OG tags exist
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    expect(ogTitle).toBeTruthy()

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content')
    expect(ogDescription).toBeTruthy()

    // canonical href ends with the expected path
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBeTruthy()
    expect(canonical!.endsWith('/templates/client-onboarding-ai-checklist')).toBe(true)
  })

  test('download form submits and shows confirmation without page reload', async ({ page }) => {
    await page.goto(PAGE)

    const urlBefore = page.url()

    // Fill email and submit
    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Download free' }).click()

    // Confirmation message appears
    await expect(page.getByText("You're all set.")).toBeVisible()

    // URL has not changed (no reload or redirect)
    expect(page.url()).toBe(urlBefore)
  })

  test('email input has an id and a matching label htmlFor', async ({ page }) => {
    await page.goto(PAGE)

    const input = page.getByLabel('Email address')
    const inputId = await input.getAttribute('id')
    expect(inputId).toBeTruthy()

    // label with matching for attribute exists
    const label = page.locator(`label[for="${inputId}"]`)
    await expect(label).toBeVisible()
    const labelText = await label.textContent()
    expect(labelText?.trim().length).toBeGreaterThan(0)
  })

  test('submit button with empty email does not show confirmation', async ({ page }) => {
    await page.goto(PAGE)

    // Do not fill the email input — click submit directly
    await page.getByRole('button', { name: 'Download free' }).click()

    // Confirmation message should NOT appear (browser required validation blocks it)
    await expect(page.getByText("You're all set.")).not.toBeVisible()
  })

  test('confirmation message replaces the form after successful submission', async ({ page }) => {
    await page.goto(PAGE)

    await page.getByLabel('Email address').fill('test@example.com')
    await page.getByRole('button', { name: 'Download free' }).click()

    // Confirmation visible
    await expect(page.getByText("You're all set.")).toBeVisible()

    // Email input and submit button are no longer visible
    await expect(page.getByLabel('Email address')).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'Download free' })).not.toBeVisible()
  })
})

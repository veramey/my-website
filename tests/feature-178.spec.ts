import { test, expect } from '@playwright/test'

const PAGE_URL = '/templates/client-onboarding-ai-checklist'

test.describe('Block 9 — Final CTA on client onboarding template page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL)
  })

  test('Block 9 renders with correct heading and subtext', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Download the AI Ops Starter Kit' })).toBeVisible()
    await expect(page.getByText('Turn your onboarding from improvised to repeatable.')).toBeVisible()
  })

  test('Block 9 section label renders', async ({ page }) => {
    await expect(page.getByText('Ready to start')).toBeVisible()
  })

  test('"Download free" CTA in Block 9 scrolls to email form', async ({ page }) => {
    // Click the anchor link in Block 9 (before the download form)
    const ctaLink = page.getByRole('link', { name: 'Download free' })
    await ctaLink.click()

    const downloadForm = page.locator('section#download-form')
    await expect(downloadForm).toBeInViewport()
  })

  test('Block 9 appears between Block 8 FAQ and email capture section in DOM', async ({ page }) => {
    const lastFaqQuestion = page.getByText('What tools do I need?')
    const block9Heading = page.getByRole('heading', { name: 'Download the AI Ops Starter Kit' })
    const downloadForm = page.locator('section#download-form')

    // Verify all three elements exist
    await expect(lastFaqQuestion).toBeVisible()
    await expect(block9Heading).toBeVisible()
    await expect(downloadForm).toBeVisible()

    // Check DOM order: lastFaqQuestion < block9Heading < downloadForm
    const faqBox = await lastFaqQuestion.boundingBox()
    const headingBox = await block9Heading.boundingBox()
    const formBox = await downloadForm.boundingBox()

    expect(faqBox!.y).toBeLessThan(headingBox!.y)
    expect(headingBox!.y).toBeLessThan(formBox!.y)
  })

  test('Block 9 has white background (not gray)', async ({ page }) => {
    // Find the section containing the "Ready to start" label and "Download the AI Ops Starter Kit" heading
    const block9 = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Download the AI Ops Starter Kit' }),
    })

    await expect(block9).not.toHaveClass(/bg-gray-50/)
  })
})

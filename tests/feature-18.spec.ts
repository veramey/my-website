import { test, expect } from '@playwright/test'

const PAGE = '/guides/automate-client-onboarding-small-agency'

test.describe('Automate Client Onboarding article page', () => {
  test('page renders with correct title and meta description', async ({ page }) => {
    await page.goto(PAGE)

    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)

    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).not.toBeNull()
    expect(description!.length).toBeLessThanOrEqual(160)
  })

  test('all four workflow sections are present and ordered', async ({ page }) => {
    await page.goto(PAGE)

    const headings = page.locator('h2')
    const texts = await headings.allTextContents()

    // Verify the four workflow section headings appear (partial match, order matters)
    const intakeIdx = texts.findIndex((t) => /intake form/i.test(t))
    const aiIdx = texts.findIndex((t) => /ai-assisted processing/i.test(t))
    const kickoffIdx = texts.findIndex((t) => /kickoff prep/i.test(t))
    const followupIdx = texts.findIndex((t) => /follow-up handoff/i.test(t))

    expect(intakeIdx).toBeGreaterThanOrEqual(0)
    expect(aiIdx).toBeGreaterThanOrEqual(0)
    expect(kickoffIdx).toBeGreaterThanOrEqual(0)
    expect(followupIdx).toBeGreaterThanOrEqual(0)

    // Verify document order
    expect(intakeIdx).toBeLessThan(aiIdx)
    expect(aiIdx).toBeLessThan(kickoffIdx)
    expect(kickoffIdx).toBeLessThan(followupIdx)

    // Verify each has the expected text-xl font-semibold class
    const stepHeadings = [
      page.getByRole('heading', { name: /intake form/i }),
      page.getByRole('heading', { name: /ai-assisted processing/i }),
      page.getByRole('heading', { name: /kickoff prep/i }),
      page.getByRole('heading', { name: /follow-up handoff/i }),
    ]
    for (const heading of stepHeadings) {
      await expect(heading).toBeVisible()
      await expect(heading).toHaveClass(/text-xl/)
      await expect(heading).toHaveClass(/font-semibold/)
    }
  })

  test('tool callout blocks appear at each workflow step', async ({ page }) => {
    await page.goto(PAGE)

    // Each aside has bg-gray-50 border border-gray-100 rounded-lg p-5
    const callouts = page.locator('aside.bg-gray-50.border.border-gray-100.rounded-lg.p-5')
    await expect(callouts).toHaveCount(4)

    for (let i = 0; i < 4; i++) {
      await expect(callouts.nth(i)).toBeVisible()
    }
  })

  test('internal links use descriptive text and correct styling', async ({ page }) => {
    await page.goto(PAGE)

    const internalLinks = [
      { href: '/templates/client-onboarding-ai-checklist', textPattern: /checklist/i },
      { href: '/tools/best-ai-tools-small-agencies', textPattern: /best ai tools/i },
      { href: '/templates/ai-ops-starter-kit', textPattern: /ai ops starter kit/i },
    ]

    for (const { href, textPattern } of internalLinks) {
      const link = page.locator(`a[href="${href}"]`)
      await expect(link).toBeVisible()

      const text = await link.textContent()
      expect(text).not.toBeNull()
      expect(text!.trim().toLowerCase()).not.toBe('click here')
      expect(text!.trim().toLowerCase()).not.toBe('here')
      expect(text).toMatch(textPattern)

      await expect(link).toHaveClass(/text-blue-600/)
      await expect(link).toHaveClass(/underline/)
    }
  })

  test('page renders full content statically without data-fetching errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto(PAGE)

    // All four step headings must be visible — content is fully rendered
    await expect(page.getByRole('heading', { name: /intake form/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /ai-assisted processing/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /kickoff prep/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /follow-up handoff/i })).toBeVisible()

    // No console errors related to missing data
    const dataErrors = errors.filter((e) => /fetch|getServerSideProps|undefined/i.test(e))
    expect(dataErrors).toHaveLength(0)
  })
})

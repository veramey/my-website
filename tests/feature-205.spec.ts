import { test, expect } from '@playwright/test'

const ALL_ARTICLE_PATHS = [
  '/guides/7-workflows-automate-small-agency',
  '/guides/discovery-call-to-proposal-workflow-agency',
  '/tools/best-ai-meeting-assistants-agencies',
  '/tools/best-ai-stack-agencies-under-150',
  '/tools/best-ai-tools-sops-small-agencies',
  '/tools/best-ai-tools-small-agencies',
  '/guides/automate-client-onboarding-small-agency',
]

test.describe('Related Resources section — issue #205', () => {
  test('renders on a no-CTA article with 3 cards', async ({ page }) => {
    await page.goto('/guides/7-workflows-automate-small-agency')

    const section = page.locator('section', { hasText: 'Related resources' })
    await expect(section).toBeVisible()

    const cards = section.locator('a[aria-label^="Read: "]')
    await expect(cards).toHaveCount(3)
  })

  test('Related Resources appears before Final CTA on best-ai-tools-small-agencies', async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies')

    const relatedSection = page.locator('section', { hasText: 'Related resources' })
    const ctaSection = page.locator('div', { hasText: 'What to do next' }).first()

    await expect(relatedSection).toBeVisible()
    await expect(ctaSection).toBeVisible()

    // Check DOM order: Related Resources comes before Final CTA
    const relatedBox = await relatedSection.boundingBox()
    const ctaBox = await ctaSection.boundingBox()
    expect(relatedBox!.y).toBeLessThan(ctaBox!.y)
  })

  test('Related Resources appears before Final CTA on automate-client-onboarding', async ({ page }) => {
    await page.goto('/guides/automate-client-onboarding-small-agency')

    const sections = page.locator('article section')
    const texts = await sections.allInnerTexts()
    const relatedIndex = texts.findIndex(t => t.includes('Related resources'))
    const ctaIndex = texts.findIndex(t => t.includes('What to do next'))

    expect(relatedIndex).toBeGreaterThanOrEqual(0)
    expect(ctaIndex).toBeGreaterThan(relatedIndex)
  })

  test('discovery-call article cards link to correct destinations with title and description', async ({ page }) => {
    await page.goto('/guides/discovery-call-to-proposal-workflow-agency')

    const section = page.locator('section', { hasText: 'Related resources' })
    await expect(section).toBeVisible()

    const expectedHrefs = [
      '/guides/automate-client-onboarding-small-agency',
      '/tools/best-ai-meeting-assistants-agencies',
      '/guides/7-workflows-automate-small-agency',
    ]

    for (const href of expectedHrefs) {
      const card = section.locator(`a[href="${href}"]`)
      await expect(card).toBeVisible()

      // title paragraph
      const title = card.locator('p.font-medium.text-gray-900')
      await expect(title).not.toBeEmpty()

      // description paragraph
      const desc = card.locator('p.text-gray-500')
      await expect(desc).not.toBeEmpty()
    }
  })

  test('all 7 articles have a Related Resources section with 3 aria-labeled cards', async ({ page }) => {
    for (const path of ALL_ARTICLE_PATHS) {
      await page.goto(path)

      const section = page.locator('section', { hasText: 'Related resources' })
      await expect(section, `Missing Related Resources on ${path}`).toBeVisible()

      const cards = section.locator('a[aria-label^="Read: "]')
      await expect(cards, `Expected 3 cards on ${path}`).toHaveCount(3)
    }
  })

  test('each card has hover:border-gray-300 and transition-colors classes', async ({ page }) => {
    await page.goto('/guides/7-workflows-automate-small-agency')

    const section = page.locator('section', { hasText: 'Related resources' })
    const cards = section.locator('a[aria-label^="Read: "]')

    const count = await cards.count()
    expect(count).toBe(3)

    for (let i = 0; i < count; i++) {
      const className = await cards.nth(i).getAttribute('class')
      expect(className).toContain('hover:border-gray-300')
      expect(className).toContain('transition-colors')
    }
  })
})

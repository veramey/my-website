import { test, expect } from '@playwright/test'

const PAGE = '/tools/best-ai-tools-small-agencies'

test.describe('Final CTA block — issue #157', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE)
  })

  test('"What to do next" heading renders after "How to Choose" section', async ({ page }) => {
    const howToChoose = page.getByRole('heading', { name: 'How to Choose Your Stack' })
    const whatToDoNext = page.getByRole('heading', { name: 'What to do next' })

    await expect(howToChoose).toBeVisible()
    await expect(whatToDoNext).toBeVisible()

    // Confirm document order: How to Choose appears before What to do next
    const order = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2')).map(h => h.textContent?.trim())
      const chooseIdx = headings.findIndex(t => t === 'How to Choose Your Stack')
      const nextIdx = headings.findIndex(t => t === 'What to do next')
      return { chooseIdx, nextIdx }
    })
    expect(order.chooseIdx).toBeGreaterThanOrEqual(0)
    expect(order.nextIdx).toBeGreaterThan(order.chooseIdx)
  })

  test('all three CTA cards render with correct destinations', async ({ page }) => {
    const templateCard = page.locator('a[href="/templates/client-onboarding-ai-checklist"]')
    const guideCard = page.locator('a[href="/guides/automate-client-onboarding-small-agency"]')
    const newsletterCard = page.locator('a[href="/newsletter"]')

    await expect(templateCard).toBeVisible()
    await expect(guideCard).toBeVisible()
    await expect(newsletterCard).toBeVisible()

    // Each card has a bold title and a gray descriptor
    await expect(templateCard.locator('p.font-medium')).toBeVisible()
    await expect(templateCard.locator('p.text-gray-500')).toBeVisible()

    await expect(guideCard.locator('p.font-medium')).toBeVisible()
    await expect(guideCard.locator('p.text-gray-500')).toBeVisible()

    await expect(newsletterCard.locator('p.font-medium')).toBeVisible()
    await expect(newsletterCard.locator('p.text-gray-500')).toBeVisible()
  })

  test('newsletter card navigates to /newsletter without 404', async ({ page }) => {
    await page.click('a[href="/newsletter"]')
    await expect(page).toHaveURL(/\/newsletter/)
    await expect(page.locator('body')).not.toContainText('404')
  })

  test('templates card navigates to /templates/client-onboarding-ai-checklist without 404', async ({ page }) => {
    await page.click('a[href="/templates/client-onboarding-ai-checklist"]')
    await expect(page).toHaveURL(/\/templates\/client-onboarding-ai-checklist/)
    await expect(page.locator('body')).not.toContainText('404')
  })

  test('CTA block is inside <article> element', async ({ page }) => {
    const isDescendant = await page.evaluate(() => {
      const article = document.querySelector('article')
      const ctaWrapper = document.querySelector('article div.mt-10.border-t')
      return article !== null && ctaWrapper !== null && article.contains(ctaWrapper)
    })
    expect(isDescendant).toBe(true)
  })

  test('CTA cards have hover:border-gray-300 class', async ({ page }) => {
    const cards = page.locator('a.hover\\:border-gray-300')
    await expect(cards).toHaveCount(3)
  })
})

import { test, expect } from '@playwright/test'

test.describe("'What you'll find here' block on /about", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  // Happy path: section renders with correct heading
  test("section exists with heading 'What you'll find here'", async ({ page }) => {
    const section = page.locator('section').filter({ hasText: "What you'll find here" })
    await expect(section).toBeVisible()
    await expect(section.getByRole('heading', { name: "What you'll find here" })).toBeVisible()
  })

  // Happy path: all four list items render with correct link targets
  test('ul contains exactly four li elements with correct links', async ({ page }) => {
    const section = page.locator('section').filter({ hasText: "What you'll find here" })
    const listItems = section.locator('ul li')
    await expect(listItems).toHaveCount(4)

    const guides = listItems.nth(0).getByRole('link', { name: 'Guides' })
    await expect(guides).toBeVisible()
    await expect(guides).toHaveAttribute('href', '/guides')

    const tools = listItems.nth(1).getByRole('link', { name: 'Tool roundups' })
    await expect(tools).toBeVisible()
    await expect(tools).toHaveAttribute('href', '/tools')

    const templates = listItems.nth(2).getByRole('link', { name: 'Templates' })
    await expect(templates).toBeVisible()
    await expect(templates).toHaveAttribute('href', '/templates')

    const newsletter = listItems.nth(3).getByRole('link', { name: 'Newsletter' })
    await expect(newsletter).toBeVisible()
    await expect(newsletter).toHaveAttribute('href', '/newsletter')
  })

  // Happy path: CTA 'Browse resources →' link renders and points to /guides
  test("CTA 'Browse resources →' link points to /guides", async ({ page }) => {
    const section = page.locator('section').filter({ hasText: "What you'll find here" })
    const cta = section.getByRole('link', { name: 'Browse resources →' })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/guides')
  })

  // Edge case: section appears after Core Beliefs block
  test("section appears after Core Beliefs block in DOM order", async ({ page }) => {
    const coreBeliefs = page.locator('section').filter({ hasText: 'Core Beliefs' })
    const whatYouFind = page.locator('section').filter({ hasText: "What you'll find here" })

    const coreBeliefsBox = await coreBeliefs.boundingBox()
    const whatYouFindBox = await whatYouFind.boundingBox()

    expect(coreBeliefsBox).not.toBeNull()
    expect(whatYouFindBox).not.toBeNull()
    expect(whatYouFindBox!.y).toBeGreaterThan(coreBeliefsBox!.y)
  })

  // Edge case: links are Next.js Link components (client-side navigation, no full reload)
  test("clicking 'Guides' link navigates client-side without full page reload", async ({ page }) => {
    let htmlRequests = 0
    page.on('request', (req) => {
      if (req.resourceType() === 'document' && req.url().includes('/guides')) {
        htmlRequests++
      }
    })

    const section = page.locator('section').filter({ hasText: "What you'll find here" })
    const guidesLink = section.locator('ul li').nth(0).getByRole('link', { name: 'Guides' })
    await guidesLink.click()

    await page.waitForURL('**/guides')
    // Next.js client-side navigation does not issue a new HTML document request
    expect(htmlRequests).toBe(0)
  })
})

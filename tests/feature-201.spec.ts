import { test, expect } from '@playwright/test'

const PAGE = '/templates'

test.describe('Coming Soon section on /templates (issue #201)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE)
  })

  test('Coming Soon section renders with correct heading and all four items', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Coming soon' })).toBeVisible()
    await expect(page.getByText('Proposal workflow template')).toBeVisible()
    await expect(page.getByText('Kickoff agenda template')).toBeVisible()
    await expect(page.getByText('SOP drafting prompt pack')).toBeVisible()
    await expect(page.getByText('Client follow-up template')).toBeVisible()
  })

  test('Newsletter CTA link is present and points to /newsletter', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Join newsletter for new templates' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/newsletter')
  })

  test('Page section order is correct', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1, name: 'Templates' })
    const whyHeading = page.getByRole('heading', { name: 'Why Templates Matter' })
    const comingSoonHeading = page.getByRole('heading', { name: 'Coming soon' })
    const footer = page.locator('footer')

    const h1Box = await h1.boundingBox()
    const whyBox = await whyHeading.boundingBox()
    const comingSoonBox = await comingSoonHeading.boundingBox()
    const footerBox = await footer.boundingBox()

    expect(h1Box).not.toBeNull()
    expect(whyBox).not.toBeNull()
    expect(comingSoonBox).not.toBeNull()
    expect(footerBox).not.toBeNull()

    expect(whyBox!.y).toBeGreaterThan(h1Box!.y)
    expect(comingSoonBox!.y).toBeGreaterThan(whyBox!.y)
    expect(footerBox!.y).toBeGreaterThan(comingSoonBox!.y)
  })

  test('Newsletter CTA link applies correct ghost/underline styles', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Join newsletter for new templates' })
    await expect(link).toHaveClass(/text-sm/)
    await expect(link).toHaveClass(/font-medium/)
    await expect(link).toHaveClass(/text-gray-900/)
    await expect(link).toHaveClass(/underline/)
    await expect(link).toHaveClass(/underline-offset-2/)
  })

  test('Coming Soon section is server-rendered (present in initial HTML)', async ({ page }) => {
    let initialHTML = ''
    page.on('response', async (response) => {
      if (response.url().includes(PAGE) && response.status() === 200) {
        const ct = response.headers()['content-type'] ?? ''
        if (ct.includes('text/html')) {
          initialHTML = await response.text()
        }
      }
    })
    await page.goto(PAGE)
    // The heading text should be in the raw HTML, confirming server rendering
    expect(initialHTML).toContain('Coming soon')
  })
})

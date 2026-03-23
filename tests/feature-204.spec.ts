import { test, expect } from '@playwright/test'

test.describe('Issue 204 — Reading time metadata in article headers', () => {
  test('7-workflows page has correct reading time metadata', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/guides/7-workflows-automate-small-agency`)
    const meta = page.locator('article header p.mt-3.text-sm.text-gray-400')
    await expect(meta).toHaveText('8–10 min read · For: small agency operators')
  })

  test('discovery-call page has correct reading time metadata', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/guides/discovery-call-to-proposal-workflow-agency`)
    const meta = page.locator('article header p.mt-3.text-sm.text-gray-400')
    await expect(meta).toHaveText('6–8 min read · For: agency founders and account managers')
  })

  test('best-ai-meeting-assistants page has correct reading time metadata with proper classes', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/tools/best-ai-meeting-assistants-agencies`)
    const meta = page.locator('article header p.mt-3.text-sm.text-gray-400')
    await expect(meta).toHaveText('5–7 min read · For: client-facing agency teams')
    await expect(meta).toHaveClass(/mt-3/)
    await expect(meta).toHaveClass(/text-sm/)
    await expect(meta).toHaveClass(/text-gray-400/)
  })

  test('best-ai-stack page has correct reading time metadata', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/tools/best-ai-stack-agencies-under-150`)
    const meta = page.locator('article header p.mt-3.text-sm.text-gray-400')
    await expect(meta).toHaveText('5–6 min read · For: agency ops leads')
  })

  test('best-ai-tools-sops page has correct reading time metadata', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/tools/best-ai-tools-sops-small-agencies`)
    const meta = page.locator('article header p.mt-3.text-sm.text-gray-400')
    await expect(meta).toHaveText('5–7 min read · For: agency operators and team leads')
  })

  test('discovery-call page uses en-dash in reading time range', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/guides/discovery-call-to-proposal-workflow-agency`)
    const meta = page.locator('article header p.mt-3.text-sm.text-gray-400')
    const text = await meta.textContent()
    // U+2013 en-dash, not hyphen U+002D or em-dash U+2014
    expect(text).toContain('\u20136\u20138 min read'.replace(/\u2013/g, '–'))
    expect(text).toMatch(/6–8 min read/)
    expect(text).not.toMatch(/6-8 min read/)
    expect(text).not.toMatch(/6—8 min read/)
  })

  test('each article header has exactly one reading time metadata element', async ({ page, baseURL }) => {
    const urls = [
      '/guides/7-workflows-automate-small-agency',
      '/guides/discovery-call-to-proposal-workflow-agency',
      '/tools/best-ai-meeting-assistants-agencies',
      '/tools/best-ai-stack-agencies-under-150',
      '/tools/best-ai-tools-sops-small-agencies',
    ]

    for (const url of urls) {
      await page.goto(`${baseURL}${url}`)
      const metas = page.locator('article header p.mt-3.text-sm.text-gray-400')
      await expect(metas).toHaveCount(1)
    }
  })
})

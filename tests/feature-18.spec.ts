import { test, expect } from '@playwright/test';

const PAGE = '/guides/automate-client-onboarding-small-agency';

test('page renders with correct title and meta description', async ({ page }) => {
  await page.goto(PAGE);

  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);

  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toBeTruthy();
  expect(description!.length).toBeLessThanOrEqual(160);
});

test('all four workflow sections are present and ordered', async ({ page }) => {
  await page.goto(PAGE);

  const headings = page.locator('h2');
  const count = await headings.count();
  expect(count).toBe(4);

  const texts = await headings.allTextContents();
  expect(texts[0].toLowerCase()).toContain('intake');
  expect(texts[1].toLowerCase()).toContain('ai');
  expect(texts[2].toLowerCase()).toContain('kickoff');
  expect(texts[3].toLowerCase()).toContain('follow');

  // Each section (except the first) should be preceded by a border-t divider
  const dividedSections = page.locator('section.border-t');
  expect(await dividedSections.count()).toBe(3);
});

test('tool callout blocks appear at each workflow step', async ({ page }) => {
  await page.goto(PAGE);

  const callouts = page.locator('.bg-gray-50.border.border-gray-100.rounded-lg.p-5');
  await expect(callouts).toHaveCount(4);

  for (let i = 0; i < 4; i++) {
    await expect(callouts.nth(i)).toBeVisible();
  }
});

test('internal links use descriptive text and correct styling', async ({ page }) => {
  await page.goto(PAGE);

  const internalLinks = [
    '/templates/client-onboarding-ai-checklist',
    '/tools/best-ai-tools-small-agencies',
    '/templates/ai-ops-starter-kit',
  ];

  for (const href of internalLinks) {
    const link = page.locator(`a[href="${href}"]`);
    await expect(link).toBeVisible();

    const text = await link.textContent();
    expect(text?.toLowerCase()).not.toBe('click here');
    expect(text?.toLowerCase()).not.toBe('here');
    expect(text!.trim().length).toBeGreaterThan(0);

    await expect(link).toHaveClass(/text-blue-600/);
    await expect(link).toHaveClass(/underline/);
  }
});

test('page is statically exportable — content renders without client-side data fetching', async ({ page }) => {
  // Verify no network requests to getServerSideProps
  const ssrCalls: string[] = [];
  page.on('request', (req) => {
    if (req.url().includes('__nextjs_original-stack-frame') || req.url().includes('_next/data')) {
      ssrCalls.push(req.url());
    }
  });

  await page.goto(PAGE);

  // Article content should be visible
  await expect(page.locator('article')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();

  // No server-side data calls should be made for a static page
  const serverDataCalls = ssrCalls.filter(url => url.includes('automate-client-onboarding'));
  expect(serverDataCalls).toHaveLength(0);
});

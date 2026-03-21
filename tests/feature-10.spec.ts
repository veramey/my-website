import { test, expect } from '@playwright/test';

// Tests for issue #10: missing pages causing smoke test failures on the live site.
// Verifies that all pages linked from the home page return 200.

const standalonePages = [
  { path: './guides', name: 'Guides' },
  { path: './tools', name: 'Tools' },
  { path: './templates', name: 'Templates' },
  { path: './newsletter', name: 'Newsletter' },
  { path: './about', name: 'About' },
];

const articlePages = [
  { path: './guides/automate-client-onboarding-small-agency', name: 'Automate client onboarding guide' },
  { path: './tools/best-ai-tools-small-agencies', name: 'Best AI tools article' },
  { path: './tools/best-ai-meeting-assistants-agencies', name: 'Best meeting assistants article' },
  { path: './templates/client-onboarding-ai-checklist', name: 'Client onboarding checklist template' },
];

for (const { path, name } of [...standalonePages, ...articlePages]) {
  test(`${name} page loads (200)`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBeLessThan(400);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
}

test('Guides index lists at least one guide', async ({ page }) => {
  await page.goto('./guides');
  await expect(page.locator('h1')).toBeVisible();
  const links = page.locator('a[href*="/guides/"]');
  expect(await links.count()).toBeGreaterThan(0);
});

test('Tools index lists at least one tool article', async ({ page }) => {
  await page.goto('./tools');
  await expect(page.locator('h1')).toBeVisible();
  const links = page.locator('a[href*="/tools/"]');
  expect(await links.count()).toBeGreaterThan(0);
});

test('Templates index lists at least one template', async ({ page }) => {
  await page.goto('./templates');
  await expect(page.locator('h1')).toBeVisible();
  const links = page.locator('a[href*="/templates/"]');
  expect(await links.count()).toBeGreaterThan(0);
});

test('Newsletter page has email signup form', async ({ page }) => {
  await page.goto('./newsletter');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test('About page has expected content sections', async ({ page }) => {
  await page.goto('./about');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

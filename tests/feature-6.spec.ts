import { test, expect } from '@playwright/test';

const PATH = '/tools/best-ai-meeting-assistants-agencies';

test('article page loads with correct title', async ({ page }) => {
  const response = await page.goto(PATH);
  expect(response?.status()).toBeLessThan(400);

  const title = await page.title();
  expect(title).toContain('Meeting Assistants');
});

test('article page has nav and footer', async ({ page }) => {
  await page.goto(PATH);
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('article page has h1 with correct content', async ({ page }) => {
  await page.goto(PATH);
  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
  await expect(h1).toContainText('Meeting Assistants');
});

test('article page lists all 5 tools', async ({ page }) => {
  await page.goto(PATH);
  for (const toolName of ['Fireflies.ai', 'Otter.ai', 'Fathom', 'Notion AI', 'tl;dv']) {
    await expect(page.getByText(toolName, { exact: false }).first()).toBeVisible();
  }
});

test('article page has newsletter signup form', async ({ page }) => {
  await page.goto(PATH);
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toBeVisible();
  const subscribeBtn = page.locator('button', { hasText: 'Subscribe' });
  await expect(subscribeBtn).toBeVisible();
});

test('article page has related links to other articles', async ({ page }) => {
  await page.goto(PATH);
  await expect(page.locator('a[href="/tools/best-ai-tools-small-agencies/"]')).toBeVisible();
  await expect(page.locator('a[href="/guides/automate-client-onboarding-small-agency/"]')).toBeVisible();
});

test('article page Tools category label is shown', async ({ page }) => {
  await page.goto(PATH);
  await expect(page.getByText('Tools', { exact: true }).first()).toBeVisible();
});

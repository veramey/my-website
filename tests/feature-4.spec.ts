import { test, expect } from '@playwright/test';

const PATH = '/tools/best-ai-tools-small-agencies';

test('article page loads without errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const response = await page.goto(PATH);
  expect(response?.status()).toBeLessThan(400);
  expect(consoleErrors).toHaveLength(0);
});

test('article page has correct title', async ({ page }) => {
  await page.goto(PATH);
  const title = await page.title();
  expect(title).toContain('Best AI Tools for Small Agencies');
});

test('article page has navigation', async ({ page }) => {
  await page.goto(PATH);
  await expect(page.locator('nav')).toBeVisible();
});

test('article page has h1 heading', async ({ page }) => {
  await page.goto(PATH);
  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
  await expect(h1).toContainText('Best AI Tools for Small Agencies');
});

test('article page has footer', async ({ page }) => {
  await page.goto(PATH);
  await expect(page.locator('footer')).toBeVisible();
});

test('article page shows tool categories', async ({ page }) => {
  await page.goto(PATH);
  await expect(page.getByText('Meeting Assistants')).toBeVisible();
  await expect(page.getByText('Workflow Automation')).toBeVisible();
  await expect(page.getByText('Proposals & Docs')).toBeVisible();
});

test('article page lists individual tools', async ({ page }) => {
  await page.goto(PATH);
  await expect(page.getByText('Otter.ai')).toBeVisible();
  await expect(page.getByText('Fireflies.ai')).toBeVisible();
  await expect(page.getByText('Make (formerly Integromat)')).toBeVisible();
});

test('article page has bottom CTA section with links', async ({ page }) => {
  await page.goto(PATH);
  const ctaLink = page.locator('a[href="/guides/automate-client-onboarding-small-agency"]');
  await expect(ctaLink).toBeVisible();
});

test('article page is accessible from home page featured content', async ({ page }) => {
  await page.goto('/');
  const link = page.locator(`a[href="${PATH}"]`).first();
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(new RegExp(PATH));
  await expect(page.locator('h1')).toBeVisible();
});

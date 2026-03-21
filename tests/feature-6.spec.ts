import { test, expect } from '@playwright/test';

const PAGE = '/tools/best-ai-meeting-assistants-agencies';

test('page loads with correct title', async ({ page }) => {
  const response = await page.goto(PAGE);
  expect(response?.status()).toBeLessThan(400);
  const title = await page.title();
  expect(title).toContain('Best AI Meeting Assistants');
});

test('page has nav and footer', async ({ page }) => {
  await page.goto(PAGE);
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('page has correct h1 heading', async ({ page }) => {
  await page.goto(PAGE);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Best AI Meeting Assistants for Agency Teams');
});

test('page displays all five tools', async ({ page }) => {
  await page.goto(PAGE);
  await expect(page.getByRole('heading', { name: 'Fireflies.ai' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Otter.ai' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Notion AI (Meeting Notes)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'tl;dv' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fathom' })).toBeVisible();
});

test('each tool entry has best-for, limitations, and pricing sections', async ({ page }) => {
  await page.goto(PAGE);
  const bestFor = page.getByText('Best for');
  const limitations = page.getByText('Limitations');
  const pricing = page.getByText('Pricing');
  expect(await bestFor.count()).toBeGreaterThanOrEqual(5);
  expect(await limitations.count()).toBeGreaterThanOrEqual(5);
  expect(await pricing.count()).toBeGreaterThanOrEqual(5);
});

test('Tools breadcrumb link is present', async ({ page }) => {
  await page.goto(PAGE);
  await expect(page.getByRole('link', { name: 'Tools' })).toBeVisible();
});

test('"How to choose" section is present', async ({ page }) => {
  await page.goto(PAGE);
  await expect(page.getByRole('heading', { name: 'How to choose the right one' })).toBeVisible();
});

test('related links section is present', async ({ page }) => {
  await page.goto(PAGE);
  await expect(page.getByText('Related')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Best AI tools for small agencies' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'How to automate client onboarding' })).toBeVisible();
});

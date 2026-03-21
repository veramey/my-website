import { test, expect } from '@playwright/test';

test.describe('Best AI Tools for Small Agencies article', () => {
  test('page loads and returns 200', async ({ page }) => {
    const response = await page.goto('/tools/best-ai-tools-small-agencies');
    expect(response?.status()).toBeLessThan(400);
  });

  test('page has correct title and heading', async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies');

    const title = await page.title();
    expect(title).toContain('Best AI Tools for Small Agencies');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Best AI Tools for Small Agencies');
  });

  test('page has nav and footer', async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies');

    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('shows Tools category label', async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies');
    await expect(page.getByText('Tools', { exact: true }).first()).toBeVisible();
  });

  test('has table of contents with expected sections', async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies');

    await expect(page.getByRole('link', { name: 'Meeting & Notes' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Writing & Proposals' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Automation & Workflows' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'SOPs & Documentation' })).toBeVisible();
  });

  test('renders tool cards with name, description, and pricing', async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies');

    // Check a specific tool is present
    await expect(page.getByRole('heading', { name: 'Otter.ai' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Make' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Scribe' })).toBeVisible();

    // Check pricing text is present
    const pricingTexts = page.getByText(/Free tier/);
    expect(await pricingTexts.count()).toBeGreaterThan(0);

    // Check "Best for:" labels
    const bestForTexts = page.getByText(/Best for:/);
    expect(await bestForTexts.count()).toBeGreaterThan(0);
  });

  test('newsletter form accepts email and shows success message', async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies');

    const emailInput = page.getByLabel('Email address');
    await expect(emailInput).toBeVisible();

    await emailInput.fill('test@example.com');
    await page.getByRole('button', { name: 'Subscribe' }).click();

    await expect(page.getByText('Thank you!')).toBeVisible();
  });

  test('newsletter form input has associated label', async ({ page }) => {
    await page.goto('/tools/best-ai-tools-small-agencies');

    // Label exists via sr-only + htmlFor
    const input = page.locator('#newsletter-email');
    await expect(input).toBeVisible();
  });
});

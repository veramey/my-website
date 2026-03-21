import { test, expect } from '@playwright/test';

test('Newsletter page loads without errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const response = await page.goto('/newsletter');
  expect(response?.status()).toBeLessThan(400);
  expect(consoleErrors).toHaveLength(0);
});

test('Newsletter page has correct headline and subheadline', async ({ page }) => {
  await page.goto('/newsletter');

  await expect(page.locator('h1')).toContainText('Weekly AI systems for small agencies');
  await expect(page.locator('text=Practical workflows, tools and templates to help lean teams automate delivery and internal ops.')).toBeVisible();
});

test('Newsletter page shows what subscribers get', async ({ page }) => {
  await page.goto('/newsletter');

  await expect(page.locator('text=1 practical workflow')).toBeVisible();
  await expect(page.locator('text=1 tool recommendation')).toBeVisible();
  await expect(page.locator('text=1 useful template or idea')).toBeVisible();
  await expect(page.locator('text=No hype, no AI spam')).toBeVisible();
});

test('Newsletter page has a working signup form with email input and submit button', async ({ page }) => {
  await page.goto('/newsletter');

  const emailInput = page.locator('input[type="email"]');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailInput).toBeVisible();
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toContainText('Join the newsletter');

  await emailInput.fill('test@example.com');
  await submitButton.click();
  // Form submission is a no-op (preventDefault); page should remain
  await expect(page.locator('h1')).toBeVisible();
});

test('Newsletter page has nav and footer', async ({ page }) => {
  await page.goto('/newsletter');

  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

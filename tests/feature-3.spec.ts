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
});

test('Newsletter page has nav and footer', async ({ page }) => {
  await page.goto('/newsletter');

  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('Newsletter form shows success state when submission succeeds', async ({ page }) => {
  await page.route('/api/subscribe', (route) => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
  });

  await page.goto('/newsletter');
  await page.locator('input[type="email"]').fill('test@example.com');
  await page.locator('button[type="submit"]').click();

  await expect(page.locator('[role="status"]')).toContainText("You're subscribed!");
  await expect(page.locator('form')).not.toBeVisible();
});

test('Newsletter form shows error state when submission fails', async ({ page }) => {
  await page.route('/api/subscribe', (route) => {
    route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Server error' }) });
  });

  await page.goto('/newsletter');
  await page.locator('input[type="email"]').fill('test@agency.com');
  await page.locator('button[type="submit"]').click();

  await expect(page.locator('#email-error')).toContainText('Something went wrong');
  await expect(page.locator('input[type="email"]')).toBeVisible();
});

test('Newsletter form disables inputs while submitting', async ({ page }) => {
  await page.route('/api/subscribe', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
  });

  await page.goto('/newsletter');
  await page.locator('input[type="email"]').fill('test@example.com');
  await page.locator('button[type="submit"]').click();

  await expect(page.locator('input[type="email"]')).toBeDisabled();
  await expect(page.locator('button[type="submit"]')).toBeDisabled();
});

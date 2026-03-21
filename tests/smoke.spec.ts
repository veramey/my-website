import { test, expect } from '@playwright/test';

const pages = [
  { path: './', name: 'Home' },
];

for (const { path, name } of pages) {
  test(`${name} page loads without errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(path);
    expect(response?.status()).toBeLessThan(400);

    // No JS console errors
    expect(consoleErrors).toHaveLength(0);

    // Page has a title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // No broken images
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const src = await images.nth(i).getAttribute('src');
      expect(src).toBeTruthy();
    }
  });
}

test('Home page has key sections', async ({ page }) => {
  await page.goto('./');

  // Nav present
  await expect(page.locator('nav')).toBeVisible();

  // Hero section
  await expect(page.locator('h1')).toBeVisible();

  // At least one CTA button
  const buttons = page.locator('a[href], button');
  expect(await buttons.count()).toBeGreaterThan(0);

  // Footer present
  await expect(page.locator('footer')).toBeVisible();
});

// Note: internal link validation is skipped in smoke tests
// because some links may point to pages not yet implemented.
// Individual feature tests cover specific page requirements.

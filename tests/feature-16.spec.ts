import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';

// Import the guides data module directly (no browser needed for these tests)
import { guides } from '../src/lib/guides';

const VALID_SUBCATEGORIES = [
  'Client Onboarding',
  'Delivery & Client Work',
  'Internal Operations',
  'Team Productivity',
] as const;

test('guides array is non-empty and first entry has all required fields', async () => {
  expect(guides.length).toBeGreaterThan(0);

  const first = guides[0];
  expect(first.slug).toBeTruthy();
  expect(first.title).toBeTruthy();
  expect(first.description).toBeTruthy();
  expect(first.subcategory).toBeTruthy();
  expect(first.href).toBeTruthy();
});

test('automate-client-onboarding entry has correct subcategory and href', async () => {
  const entry = guides.find(g => g.slug === 'automate-client-onboarding-small-agency');
  expect(entry).toBeDefined();
  expect(entry!.subcategory).toBe('Client Onboarding');
  expect(entry!.href).toBe('/guides/automate-client-onboarding-small-agency');
});

test('automate-client-onboarding slug matches href convention', async () => {
  const entry = guides.find(g => g.slug === 'automate-client-onboarding-small-agency');
  expect(entry).toBeDefined();
  expect(entry!.href).toBe(`/guides/${entry!.slug}`);
});

test('no entry has an invalid subcategory', async () => {
  for (const guide of guides) {
    expect(VALID_SUBCATEGORIES).toContain(guide.subcategory);
  }
});

test('tsc --noEmit exits with code 0', async () => {
  const projectRoot = path.resolve(__dirname, '..');
  let exitCode = 0;
  try {
    execSync('npx tsc --noEmit', { cwd: projectRoot, stdio: 'pipe' });
  } catch (err: unknown) {
    exitCode = (err as { status?: number }).status ?? 1;
  }
  expect(exitCode).toBe(0);
});

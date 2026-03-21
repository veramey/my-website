import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';
import { guides } from '../src/lib/guides';
import type { GuideSubcategory } from '../src/lib/guides';

const VALID_SUBCATEGORIES: GuideSubcategory[] = [
  'Client Onboarding',
  'Delivery & Client Work',
  'Internal Operations',
  'Team Productivity',
];

test('guides array is non-empty and first entry has all required fields', () => {
  expect(guides.length).toBeGreaterThan(0);

  const first = guides[0];
  expect(first.slug).toBeTruthy();
  expect(first.title).toBeTruthy();
  expect(first.description).toBeTruthy();
  expect(first.subcategory).toBeTruthy();
  expect(first.href).toBeTruthy();
});

test('automate-client-onboarding entry has correct subcategory and href', () => {
  const entry = guides.find((g) => g.slug === 'automate-client-onboarding-small-agency');
  expect(entry).toBeDefined();
  expect(entry!.subcategory).toBe('Client Onboarding');
  expect(entry!.href).toBe('/guides/automate-client-onboarding-small-agency');
});

test('automate-client-onboarding slug matches href convention', () => {
  const entry = guides.find((g) => g.slug === 'automate-client-onboarding-small-agency');
  expect(entry).toBeDefined();
  expect(entry!.href).toBe(`/guides/${entry!.slug}`);
});

test('no entry has an invalid subcategory', () => {
  for (const guide of guides) {
    expect(VALID_SUBCATEGORIES).toContain(guide.subcategory);
  }
});

test('tsc --noEmit exits with code 0', () => {
  const root = path.resolve(__dirname, '..');
  expect(() => {
    execSync('npx tsc --noEmit', { cwd: root, stdio: 'pipe' });
  }).not.toThrow();
});

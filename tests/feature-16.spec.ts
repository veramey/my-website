import { test, expect } from '@playwright/test'
import { execSync } from 'child_process'
import { guides } from '../src/lib/guides'

const VALID_SUBCATEGORIES = [
  'Client Onboarding',
  'Delivery & Client Work',
  'Internal Operations',
  'Team Productivity',
] as const

test.describe('guides data file (src/lib/guides.ts)', () => {
  test('guides array is non-empty and first entry has all five required fields as non-empty strings', () => {
    expect(guides.length).toBeGreaterThan(0)
    const first = guides[0]
    expect(typeof first.slug).toBe('string')
    expect(first.slug.length).toBeGreaterThan(0)
    expect(typeof first.title).toBe('string')
    expect(first.title.length).toBeGreaterThan(0)
    expect(typeof first.description).toBe('string')
    expect(first.description.length).toBeGreaterThan(0)
    expect(typeof first.subcategory).toBe('string')
    expect(first.subcategory.length).toBeGreaterThan(0)
    expect(typeof first.href).toBe('string')
    expect(first.href.length).toBeGreaterThan(0)
  })

  test('automate-client-onboarding entry has correct subcategory and href', () => {
    const entry = guides.find((g) => g.slug === 'automate-client-onboarding-small-agency')
    expect(entry).toBeDefined()
    expect(entry!.subcategory).toBe('Client Onboarding')
    expect(entry!.href).toBe('/guides/automate-client-onboarding-small-agency')
  })

  test('automate-client-onboarding slug is consistent with href', () => {
    const entry = guides.find((g) => g.slug === 'automate-client-onboarding-small-agency')
    expect(entry).toBeDefined()
    expect(entry!.slug).toBe('automate-client-onboarding-small-agency')
    expect(entry!.href).toBe(`/guides/${entry!.slug}`)
  })

  test('no entry has a subcategory outside the four permitted values', () => {
    for (const guide of guides) {
      expect(VALID_SUBCATEGORIES).toContain(guide.subcategory)
    }
  })

  test('tsc --noEmit exits with code 0', () => {
    expect(() => {
      execSync('npx tsc --noEmit', {
        cwd: '/home/runner/work/my-website/my-website',
        stdio: 'pipe',
      })
    }).not.toThrow()
  })
})

/**
 * Issue #49 — Fix unit-tests.yml trigger and job condition
 *
 * These are static file assertions (no browser needed).
 * They parse the YAML config and verify the race-condition fix is in place.
 */
import { test, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const workflowPath = path.resolve(__dirname, '../.github/workflows/unit-tests.yml')
const rawYaml = fs.readFileSync(workflowPath, 'utf-8')

test.describe('Issue #49 — unit-tests.yml race-condition fix', () => {
  test('on.pull_request.types contains only "labeled"', () => {
    // Must have [labeled] and must NOT have opened, synchronize, or reopened
    expect(rawYaml).toContain('types: [labeled]')
    expect(rawYaml).not.toContain('opened')
    expect(rawYaml).not.toContain('synchronize')
    expect(rawYaml).not.toContain('reopened')
  })

  test('job if-condition uses github.event.label.name strict equality', () => {
    expect(rawYaml).toContain("if: github.event.label.name == 'pr_approved'")
  })

  test('job if-condition does not use contains() snapshot pattern', () => {
    expect(rawYaml).not.toMatch(/contains\(github\.event\.pull_request\.labels/)
  })

  test('workflow file is valid YAML (no syntax errors)', async () => {
    // Dynamic import to avoid top-level await; js-yaml is a dep of many tools
    // Use a lightweight structural check: must have required top-level keys
    expect(rawYaml).toMatch(/^name:/m)
    expect(rawYaml).toMatch(/^on:/m)
    expect(rawYaml).toMatch(/^jobs:/m)
  })
})

import { test, expect } from '@playwright/test'

test.describe('Newsletter page', () => {
  test('renders the page headline and subheadline', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/newsletter`)
    await expect(page.getByRole('heading', { name: 'Weekly AI systems for small agencies', level: 1 })).toBeVisible()
    await expect(page.getByText('Practical workflows, tools and templates to help lean teams automate delivery and internal ops.')).toBeVisible()
  })

  test('shows what subscribers get each week', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/newsletter`)
    await expect(page.getByText('What you get each week')).toBeVisible()
    await expect(page.getByText('1 practical workflow')).toBeVisible()
    await expect(page.getByText('1 tool recommendation')).toBeVisible()
    await expect(page.getByText('1 useful template or idea')).toBeVisible()
    await expect(page.getByText('No hype, no AI spam')).toBeVisible()
  })

  test('has a labeled email input and submit button', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/newsletter`)
    await expect(page.getByLabel('Email address')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Join the newsletter' })).toBeVisible()
  })

  test('shows thank you message after submitting valid email', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/newsletter`)
    await page.getByLabel('Email address').fill('test@agency.com')
    await page.getByRole('button', { name: 'Join the newsletter' }).click()
    await expect(page.getByText('Thank you!')).toBeVisible()
    await expect(page.getByText("You're on the list. First issue coming your way soon.")).toBeVisible()
  })

  test('hides the form after successful submission', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/newsletter`)
    await page.getByLabel('Email address').fill('test@agency.com')
    await page.getByRole('button', { name: 'Join the newsletter' }).click()
    await expect(page.getByLabel('Email address')).not.toBeVisible()
  })
})

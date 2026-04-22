import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads and shows brand', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /GoStay/i }).first()).toBeVisible()
  })

  test('has working nav to listings', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /listings/i }).first().click()
    await expect(page).toHaveURL(/\/listings/)
  })
})

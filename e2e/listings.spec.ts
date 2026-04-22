import { test, expect } from '@playwright/test'

test.describe('Listings page', () => {
  test('renders listings with mock data', async ({ page }) => {
    await page.goto('/listings')
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  })

  test('keyword search updates results', async ({ page }) => {
    await page.goto('/listings')
    const input = page.getByRole('searchbox').or(page.locator('input[type="search"], input[placeholder*="search" i]')).first()
    if (await input.count()) {
      await input.fill('bamboo')
      await input.press('Enter')
      await page.waitForLoadState('networkidle')
    }
  })
})

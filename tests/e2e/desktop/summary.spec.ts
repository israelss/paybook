import { test, expect } from '@playwright/test'

test.describe('on desktop', () => {
  test('/ redirects to /summary/clients', async ({ page }) => {
    await page.goto('/')
    await page.waitForURL('/summary', { waitUntil: 'networkidle' })
    await page.waitForURL('/summary/clients', { waitUntil: 'networkidle' })
    await expect(page).toHaveURL('/summary/clients')
  })
})

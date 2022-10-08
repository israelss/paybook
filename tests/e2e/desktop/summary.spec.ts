import { test, expect } from '@playwright/test'

test.describe('on desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    const emailField = page.locator('[placeholder="seu\\@email\\.com"]')
    await emailField.fill('test@email.com')
    const passwordField = page.locator('input[name="password"]')
    await passwordField.fill('testuserpassword')
    await page.locator('text=Login / Cadastro').click()
    await page.waitForURL('http://localhost:3000/summary/clients', { waitUntil: 'networkidle' })
  })

  test('/ redirects to /summary/clients', async ({ page }) => {
    await page.goto('/')
    await page.waitForURL('/summary', { waitUntil: 'networkidle' })
    await page.waitForURL('/summary/clients', { waitUntil: 'networkidle' })
    await expect(page).toHaveURL('/summary/clients')
  })
})

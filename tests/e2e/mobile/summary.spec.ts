import { test, expect } from '@playwright/test'

test.describe('on mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    const emailField = page.locator('[placeholder="seu\\@email\\.com"]')
    await emailField.fill('test@email.com')
    const passwordField = page.locator('input[name="password"]')
    await passwordField.fill('testuserpassword')
    await page.locator('text=Login / Cadastro').click()
    await page.waitForURL('http://localhost:3000/summary', { waitUntil: 'networkidle' })
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForURL('/summary', { waitUntil: 'networkidle' })
  })

  test('/ redirects to /summary', async ({ page }) => {
    await expect(page).toHaveURL('/summary')
  })

  test('shows PayBook on header', async ({ page }) => {
    await expect(page).toHaveTitle(/^PayBook$/)
  })

  test.describe('Total section', () => {
    test('is shown', async ({ page }) => {
      const totalSection = page.locator('_react=SummaryTotal')
      await expect(totalSection).toBeVisible()
    })

    test('has title', async ({ page }) => {
      const totalSection = page.locator('_react=SummaryTotal')
      const totalSectionTitle = totalSection.locator(
        'h2',
        { hasText: /^Total a receber$/ }
      )
      await expect(totalSectionTitle).toBeVisible()
    })

    test('has value', async ({ page }) => {
      const totalSection = page.locator('_react=SummaryTotal')
      const totalSectionValue = totalSection.locator('_react=MonetaryValueDisplay')
      await expect(totalSectionValue).toBeVisible()
      await expect(totalSectionValue).toHaveText('R$ 400,00')
    })
  })

  test.describe('Total in date range section', () => {
    test('is shown', async ({ page }) => {
      const totalInDateRangeSection = page.locator('_react=SummaryInDateRange')
      await expect(totalInDateRangeSection).toBeVisible()
    })

    test('has title', async ({ page }) => {
      const totalInDateRangeSection = page.locator('_react=SummaryInDateRange')
      const totalInDateRangeSectionTitle = totalInDateRangeSection.locator(
        'h2',
        { hasText: /^Total a receber entre$/ }
      )
      await expect(totalInDateRangeSectionTitle).toBeVisible()
    })

    test('has value', async ({ page }) => {
      const totalInDateRangeSection = page.locator('_react=SummaryInDateRange')
      const totalInDateRangeSectionValue = totalInDateRangeSection.locator('_react=MonetaryValueDisplay')
      await expect(totalInDateRangeSectionValue).toBeVisible()
      await expect(totalInDateRangeSectionValue).toHaveText('R$ 0,00')
    })
  })

  test.describe('New record section', () => {
    test('is shown', async ({ page }) => {
      const newRecordSection = page.locator('_react=NewRecord')
      await expect(newRecordSection).toBeVisible()
    })

    test('has title', async ({ page }) => {
      const newRecordSection = page.locator('_react=NewRecord')
      const newRecordSectionTitle = newRecordSection.locator(
        'h2',
        { hasText: /^Novo registro$/ }
      )
      await expect(newRecordSectionTitle).toBeVisible()
    })

    test.describe('has form', () => {
      test('form is shown', async ({ page }) => {
        const newRecordSection = page.locator('_react=NewRecord')
        const newRecordSectionForm = newRecordSection.locator('_react=NewRecordForm')
        await expect(newRecordSectionForm).toBeVisible()
        const nameInput = newRecordSectionForm.locator('input[name="clientName"]')
        await expect(nameInput).toBeVisible()
        const valueInput = newRecordSectionForm.locator('input[name="value"]')
        await expect(valueInput).toBeVisible()
        const dateInput = newRecordSectionForm.locator('input[name="dueDate"]')
        await expect(dateInput).toBeHidden()
        const datePicker = newRecordSectionForm.locator('_react=ReactDatePicker')
        await expect(datePicker).toBeDefined()
        const installmentsInput = newRecordSectionForm.locator('input[name="installments"]')
        await expect(installmentsInput).toBeVisible()
        const submitButton = newRecordSectionForm.locator('button', { hasText: 'INCLUIR REGISTRO' })
        await expect(submitButton).toBeVisible()
        const clearButton = newRecordSectionForm.locator('button', { hasText: 'LIMPAR' })
        await expect(clearButton).toBeVisible()
      })
    })
  })
})

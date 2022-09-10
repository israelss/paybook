import { db } from '~/utils/db.server'
import { InstallmentsApi } from '~/features/Installments'
import { Mocks } from './mocks'
import { vi } from 'vitest'

describe('InstallmentsApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getInstallmentsDatesAndValues', () => {
    test('returns dates and values of installments', async () => {
      db.installment.findMany = vi
        .fn()
        .mockResolvedValue(Mocks.Installments.twoInstallmentsData)
      const actual = await InstallmentsApi.getInstallmentsDatesAndValues()
      const expected = Mocks.Installments.twoInstallmentsData
      expect(actual).toStrictEqual(expected)
    })
  })

  describe('getByClient', () => {
    test('returns installments of existent client', async () => {
      db.installment.findMany = vi
        .fn()
        .mockResolvedValue(Mocks.Installments.clientAInstallments)
      const actual = await InstallmentsApi.getByClient('clientAId')
      const expected = { installments: Mocks.Installments.clientAInstallments }
      expect(actual).toStrictEqual(expected)
    })

    test('returns empty array for non existent client', async () => {
      db.installment.findMany = vi
        .fn()
        .mockResolvedValue([])
      const actual = await InstallmentsApi.getByClient('clientXId')
      const expected = { installments: [] }
      expect(actual).toStrictEqual(expected)
    })
  })

  describe('remove', () => {
    test('remove non last installment', async () => {
      db.installment.delete = vi
        .fn()
        .mockResolvedValue(Mocks.Installments.clientWithInstallmentRemoved)
      const actual = await InstallmentsApi.remove('installment2')
      const expected = false
      expect(actual).toStrictEqual(expected)
    })

    test('remove non last installment', async () => {
      db.installment.delete = vi
        .fn()
        .mockResolvedValue(Mocks.Installments.clientWithLastInstallmentRemoved)
      db.client.delete = vi.fn()
      const actual = await InstallmentsApi.remove('installment1')
      const expected = true
      expect(actual).toStrictEqual(expected)
    })
  })
})

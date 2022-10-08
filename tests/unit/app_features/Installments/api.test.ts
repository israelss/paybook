import { afterEach, describe, expect, test, vi } from 'vitest'
import { db } from '~/utils/db.server'
import { InstallmentsApi } from '~/features/Installments'
import { Mocks } from './mocks'

describe('InstallmentsApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getInstallments', () => {
    test('returns dates and values of installments', async () => {
      db.installment.findMany = vi
        .fn()
        .mockResolvedValue(Mocks.Installments.twoInstallments.data)
      const actual = await InstallmentsApi.getInstallments('user1')
      const expected = Mocks.Installments.twoInstallments.data
      expect(actual).toStrictEqual(expected)
    })
  })

  describe('getByClient', () => {
    test('returns installments of existent client', async () => {
      db.installment.findMany = vi
        .fn()
        .mockResolvedValue(Mocks.Installments.oneInstallment.data)
      const actual = await InstallmentsApi.getByClient('clientAId', 'user1')
      const expected = Mocks.Installments.oneInstallment.data
      expect(actual).toStrictEqual(expected)
    })

    test('returns empty array for non existent client', async () => {
      db.installment.findMany = vi
        .fn()
        .mockResolvedValue([])
      await expect(InstallmentsApi.getByClient('clientXId', 'user1')).rejects.toThrow('No Installment Found')
    })
  })

  describe('remove', () => {
    test('remove non last installment', async () => {
      db.installment.delete = vi
        .fn()
        .mockImplementationOnce((value: string) => {
          return {
            client: {
              installments: Mocks
                .Installments
                .twoInstallments
                .data
                .filter(item => item.id !== value)
            }
          }
        })
      const actual = await InstallmentsApi.remove('installment2')
      const expected = false
      expect(actual).toStrictEqual(expected)
    })

    test('remove last installment', async () => {
      db.installment.delete = vi
        .fn()
        .mockImplementationOnce((value: string) => {
          return {
            client: {
              installments: Mocks
                .Installments
                .oneInstallment
                .data
                .filter(item => item.id !== value)
            }
          }
        })
      db.client.delete = vi.fn()
      const actual = await InstallmentsApi.remove('installment1')
      const expected = true
      expect(actual).toStrictEqual(expected)
    })
  })
})

import { afterEach, describe, expect, test, vi } from 'vitest'
import { ClientsApi } from '~/features/Clients'
import { db } from '~/utils/db.server'
import { Mocks } from './mocks'

describe('ClientsApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getAll', () => {
    test('returns clients ordered by dueDate', async () => {
      db.client.findMany = vi
        .fn()
        .mockResolvedValue(Mocks.Clients.allClients)
      const actual = await ClientsApi.getAll('user1')
      const expected = [
        Mocks.Clients.clientB,
        Mocks.Clients.clientC,
        Mocks.Clients.clientA,
        Mocks.Clients.clientD
      ]

      expect(actual).toStrictEqual(expected)
    })
  })

  describe('getClientIdByName', () => {
    test('returns client id when client already exists', async () => {
      db.client.upsert = vi
        .fn()
        .mockResolvedValue({ id: 'clientAId' })
      const actual = await ClientsApi.getClientIdByName('clientA')
      const expected = Mocks.Clients.clientA.id

      expect(actual).toStrictEqual(expected)
    })

    test('returns client id when client didn\'t exists yet', async () => {
      db.client.upsert = vi
        .fn()
        .mockResolvedValue({ id: 'clientEId' })
      const actual = await ClientsApi.getClientIdByName('clientE')
      const expected = 'clientEId'

      expect(actual).toStrictEqual(expected)
    })
  })
})

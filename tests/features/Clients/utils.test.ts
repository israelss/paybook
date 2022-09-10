import { Mocks } from './mocks'
import * as ClientsUtils from '~/features/Clients/utils'

describe('sortClientsByInstallments', () => {
  test('first client\'s dueDate > second client\'s dueDate', () => {
    const actual = ClientsUtils.sortClientsByInstallments(
      Mocks.Clients.clientA,
      Mocks.Clients.clientB
    )
    const expected = 1
    expect(actual).toBe(expected)
  })

  test('first client\'s dueDate === second client\'s dueDate', () => {
    const actual = ClientsUtils.sortClientsByInstallments(
      Mocks.Clients.clientB,
      Mocks.Clients.clientC
    )
    const expected = 0
    expect(actual).toBe(expected)
  })

  test('first client\'s dueDate < second client\'s dueDate', () => {
    const actual = ClientsUtils.sortClientsByInstallments(
      Mocks.Clients.clientC,
      Mocks.Clients.clientD
    )
    const expected = -1
    expect(actual).toBe(expected)
  })
})

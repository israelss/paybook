import type { ClientWithInstallments } from '~/features/Clients/types'

export const clientA: ClientWithInstallments = {
  id: 'clientAId',
  name: 'clientA',
  installments: [
    {
      id: 'installment1',
      value: 100,
      dueDate: new Date(2022, 1, 1, 6, 4, 3, 2),
      paymentDate: null,
      clientId: 'clientAId'
    }
  ]
}

export const clientB: ClientWithInstallments = {
  id: 'clientBId',
  name: 'clientB',
  installments: [
    {
      id: 'installment1',
      value: 100,
      dueDate: new Date(2022, 1, 1, 5, 4, 3, 2),
      paymentDate: null,
      clientId: 'clientBId'
    }
  ]
}

export const clientC: ClientWithInstallments = {
  id: 'clientCId',
  name: 'clientC',
  installments: [
    {
      id: 'installment1',
      value: 100,
      dueDate: new Date(2022, 1, 1, 5, 4, 3, 2),
      paymentDate: null,
      clientId: 'clientCId'
    }
  ]
}

export const clientD: ClientWithInstallments = {
  id: 'clientDId',
  name: 'clientD',
  installments: [
    {
      id: 'installment1',
      value: 100,
      dueDate: new Date(2023, 1, 1, 5, 4, 3, 2),
      paymentDate: null,
      clientId: 'clientDId'
    }
  ]
}

export const allClients = Promise.resolve([
  clientA,
  clientB,
  clientC,
  clientD
])

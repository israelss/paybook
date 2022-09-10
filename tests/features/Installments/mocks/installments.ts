import { baseDate } from './dates'

export const totalValue = 'R$ 100,00'

export const oneInstallment = 1
export const oneInstallmentArray = [10000]

export const evenInstallments = 2
export const equalInstallmentsArray = [5000, 5000]

export const oddInstallments = 3
export const unequalInstallmentsArray = [3333, 3333, 3334]

export const oneInstallmentSum = 10000
export const oneInstallmentData = [
  {
    value: oneInstallmentArray[0],
    dueDate: JSON.stringify(baseDate)
  }
]

export const twoInstallmentsSum = 10000
export const twoInstallmentsData = [
  {
    value: equalInstallmentsArray[0],
    dueDate: JSON.stringify(baseDate)
  },
  {
    value: equalInstallmentsArray[1],
    dueDate: JSON.stringify(baseDate)
  }
]

export const clientAInstallments = [
  {
    dueDate: new Date(),
    value: 10000,
    id: 'installment1',
    paymentDate: null
  }
]

export const clientWithInstallmentRemoved = {
  client: {
    id: 'clientAId',
    installments: clientAInstallments
  }
}

export const clientWithLastInstallmentRemoved = {
  client: {
    id: 'clientAId',
    installments: []
  }
}

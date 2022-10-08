import { baseDate, sunday, monday, datePlusOneMonth, datePlusTwoMonths } from './dates'

export const totalValue = 'R$ 100,00'

export const sundayInstallment = {
  id: 'installment1',
  clientId: 'clientAId',
  dueDate: sunday.toISOString(),
  paymentDate: null,
  value: 10000,
  userId: 'user1'
}

export const baseInstallment = {
  id: 'installment1',
  clientId: 'clientAId',
  dueDate: baseDate.toISOString(),
  paymentDate: null,
  value: 10000,
  userId: 'user1'
}

export const mondayInstallment = {
  id: 'installment1',
  clientId: 'clientAId',
  dueDate: monday.toISOString(),
  paymentDate: null,
  value: 10000,
  userId: 'user1'
}

export const oneInstallment = {
  data: [baseInstallment],
  installmentsArray: [10000],
  numberOfInstallments: 1,
  sum: 10000
}

export const twoInstallments = {
  data: [
    {
      ...baseInstallment,
      value: 5000
    },
    {
      ...baseInstallment,
      dueDate: datePlusOneMonth.toISOString(),
      value: 5000
    }
  ],
  installmentsArray: [5000, 5000],
  numberOfInstallments: 2,
  sum: 10000
}

export const threeInstallments = {
  data: [
    {
      ...baseInstallment,
      value: 3333
    },
    {
      ...baseInstallment,
      dueDate: datePlusOneMonth.toISOString(),
      value: 3333
    },
    {
      ...baseInstallment,
      dueDate: datePlusTwoMonths.toISOString(),
      value: 3334
    }
  ],
  installmentsArray: [3333, 3333, 3334],
  numberOfInstallments: 3,
  sum: 10000
}

export const clientWithInstallmentRemoved = {
  client: {
    id: 'clientAId',
    installments: oneInstallment.data
  }
}

export const clientWithLastInstallmentRemoved = {
  client: {
    id: 'clientAId',
    installments: []
  }
}

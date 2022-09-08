import { ClientsApi } from '../Clients'
import { db } from '~/utils/db.server'
import type { AllDebtsWithoutClientID, DebtDateAndValue } from './types'
import type { Prisma } from '@prisma/client'

export const add = async (installmentsData: Prisma.Enumerable<Prisma.DebtCreateManyInput>): Promise<void> => {
  await db.debt.createMany({
    data: installmentsData
  })
}

export const getDebtsDatesAndValues = async (): Promise<DebtDateAndValue[]> => {
  const data = await db.debt.findMany({
    where: {
      AND: [
        {
          paymentDate: null
        }
      ]
    },
    select: {
      dueDate: true,
      value: true
    }
  })

  return data
}

export const getByClient = async (id: string): Promise<AllDebtsWithoutClientID> => {
  const debts = await db.debt.findMany({
    where: {
      clientId: id
    },
    select: {
      id: true,
      dueDate: true,
      paymentDate: true,
      value: true
    },
    orderBy: [
      { dueDate: 'asc' },
      { value: 'desc' }
    ]
  })

  return { debts }
}

export const markAsPaid = async (id: string): Promise<void> => {
  await db.debt.update({
    where: { id },
    data: { paymentDate: new Date() }
  })
}

export const remove = async (id: string): Promise<boolean> => {
  const { client } = await db.debt.delete({
    where: { id },
    select: {
      client: {
        select: { id: true, debts: true }
      }
    }
  })

  const remainingClientDebtsLength = client
    .debts
    .filter(debt => debt.id !== id)
    .length

  if (remainingClientDebtsLength === 0) {
    await ClientsApi.remove(client.id)
    return true
  }

  return false
}

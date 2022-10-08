import { ClientsApi } from '../Clients'
import { db } from '~/utils/db.server'
import type { Installment, Prisma } from '@prisma/client'
import type { InstallmentWithoutIds } from './types'

export const add = async (installmentsData: Prisma.Enumerable<Prisma.InstallmentCreateManyInput>): Promise<void> => {
  await db.installment.createMany({
    data: installmentsData
  })
}

export const getInstallments = async (userId: string): Promise<Array<Pick<Installment, 'dueDate' | 'value' | 'userId'>>> => {
  const installments = await db.installment.findMany({
    where: {
      AND: [
        {
          userId,
          paymentDate: null
        }
      ]
    },
    select: {
      dueDate: true,
      value: true,
      userId: true
    }
  })

  return installments
}

export const getByClient = async (id: string, userId: string): Promise<InstallmentWithoutIds[]> => {
  const installments = await db.installment.findMany({
    where: {
      clientId: id,
      userId
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

  // eslint-disable-next-line
  if (installments.length === 0) throw new Error('No Installment Found')

  return installments
}

export const markAsPaid = async (id: string): Promise<void> => {
  await db.installment.update({
    where: { id },
    data: { paymentDate: new Date() }
  })
}

export const remove = async (id: string): Promise<boolean> => {
  const { client } = await db.installment.delete({
    where: { id },
    select: {
      client: {
        select: { id: true, installments: true }
      }
    }
  })

  const remainingClientInstallmentsLength = client
    .installments
    .filter(installment => installment.id !== id)
    .length

  if (remainingClientInstallmentsLength === 0) {
    await ClientsApi.remove(client.id)
    return true
  }

  return false
}

import { ClientsApi } from '../Clients'
import { db } from '~/utils/db.server'
import type { AllInstallmentsWithoutClientID, InstallmentDateAndValue } from './types'
import type { Prisma } from '@prisma/client'

export const add = async (installmentsData: Prisma.Enumerable<Prisma.InstallmentCreateManyInput>): Promise<void> => {
  await db.installment.createMany({
    data: installmentsData
  })
}

export const getInstallmentsDatesAndValues = async (): Promise<InstallmentDateAndValue[]> => {
  const data = await db.installment.findMany({
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

export const getByClient = async (id: string): Promise<AllInstallmentsWithoutClientID> => {
  const installments = await db.installment.findMany({
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

  return { installments }
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

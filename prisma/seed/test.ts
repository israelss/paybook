import { db } from '~/utils/db.server'
import type { Prisma } from '@prisma/client'

const createTestInstallments = (clientId: string): Prisma.InstallmentCreateManyInput[] => ([
  {
    clientId,
    dueDate: new Date(2022, 8, 8),
    paymentDate: new Date(2022, 8, 8),
    value: 10000
  },
  {
    clientId,
    dueDate: new Date(2022, 8, 9),
    paymentDate: null,
    value: 10000
  },
  {
    clientId,
    dueDate: new Date(2022, 8, 12),
    paymentDate: null,
    value: 10000
  }
])

export const seedTest = async (): Promise<void> => {
  const clients: Prisma.ClientCreateInput[] = [
    { name: 'Fulano' },
    { name: 'Cicrano' }
  ]

  clients.map(async (clientInput) => {
    const client = await db.client.create({ data: clientInput })
    const installments = createTestInstallments(client.id)
    await db.installment.createMany({ data: installments })
  })
}

import { db } from '~/utils/db.server'
import type { Prisma, User } from '@prisma/client'
import { createUser } from '.'

const createUsers = async (): Promise<User[]> => {
  const testUser = await createUser({ email: 'test@email.com', password: 'testuserpassword' })

  return [
    testUser
  ]
}
const createTestInstallments = (clientId: string, userId: string): Prisma.InstallmentCreateManyInput[] => ([
  {
    clientId,
    dueDate: new Date(2022, 8, 8),
    paymentDate: new Date(2022, 8, 8),
    value: 10000,
    userId
  },
  {
    clientId,
    dueDate: new Date(2022, 8, 9),
    paymentDate: null,
    value: 10000,
    userId
  },
  {
    clientId,
    dueDate: new Date(2022, 8, 12),
    paymentDate: null,
    value: 10000,
    userId
  }
])

export const seedTest = async (): Promise<void> => {
  const [testUser] = await createUsers()
  const clients: Prisma.ClientCreateInput[] = [
    { name: 'Fulano' },
    { name: 'Cicrano' }
  ]

  clients.map(async (clientInput) => {
    const client = await db.client.create({ data: clientInput })
    const installments = createTestInstallments(client.id, testUser.id)
    await db.installment.createMany({ data: installments })
  })
}

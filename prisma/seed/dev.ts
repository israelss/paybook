import { db } from '~/utils/db.server'
import { faker } from '@faker-js/faker'
import type { Prisma, User } from '@prisma/client'
import { createUser } from '.'

const createRandomInstallment = (clientId: string, userId: string): Prisma.InstallmentCreateManyInput => ({
  clientId: clientId,
  dueDate: faker.date.future(2),
  paymentDate: faker.datatype.boolean() ? faker.date.soon() : null,
  value: faker.mersenne.rand(50000, 10000),
  userId
})

const createRandomClient = (): Prisma.ClientCreateInput => ({ name: faker.name.fullName() })

const createUsers = async (): Promise<User[]> => {
  const ericaUser = await createUser({ email: 'erica@odonto.com', password: 'ericaodonto' })
  const joaoUser = await createUser({ email: 'joao@odonto.com', password: 'joaoodonto' })

  return [
    ericaUser,
    joaoUser
  ]
}

export const seedDev = async (): Promise<void> => {
  const [erica] = await createUsers()
  const NUMBER_OF_CLIENTS = faker.mersenne.rand(15, 5)

  const clients: Prisma.ClientCreateInput[] = faker.helpers.uniqueArray<Prisma.ClientCreateInput>(
    createRandomClient,
    NUMBER_OF_CLIENTS
  )

  clients.map(async (clientInput) => {
    const client = await db.client.create({ data: clientInput })

    const NUMBER_OF_INSTALLMENTS_PER_CLIENT = faker.mersenne.rand(10, 5)

    const installments: Prisma.InstallmentCreateManyInput[] = faker.helpers.uniqueArray<Prisma.InstallmentCreateManyInput>(
      () => createRandomInstallment(client.id, erica.id),
      NUMBER_OF_INSTALLMENTS_PER_CLIENT
    )

    await db.installment.createMany({ data: installments })
  })
}

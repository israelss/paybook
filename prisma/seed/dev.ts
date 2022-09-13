import { db } from '~/utils/db.server'
import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'

const createRandomInstallment = (clientId: string): Prisma.InstallmentCreateManyInput => ({
  clientId: clientId,
  dueDate: faker.date.future(2),
  paymentDate: faker.datatype.boolean() ? faker.date.soon() : null,
  value: faker.mersenne.rand(50000, 10000)
})

const createRandomClient = (): Prisma.ClientCreateInput => ({ name: faker.name.fullName() })

export const seedDev = async (): Promise<void> => {
  const NUMBER_OF_CLIENTS = faker.mersenne.rand(15, 5)

  const clients: Prisma.ClientCreateInput[] = faker.helpers.uniqueArray<Prisma.ClientCreateInput>(
    createRandomClient,
    NUMBER_OF_CLIENTS
  )

  clients.map(async (clientInput) => {
    const client = await db.client.create({ data: clientInput })

    const NUMBER_OF_INSTALLMENTS_PER_CLIENT = faker.mersenne.rand(10, 5)

    const installments: Prisma.InstallmentCreateManyInput[] = faker.helpers.uniqueArray<Prisma.InstallmentCreateManyInput>(
      () => createRandomInstallment(client.id),
      NUMBER_OF_INSTALLMENTS_PER_CLIENT
    )

    await db.installment.createMany({ data: installments })
  })
}

import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import type { Installment } from '@prisma/client'

const db = new PrismaClient()

const NUMBER_OF_CLIENTS = faker.mersenne.rand(15, 5)

async function seed (): Promise<void> {
  const clients = faker.helpers.uniqueArray<string>(faker.name.fullName, NUMBER_OF_CLIENTS)

  clients.map(async (name) => {
    const client = await db.client.create({ data: { name } })

    const NUMBER_OF_INSTALLMENTS_PER_CLIENT = faker.mersenne.rand(10, 5)

    const installments = faker.helpers.uniqueArray<Omit<Installment, 'id'>>(() => ({
      value: faker.mersenne.rand(50000, 10000),
      dueDate: faker.date.future(2),
      clientId: client.id,
      paymentDate: faker.datatype.boolean() ? faker.date.soon() : null
    }), NUMBER_OF_INSTALLMENTS_PER_CLIENT)

    for (const installment of installments) {
      await db.installment.create({
        data: installment
      })
    }
  })
}

void seed()

import { db } from '~/utils/db.server'

export const seedTestData = async (): Promise<void> => {
  const clients = ['Fulano', 'Cicrano']
  clients.map(async (name) => {
    const client = await db.client.create({ data: { name } })

    const installments = [
      {
        value: 10000,
        dueDate: new Date(2022, 8, 9),
        clientId: client.id,
        paymentDate: new Date(2022, 8, 9)
      },
      {
        value: 10000,
        dueDate: new Date(2022, 8, 12),
        clientId: client.id,
        paymentDate: null
      },
      {
        value: 10000,
        dueDate: new Date(2022, 8, 13),
        clientId: client.id,
        paymentDate: null
      }
    ]

    await db.installment.createMany({ data: installments })
  })
}

export const resetTestData = async (): Promise<void> => {
  await db.installment.deleteMany()
  await db.client.deleteMany()
}

export const disconnect = async (): Promise<void> => {
  await db.$disconnect()
}

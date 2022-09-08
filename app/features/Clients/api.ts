import { db } from '~/utils/db.server'
import { sortClientsByDebts } from './utils'
import type { AllClients } from './types'

export const getAll = async (): Promise<AllClients> => {
  const clients = await db.client.findMany({
    include: {
      debts: {
        orderBy: [
          { dueDate: 'asc' },
          { value: 'desc' }
        ]
      }
    }
  })

  clients.sort(sortClientsByDebts)

  return { clients }
}

export const getClientIdByName = async (name: string): Promise<string> => {
  const client = await db.client.upsert({
    where: { name },
    select: { id: true },
    update: {},
    create: { name }
  })

  return client.id
}

export const remove = async (id: string): Promise<void> => {
  await db.client.delete({ where: { id } })
}

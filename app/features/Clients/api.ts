import { db } from '~/utils/db.server'
import { sortClientsByInstallments } from './utils'
import type { ClientWithInstallments } from './types'

export const getAll = async (userId: string): Promise<ClientWithInstallments[]> => {
  const clients = await db.client.findMany({
    where: {
      installments: {
        some: {
          userId
        }
      }
    },
    include: {
      installments: {
        orderBy: [
          { dueDate: 'asc' },
          { value: 'desc' }
        ]
      }
    }
  })

  if (clients.length === 0) throw new Error('No Clients Found')

  clients.sort(sortClientsByInstallments)

  return clients
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

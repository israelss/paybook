import type { Prisma } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'

export interface AllClients {
  clients: ClientWithDebts[]
}

export interface ClientCardProps {
  client: SerializeFrom<ClientWithDebts>
}

export type ClientWithDebts = Prisma.ClientGetPayload<{
  include: {
    debts: true
  }
}>

import type { Prisma } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'

export interface ClientCardProps {
  client: SerializeFrom<ClientWithInstallments>
}

export type ClientWithInstallments = Prisma.ClientGetPayload<{
  include: {
    installments: true
  }
}>

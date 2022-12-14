import compareAsc from 'date-fns/compareAsc'
import type { ClientWithInstallments } from './types'

export const sortClientsByInstallments = (
  clientA: ClientWithInstallments,
  clientB: ClientWithInstallments
): number =>
  compareAsc(
    clientA.installments[0].dueDate,
    clientB.installments[0].dueDate
  )

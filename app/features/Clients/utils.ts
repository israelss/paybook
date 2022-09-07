import compareAsc from 'date-fns/compareAsc'
import type { ClientWithDebts } from './types'

export const sortClientsByDebts = (
  clientA: ClientWithDebts,
  clientB: ClientWithDebts
): number =>
  compareAsc(
    clientA.debts.at(0)?.dueDate ?? 0,
    clientB.debts.at(0)?.dueDate ?? 0
  )

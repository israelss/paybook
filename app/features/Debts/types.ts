import type { Debt } from '@prisma/client'
import type { PropsWithChildren } from 'react'
import type { SerializeFrom } from '@remix-run/node'

export interface AllDebtsWithoutClientID {
  debts: DebtWithoutClientID[]
}

export interface DebtCardActionButtonProps extends PropsWithChildren {
  action: 'delete' | 'markAsPaid'
  className: string
  valueToSend: string
}

export interface DebtCardProps {
  debt: SerializedDebt
}

export interface DebtWithoutClientID extends Omit<Debt, 'clientId'> {}

export interface DebtDateAndValue extends Pick<Debt, 'dueDate' |'value'> {}
export interface SerializedDebtDateAndValue extends SerializeFrom<DebtDateAndValue> {}

export interface SerializedDebt extends SerializeFrom<DebtWithoutClientID> {}

export interface NewDebtData {
  clientName: string
  debtValue: string
  dueDate: Date
}

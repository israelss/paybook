import type { Installment } from '@prisma/client'
import type { PropsWithChildren } from 'react'
import type { SerializeFrom } from '@remix-run/node'

export interface AllInstallmentsWithoutClientID {
  installments: InstallmentWithoutClientID[]
}

export interface InstallmentCardActionButtonProps extends PropsWithChildren {
  action: 'delete' | 'markAsPaid'
  className: string
  valueToSend: string
}

export interface InstallmentCardProps {
  installment: SerializedInstallment
}

export interface InstallmentWithoutClientID extends Omit<Installment, 'clientId'> {}

export interface InstallmentDateAndValue extends Pick<Installment, 'dueDate' |'value'> {}
export interface SerializedInstallmentDateAndValue extends SerializeFrom<InstallmentDateAndValue> {}

export interface SerializedInstallment extends SerializeFrom<InstallmentWithoutClientID> {}

import type { Installment } from '@prisma/client'
import type { PropsWithChildren } from 'react'
import type { SerializeFrom } from '@remix-run/node'
import type { NewRecordSchemas } from '../NewRecord'
import type { z } from 'zod'

export interface InstallmentCardActionButtonProps extends PropsWithChildren {
  action: 'delete' | 'markAsPaid'
  className: string
  valueToSend: string
}

export interface InstallmentCardProps {
  installment: SerializeFrom<InstallmentWithoutIds>
}

export interface InstallmentWithoutIds extends Omit<Installment, 'clientId' | 'userId'> {}

export interface InstallmentData {
  data: z.infer<typeof NewRecordSchemas.newRecordSchema>
  clientId: string
}

export interface IsFunctionReturn {
  inRange: (start: Date | null, end: Date | null) => boolean
  notPaidAndOfUser: (userId: string) => boolean
}

export interface SerializedInstallment extends SerializeFrom<Installment> {}

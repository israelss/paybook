import type { InstallmentsTypes } from '../Installments'

export interface SummaryInDateRangeProps {
  data: InstallmentsTypes.SerializedInstallmentDateAndValue[]
}

export interface SummaryTotalProps {
  value: number
}

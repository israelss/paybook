import type { DebtsTypes } from '../Debts'

export interface SummaryInDateRangeProps {
  data: DebtsTypes.SerializedDebtDateAndValue[]
}

export interface SummaryTotalProps {
  value: number
}

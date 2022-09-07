import isAfter from 'date-fns/isAfter'
import isWithinInterval from 'date-fns/isWithinInterval'
import lightFormat from 'date-fns/lightFormat'
import type { SerializedDebtDateAndValue } from './types'

const debtsValuesReducer = (sum: number, current: number): number => sum + current

export const isDebtInRange = (
  targetDate: string,
  start: Date | null,
  end: Date | null
): boolean => {
  if ((start == null) || (end == null)) return true
  if (isAfter(start, end)) end = start
  return isWithinInterval(
    new Date(targetDate),
    { start: start, end: end }
  )
}

export const formatDate = (date: string): string => {
  return lightFormat(new Date(date), 'dd/MM/yyyy')
}

export const sumDebtsValues = (debts: SerializedDebtDateAndValue[]): number => {
  return debts
    .map(debt => debt.value)
    .reduce(debtsValuesReducer, 0)
}

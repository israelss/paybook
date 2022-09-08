import { extractFromCurrency } from '~/utils'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import endOfDay from 'date-fns/endOfDay'
import isAfter from 'date-fns/isAfter'
import isWeekend from 'date-fns/isWeekend'
import isWithinInterval from 'date-fns/isWithinInterval'
import lightFormat from 'date-fns/lightFormat'
import startOfDay from 'date-fns/startOfDay'
import type { Prisma } from '@prisma/client'
import type { SerializedDebtDateAndValue } from './types'

const debtsValuesReducer = (sum: number, current: number): number => sum + current

export const findInstallmentDate = (baseDate: Date, monthsToAdd: number): Date => {
  let date = endOfDay(addMonths(baseDate, monthsToAdd))
  if (isWeekend(date)) date = addDays(date, 1)
  return date
}

export const findInstallmentsValues = (totalValue: string, numberOfInstallments: number): number[] => {
  const debtValue = extractFromCurrency(totalValue)
  const installmentValue = Math.floor(debtValue / numberOfInstallments)
  const remainderValue = debtValue - (installmentValue * numberOfInstallments)
  const lastInstallmentValue = installmentValue + remainderValue

  const installments: number[] = Array(numberOfInstallments)
    .fill(installmentValue)
    .slice(0, -1)

  installments.push(lastInstallmentValue)

  return installments
}

export const formatDate = (date: string): string => {
  return lightFormat(new Date(date), 'dd/MM/yyyy')
}

export const isDebtInRange = (
  targetDate: string,
  start: Date | null,
  end: Date | null
): boolean => {
  if ((start == null) || (end == null)) return true
  if (isAfter(start, end)) end = start
  return isWithinInterval(
    new Date(targetDate),
    { start: startOfDay(start), end: endOfDay(end) }
  )
}

export const makeInstallmentsData = (
  baseDate: Date,
  clientId: string,
  installments: number[]
): Prisma.Enumerable<Prisma.DebtCreateManyInput> => {
  return installments
    .map((installmentValue, installmentIndex) => ({
      value: installmentValue,
      dueDate: findInstallmentDate(baseDate, installmentIndex),
      clientId
    }))
}

export const sumDebtsValues = (debts: SerializedDebtDateAndValue[]): number => {
  return debts
    .map(debt => debt.value)
    .reduce(debtsValuesReducer, 0)
}

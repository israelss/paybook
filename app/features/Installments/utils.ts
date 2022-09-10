import { extractFromCurrency } from '~/utils'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import endOfDay from 'date-fns/endOfDay'
import isAfter from 'date-fns/isAfter'
import isSameDay from 'date-fns/isSameDay'
import isWeekend from 'date-fns/isWeekend'
import isWithinInterval from 'date-fns/isWithinInterval'
import lightFormat from 'date-fns/lightFormat'
import startOfDay from 'date-fns/startOfDay'
import type { Prisma } from '@prisma/client'
import type { SerializedInstallmentDateAndValue } from './types'

const installmentsValuesReducer = (sum: number, current: number): number => sum + current

export const findInstallmentDate = (baseDate: Date, monthsToAdd: number): Date => {
  let date = endOfDay(addMonths(baseDate, monthsToAdd))
  while (isWeekend(date)) date = addDays(date, 1)
  return date
}

export const findInstallmentsValues = (value: string, numberOfInstallments: number): number[] => {
  const totalValue = extractFromCurrency(value)
  const installmentValue = Math.floor(totalValue / numberOfInstallments)
  const remainderValue = totalValue - (installmentValue * numberOfInstallments)
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

export const isInstallmentInRange = (
  targetDate: string,
  start: Date | null,
  end: Date | null
): boolean => {
  const date = new Date(targetDate)
  if ((start == null) || (end == null)) return true
  if (isAfter(start, end)) return isSameDay(date, start)
  return isWithinInterval(
    date,
    { start: startOfDay(start), end: endOfDay(end) }
  )
}

export const makeInstallmentsData = (
  baseDate: Date,
  clientId: string,
  installments: number[]
): Prisma.Enumerable<Prisma.InstallmentCreateManyInput> => {
  return installments
    .map((installmentValue, installmentIndex) => ({
      value: installmentValue,
      dueDate: findInstallmentDate(baseDate, installmentIndex),
      clientId
    }))
}

export const sumInstallmentsValues = (installments: SerializedInstallmentDateAndValue[]): number => {
  return installments
    .map(installment => installment.value)
    .reduce(installmentsValuesReducer, 0)
}

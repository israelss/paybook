import { describe, expect, test } from 'vitest'
import { InstallmentsUtils } from '~/features/Installments'
import { Mocks } from './mocks'

describe('findInstallmentDate', () => {
  test('add zero months', () => {
    const actual = InstallmentsUtils.findInstallmentDate(
      Mocks.Dates.baseDate,
      0
    )
    const expected = Mocks.Dates.datePlusZeroMonths
    expect(actual).toStrictEqual(expected)
  })

  test('add one month', () => {
    const actual = InstallmentsUtils.findInstallmentDate(
      Mocks.Dates.baseDate,
      1
    )
    const expected = Mocks.Dates.datePlusOneMonth
    expect(actual).toStrictEqual(expected)
  })

  test('skip sunday', () => {
    const actual = InstallmentsUtils.findInstallmentDate(
      Mocks.Dates.baseDateSunday,
      0
    )
    const expected = Mocks.Dates.dateMonday
    expect(actual).toStrictEqual(expected)
  })

  test('skip all weekend', () => {
    const actual = InstallmentsUtils.findInstallmentDate(
      Mocks.Dates.baseDateSaturday,
      0
    )
    const expected = Mocks.Dates.dateMonday
    expect(actual).toStrictEqual(expected)
  })
})

describe('findInstallmentsValues', () => {
  test('one installment', () => {
    const actual = InstallmentsUtils.findInstallmentsValues(
      Mocks.Installments.totalValue,
      Mocks.Installments.oneInstallment
    )
    const expected = Mocks.Installments.oneInstallmentArray
    expect(actual).toStrictEqual(expected)
  })

  test('exact division', () => {
    const actual = InstallmentsUtils.findInstallmentsValues(
      Mocks.Installments.totalValue,
      Mocks.Installments.evenInstallments
    )
    const expected = Mocks.Installments.equalInstallmentsArray
    expect(actual).toStrictEqual(expected)
  })

  test('division with remainder', () => {
    const actual = InstallmentsUtils.findInstallmentsValues(
      Mocks.Installments.totalValue,
      Mocks.Installments.oddInstallments
    )
    const expected = Mocks.Installments.unequalInstallmentsArray
    expect(actual).toStrictEqual(expected)
  })
})

describe('formatDate', () => {
  test('format as dd/MM/yyyy', () => {
    const actual = InstallmentsUtils.formatDate(
      Mocks.Dates.baseDate.toISOString()
    )
    const expected = Mocks.Dates.formattedDate
    expect(actual).toStrictEqual(expected)
  })
})

describe('isInstallmentInRange', () => {
  test('when target date is between start and end dates returns true', () => {
    const actual = InstallmentsUtils.isInstallmentInRange(
      Mocks.Dates.baseDateSunday.toISOString(),
      Mocks.Dates.baseDateSaturday,
      Mocks.Dates.dateMonday
    )
    const expected = true
    expect(actual).toStrictEqual(expected)
  })

  test('when target date is not between start and end dates returns false', () => {
    const actual = InstallmentsUtils.isInstallmentInRange(
      Mocks.Dates.baseDate.toISOString(),
      Mocks.Dates.baseDateSaturday,
      Mocks.Dates.dateMonday
    )
    const expected = false
    expect(actual).toStrictEqual(expected)
  })

  test('when start date is null returns true', () => {
    const actual = InstallmentsUtils.isInstallmentInRange(
      Mocks.Dates.baseDate.toISOString(),
      null,
      Mocks.Dates.dateMonday
    )
    const expected = true
    expect(actual).toStrictEqual(expected)
  })

  test('when end date is null returns true', () => {
    const actual = InstallmentsUtils.isInstallmentInRange(
      Mocks.Dates.baseDate.toISOString(),
      Mocks.Dates.baseDateSaturday,
      null
    )
    const expected = true
    expect(actual).toStrictEqual(expected)
  })

  describe('when end date < start date check if target is same day as start date', () => {
    test('target is not same day as start date', () => {
      const actual = InstallmentsUtils.isInstallmentInRange(
        Mocks.Dates.baseDate.toISOString(),
        Mocks.Dates.dateMonday,
        Mocks.Dates.baseDateSaturday
      )
      const expected = false
      expect(actual).toStrictEqual(expected)
    })

    test('target is same day as start date', () => {
      const actual = InstallmentsUtils.isInstallmentInRange(
        Mocks.Dates.dateMonday.toISOString(),
        Mocks.Dates.dateMonday,
        Mocks.Dates.baseDateSaturday
      )
      const expected = true
      expect(actual).toStrictEqual(expected)
    })
  })
})

describe('makeInstallmentsData', () => {
  test('build data correctly with one installment', () => {
    const actual = InstallmentsUtils.makeInstallmentsData(
      Mocks.Dates.baseDate,
      'clientAId',
      Mocks.Installments.oneInstallmentArray
    )
    const expected = [
      {
        value: Mocks.Installments.oneInstallmentArray[0],
        dueDate: Mocks.Dates.datePlusZeroMonths,
        clientId: 'clientAId'
      }
    ]
    expect(actual).toStrictEqual(expected)
  })

  test('build data correctly with equal installments', () => {
    const actual = InstallmentsUtils.makeInstallmentsData(
      Mocks.Dates.baseDate,
      'clientAId',
      Mocks.Installments.equalInstallmentsArray
    )
    const expected = [
      {
        value: Mocks.Installments.equalInstallmentsArray[0],
        dueDate: Mocks.Dates.datePlusZeroMonths,
        clientId: 'clientAId'
      },
      {
        value: Mocks.Installments.equalInstallmentsArray[1],
        dueDate: Mocks.Dates.datePlusOneMonth,
        clientId: 'clientAId'
      }
    ]
    expect(actual).toStrictEqual(expected)
  })

  test('build data correctly with unequal installments', () => {
    const actual = InstallmentsUtils.makeInstallmentsData(
      Mocks.Dates.baseDate,
      'clientAId',
      Mocks.Installments.unequalInstallmentsArray
    )
    const expected = [
      {
        value: Mocks.Installments.unequalInstallmentsArray[0],
        dueDate: Mocks.Dates.datePlusZeroMonths,
        clientId: 'clientAId'
      },
      {
        value: Mocks.Installments.unequalInstallmentsArray[1],
        dueDate: Mocks.Dates.datePlusOneMonth,
        clientId: 'clientAId'
      },
      {
        value: Mocks.Installments.unequalInstallmentsArray[2],
        dueDate: Mocks.Dates.datePlusTwoMonths,
        clientId: 'clientAId'
      }
    ]
    expect(actual).toStrictEqual(expected)
  })
})

describe('sumInstallmentsValues', () => {
  test('one installment', () => {
    const actual = InstallmentsUtils.sumInstallmentsValues(
      Mocks.Installments.oneInstallmentData
    )
    const expected = Mocks.Installments.oneInstallmentSum
    expect(actual).toStrictEqual(expected)
  })

  test('two installments', () => {
    const actual = InstallmentsUtils.sumInstallmentsValues(
      Mocks.Installments.twoInstallmentsData
    )
    const expected = Mocks.Installments.twoInstallmentsSum
    expect(actual).toStrictEqual(expected)
  })
})

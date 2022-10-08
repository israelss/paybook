import { describe, expect, test } from 'vitest'
import { InstallmentsUtils } from '~/features/Installments'
import { Mocks } from './mocks'
import { baseInstallment, mondayInstallment, sundayInstallment } from './mocks/installments'

describe('formatDate', () => {
  test('format as dd/MM/yyyy', () => {
    const actual = InstallmentsUtils.formatDate(
      Mocks.Dates.baseDate.toISOString()
    )
    const expected = Mocks.Dates.formattedDate
    expect(actual).toStrictEqual(expected)
  })
})

describe.only('is', () => {
  describe.only('inRange', () => {
    test.only('when target date is between start and end dates returns true', () => {
      const actual = InstallmentsUtils.is(sundayInstallment).inRange(
        Mocks.Dates.saturday,
        Mocks.Dates.monday
      )
      const expected = true
      expect(actual).toStrictEqual(expected)
    })

    test('when target date is not between start and end dates returns false', () => {
      const actual = InstallmentsUtils.is(baseInstallment).inRange(
        Mocks.Dates.saturday,
        Mocks.Dates.monday
      )
      const expected = false
      expect(actual).toStrictEqual(expected)
    })

    test('when start date is null returns true', () => {
      const actual = InstallmentsUtils.is(baseInstallment).inRange(
        null,
        Mocks.Dates.monday
      )
      const expected = true
      expect(actual).toStrictEqual(expected)
    })

    test('when end date is null returns true', () => {
      const actual = InstallmentsUtils.is(baseInstallment).inRange(
        Mocks.Dates.saturday,
        null
      )
      const expected = true
      expect(actual).toStrictEqual(expected)
    })

    describe('when end date < start date check if target is same day as start date', () => {
      test('target is not same day as start date', () => {
        const actual = InstallmentsUtils.is(baseInstallment).inRange(
          Mocks.Dates.monday,
          Mocks.Dates.saturday
        )
        const expected = false
        expect(actual).toStrictEqual(expected)
      })

      test('target is same day as start date', () => {
        const actual = InstallmentsUtils.is(mondayInstallment).inRange(
          Mocks.Dates.monday,
          Mocks.Dates.saturday
        )
        const expected = true
        expect(actual).toStrictEqual(expected)
      })
    })
  })
})

describe('makeInputData', () => {
  test('build data correctly with one installment', () => {
    const data = {
      userId: 'user1',
      dueDate: Mocks.Dates.baseDate,
      installments: Mocks.Installments.oneInstallment.numberOfInstallments,
      clientName: 'clientA',
      value: Mocks.Installments.oneInstallment.sum.toString()
    }
    const actual = InstallmentsUtils.makeInputData({ data, clientId: 'clientAId' })
    const expected = [
      {
        value: Mocks.Installments.oneInstallment.data[0].value,
        dueDate: Mocks.Dates.datePlusZeroMonths,
        clientId: 'clientAId',
        userId: 'user1'
      }
    ]
    expect(actual).toStrictEqual(expected)
  })

  test('build data correctly with equal installments', () => {
    const data = {
      userId: 'user1',
      dueDate: Mocks.Dates.baseDate,
      installments: Mocks.Installments.twoInstallments.numberOfInstallments,
      clientName: 'clientA',
      value: Mocks.Installments.twoInstallments.sum.toString()
    }
    const actual = InstallmentsUtils.makeInputData({ data, clientId: 'clientAId' })
    const expected = [
      {
        value: Mocks.Installments.twoInstallments.installmentsArray[0],
        dueDate: Mocks.Dates.datePlusZeroMonths,
        clientId: 'clientAId',
        userId: 'user1'
      },
      {
        value: Mocks.Installments.twoInstallments.installmentsArray[1],
        dueDate: Mocks.Dates.datePlusOneMonth,
        clientId: 'clientAId',
        userId: 'user1'
      }
    ]
    expect(actual).toStrictEqual(expected)
  })

  test('build data correctly with unequal installments', () => {
    const data = {
      userId: 'user1',
      dueDate: Mocks.Dates.baseDate,
      installments: Mocks.Installments.threeInstallments.numberOfInstallments,
      clientName: 'clientA',
      value: Mocks.Installments.threeInstallments.sum.toString()
    }
    const actual = InstallmentsUtils.makeInputData({ data, clientId: 'clientAId' })
    const expected = [
      {
        value: Mocks.Installments.threeInstallments.installmentsArray[0],
        dueDate: Mocks.Dates.datePlusZeroMonths,
        clientId: 'clientAId',
        userId: 'user1'
      },
      {
        value: Mocks.Installments.threeInstallments.installmentsArray[1],
        dueDate: Mocks.Dates.datePlusOneMonth,
        clientId: 'clientAId',
        userId: 'user1'
      },
      {
        value: Mocks.Installments.threeInstallments.installmentsArray[2],
        dueDate: Mocks.Dates.datePlusTwoMonths,
        clientId: 'clientAId',
        userId: 'user1'
      }
    ]
    expect(actual).toStrictEqual(expected)
  })
})

describe('sumInstallmentsValues', () => {
  test('one installment', () => {
    const actual = InstallmentsUtils.sumValues(
      Mocks.Installments.oneInstallment.data
    )
    const expected = Mocks.Installments.oneInstallment.sum
    expect(actual).toStrictEqual(expected)
  })

  test('two installments', () => {
    const actual = InstallmentsUtils.sumValues(
      Mocks.Installments.twoInstallments.data
    )
    const expected = Mocks.Installments.twoInstallments.sum
    expect(actual).toStrictEqual(expected)
  })
})

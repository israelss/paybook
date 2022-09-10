import { Mocks } from './mocks'
import * as NewRecordUtils from '~/features/NewRecord/utils'

describe('inputClasses', () => {
  describe('errors undefined', () => {
    test('without textPosition', () => {
      const actual = NewRecordUtils.inputClasses(undefined)
      const expected = Mocks.Input.noErrorNoTextPositionInput
      expect(actual).toStrictEqual(expected)
    })

    test('with textPosition === "text-end"', () => {
      const actual = NewRecordUtils.inputClasses(undefined, 'text-end')
      const expected = Mocks.Input.noErrorTextPositionEndInput
      expect(actual).toStrictEqual(expected)
    })

    test('with textPosition === "text-center"', () => {
      const actual = NewRecordUtils.inputClasses(undefined, 'text-center')
      const expected = Mocks.Input.noErrorTextPositionCenterInput
      expect(actual).toStrictEqual(expected)
    })
  })

  describe('errors defined', () => {
    test('without textPosition', () => {
      const actual = NewRecordUtils.inputClasses(['error'])
      const expected = Mocks.Input.errorNoTextPositionInput
      expect(actual).toStrictEqual(expected)
    })

    test('with textPosition === "text-end"', () => {
      const actual = NewRecordUtils.inputClasses(['error'], 'text-end')
      const expected = Mocks.Input.errorTextPositionEndInput
      expect(actual).toStrictEqual(expected)
    })

    test('with textPosition === "text-center"', () => {
      const actual = NewRecordUtils.inputClasses(['error'], 'text-center')
      const expected = Mocks.Input.errorTextPositionCenterInput
      expect(actual).toStrictEqual(expected)
    })
  })
})

describe('labelClasses', () => {
  test('errors undefined', () => {
    const actual = NewRecordUtils.labelClasses(undefined)
    const expected = Mocks.Label.noErrorLabel
    expect(actual).toStrictEqual(expected)
  })

  test('errors defined', () => {
    const actual = NewRecordUtils.labelClasses(['error'])
    const expected = Mocks.Label.errorLabel
    expect(actual).toStrictEqual(expected)
  })
})

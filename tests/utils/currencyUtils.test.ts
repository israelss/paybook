import {
  clampMax,
  extractFromCurrency,
  formatAsCurrency,
  normalizeValue
} from '~/utils'

describe('extractFromCurrency', () => {
  test('a number string', () => {
    const actual = extractFromCurrency('R$ 100,00')
    const expected = 10000
    expect(actual).toBe(expected)
  })

  test('a non number string', () => {
    const actual = extractFromCurrency('wrong input')
    const expected = NaN
    expect(actual).toBe(expected)
  })
})

describe('formatAsCurrency', () => {
  test('a number', () => {
    const actual = formatAsCurrency(10000)
    const expected = 'R$\u00A0100,00'
    expect(actual).toBe(expected)
  })
})

describe('normalizeValue', () => {
  test('a number (< 99999999) string', () => {
    const actual = normalizeValue('R$ 100,00')
    const expected = 'R$\u00A0100,00'
    expect(actual).toBe(expected)
  })

  test('a number (=== 99999999) string', () => {
    const actual = normalizeValue('R$ 999.999,99')
    const expected = 'R$\u00A0999.999,99'
    expect(actual).toBe(expected)
  })

  test('a number (> 99999999) string', () => {
    const actual = normalizeValue('R$ 1.000.000,00')
    const expected = 'R$\u00A0999.999,99'
    expect(actual).toBe(expected)
  })

  test('a non number string', () => {
    const actual = extractFromCurrency('wrong input')
    const expected = NaN
    expect(actual).toBe(expected)
  })
})

describe('clampMax', () => {
  test('a number < max', () => {
    const actual = clampMax(100, 999)
    const expected = 100
    expect(actual).toBe(expected)
  })

  test('a number === max', () => {
    const actual = clampMax(999, 999)
    const expected = 999
    expect(actual).toBe(expected)
  })

  test('a number > max', () => {
    const actual = clampMax(1000, 999)
    const expected = 999
    expect(actual).toBe(expected)
  })
})

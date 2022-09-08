const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const extractFromCurrency = (value: string): number =>
  Number.parseInt(value.replace(/\D/g, ''))

export const formatAsCurrency = (value: number): string =>
  currencyFormatter.format(value / 100)

export const normalizeValue = (value: string): string => {
  const extractedValue = clampMax(extractFromCurrency(value), 99999999)
  const normalizedValue = formatAsCurrency(extractedValue)
  return normalizedValue
}

export const clampMax = (value: number, max: number): number => Math.min(max, value)

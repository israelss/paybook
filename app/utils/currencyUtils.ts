const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const extractFromCurrency = (value: string): number =>
  Number.parseInt(value.replace(/\D/g, ''))

export const formatAsCurrency = (value: number): string =>
  currencyFormatter.format(value / 100)

export const normalizeValue = (value: string): string => {
  const extractedValue = Math.min(99999999, extractFromCurrency(value))
  const normalizedValue = formatAsCurrency(extractedValue)
  return normalizedValue
}

import type { InputFocusHandler } from './types'

export const inputClasses = (
  errors: string[] | undefined,
  textPosition?: 'text-end' | 'text-center'
): string => `
  input w-full input-sm
  ${textPosition ?? ''}
  ${errors !== undefined ? 'input-error text-error' : 'input-info text-info'}
`

export const labelClasses = (errors: string[] | undefined): string => `
  label-text
  ${errors !== undefined ? 'text-error' : ''}
`

export const setCaretAtEnd: InputFocusHandler = ({ currentTarget }) => {
  const endOfText = currentTarget.innerText.length - 1
  currentTarget.setSelectionRange(endOfText, endOfText)
}

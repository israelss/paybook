import type { InputFocusHandler } from './types'

export const setCaretAtEnd: InputFocusHandler = ({ currentTarget }) => {
  const endOfText = currentTarget.innerText.length - 1
  currentTarget.setSelectionRange(endOfText, endOfText)
}

import type { FocusEventHandler, MouseEventHandler } from 'react'

export interface InputFocusHandler extends
  FocusEventHandler<HTMLInputElement>,
  MouseEventHandler<HTMLInputElement> {}

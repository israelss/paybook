import { useFetcher } from '@remix-run/react'
import type { DebtCardActionButtonProps } from '../types'

const DebtCardActionButton = ({ action, children, className, valueToSend }: DebtCardActionButtonProps): JSX.Element => {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method='post'>
      <input name='debtId' type='hidden' value={valueToSend} />
      <button
        className={`h-full py-1 text-xs ${className}`}
        name='_action'
        type='submit'
        value={action}
      >
        {children}
      </button>
    </fetcher.Form>
  )
}

export default DebtCardActionButton

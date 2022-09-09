import { useFetcher } from '@remix-run/react'
import type { InstallmentCardActionButtonProps } from '../types'

const InstallmentCardActionButton = ({ action, children, className, valueToSend }: InstallmentCardActionButtonProps): JSX.Element => {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method='post'>
      <input name='installmentId' type='hidden' value={valueToSend} />
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

export default InstallmentCardActionButton

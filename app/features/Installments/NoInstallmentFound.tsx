import { useFetcher, useParams } from '@remix-run/react'
import React from 'react'
import invariant from 'tiny-invariant'

const NoInstallmentFound = (): JSX.Element => {
  const { id } = useParams()
  invariant(id, 'Please provide a valid uuid client id')
  const fetcher = useFetcher()
  return (
    <div className='flex flex-col items-center justify-center gap-4 text-center'>
      <h2 className='mt-2 text-3xl'>Nenhuma parcela encontrada</h2>
      <fetcher.Form method='post'>
        <input name='clientId' type='hidden' value={id} />
        <button
          className='h-full py-1 btn btn-xs btn-error'
          name='_action'
          type='submit'
          value='removeClient'
        >
          Remover cliente?
        </button>
      </fetcher.Form>
    </div>
  )
}

export default NoInstallmentFound

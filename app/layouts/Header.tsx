import React, { memo } from 'react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useFetcher, useLoaderData } from '@remix-run/react'

const Header = (): JSX.Element => {
  const fetcher = useFetcher()
  const { userEmail } = useLoaderData<{ userEmail: string }>()

  return (
    <div className='flex justify-center flex-none h-16 gap-2 px-4 border-b-2 rounded-b-lg shadow-lg sm:justify-between sm:items-center border-base-300'>
      <div className='flex flex-col items-start justify-between flex-1 py-2 sm:flex-row sm:items-center sm:gap-2'>
        <h1 className='flex-1 text-3xl sm:text-4xl'>PayBook</h1>
        <span className='text-xs text-accent sm:text-base'>{userEmail}</span>
      </div>
      <fetcher.Form method='post' className='flex items-center'>
        <button
          className='flex items-center gap-1 text-error'
          name='_action'
          type='submit'
          value='logout'
          aria-label='Sair'
        >
          <ArrowLeftOnRectangleIcon className='w-4 h-4 sm:w-6 sm:h-6' />
          <span className='text-base sm:text-xl'>Sair</span>
        </button>
      </fetcher.Form>
    </div>
  )
}

export default memo(Header)

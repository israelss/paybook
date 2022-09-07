import { memo } from 'react'

const Header = (): JSX.Element => {
  return (
    <div className='flex items-center justify-center flex-none h-16 border-b-2 rounded-b-lg shadow-lg border-base-300'>
      <h1 className='text-4xl'>PayBook</h1>
    </div>
  )
}

export default memo(Header)

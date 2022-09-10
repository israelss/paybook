import React from 'react'

const Loader = (): JSX.Element => {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-3'>
      <h2 className='text-3xl text-center'>Carregando dados...</h2>
      <progress className='w-full max-w-sm px-4 progress' />
    </div>
  )
}

export default Loader

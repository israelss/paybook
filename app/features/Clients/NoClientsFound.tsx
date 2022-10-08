import React from 'react'

const NoClientsFound = (): JSX.Element => {
  return (
    <div className='flex flex-col items-start justify-center text-center'>
      <h2 className='mt-2 text-3xl'>Nenhum cliente cadastrado.</h2>
    </div>
  )
}

export default NoClientsFound

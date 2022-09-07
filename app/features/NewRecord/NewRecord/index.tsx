import { memo } from 'react'
import NewRecordForm from './NewRecordForm'

const NewRecord = (): JSX.Element => {
  return (
    <div className='w-full px-2 text-center'>
      <h2 className='text-2xl'>Novo registro</h2>
      <NewRecordForm />
    </div>
  )
}

export default memo(NewRecord)

import { memo } from 'react'
import { MonetaryValueDisplay } from '~/components'
import type { SummaryTotalProps } from '../types'

const SummaryTotal = ({ value }: SummaryTotalProps): JSX.Element => {
  return (
    <div className='w-full text-center'>
      <h2 className='mb-1 text-2xl'>Total a receber</h2>
      <div className='w-1/2 mx-auto'>
        <MonetaryValueDisplay value={value} />
      </div>
    </div>
  )
}

export default memo(SummaryTotal)

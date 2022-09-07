import { formatAsCurrency } from '~/utils'
import { memo } from 'react'

interface MonetaryValueDisplayProps {
  value: number
}

const MonetaryValueDisplay = ({ value }: MonetaryValueDisplayProps): JSX.Element => {
  return (
    <div className='w-full px-2 py-1 mx-auto text-center border rounded-lg text-accent border-1 border-accent'>
      <span className='text-sm'>{formatAsCurrency(value)}</span>
    </div>
  )
}

export default memo(MonetaryValueDisplay)

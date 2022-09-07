import { formatAsCurrency } from '~/utils'
import { formatDate } from '../utils'

export interface DebtCardHeaderProps {
  date: string
  value: number
}

const DebtCardHeader = ({ date, value }: DebtCardHeaderProps): JSX.Element => {
  return (
    <div className='flex justify-between w-full'>
      <div>
        {formatDate(date)}
      </div>
      <div>
        {formatAsCurrency(value)}
      </div>
    </div>
  )
}

export default DebtCardHeader

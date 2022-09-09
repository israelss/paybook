import { formatAsCurrency } from '~/utils'
import { formatDate } from '../utils'

export interface InstallmentCardHeaderProps {
  date: string
  value: number
}

const InstallmentCardHeader = ({ date, value }: InstallmentCardHeaderProps): JSX.Element => {
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

export default InstallmentCardHeader

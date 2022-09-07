import { memo } from 'react'
import DebtCardBody from './DebtCardBody'
import DebtCardHeader from './DebtCardHeader'
import type { DebtCardProps } from '../types'

const DebtCard = ({ debt }: DebtCardProps): JSX.Element => {
  return (
    <div className='flex flex-col gap-2 p-4 pb-2 rounded-lg bg-base-300'>
      <DebtCardHeader date={debt.dueDate} value={debt.value} />
      <DebtCardBody date={debt.paymentDate} debtId={debt.id} />
    </div>
  )
}

export default memo(DebtCard)

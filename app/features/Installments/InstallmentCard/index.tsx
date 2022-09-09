import { memo } from 'react'
import InstallmentCardBody from './InstallmentCardBody'
import InstallmentCardHeader from './InstallmentCardHeader'
import type { InstallmentCardProps } from '../types'

const InstallmentCard = ({ installment }: InstallmentCardProps): JSX.Element => {
  return (
    <div className='flex flex-col gap-2 p-4 pb-2 rounded-lg bg-base-300'>
      <InstallmentCardHeader date={installment.dueDate} value={installment.value} />
      <InstallmentCardBody date={installment.paymentDate} installmentId={installment.id} />
    </div>
  )
}

export default memo(InstallmentCard)

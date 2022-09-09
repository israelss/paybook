import { formatDate } from '../utils'
import InstallmentCardActionButton from './InstallmentCardActionButton'

export interface InstallmentCardBodyProps {
  date: string | null
  installmentId: string
}

const InstallmentCardBody = ({ date, installmentId }: InstallmentCardBodyProps): JSX.Element => {
  return (
    <div className='flex items-center justify-between gap-1'>
      {
        date !== null
          ? (
            <div className='h-full py-1 font-bold text-center uppercase badge-xs badge text-info'>
              Pago em {formatDate(date)}
            </div>
            )
          : (
            <InstallmentCardActionButton
              action='markAsPaid'
              className='btn btn-xs btn-success'
              valueToSend={installmentId}
            >
              Marcar como pago
            </InstallmentCardActionButton>
            )
      }
      <InstallmentCardActionButton
        action='delete'
        className='underline uppercase text-error'
        valueToSend={installmentId}
      >
        Excluir pagamento
      </InstallmentCardActionButton>
    </div>
  )
}

export default InstallmentCardBody

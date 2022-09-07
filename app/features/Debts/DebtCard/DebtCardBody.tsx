import { formatDate } from '../utils'
import DebtCardActionButton from './DebtCardActionButton'

export interface DebtCardBodyProps {
  date: string | null
  debtId: string
}

const DebtCardBody = ({ date, debtId }: DebtCardBodyProps): JSX.Element => {
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
            <DebtCardActionButton action='markAsPaid' className='btn btn-xs btn-success' valueToSend={debtId}>
              Marcar como pago
            </DebtCardActionButton>
            )
      }
      <DebtCardActionButton action='delete' className='underline uppercase text-error' valueToSend={debtId}>
        Excluir pagamento
      </DebtCardActionButton>
    </div>
  )
}

export default DebtCardBody

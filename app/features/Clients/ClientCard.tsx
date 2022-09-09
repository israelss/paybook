import { InstallmentsUtils } from '../Installments'
import { Divider, MonetaryValueDisplay } from '~/components'
import { memo } from 'react'
import { NavLink, useParams } from '@remix-run/react'
import type { ClientCardProps } from './types'

const ClientCard = ({ client }: ClientCardProps): JSX.Element => {
  const { id } = useParams()

  const clientTotalInstallment = InstallmentsUtils.sumInstallmentsValues(
    client.installments.filter(installment => installment.paymentDate === null)
  )

  const clientSelected = client.id === id

  return (
    <div className='sticky top-0 pt-2 bg-base-100'>
      <NavLink
        className={`flex flex-col p-4 pb-2 rounded-lg items-start scroll-mt-2 ${clientSelected ? 'bg-info-content text-info' : 'bg-neutral text-neutral-content'}`}
        to={!clientSelected ? client.id : '.'}
      >
        <span>{client.name}</span>
        <Divider />
        <div className='flex items-center justify-between w-full gap-5'>
          <span className={`text-sm ${clientSelected ? 'text-info' : 'text-neutral-content'}`}>
            Total
          </span>
          <MonetaryValueDisplay value={clientTotalInstallment} />
        </div>
        <Divider />
        <div className={`text-xs ${clientSelected ? 'text-warning' : 'text-info'}`}>
          {clientSelected ? 'Ocultar ' : 'Ver '} Detalhes
        </div>
      </NavLink>
    </div>
  )
}

export default memo(ClientCard)

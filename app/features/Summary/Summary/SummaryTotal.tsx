import { InstallmentsUtils } from '~/features/Installments'
import { memo } from 'react'
import { MonetaryValueDisplay } from '~/components'
import { useLoaderData } from '@remix-run/react'
import type { InstallmentsTypes } from '~/features/Installments'

const SummaryTotal = (): JSX.Element => {
  const { data } = useLoaderData<{ data: InstallmentsTypes.SerializedInstallment[] }>()
  const totalValue = InstallmentsUtils.sumValues(data)

  return (
    <div className='w-full text-center'>
      <h2 className='mb-1 text-2xl'>Total a receber</h2>
      <div className='w-1/2 mx-auto'>
        <MonetaryValueDisplay value={totalValue} />
      </div>
    </div>
  )
}

export default memo(SummaryTotal)

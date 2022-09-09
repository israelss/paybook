import { InstallmentsUtils } from '~/features/Installments'
import { Divider } from '~/components'
import { memo } from 'react'
import { useLoaderData } from '@remix-run/react'
import SummaryInDateRange from './SummaryInDateRange'
import SummaryTotal from './SummaryTotal'
import type { InstallmentsTypes } from '~/features/Installments'

const Summary = (): JSX.Element => {
  const data = useLoaderData<InstallmentsTypes.InstallmentDateAndValue[]>()

  return (
    <>
      <SummaryTotal value={InstallmentsUtils.sumInstallmentsValues(data)} />
      <Divider />
      <SummaryInDateRange data={data} />
    </>
  )
}

export default memo(Summary)

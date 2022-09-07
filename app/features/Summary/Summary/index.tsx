import { DebtsUtils } from '~/features/Debts'
import { Divider } from '~/components'
import { memo } from 'react'
import { useLoaderData } from '@remix-run/react'
import SummaryInDateRange from './SummaryInDateRange'
import SummaryTotal from './SummaryTotal'
import type { DebtsTypes } from '~/features/Debts'

const Summary = (): JSX.Element => {
  const data = useLoaderData<DebtsTypes.DebtDateAndValue[]>()

  return (
    <>
      <SummaryTotal value={DebtsUtils.sumDebtsValues(data)} />
      <Divider />
      <SummaryInDateRange data={data} />
    </>
  )
}

export default memo(Summary)

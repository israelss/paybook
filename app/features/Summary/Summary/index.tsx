import { Divider } from '~/components'
import { memo } from 'react'
import SummaryInDateRange from './SummaryInDateRange'
import SummaryTotal from './SummaryTotal'

const Summary = (): JSX.Element => {
  return (
    <>
      <SummaryTotal />
      <Divider />
      <SummaryInDateRange />
    </>
  )
}

export default memo(Summary)

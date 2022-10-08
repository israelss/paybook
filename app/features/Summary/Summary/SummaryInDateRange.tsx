import { CalendarIcon } from '@heroicons/react/24/outline'
import { createRef, memo, useState } from 'react'
import { InstallmentsUtils } from '~/features/Installments'
import { MonetaryValueDisplay } from '~/components'
import { useLoaderData } from '@remix-run/react'
import endOfToday from 'date-fns/endOfToday'
import ReactDatePicker from 'react-datepicker'
import startOfToday from 'date-fns/startOfToday'
import type { InstallmentsTypes } from '~/features/Installments'

const todayStart = startOfToday()
const todayEnd = endOfToday()

const SummaryInDateRange = (): JSX.Element => {
  const { data } = useLoaderData<{ data: InstallmentsTypes.SerializedInstallment[] }>()
  const rangePickerRef = createRef<ReactDatePicker<never, true>>()
  const [dateRange, setDateRange] = useState<Array<Date | null>>([todayStart, todayEnd])

  const [startDate, endDate] = dateRange

  const installmentsInDateRange = data
    .filter((installment) => InstallmentsUtils
      .is(installment)
      .inRange(startDate, endDate)
    )

  const totalValue = InstallmentsUtils.sumValues(installmentsInDateRange)

  const handleCalendarClose = (): void => {
    if (endDate === null) setDateRange([startDate, startDate])
  }

  const openDatePicker = (): void => rangePickerRef.current?.setOpen(true)

  return (
    <div className='w-full text-center'>
      <h2 className='text-2xl'>Total a receber entre</h2>
      <div className='flex items-center justify-center gap-1 mb-1'>
        <ReactDatePicker
          className='px-3 py-2 my-1 text-sm rounded-lg text-info bg-info-content'
          dateFormat='dd/MM/yyyy'
          endDate={endDate}
          fixedHeight
          locale='pt-BR'
          onCalendarClose={handleCalendarClose}
          onChange={setDateRange}
          ref={rangePickerRef}
          selectsRange
          startDate={startDate}
          todayButton='Hoje'
          withPortal
        />
        <CalendarIcon className='w-6 h-6 text-info' onClick={openDatePicker} />
      </div>
      <div className='w-1/2 mx-auto'>
        <MonetaryValueDisplay value={totalValue} />
      </div>
    </div>
  )
}

export default memo(SummaryInDateRange)

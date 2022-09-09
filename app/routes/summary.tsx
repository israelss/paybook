import { InstallmentsApi } from '~/features/Installments'
import { Divider, Loader, ScrollableContainer } from '~/components'
import { json } from '@remix-run/node'
import { memo } from 'react'
import { NewRecord, NewRecordActions } from '~/features/NewRecord'
import { Summary } from '~/features/Summary'
import { useMobileQuery } from '~/hooks/useMobileQuery'
import datePickerStyles from 'react-datepicker/dist/react-datepicker.css'
import ResponsiveLayout from '~/layouts/ResponsiveLayout'
import type { ActionFunction, LinksFunction, LoaderFunction } from '@remix-run/node'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: datePickerStyles }
  ]
}

export const loader: LoaderFunction = async () => {
  return json(await InstallmentsApi.getInstallmentsDatesAndValues())
}

export const action: ActionFunction = async ({ request }) => {
  return await NewRecordActions.processRequest(request)
}

const SummaryRoute = (): JSX.Element | null => {
  const isMobile = useMobileQuery()

  if (isMobile === undefined) return <Loader />

  return (
    <ResponsiveLayout>
      <ScrollableContainer column noDivider>
        <Summary />
        <Divider />
        <NewRecord />
      </ScrollableContainer>
    </ResponsiveLayout>
  )
}

export const ErrorBoundary = (): JSX.Element => {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen p-2 text-center'>
      <h2 className='mt-2 text-3xl'>Ah não!<br />Um erro inesperado aconteceu!</h2>
      <h3 className='mt-4 text-7xl'>:(</h3>
    </div>
  )
}

export default memo(SummaryRoute)

import { InstallmentsActions, InstallmentsApi, InstallmentCard } from '~/features/Installments'
import { json } from '@remix-run/node'
import { memo, useEffect } from 'react'
import { scroll } from '~/utils'
import { ScrollableContainer } from '~/components'
import { useLoaderData, useParams, useTransition } from '@remix-run/react'
import { useMobileQuery } from '~/hooks/useMobileQuery'
import invariant from 'tiny-invariant'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type { InstallmentsTypes } from '~/features/Installments'

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  invariant(id, 'Please provide a valid uuid client id')

  return json(await InstallmentsApi.getByClient(id))
}

export const action: ActionFunction = async ({ request }) => await InstallmentsActions.processRequest(request)

const SelectedClientRoute = (): JSX.Element => {
  const { id } = useParams()
  invariant(id, 'Please provide a valid uuid client id')

  const { installments } = useLoaderData<InstallmentsTypes.AllInstallmentsWithoutClientID>()
  const transition = useTransition()
  const isMobile = useMobileQuery()

  useEffect(() => {
    if (isMobile !== undefined && transition.state === 'idle') {
      scroll(id, isMobile)
    }
  }, [id, isMobile, transition.state])

  if (installments.length === 0) {
    return (
      <div className='flex flex-col items-start justify-center text-center'>
        <h2 className='mt-2 text-3xl'>Sem pagamentos pendentes</h2>
      </div>
    )
  }

  return (
    <ScrollableContainer>
      <ul className='w-full' id={`details-${id}`}>
        {
          installments.map(installment => (
            <li key={installment.id} className='mt-2'>
              <InstallmentCard installment={installment} />
            </li>
          ))
        }
      </ul>
    </ScrollableContainer>
  )
}

export const ErrorBoundary = (): JSX.Element => {
  return (
    <div className='flex flex-col items-start justify-center text-center'>
      <h2 className='mt-2 text-3xl'>Cliente não encontrado</h2>
    </div>
  )
}

export default memo(SelectedClientRoute)

import { InstallmentsActions, InstallmentsApi, InstallmentCard } from '~/features/Installments'
import { json, redirect } from '@remix-run/node'
import { memo, useEffect } from 'react'
import { requireUserData } from '~/utils/session.server'
import { scroll } from '~/utils'
import { ScrollableContainer } from '~/components'
import { useLoaderData, useParams, useTransition } from '@remix-run/react'
import { useMobileQuery } from '~/hooks/useMobileQuery'
import invariant from 'tiny-invariant'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type { InstallmentsTypes } from '~/features/Installments'
import { ClientsApi } from '~/features/Clients'
import NoInstallmentFound from '~/features/Installments/NoInstallmentFound'

export const loader: LoaderFunction = async ({ params, request }) => {
  const { userId } = await requireUserData(request)

  const { id } = params

  invariant(id, 'Please provide a valid uuid client id')

  return json(await InstallmentsApi.getByClient(id, userId))
}

export const action: ActionFunction = async ({ request }) => {
  const clonedRequest = request.clone()
  const formData = await request.formData()
  const action = formData.get('_action') as string
  const clientId = formData.get('clientId') as string
  if (action === 'removeClient') {
    await ClientsApi.remove(clientId)
    return redirect('/summary/clients')
  }
  return await InstallmentsActions.processRequest(clonedRequest)
}

const SelectedClientRoute = (): JSX.Element => {
  const { id } = useParams()
  invariant(id, 'Please provide a valid uuid client id')

  const installments = useLoaderData<InstallmentsTypes.InstallmentWithoutIds[]>()
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

export const ErrorBoundary = (): JSX.Element => <NoInstallmentFound />

export const CatchBoundary = (): JSX.Element => <NoInstallmentFound />

export default memo(SelectedClientRoute)

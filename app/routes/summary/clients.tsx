import { ClientsApi, ClientCard } from '~/features/Clients'
import { json } from '@remix-run/node'
import { memo } from 'react'
import { Outlet, useLoaderData, useParams } from '@remix-run/react'
import { ScrollableContainer } from '~/components'
import { useMobileQuery } from '~/hooks/useMobileQuery'
import type { ClientsTypes } from '~/features/Clients'
import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async () => json(await ClientsApi.getAll())

const ClientsRoute = (): JSX.Element | null => {
  const { clients } = useLoaderData<ClientsTypes.AllClients>()
  const { id } = useParams()
  const isMobile = useMobileQuery()

  if (clients.length === 0) {
    return (
      <div className='flex flex-col items-start justify-center text-center'>
        <h2 className='mt-2 text-3xl'>Sem pagamentos pendentes</h2>
      </div>
    )
  }

  const isClientSelected = {
    atMobile: (clientId?: string): boolean => isMobile === true && id === clientId,
    atDesktop: (): boolean => isMobile === false && id !== undefined
  }

  return (
    <>
      <ScrollableContainer noDivider={isMobile}>
        <ul className='w-full'>
          {
            clients.map((client) => (
              <li key={client.id} id={client.id}>
                <ClientCard client={client} />
                {isClientSelected.atMobile(client.id) ? <Outlet /> : null}
              </li>
            ))
          }
        </ul>
      </ScrollableContainer>
      {isClientSelected.atDesktop() ? <Outlet /> : null}
    </>
  )
}

export const ErrorBoundary = (): JSX.Element => {
  return (
    <div className='flex flex-col items-start justify-center text-center'>
      <h2 className='mt-2 text-3xl'>Nenhuma dívida encontrada.</h2>
    </div>
  )
}

export default memo(ClientsRoute)

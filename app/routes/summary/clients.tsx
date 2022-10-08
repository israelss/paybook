import { ClientsApi, ClientCard } from '~/features/Clients'
import { json } from '@remix-run/node'
import { memo } from 'react'
import { Outlet, useLoaderData, useParams } from '@remix-run/react'
import { requireUserData } from '~/utils/session.server'
import { ScrollableContainer } from '~/components'
import { useMobileQuery } from '~/hooks/useMobileQuery'
import type { ClientsTypes } from '~/features/Clients'
import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  const { userId } = await requireUserData(request)
  const clients = await ClientsApi.getAll(userId)
  return json({ clients, userId })
}

const ClientsRoute = (): JSX.Element | null => {
  const { clients } = useLoaderData<{ clients: ClientsTypes.ClientWithInstallments[] }>()
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
                {
                  isMobile === true
                    ? (
                      <details
                        open={isClientSelected.atMobile(client.id)}
                        onToggle={(e) => {
                          const target = e.currentTarget
                          if (!target.open) target.scrollIntoView()
                        }}
                      >
                        <summary className='sticky top-0 list-none'>
                          <ClientCard client={client} />
                        </summary>
                        {isClientSelected.atMobile(client.id) ? <Outlet /> : null}
                      </details>
                      )
                    : <ClientCard client={client} />
                }
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

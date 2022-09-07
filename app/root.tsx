import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

import styles from '~/tailwind.css'

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import pt_BR from 'date-fns/locale/pt-BR'

registerLocale('pt-BR', pt_BR)
setDefaultLocale('pt-BR')

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export default function App (): JSX.Element {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

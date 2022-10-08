import { PassThrough } from 'stream'
import { redirectDestroy, requireUserData } from './utils/session.server'
import { RemixServer } from '@remix-run/react'
import { renderToPipeableStream } from 'react-dom/server'
import { Response } from '@remix-run/node'
import type { EntryContext, TypedResponse } from '@remix-run/node'

const ABORT_DELAY = 5000

export default async function handleRequest (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
): Promise<Response | TypedResponse> {
  const { userId } = await requireUserData(request)
  if (!request.url.endsWith('/login') && userId === undefined) return await redirectDestroy(request, '/login')

  return await new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady: () => {
          const body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          )

          pipe(body)
        },
        onShellError: (err) => {
          reject(err)
        },
        onError: (error) => {
          didError = true

          console.error(error)
        }
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

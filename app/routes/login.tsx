import React from 'react'
import { createUserSession, requireUserData } from '~/utils/session.server'
import { LoginActions, LoginForm } from '~/features/Login'
import { redirect } from '@remix-run/node'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  const { userId } = await requireUserData(request)
  if (userId !== undefined) return redirect('summary')
  return null
}

export const action: ActionFunction = async ({ request }) => {
  const result = await LoginActions.processRequest(request)

  const { id, email, errors } = await result.json()

  if (errors !== undefined) return { errors }

  return await createUserSession(id, email, '/summary')
}

const LoginRoute = (): JSX.Element => {
  return (
    <div className='h-screen text-center'>
      <div className='flex flex-col items-center justify-center gap-4 pt-32'>
        <h1 className='mb-2 text-4xl'>PayBook</h1>
        <h2 className='mb-1 text-3xl'>Login</h2>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginRoute

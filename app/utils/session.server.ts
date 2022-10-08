import { createCookieSessionStorage, redirect } from '@remix-run/node'
import type { TypedResponse, Session } from '@remix-run/node'
import type { UserData } from '~/features/User/types'

const sessionSecret = process.env.SESSION_SECRET
if (sessionSecret === undefined) {
  throw new Error('SESSION_SECRET must be set')
}

export const createUserSession = async (
  userId: string,
  userEmail: string,
  redirectTo: string
): Promise<TypedResponse<never>> => {
  const session = await storage.getSession()
  session.set('userId', userId)
  session.set('userEmail', userEmail)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  })
}

export const getUserSession = async (request: Request): Promise<Session> => {
  return await storage.getSession(request.headers.get('Cookie'))
}

export const redirectDestroy = async (
  request: Request,
  redirectTo: string
): Promise<TypedResponse<never>> => {
  const session = await getUserSession(request)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.destroySession(session)
    }
  })
}

export const requireUserData = async (request: Request): Promise<UserData> => {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (userId === undefined || typeof userId !== 'string') {
    redirect('/login')
  }
  const userEmail = session.get('userEmail')
  if (userEmail === undefined || typeof userEmail !== 'string') {
    redirect('/login')
  }
  return { userEmail, userId }
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'paybook_session',
    // normally this would to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
})

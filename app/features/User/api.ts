import { db } from '~/utils/db.server'
import type { LoginTypes } from '../Login'
import type { Prisma, User } from '@prisma/client'

export const create = async ({ email, passwordHash }: Prisma.UserCreateInput): Promise<User> => {
  return await db.user.create({ data: { email, passwordHash } })
}

export const find = async ({ email }: Pick<LoginTypes.LoginData, 'email'>): Promise<User | null> => {
  return await db.user.findUnique({ where: { email } })
}

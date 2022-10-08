import { db } from '~/utils/db.server'
import { seedDev } from './dev'
import { seedTest } from './test'
import bcrypt from 'bcryptjs'
import type { User } from '@prisma/client'

interface UserInput {
  email: string
  password: string
}

const ENV = process.env.NODE_ENV

export const createUser = async ({ email, password }: UserInput): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 8)
  const user = await db.user.create({ data: { email, passwordHash } })
  return user
}

async function seed (): Promise<void> {
  console.info(`Running seed in ${ENV} environment`)
  switch (ENV) {
    case 'test':
      return await seedTest()
    case 'development':
    default:
      return await seedDev()
  }
}

void seed()

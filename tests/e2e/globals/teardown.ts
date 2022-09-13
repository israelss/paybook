import { db } from '~/utils/db.server'
import type { FullConfig } from '@playwright/test'

const resetTestData = async (): Promise<void> => {
  await db.installment.deleteMany()
  await db.client.deleteMany()
}

const disconnect = async (): Promise<void> => {
  await db.$disconnect()
}

const globalTeardown = async (config: FullConfig): Promise<void> => {
  await resetTestData()
  await disconnect()
}

export default globalTeardown

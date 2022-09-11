import type { FullConfig } from '@playwright/test'
import { disconnect, resetTestData } from './dbUtils'

const globalTeardown = async (config: FullConfig): Promise<void> => {
  await resetTestData()
  await disconnect()
}

export default globalTeardown

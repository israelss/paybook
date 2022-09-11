import type { FullConfig } from '@playwright/test'
import { seedTestData } from './dbUtils'

const globalSetup = async (config: FullConfig): Promise<void> => {
  await seedTestData()
}

export default globalSetup

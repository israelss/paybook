import { seedDev } from './dev'
import { seedTest } from './test'

const env = process.env.NODE_ENV

async function seed (): Promise<void> {
  console.log(`Running seed in ${env} environment`)
  switch (env) {
    case 'test':
      return await seedTest()
    case 'development':
    default:
      return await seedDev()
  }
}

void seed()

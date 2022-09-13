import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, './app')
    }
  },
  root: '.',
  test: {
    environment: 'happy-dom',
    include: ['**/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: './tests/unit/setupTests.ts'
  }
})

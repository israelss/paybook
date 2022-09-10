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
    globals: true,
    setupFiles: './tests/setupTests.ts'
  }
})

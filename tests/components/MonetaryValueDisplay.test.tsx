import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MonetaryValueDisplay } from '~/components'
import React from 'react'

afterEach(cleanup)

describe('MonetaryValueDisplay', () => {
  test('has formatted text when value !== 0', async () => {
    const { container } = render(<MonetaryValueDisplay value={10000} />)
    const display = container.firstChild
    expect(display).toHaveTextContent('R$ 100,00')
  })

  test('has formatted text when value === 0', async () => {
    const { container } = render(<MonetaryValueDisplay value={0} />)
    const display = container.firstChild
    expect(display).toHaveTextContent('R$ 0,00')
  })
})

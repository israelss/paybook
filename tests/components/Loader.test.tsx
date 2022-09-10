import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Loader } from '~/components'
import React from 'react'

afterEach(cleanup)

describe('Loader', () => {
  test('has text', async () => {
    render(<Loader />)
    const loaderText = screen.getByText('Carregando dados...')
    expect(loaderText.tagName).toBe('H2')
  })

  test('has infinite progress', async () => {
    render(<Loader />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveClass('progress')
  })
})

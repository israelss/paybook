import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Divider } from '~/components'
import React from 'react'

afterEach(cleanup)

describe('Divider', () => {
  test('without horizontal prop', async () => {
    render(<Divider />)
    const divider = screen.getByRole('separator')
    expect(divider).toBeInTheDocument()
    expect(divider).not.toHaveClass('divider-horizontal')
  })

  test('with horizontal prop', async () => {
    render(<Divider horizontal />)
    const divider = screen.getByRole('separator')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveClass('divider-horizontal')
  })
})

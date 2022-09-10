import { Divider } from '~/components'
import { render, screen } from '@testing-library/react'
import React from 'react'

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

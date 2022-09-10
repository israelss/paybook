import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { ScrollableContainer } from '~/components'
import React from 'react'

afterEach(cleanup)

describe('ScrollableContainer', () => {
  test('without props', async () => {
    const { container } = render(<ScrollableContainer />)
    const scrollableContainer = container.firstChild
    expect(scrollableContainer).toHaveClass('h-full overflow-y-auto')
    const innerContainer = scrollableContainer?.firstChild
    expect(innerContainer).not.toHaveClass('flex-col')
    expect(innerContainer).not.toBeEmptyDOMElement()
    const divider = screen.getByRole('separator')
    expect(innerContainer).toContainElement(divider)
  })

  test('with props -> column', async () => {
    const { container } = render(<ScrollableContainer column />)
    const scrollableContainer = container.firstChild
    expect(scrollableContainer).toHaveClass('h-full overflow-y-auto')
    const innerContainer = scrollableContainer?.firstChild
    expect(innerContainer).toHaveClass('flex-col')
    expect(innerContainer).not.toBeEmptyDOMElement()
    const divider = screen.getByRole('separator')
    expect(innerContainer).toContainElement(divider)
  })

  test('with props -> noDivider', async () => {
    const { container } = render(<ScrollableContainer noDivider />)
    const scrollableContainer = container.firstChild
    expect(scrollableContainer).toHaveClass('h-full overflow-y-auto')
    const innerContainer = scrollableContainer?.firstChild
    expect(innerContainer).not.toHaveClass('flex-col')
    expect(innerContainer).toBeEmptyDOMElement()
  })

  test('with props -> column & noDivider', async () => {
    const { container } = render(<ScrollableContainer column noDivider />)
    const scrollableContainer = container.firstChild
    expect(scrollableContainer).toHaveClass('h-full overflow-y-auto')
    const innerContainer = scrollableContainer?.firstChild
    expect(innerContainer).toHaveClass('flex-col')
    expect(innerContainer).toBeEmptyDOMElement()
  })

  test('with one child', async () => {
    const { container } = render(
      <ScrollableContainer>
        <div data-testid='test-child' />
      </ScrollableContainer>
    )
    const innerContainer = container.firstChild?.firstChild
    expect(innerContainer).not.toBeEmptyDOMElement()
    expect(innerContainer).not.toBeEmptyDOMElement()
    const child = screen.getByTestId('test-child')
    expect(child).toBeInTheDocument()
  })

  test('with more than one child', async () => {
    const { container } = render(
      <ScrollableContainer>
        <div data-testid='test-child-1' />
        <div data-testid='test-child-2' />
      </ScrollableContainer>
    )
    const innerContainer = container.firstChild?.firstChild
    expect(innerContainer).not.toBeEmptyDOMElement()
    expect(innerContainer?.childNodes.length).toBe(3)
    const child1 = screen.getByTestId('test-child-1')
    expect(child1).toBeInTheDocument()
    const child2 = screen.getByTestId('test-child-2')
    expect(child2).toBeInTheDocument()
  })
})

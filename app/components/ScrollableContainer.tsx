import { memo } from 'react'
import Divider from './Divider'
import type { PropsWithChildren } from 'react'

interface ScrollableContainerProps extends PropsWithChildren {
  column?: boolean
  noDivider?: boolean
}

const ScrollableContainer = ({ children, column = false, noDivider = false }: ScrollableContainerProps): JSX.Element => {
  return (
    <div className='h-full pb-2 overflow-y-auto'>
      <div className={`flex min-h-full ${column ? 'flex-col' : ''}`}>
        {noDivider ? null : <Divider horizontal />}
        {children}
      </div>
    </div>
  )
}

export default memo(ScrollableContainer)

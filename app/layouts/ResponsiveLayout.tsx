import { Outlet, useMatches } from '@remix-run/react'
import { useEffect } from 'react'
import { useMobileQuery } from '~/hooks/useMobileQuery'
import BottomNav from './BottomNav'
import Header from './Header'
import type { PropsWithChildren } from 'react'

const ResponsiveLayout = ({ children }: PropsWithChildren): JSX.Element => {
  const isMobile = useMobileQuery()
  const matches = useMatches()

  const isSummaryPath = matches.at(-1)?.pathname.endsWith('/summary') ?? true

  useEffect(() => {
    if (isMobile === false && isSummaryPath) window.location.replace('summary/clients')
  }, [isMobile, isSummaryPath])

  return (
    <div className='w-screen h-screen max-w-6xl px-4 mx-auto'>
      <div className={`grid h-screen ${isMobile === true ? 'grid-rows-[4rem_1fr_3rem]' : 'grid-rows-[4rem_1fr]'}`}>
        <Header />
        <div className={`overflow-hidden ${isMobile === true ? '' : 'grid h-full items-start grid-cols-[1.1fr_1fr_1.2fr]'}`}>
          {isMobile === false || isSummaryPath ? children : null}
          <Outlet />
        </div>
        {isMobile === true ? <BottomNav /> : null}
      </div>
    </div>
  )
}

export default ResponsiveLayout

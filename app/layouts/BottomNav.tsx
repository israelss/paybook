import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import { memo } from 'react'
import { NavLink } from '@remix-run/react'

const BottomNav = (): JSX.Element => {
  return (
    <div className='flex-none btm-nav btm-nav-sm bg-base-300'>
      <NavLink className={({ isActive }) => isActive ? 'active text-accent py-1' : 'pt-2'} to='.' end>
        <HomeIcon className='w-5 h-5' />
        <span className='btm-nav-label'>Resumo</span>
      </NavLink>
      <NavLink className={({ isActive }) => isActive ? 'active text-accent py-1' : 'pt-2'} to='clients'>
        <UsersIcon className='w-5 h-5' />
        <span className='btm-nav-label'>Clientes</span>
      </NavLink>
    </div>
  )
}

export default memo(BottomNav)

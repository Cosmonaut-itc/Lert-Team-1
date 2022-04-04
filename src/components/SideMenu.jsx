import {
  ChartBarIcon,
  HomeIcon,
  UsersIcon,
  LogoutIcon,
} from '@heroicons/react/outline'

import Logo from './Logo'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '#', current: false },
  { name: 'Team', icon: UsersIcon, href: '#', count: 3, current: false },
  { name: 'Reports', icon: ChartBarIcon, href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideMenu() {
  const isSideMenuCloseLS = localStorage.getItem('isSideMenuClose')

  const [isSideMenuClose, SetSideMenuSize] = useState(
    isSideMenuCloseLS ? false : true
  )

  const CloseMenu = () => {
    if (isSideMenuClose) {
      SetSideMenuSize(false)
      localStorage.setItem('isSideMenuClose', true)
      return
    }
    SetSideMenuSize(true)
    localStorage.removeItem('isSideMenuClose')
  }

  return (
    <div
      className={`flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white ${
        isSideMenuClose === true ? 'w-26' : 'w-64'
      } h-screen`}
    >
      <div className='flex-1 flex flex-col mt-5 mb-4 overflow-y-auto'>
        <div className='flex border-b pb-4 border-gray-200 items-center flex-shrink-0 px-4 justify-center'>
          <button onClick={() => CloseMenu()}>
            <Logo />
          </button>
        </div>
        <nav
          className='mt-5 flex-1 px-2 bg-white space-y-10'
          aria-label='Sidebar'
        >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md justify-center'
              )}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-blue-500'
                    : 'text-blue-300 group-hover:text-blue-500',
                  'flex-shrink-0 h-6 w-6'
                )}
                aria-hidden='true'
              />

              {!isSideMenuClose ? (
                <span className='flex-1 ml-2'>{item.name}</span>
              ) : (
                ''
              )}

              {item.count ? (
                <span
                  className={classNames(
                    item.current
                      ? 'bg-white'
                      : 'bg-gray-100 group-hover:bg-gray-200',
                    'inline-block py-0.5 ml-2 px-3 text-xs font-medium rounded-full'
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
      <div className='flex-shrink-0 flex border-t border-gray-200 p-4 w-full'>
        <div className='flex items-center w-full'>
          <div>
            <a href='/'>
              <img
                className='inline-block h-8 w-8 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </a>
          </div>
          <a
            href='/'
            className={`${isSideMenuClose === true ? 'hidden' : 'ml-3'}`}
          >
            <p className='text-sm font-medium text-gray-700 whitespace-nowrap'>
              Diego Mojarro
            </p>
            <div className='text-xs font-medium text-gray-500 '>
              View profile
            </div>
          </a>
        </div>
        <button>
          <LogoutIcon className='text-gray-500 hover:text-black w-6 ml-3' />
        </button>
      </div>
    </div>
  )
}

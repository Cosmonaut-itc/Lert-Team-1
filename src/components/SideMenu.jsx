import {
  ChartBarIcon,
  HomeIcon,
  UsersIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom'

import Logo from './Logo'
import { Fragment, useState } from 'react'

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/home' },
  { name: 'Team', icon: UsersIcon, href: 'team', count: 3 },
  { name: 'Reports', icon: ChartBarIcon, href: 'reports' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NavLinksMobile({ item }) {
  return (
    <NavLink
      key={item.name}
      to={item.href}
      className={({ isActive }) =>
        classNames(
          isActive
            ? 'bg-gray-200 text-gray-900 hover:text-gray-900 hover:bg-gray-200'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md justify-center'
        )
      }
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

      <span className='flex-1 ml-2'>{item.name}</span>

      {item.count ? (
        <span
          className={classNames(
            item.current ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200',
            'inline-block py-0.5 ml-2 px-3 text-xs font-medium rounded-full'
          )}
        >
          {item.count}
        </span>
      ) : null}
    </NavLink>
  )
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

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={isSideMenuClose ? 'md:ml-28' : 'md:ml-60'}>
      <div className='fixed top-0 left-0 overflow-hidden z-49'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 md:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex-1 flex flex-col max-w-xs w-full bg-white z-50'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset text-white focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XIcon />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                  <div className='flex border-b pb-4 border-gray-200 items-center flex-shrink-0 px-4 justify-center'>
                    <Logo />
                  </div>
                  <nav
                    className='mt-5 flex-1 px-2 bg-white space-y-10'
                    aria-label='Sidebar'
                  >
                    {navigation.map((item) => (
                      <NavLinksMobile item={item} />
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
                    <a href='/' className={'ml-3'}>
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
            </Transition.Child>
            <div className='flex-shrink-0 w-14'>
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        <div className='md:hidden flex h-screen'>
          <button
            type='button'
            className=' h-16 w-16 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <MenuIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div
          className={`hidden md:flex h-screen flex-1 flex-col border-r border-gray-200 bg-white ${
            isSideMenuClose ? 'w-26' : 'w-56'
          }  `}
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
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'bg-gray-200 text-gray-900 hover:text-gray-900 hover:bg-gray-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md justify-center'
                    )
                  }
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-blue-500'
                        : 'text-blue-400 group-hover:text-blue-500',
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
                </NavLink>
              ))}
            </nav>
          </div>
          <div className='flex-shrink-0 flex border-t border-gray-200 p-4 w-full'>
            <div className='flex items-center w-full'>
              <div>
                <a href='#'>
                  <img
                    className='inline-block h-8 w-8 rounded-full'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </a>
              </div>
              <a href='#' className={`${isSideMenuClose ? 'hidden' : 'ml-3'}`}>
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
      </div>
    </div>
  )
}

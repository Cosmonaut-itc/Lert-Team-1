import { LogoutIcon } from '@heroicons/react/outline'

import {
  IoBody,
  IoHome,
  IoPeople,
  IoDuplicate,
  IoMenu,
  IoCloseSharp,
  IoGlobeOutline,
  IoBagAdd,
  IoReceipt,
} from 'react-icons/io5'

import { Tooltip } from 'flowbite-react'

import { Dialog, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom'

import Logo from './Logo'
import { Fragment, useState } from 'react'
import DarkMode from './DarkMode'

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
            : 'text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50',
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
    </NavLink>
  )
}

export default function SideMenu({ role }) {
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

  const navigation = {
    delegate: [
      { name: 'Home', icon: IoHome, href: `${role}/home` },
      { name: 'Squads', icon: IoPeople, href: `${role}/squads` },
    ],
    opsmanager: [
      { name: 'Home', icon: IoHome, href: `${role}/home` },
      { name: 'Types', icon: IoDuplicate, href: `${role}/types` },
      { name: 'Bands', icon: IoReceipt, href: `${role}/bands` },
      { name: 'Icas', icon: IoBagAdd, href: `${role}/icas` },
    ],
    manager: [
      { name: 'Home', icon: IoHome, href: `${role}/home` },
      { name: 'Squads', icon: IoPeople, href: `${role}/squads` },
      { name: 'Delegate', icon: IoBody, href: `${role}/delegate` },
    ],
    admin: [
      { name: 'Home', icon: IoHome, href: `${role}/home` },
      { name: 'Countries', icon: IoGlobeOutline, href: `${role}/countries` },
    ],
  }

  return (
    <div className={isSideMenuClose ? 'md:ml-28' : 'md:ml-60'}>
      <div className='md:hidden fixed'>
        <button
          type='button'
          className='m-4 h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
          onClick={() => setSidebarOpen(true)}
        >
          <span className='sr-only'>Open sidebar</span>
          <IoMenu className='h-8 w-8' aria-hidden='true' />
        </button>
      </div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex md:hidden'
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
            <div className='relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-black z-50'>
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
                    className='flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset text-white focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                <div className='flex border-b pb-4 border-gray-200 items-center flex-shrink-0 px-4 justify-center'>
                  <Logo />
                </div>
                <nav
                  className='mt-5 flex-1 px-2 bg-white dark:bg-black space-y-10'
                  aria-label='Sidebar'
                >
                  {navigation[role].map((item) => (
                    <NavLinksMobile item={item} key={item.name} />
                  ))}
                </nav>
              </div>
              <div className='flex-shrink-0 flex border-t border-gray-200 p-4 w-full'>
                <div className='flex items-center w-full'>
                  <div>
                    <a href='/Users/diegoortiz/Documents/6to semestre/Proyecto/Lert-Team-1/public'>
                      <img
                        className='inline-block h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </a>
                  </div>
                  <a
                    href='/Users/diegoortiz/Documents/6to semestre/Proyecto/Lert-Team-1/public'
                    className={'ml-3'}
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
          </Transition.Child>
          <div className='flex-shrink-0 w-14'>
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      <div className='fixed top-0 left-0 z-50'>
        <div
          className={`hidden md:flex h-screen flex-1 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black ${
            isSideMenuClose ? 'w-26' : 'w-56'
          }  `}
        >
          <div className='flex-1 flex flex-col mt-5 mb-4 overflow-y-auto'>
            <div className='flex border-b pb-4 border-gray-200 dark:border-gray-700 items-center flex-shrink-0 px-4 justify-center'>
              <button onClick={() => CloseMenu()}>
                <Logo />
              </button>
            </div>
            <nav
              className='mt-5 flex-1 px-2 bg-white dark:bg-black space-y-10 flex flex-col justify-between'
              aria-label='Sidebar'
            >
              <div className='space-y-10 flex flex-col'>
                {navigation[role].map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? 'text-blue-700 dark:text-blue-500'
                          : 'text-blue-400 dark:text-blue-300 hover:bg-gray-50  dark:hover:bg-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md justify-center'
                      )
                    }
                  >
                    {isSideMenuClose ? (
                      <Tooltip content={item.name} placement='right'>
                        <item.icon
                          className='flex-shrink-0 h-6 w-6'
                          aria-hidden='true'
                        />
                      </Tooltip>
                    ) : (
                      <item.icon
                        className='flex-shrink-0 h-6 w-6'
                        aria-hidden='true'
                      />
                    )}

                    {!isSideMenuClose ? (
                      <span className='flex-1 ml-2 text-black dark:text-white'>
                        {item.name}
                      </span>
                    ) : (
                      ''
                    )}
                  </NavLink>
                ))}
              </div>
              <DarkMode isSideMenuClose={isSideMenuClose} />
            </nav>
          </div>
          <div
            className={`border-t border-gray-200 dark:border-gray-700 p-4 w-full ${
              isSideMenuClose
                ? 'flex-col text-center gap-y-5'
                : 'flex flex-shrink-0'
            }`}
          >
            <div
              className={`flex ${
                isSideMenuClose ? 'justify-center' : 'w-full'
              }`}
            >
              <div>
                <a href='#'>
                  <img
                    className='inline-block h-8 w-8 rounded-full'
                    src='https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png '
                    alt=''
                  />
                </a>
              </div>
              <a href='#' className={`${isSideMenuClose ? 'hidden' : 'ml-3'}`}>
                <p className='text-sm font-medium text-gray-700 dark:text-white whitespace-nowrap'>
                  Diego Mojarro
                </p>
                <div className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                  View profile
                </div>
              </a>
            </div>
            <button>
              <LogoutIcon
                className={`text-gray-500 hover:text-black dark:hover:text-white w-6 ${
                  isSideMenuClose ? 'mt-5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

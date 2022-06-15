import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import DarkMode from './DarkMode'

export default function LiveDemo() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        className=' p-2 sm:px-8 text-blue-600 dark:text-gray-200 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  bg-white dark:bg-black hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
        type='button'
        onClick={openModal}
      >
        Live demo
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 backdrop-brightness-50' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block h-96 w-3/6 overflow-hidden text-center align-middle transition-all transform bg-white dark:bg-black shadow-xl rounded-2xl'>
                <ReactPlayer
                  url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'
                  width='100%'
                  height='100%'
                  controls
                  playing
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

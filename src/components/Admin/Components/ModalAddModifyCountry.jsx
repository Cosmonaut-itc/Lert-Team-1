import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import SelectMenu from '../../Shared/Components/SelectMenu'

export default function ModalAddModifyCountry({
  open,
  cancelButtonRef,
  setOpen,
  // Submit
  handleSubmit,
  // Data
  countryRefs,
  // Fields
  name,
  countryRef_selection,
  setName,
  setCountryRef_selection,
  setCountryRef_id,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-50 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <form onSubmit={handleSubmit}>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-white dark:bg-black rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6'>
                <div>
                  <div className='mt-3 sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-2xl leading-6 font-semibold text-gray-900 dark:text-white'
                    >
                      Country
                    </Dialog.Title>
                    <div className='my-16 center w-full md:w-6/12 mx-auto'>
                      <div className='w-full'>
                        <label
                          htmlFor='text'
                          className='block text-sm font-medium text-gray-700 dark:text-white'
                        >
                          Country Name
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='name'
                            id='name'
                            className='bg-white dark:bg-black text-black dark:text-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Country name'
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='mt-5'>
                        <SelectMenu
                          label='Country Reference'
                          options={countryRefs}
                          selected={countryRef_selection}
                          onChange={(e) => {
                            setCountryRef_selection(e)
                            setCountryRef_id(e.id)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm'
                    onClick={() => setOpen(false)}
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  )
}

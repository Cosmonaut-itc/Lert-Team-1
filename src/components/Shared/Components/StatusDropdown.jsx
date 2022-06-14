import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectMenu({ options, selected, onChange }) {
  let color = ''

  switch (selected.id) {
    case 0:
      color = 'bg-gradient-to-r from-[#e52d27] to-[#b31217]'
      break
    case 1:
      color = 'bg-gradient-to-b from-orange-400 to-yellow-300'
      break
    case 2:
      color = 'bg-gradient-to-r from-emerald-500 to-lime-600'
      break

    default:
      break
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className='block text-sm font-medium text-gray-700'>
            {"hola"}
          </Listbox.Label> */}
          <div className='mt-1 relative mr-4'>
            <Listbox.Button
              className={`relative w-full rounded-md shadow-sm px-7 font-bold  py-2 text-center cursor-default focus:outline-none  sm:text-sm ${
                color ? `${color}` : 'bg-black'
              }`}
            >
              <span className='text-left mr-2 truncate text-white'>
                {selected.name}
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-white'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute whitespace-wrap z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                {options.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-blue-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ alreadySelected, active }) => (
                      <>
                        <span
                          className={classNames(
                            alreadySelected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {person.name}
                        </span>

                        {alreadySelected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-blue-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

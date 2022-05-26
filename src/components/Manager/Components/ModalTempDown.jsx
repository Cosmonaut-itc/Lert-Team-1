import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import SelectMenu from '../../Shared/Components/SelectMenu'
import { MailIcon, ArrowDownIcon } from '@heroicons/react/solid'
import TeamDD from '../Home.jsx'
import TeamCard from '../../Shared/Components/TeamCard'
import Button from '@mui/material/Button'
import InputUnstyled from '@mui/base/InputUnstyled';
import TextareaAutosize from '@mui/base/TextareaAutosize';



export default function ModalTempDown({ open, cancelButtonRef, setOpen }) {

return (
<Transition.Root show={open} as={Fragment}>
  <Dialog as='div' className='fixed z-50 inset-0 overflow-y-auto' initialFocus={cancelButtonRef} onClose={setOpen}>
    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
      <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100'
        leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
      </Transition.Child>

      {/* This element is to trick the browser into centering the modal contents. */}
      <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
        &#8203;
      </span>
      <Transition.Child as={Fragment} enter='ease-out duration-300'
        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200'
        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
        <div
          className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6'>
          <div>
            <div className='mt-3 text-left sm:mt-5'>

              <div className="flex flex-row justify-between">

                <Dialog.Title as='h3' className='text-2xl leading-6 font-semibold text-gray-900'>
                  Ken Bauer
                  <p className='text-gray-500 mt-2 text-sm font-light underline'>kenbauer@tec.mx</p>
                </Dialog.Title>

                <div className='flex items-center pb-10 md:p-4 mr-6'>
                  <div className='text-base font-base text-gray-600 invisible md:visible'>
                    Modify Band / Status:{' '}
                  </div>
                  <div
                    className='flex items-center px-5 py-1 ml-5 text-white font-bold bg-gray-400 rounded-lg whitespace-nowrap cursor-pointer'>
                    <p>Temp Down</p>
                    <ArrowDownIcon className='w-4 h-5 ml-2' />
                  </div>
                </div>


              </div>


              <div className="flex flex-col">
                <div className="justify-center">
                  <div className="py-2  align-middle">
                    <div className="shadow sm:rounded-2xl border-b border-gray-200">
                      <table className="w-full justify-center divide-y divide-x divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col"
                              className=" py-3 border-r text-xl text-center font-bold  capitalize leading-7">
                              February
                            </th>
                            <th scope="col"
                              className=" py-3 border-r text-xl text-center font-bold  capitalize leading-7">
                              January
                            </th>
                            <th scope="col" className=" py-3  text-xl text-center font-bold  capitalize leading-7">
                              March
                            </th>

                            {/* <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th> */}
                          </tr>
                        </thead>
                        <tbody className="text-center ">

                          <tr>
                            <td className="pl-6 py-4 border-r border-b whitespace-nowrap text-sm text-gray-900">
                              <div className="text-left">
                                Modify band:
                              </div>
                              <Button variant='contained' sx={{
                          borderRadius: 2,
                          px: 8,
                          py: 0.1,
                          mx: 5,
                          textTransform: 'capitalize',
                          fontWeight: 700,
                          fontSize: 18,
                          mb: 2,
                          boxShadow: 3,
                          whiteSpace: 'nowrap',
                          display: 'block'
                        }}>
                                Band 6
                              </Button>
                              <div className="text-3xl">
                                <span className="text-blue-500">$</span>1000
                              </div>
                            </td>
                            <td className="pl-6 py-4 border-r border-b whitespace-nowrap text-sm text-gray-900">
                              <div className="text-left">
                                Modify band:
                              </div>
                              <Button variant='contained' sx={{
                          borderRadius: 2,
                          px: 8,
                          py: 0.1,
                          mx: 5,
                          textTransform: 'capitalize',
                          fontWeight: 700,
                          fontSize: 18,
                          mb: 2,
                          boxShadow: 3,
                          whiteSpace: 'nowrap',
                          display: 'block'
                        }}>
                                Band 6
                              </Button>
                              <div className="text-3xl">
                                <span className="text-blue-500">$</span>1500
                              </div>
                            </td>
                            <td className="pl-6 py-4 border-b whitespace-nowrap text-sm text-gray-900">
                              <div className="text-left">
                                Modify band:
                              </div>
                              <Button variant='contained' sx={{
                          borderRadius: 2,
                          px: 8,
                          py: 0.1,
                          mx: 5,
                          textTransform: 'capitalize',
                          fontWeight: 700,
                          fontSize: 18,
                          mb: 2,
                          boxShadow: 3,
                          whiteSpace: 'nowrap',
                          display: 'block',
                        }}>
                                Temp Down
                              </Button>
                              <div className="text-3xl">
                                <span className="text-blue-500">$</span>0
                              </div>

                            </td>
                          </tr>

                          <tr>

                            <td className="px-6 py-4 border-r whitespace-nowrap text-sm text-gray-500 text-left">Extra
                              hours:
                              <input
                                className="block shadow-lg rounded-xl border border-gray-100 outline-none focus-none pl-4 capitalize ml-8 mt-2"
                                type="number" name="" id="" placeholder="hours" min="0" />
                            </td>
                            <td className="px-6 py-4 border-r whitespace-nowrap text-sm text-gray-500 text-left">Extra
                              hours:
                              <input
                                className="block shadow-lg rounded-xl border border-gray-100 outline-none focus-none pl-4 capitalize ml-8 mt-2"
                                type="number" name="" id="" placeholder="hours" min="0" />
                            </td>
                            <td className="px-6 py-4 border-r whitespace-nowrap text-sm text-gray-500 text-left">Extra
                              hours:
                              <input
                                className="block shadow-lg rounded-xl border border-gray-100 outline-none focus-none pl-4 capitalize ml-8 mt-2"
                                type="number" name="" id="" placeholder="hours" min="0" />
                            </td>


                          </tr>



                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="font-bold text-gray-600 px-2 pt-4 text-xl">Comments</h6>

              <TextareaAutosize aria-label="minimum height" minRows={7} placeholder="Write your comments here"
                style={{ width: '100%', borderRadius: '20px'}} className="border-gray-200 shadow-xl p-4 shadow-slate-300 bg-gray-50	focus:border-gray-200 focus:ring-0"/>

            </div>
          </div>
          <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense '>
            <button type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
              onClick={()=> setOpen(false)}
              >
              Save
            </button>
            <button type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
              onClick={()=> setOpen(false)}
              ref={cancelButtonRef}
              >
              Cancel
            </button>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Dialog>
</Transition.Root>
)
}
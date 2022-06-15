import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import SelectMenu from '../../Shared/Components/SelectMenu'

export default function ModalEmployeeRecoveryForm({
  open,
  cancelButtonRef,
  setOpen,
  // Submit
  handleSubmit,
  // Fields
  quarter,
  first_name,
  last_name,
  email,
  bands,
  setBand_id,
  band_selection,
  setBand_selection,
  month1Band_id,
  setMonth1Band_id,
  month1Band_selection,
  setMonth1Band_selection,
  month2Band_id,
  setMonth2Band_id,
  month2Band_selection,
  setMonth2Band_selection,
  hour1,
  setHour1,
  hour2,
  setHour2,
  hour3,
  setHour3,
  comment,
  setComment,
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
              <div className='inline-block align-bottom bg-white dark:bg-black rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6'>
                <div>
                  <div className='mt-3 text-left sm:mt-5'>
                    <div className='flex flex-row justify-between'>
                      <Dialog.Title
                        as='h3'
                        className='text-2xl leading-6 font-semibold text-gray-900 dark:text-white'
                      >
                        {first_name + ' ' + last_name}
                        <p className='text-gray-500  mt-2 text-sm font-light underline'>
                          {email}
                        </p>
                      </Dialog.Title>

                      <div className='flex items-center pb-10 md:p-4 mr-6'>
                        <div className='text-base font-base text-gray-600 dark:text-gray-200 invisible md:visible'>
                          Modify Band / Status: &nbsp;
                        </div>
                        <SelectMenu
                          options={bands}
                          selected={band_selection}
                          onChange={(e) => {
                            setBand_selection(e)
                            setBand_id(e.id)
                          }}
                        />
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <div className='justify-center'>
                        <div className='py-2  align-middle'>
                          <div className='shadow  border-b border-gray-200'>
                            <table className='w-full justify-center divide-y divide-x divide-gray-200'>
                              <thead className='bg-gray-50 dark:bg-zinc-900'>
                                <tr>
                                  <th
                                    scope='col'
                                    className=' py-3 border-r text-xl dark:text-white text-center font-bold  capitalize leading-7'
                                  >
                                    {quarter[0]}
                                  </th>
                                  <th
                                    scope='col'
                                    className=' py-3 border-r text-xl dark:text-white text-center font-bold  capitalize leading-7'
                                  >
                                    {quarter[1]}
                                  </th>
                                  <th
                                    scope='col'
                                    className=' py-3  text-xl text-center dark:text-white font-bold  capitalize leading-7'
                                  >
                                    {quarter[2]}
                                  </th>

                                  {/* <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th> */}
                                </tr>
                              </thead>
                              <tbody className='text-center '>
                                <tr>
                                  <td className='pl-6 py-4 border-r border-b whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                                    <div className='text-left'>
                                      Modify band:
                                    </div>
                                    <SelectMenu
                                      options={bands}
                                      selected={month1Band_selection}
                                      onChange={(e) => {
                                        setMonth1Band_selection(e)
                                        setMonth1Band_id(e.id)
                                      }}
                                    />
                                    <div className='text-3xl dark:text-white'>
                                      <span className='text-blue-500'>$</span>
                                      {(
                                        month1Band_selection.salary / 12
                                      ).toFixed(2)}
                                    </div>
                                  </td>
                                  <td className='pl-6 py-4 border-r border-b whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                                    <div className='text-left'>
                                      Modify band:
                                    </div>
                                    <SelectMenu
                                      options={bands}
                                      selected={month2Band_selection}
                                      onChange={(e) => {
                                        setMonth2Band_selection(e)
                                        setMonth2Band_id(e.id)
                                      }}
                                    />
                                    <div className='text-3xl dark:text-white'>
                                      <span className='text-blue-500'>$</span>
                                      {(
                                        month2Band_selection.salary / 12
                                      ).toFixed(2)}
                                    </div>
                                  </td>
                                  <td className='pl-6 py-4 border-r border-b whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                                    <div className='text-left'>
                                      Modify band:
                                    </div>
                                    <SelectMenu
                                      options={bands}
                                      selected={band_selection}
                                      onChange={(e) => {
                                        setBand_selection(e)
                                        setBand_id(e.id)
                                      }}
                                    />
                                    <div className='text-3xl dark:text-white'>
                                      <span className='text-blue-500'>$</span>
                                      {(band_selection.salary / 12).toFixed(2)}
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td className='px-6 py-4 border-r whitespace-nowrap text-sm text-gray-500 text-left'>
                                    Extra hours:
                                    <input
                                      className='dark:bg-zinc-900 block shadow-lg rounded-xl border border-gray-100 outline-none focus-none pl-4 capitalize ml-8 mt-2'
                                      type='number'
                                      name='hour1'
                                      id='hour1'
                                      placeholder='Hours'
                                      min='0'
                                      defaultValue={hour1}
                                      onChange={(e) => setHour1(e.target.value)}
                                    />
                                  </td>
                                  <td className='px-6 py-4 border-r whitespace-nowrap text-sm text-gray-500 text-left'>
                                    Extra hours:
                                    <input
                                      className='dark:bg-zinc-900 block shadow-lg rounded-xl border border-gray-100 outline-none focus-none pl-4 capitalize ml-8 mt-2'
                                      type='number'
                                      name='hour2'
                                      id='hour2'
                                      placeholder='Hours'
                                      min='0'
                                      defaultValue={hour2}
                                      onChange={(e) => setHour2(e.target.value)}
                                    />
                                  </td>
                                  <td className='px-6 py-4 border-r whitespace-nowrap text-sm text-gray-500 text-left'>
                                    Extra hours:
                                    <input
                                      className='dark:bg-zinc-900 block shadow-lg rounded-xl border border-gray-100 outline-none focus-none pl-4 capitalize ml-8 mt-2'
                                      type='number'
                                      name='hour3'
                                      id='hour3'
                                      placeholder='Hours'
                                      min='0'
                                      defaultValue={hour3}
                                      onChange={(e) => setHour3(e.target.value)}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h6 className='font-bold text-gray-600 dark:text-gray-200 bg- px-2 pt-4 text-xl'>
                      Comments
                    </h6>

                    <TextareaAutosize
                      aria-label='minimum height'
                      minRows={7}
                      placeholder='Write your comments here'
                      defaultValue={comment}
                      style={{ width: '100%', borderRadius: '20px' }}
                      className='dark:text-white border-0 dark:border-zinc-900 shadow-xl p-4 shadow-slate-300 dark:shadow-zinc-800 bg-gray-50 dark:bg-zinc-900	focus:border-gray-200 focus:ring-0'
                      name='comment'
                      id='comment'
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense '>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm'
                    onClick={() => setOpen(false)}
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-black text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm'
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

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import SelectMenu from '../../Shared/Components/SelectMenu'
import { MailIcon } from '@heroicons/react/solid'
import api from '../../api/api'

const EMPLOYEES_URL = '/manager/employees'

export default function AddModifyEmployeeForm({
  open,
  cancelButtonRef,
  setOpen,
  countries,
  bands,
  ICAS,
  squads,
  typesOfEmployee,
  isModify,
  employee,
}) {
  const submitButtonLabel = isModify ? 'Modify' : 'Save'

  const [operationMessage, setOperationMessage] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [country_id, setCountry_id] = useState('')
  const [country_selection, setCountry_selection] = useState({
    id: 0,
    name: 'Select',
  })
  const [typeOfEmployee_id, setTypeOfEmployee_id] = useState('')
  const [typeOfEmployee_selection, setTypeOfEmployee_selection] = useState({
    id: 0,
    name: 'Select',
  })
  const [band_id, setBand_id] = useState('')
  const [band_selection, setBand_selection] = useState({
    id: 0,
    name: 'Select',
  })
  const [ICA_id, setICA_id] = useState('')
  const [ICA_selection, setICA_selection] = useState({ id: 0, name: 'Select' })
  const [squad_id, setSquad_id] = useState('')
  const [squad_selection, setSquad_selection] = useState({
    id: 0,
    name: 'Select',
  })
  const [modify_id, setModify_id] = useState('')

  useEffect(() => {
    if (isModify) {
      setFirst_name(employee.first_name)
      setLast_name(employee.last_name)
      setEmail(employee.email)
      setCountry_id(employee.country_id)
      setCountry_selection({
        id: employee.country_id,
        name: employee.country_name,
      })
      setTypeOfEmployee_id(employee.typeOfEmployee_id)
      setTypeOfEmployee_selection({
        id: employee.typeOfEmployee_id,
        name: employee.typeOfEmployee_name,
      })
      setBand_id(employee.band_id)
      setBand_selection({
        id: employee.band_id,
        name: employee.band_name,
      })
      setICA_id(employee.ICA_id)
      setICA_selection({
        id: employee.ICA_id,
        name: employee.ICA_name,
      })
      setSquad_id(employee.squad_id)
      setSquad_selection({
        id: employee.squad_id,
        name: employee.squad_name,
      })
      setModify_id(employee.id)
    }
  }, [])

  const handleSubmitAdd = async (e) => {
    e.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append('first_name', first_name)
    bodyFormData.append('last_name', last_name)
    bodyFormData.append('email', email)
    bodyFormData.append('country_id', country_id)
    bodyFormData.append('typeOfEmployee_id', typeOfEmployee_id)
    bodyFormData.append('band_id', band_id)
    bodyFormData.append('ICA_id', ICA_id)
    bodyFormData.append('squad_id', squad_id)

    try {
      const response = await api.post(EMPLOYEES_URL, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Employee added')
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 409) {
        setOperationMessage('Employee already exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleSubmitModify = async (e) => {
    e.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append('first_name', first_name)
    bodyFormData.append('last_name', last_name)
    bodyFormData.append('email', email)
    bodyFormData.append('country_id', country_id)
    bodyFormData.append('typeOfEmployee_id', typeOfEmployee_id)
    bodyFormData.append('band_id', band_id)
    bodyFormData.append('ICA_id', ICA_id)
    bodyFormData.append('squad_id', squad_id)

    try {
      const response = await api.put(EMPLOYEES_URL + '/' +modify_id, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Employee Modified')
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 404) {
        setOperationMessage('Employee does not exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-50 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <form onSubmit={isModify ? handleSubmitModify : handleSubmitAdd}>
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
              <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6'>
                <div>
                  <div className='mt-3 text-left sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-2xl leading-6 font-semibold text-gray-900'
                    >
                      Employee Information
                    </Dialog.Title>
                    <div className='mt-10 grid grid-cols-2 gap-10'>
                      <div>
                        <label
                          htmlFor='text'
                          className='block text-sm font-medium text-gray-700'
                        >
                          First Name(s)
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='text'
                            id='first_name'
                            defaultValue={first_name}
                            className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            placeholder='First name'
                            onChange={(e) => setFirst_name(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <SelectMenu
                          label='Type of employee'
                          options={typesOfEmployee}
                          alreadySelected={typeOfEmployee_selection}
                          onChange={(e) => {
                            setTypeOfEmployee_selection(e)
                            setTypeOfEmployee_id(e.id)
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='text'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Last Name(s)
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='text'
                            id='Last_name'
                            defaultValue={last_name}
                            className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            placeholder='Last name'
                            onChange={(e) => setLast_name(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <SelectMenu
                          label='Band'
                          options={bands}
                          alreadySelected={band_selection}
                          onChange={(e) => {
                            setBand_selection(e)
                            setBand_id(e.id)
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Email
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <MailIcon
                              className='h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                          </div>
                          <input
                            type='text'
                            name='email'
                            id='Email'
                            defaultValue={isModify ? employee.email : ''}
                            className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                            placeholder='examplemail@ibm.com'
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <SelectMenu
                          label='ICA'
                          options={ICAS}
                          alreadySelected={ICA_selection}
                          onChange={(e) => {
                            setICA_selection(e)
                            setICA_id(e.id)
                          }}
                        />
                      </div>
                      <div>
                        <SelectMenu
                          label='Country'
                          options={countries}
                          alreadySelected={country_selection}
                          onChange={(e) => {
                            setCountry_selection(e)
                            setCountry_id(e.id)
                          }}
                        />
                      </div>
                      <div>
                        <SelectMenu
                          label='Squad'
                          options={squads}
                          alreadySelected={squad_selection}
                          onChange={(e) => {
                            setSquad_selection(e)
                            setSquad_id(e.id)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                    onClick={() => setOpen(false)}
                  >
                    {submitButtonLabel}
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
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

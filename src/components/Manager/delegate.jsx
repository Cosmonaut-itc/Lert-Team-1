import { PlusCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import ModalAddModifyUser from '../Shared/Components/ModalAddModifyUser'
import DelegateCard from './Components/DelegateCard'
import api from '../api/api'

export default function Delegate() {
  // Data Fetched from back
  const [delegates, setDelegates] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // Delegate states
  const [searchDelegate, setSearchDelegate] = useState('')
  const [openDelegateAddModify, setOpenDelegateAddModify] = useState(false)
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [modify_id, setModify_id] = useState('')
  const [modify_delegate, setModify_delegate] = useState('')

  /* Add-Modify delegate functions */
  const populateFormForModify = (delegate) => {
    setFirst_name(delegate.first_name)
    setLast_name(delegate.last_name)
    setEmail(delegate.email)
  }

  const unpopulateForm = () => {
    setFirst_name('')
    setLast_name('')
    setEmail('')
    setModify_id('')
    setModify_delegate('')
  }

  const createDelegateForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('first_name', first_name)
    bodyFormData.append('last_name', last_name)
    bodyFormData.append('email', email)

    return bodyFormData
  }

  const handleSubmitAddDelegate = async (e) => {
    e.preventDefault()

    const bodyFormData = createDelegateForm()

    try {
      const response = await api.post('manager/delegates', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Delegate added')
      unpopulateForm()
      fetchDelegates()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 409) {
        setOperationMessage('Delegate already exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleSubmitModifyDelegate = async (e) => {
    e.preventDefault()

    const bodyFormData = createDelegateForm()

    try {
      const response = await api.put(
        '/manager/delegates/' + modify_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Delegate Modified')
      fetchDelegates()
      unpopulateForm()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 404) {
        setOperationMessage('Delegate does not exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleDeleteDelegate = async (id) => {
    try {
      const response = await api.delete('/manager/delegates/' + id)
      fetchDelegates()
    } catch (err) {
      if (!err?.response) {
        console.log('Server error')
      } else if (err.response?.status === 400) {
        console.log('Incorrect inputs')
      } else if (err.response?.status === 409) {
        console.log('Delegate already exists')
      } else {
        console.log('Operation failed')
      }
    }
  }

  /* Fetching functions */

  const fetchDelegates = async () => {
    try {
      const response = await api.get('/manager/delegates')
      setDelegates(response.data)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }

  const fetchData = async () => {
    await fetchDelegates()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [delegates])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_delegate)
    }
  }, [modify_id])

  return (
    <div className='pl-10 h-screen '>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600 dark:text-gray-200'>
          Delegates
        </div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar
            searchTerm={searchDelegate}
            setSearchTerm={setSearchDelegate}
            placeholder={'Search by name or email'}
          />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifyUser
          open={openDelegateAddModify}
          setOpen={setOpenDelegateAddModify}
          formTitle={'Delegate'}
          handleSubmit={
            modify_id === ''
              ? handleSubmitAddDelegate
              : handleSubmitModifyDelegate
          }
          first_name={first_name}
          last_name={last_name}
          email={email}
          setFirst_name={setFirst_name}
          setLast_name={setLast_name}
          setEmail={setEmail}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenDelegateAddModify(true)
              }}
            >
              <PlusCircleIcon className='flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {delegates
            .filter((data) => {
              if (searchDelegate == '') {
                return data
              } else if (
                data.first_name
                  .toLowerCase()
                  .includes(searchDelegate.toLowerCase()) ||
                data.last_name
                  .toLowerCase()
                  .includes(searchDelegate.toLowerCase()) ||
                data.email.toLowerCase().includes(searchDelegate.toLowerCase())
              ) {
                return data
              }
            })
            .map((data) => (
              <DelegateCard
                key={data.id}
                delegate={data}
                setOpenDelegateAdd={setOpenDelegateAddModify}
                setModify_delegate={setModify_delegate}
                setModify_id={setModify_id}
                handleDeleteDelegate={handleDeleteDelegate}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

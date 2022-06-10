import { PlusCircleIcon } from '@heroicons/react/solid'
import SearchBar from '../Shared/Components/SearchBar'
import ManagerCard from './Components/ManagerCard'

import Button from '@mui/material/Button'
import { useEffect, useRef, useState } from 'react'
import api from '../api/api'
import ModalAddModifyUser from '../Shared/Components/ModalAddModifyUser'

export default function Home() {
  // Data fetched from back states
  const [managers, setManagers] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // OPSManagers states
  const [searchManager, setSearchManager] = useState('')
  const [openManagerAddModify, setOpenManagerAddModify] = useState(false)
  const cancelButtonRefManager = useRef(null)
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [modify_id, setModify_id] = useState('')
  const [modify_manager, setModify_manager] = useState('')

  /* Add-Modify delegate functions */
  const populateFormForModify = (manager) => {
    setFirst_name(manager.first_name)
    setLast_name(manager.last_name)
    setEmail(manager.email)
  }

  const unpopulateForm = () => {
    setFirst_name('')
    setLast_name('')
    setEmail('')
    setModify_id('')
    setModify_manager('')
  }

  const createManagerForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('first_name', first_name)
    bodyFormData.append('last_name', last_name)
    bodyFormData.append('email', email)

    return bodyFormData
  }

  const handleSubmitAddManager = async (e) => {
    e.preventDefault()

    const bodyFormData = createManagerForm()

    try {
      const response = await api.post('OPSManager/managers', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Delegate added')
      unpopulateForm()
      fetchManagers()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 409) {
        setOperationMessage('Manager already exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleSubmitModifyManager = async (e) => {
    e.preventDefault()

    const bodyFormData = createManagerForm()

    try {
      const response = await api.put(
        '/OPSManager/managers/' + modify_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Delegate Modified')
      fetchManagers()
      unpopulateForm()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 404) {
        setOperationMessage('Manager does not exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleDeleteManager = async (id) => {
    try {
      const response = await api.delete('/OPSManager/managers/' + id)
      fetchManagers()
    } catch (err) {
      if (!err?.response) {
        console.log('Server error')
      } else if (err.response?.status === 400) {
        console.log('Incorrect inputs')
      } else if (err.response?.status === 409) {
        console.log('Manager already exists')
      } else {
        console.log('Operation failed')
      }
    }
  }

  /* Fetching functions */

  const fetchManagers = async () => {
    try {
      const response = await api.get('/OPSManager/managers')
      setManagers(response.data)
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
    await fetchManagers()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [managers])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_manager)
    }
  }, [modify_id])

  return (
    <div className='mt-16 ml-10 h-max'>
      <div>
        {dataReady && (
          <ModalAddModifyUser
            open={openManagerAddModify}
            cancelButtonRef={cancelButtonRefManager}
            setOpen={setOpenManagerAddModify}
            formTitle={'Manager'}
            handleSubmit={
              modify_id === ''
                ? handleSubmitAddManager
                : handleSubmitModifyManager
            }
            first_name={first_name}
            last_name={last_name}
            email={email}
            setFirst_name={setFirst_name}
            setLast_name={setLast_name}
            setEmail={setEmail}
          />
        )}
      </div>
      <div className='flex items-center gap-7 justify-between'>
        <div className='text-2xl font-semibold text-gray-600'>Managers</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar
            searchTerm={searchManager}
            placeholder={'Search by name, email or status'}
            setSearchTerm={setSearchManager}
          />
        </div>
        <Button
          className=''
          variant='contained'
          sx={{
            borderRadius: 16,
            px: 8,
            py: 0.2,
            mx: 5,
            textTransform: 'capitalize',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: 3,
          }}
        >
          Collective Download
        </Button>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button>
              <PlusCircleIcon
                className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center'
                onClick={() => {
                  setModify_id('')
                  setModify_manager('')
                  setOpenManagerAddModify(true)
                }}
              />
            </button>
          </div>
          {managers
            .filter((data) => {
              if (searchManager == '') {
                return data
              } else if (
                data.first_name
                  .toLowerCase()
                  .includes(searchManager.toLowerCase()) ||
                data.last_name
                  .toLowerCase()
                  .includes(searchManager.toLowerCase()) ||
                data.email
                  .toLowerCase()
                  .includes(searchManager.toLowerCase()) ||
                data.status.toLowerCase().includes(searchManager.toLowerCase())
              ) {
                return data
              }
            })
            .map((data) => (
              <ManagerCard
                key={data.id}
                manager={data}
                setOpenManagerAdd={setOpenManagerAddModify}
                handleDeleteManager={handleDeleteManager}
                setModify_id={setModify_id}
                setModify_manager={setModify_manager}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

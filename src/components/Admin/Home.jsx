import { PlusCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import OpsManagerCard from './Components/OpsManagerCard'
import ModalAddModifyOPSManager from './Components/ModalAddModifyOPSManager'
import api from '../api/api'

export default function Home() {
  // Data Fetched from back
  const [OPSManagers, setOPSManagers] = useState([])
  const [countries, setCountries] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // Delegate states
  const [searchOPSManager, setSearchOPSManager] = useState('')
  const [openAddModifyOpsManager, setOpenAddModifyOpsManager] = useState(false)
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [country_id, setCountry_id] = useState('')
  const defaultSelection = { id: 0, name: 'Select' }
  const [country_selection, setCountry_selection] = useState(defaultSelection)

  const [modify_id, setModify_id] = useState('')
  const [modify_OPSManager, setModify_OPSManager] = useState('')

  /* Add-Modify delegate functions */
  const populateFormForModify = (OPSManager) => {
    setFirst_name(OPSManager.first_name)
    setLast_name(OPSManager.last_name)
    setEmail(OPSManager.email)
    setCountry_id(OPSManager.country_id)
    setCountry_selection({
      id: OPSManager.country_id,
      name: OPSManager.country_name,
    })
  }

  const unpopulateForm = () => {
    setFirst_name('')
    setLast_name('')
    setEmail('')
    setCountry_id('')
    setCountry_selection(defaultSelection)
    setModify_id('')
    setModify_OPSManager('')
  }

  const createOPSManagerForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('first_name', first_name)
    bodyFormData.append('last_name', last_name)
    bodyFormData.append('email', email)
    bodyFormData.append('country_id', country_id)

    return bodyFormData
  }

  const handleSubmitAddOPSManager = async (e) => {
    e.preventDefault()

    const bodyFormData = createOPSManagerForm()

    try {
      const response = await api.post('/admin/OPSManagers', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('OPSManager added')
      unpopulateForm()
      fetchOPSManagers()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 409) {
        setOperationMessage('User already exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleSubmitModifyOPSManager = async (e) => {
    e.preventDefault()

    const bodyFormData = createOPSManagerForm()

    try {
      const response = await api.put(
        '/admin/OPSManagers/' + modify_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('User Modified')
      fetchOPSManagers()
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

  const handleDeleteOPSManager = async (id) => {
    try {
      const response = await api.delete('/admin/OPSManagers/' + id)
      fetchOPSManagers()
    } catch (err) {
      if (!err?.response) {
        console.log('Server error')
      } else if (err.response?.status === 400) {
        console.log('Incorrect inputs')
      } else if (err.response?.status === 409) {
        console.log('User already exists')
      } else {
        console.log('Operation failed')
      }
    }
  }

  /* Fetching functions */

  const fetchOPSManagers = async () => {
    try {
      const response = await api.get('/admin/OPSManagers')
      setOPSManagers(response.data)
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

  const fetchCountries = async () => {
    try {
      const response = await api.get('/countries')
      setCountries(response.data)
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
    await fetchOPSManagers()
    await fetchCountries()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [OPSManagers])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_OPSManager)
    }
  }, [modify_id])

  return (
    <div className='mt-16 ml-10 h-screen '>
      <div className='flex items-center gap-7'>
        <div className='text-2xl font-semibold text-gray-600 dark:text-gray-200'>
          OPS Managers
        </div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar
            placeholder={'Search by name, email or country'}
            setSearchTerm={setSearchOPSManager}
            searchTerm={searchOPSManager}
          />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        {dataReady && (
          <ModalAddModifyOPSManager
            open={openAddModifyOpsManager}
            setOpen={setOpenAddModifyOpsManager}
            formTitle={'OPS Manager'}
            handleSubmit={
              modify_id === ''
                ? handleSubmitAddOPSManager
                : handleSubmitModifyOPSManager
            }
            countries={countries}
            first_name={first_name}
            last_name={last_name}
            email={email}
            country_selection={country_selection}
            setFirst_name={setFirst_name}
            setLast_name={setLast_name}
            setEmail={setEmail}
            setCountry_selection={setCountry_selection}
            setCountry_id={setCountry_id}
          />
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenAddModifyOpsManager(true)
              }}
            >
              <PlusCircleIcon className='flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {OPSManagers.filter((data) => {
            if (searchOPSManager == '') {
              return data
            } else if (
              data.first_name
                .toLowerCase()
                .includes(searchOPSManager.toLowerCase()) ||
              data.last_name
                .toLowerCase()
                .includes(searchOPSManager.toLowerCase()) ||
              data.email
                .toLowerCase()
                .includes(searchOPSManager.toLowerCase()) ||
              data.country_name
                .toLowerCase()
                .includes(searchOPSManager.toLowerCase())
            ) {
              return data
            }
          }).map((data) => (
            <OpsManagerCard
              key={data.id}
              OPSManager={data}
              setModify_id={setModify_id}
              setOpenAddModifyOpsManager={setOpenAddModifyOpsManager}
              setModify_OPSManager={setModify_OPSManager}
              handleDeleteOPSManager={handleDeleteOPSManager}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

import { PlusCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import ModalAddModifyIcas from './Components/ModalAddModifyIcas'
import IcasCard from './Components/IcasCard'
import api from '../api/api'

export default function Icas() {
  // Data Fetched from back
  const [ICAs, setICAs] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // Delegate states
  const [searchICA, setSearchICA] = useState('')
  const [openICAsAddModify, setOpenICAsAddModify] = useState(false)
  const [name, setName] = useState('')
  const [modify_id, setModify_id] = useState('')
  const [modify_ICA, setModify_ICA] = useState('')

  /* Add-Modify delegate functions */
  const populateFormForModify = (ICA) => {
    setName(ICA.name)
  }

  const unpopulateForm = () => {
    setName('')
    setModify_id('')
    setModify_ICA('')
  }

  const createICAForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', name)

    return bodyFormData
  }

  const handleSubmitAddICA = async (e) => {
    e.preventDefault()

    const bodyFormData = createICAForm()

    try {
      const response = await api.post('OPSManager/ICAs', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('ICA added')
      unpopulateForm()
      fetchICAs()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 409) {
        setOperationMessage('Squad already exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleSubmitModifyICA = async (e) => {
    e.preventDefault()

    const bodyFormData = createICAForm()

    try {
      const response = await api.put(
        '/OPSManager/ICAs/' + modify_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Squad Modified')
      fetchICAs()
      unpopulateForm()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 404) {
        setOperationMessage('ICA does not exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleDeleteICA = async (id) => {
    try {
      const response = await api.delete('/OPSManager/ICAs/' + id)
      fetchICAs()
    } catch (err) {
      if (!err?.response) {
        console.log('Server error')
      } else if (err.response?.status === 400) {
        console.log('Incorrect inputs')
      } else if (err.response?.status === 409) {
        console.log('Squad already exists')
      } else {
        console.log('Operation failed')
      }
    }
  }

  /* Fetching functions */

  const fetchICAs = async () => {
    try {
      const response = await api.get('/ICAs')
      setICAs(response.data)
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
    await fetchICAs()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [ICAs])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_ICA)
    }
  }, [modify_id])

  return (
    <div className='pl-10 h-screen '>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>ICAS</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar
            searchTerm={searchICA}
            setSearchTerm={setSearchICA}
            placeholder={'Search by name'}
          />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifyIcas
          open={openICAsAddModify}
          setOpen={setOpenICAsAddModify}
          name={name}
          setName={setName}
          handleSubmit={
            modify_id === '' ? handleSubmitAddICA : handleSubmitModifyICA
          }
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenICAsAddModify(true)
              }}
            >
              <PlusCircleIcon className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {ICAs.filter((data) => {
            if (searchICA == '') {
              return data
            } else if (
              data.name.toLowerCase().includes(searchICA.toLowerCase())
            ) {
              return data
            }
          }).map((data) => (
            <IcasCard
              key={data.id}
              ICA={data}
              setOpenICAAdd={setOpenICAsAddModify}
              handleDeleteICA={handleDeleteICA}
              setModify_id={setModify_id}
              setModify_ICA={setModify_ICA}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

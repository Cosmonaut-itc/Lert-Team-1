import { PlusCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import BandsCard from './Components/BandsCard'
import ModalAddModifyBands from './Components/ModalAddModifyBands'
import api from '../api/api'

export default function Home() {
  // Data Fetched from back
  const [bands, setBands] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // Delegate states
  const [searchBand, setSearchBand] = useState('')
  const [openAddModifyBands, setOpenAddModifyBands] = useState(false)
  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [modify_id, setModify_id] = useState('')
  const [modify_band, setModify_band] = useState('')

  /* Add-Modify delegate functions */
  const populateFormForModify = (band) => {
    setName(band.name)
    setSalary(band.salary)
  }

  const unpopulateForm = () => {
    setName('')
    setSalary(0)
    setModify_id('')
    setModify_band('')
  }

  const createBandForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('salary', salary)
    return bodyFormData
  }

  const handleSubmitAddBand = async (e) => {
    e.preventDefault()

    const bodyFormData = createBandForm()

    try {
      const response = await api.post('OPSManager/bands', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Band added')
      unpopulateForm()
      fetchBands()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 409) {
        setOperationMessage('Band already exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleSubmitModifyBand = async (e) => {
    e.preventDefault()

    const bodyFormData = createBandForm()

    try {
      const response = await api.put(
        '/OPSManager/bands/' + modify_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Squad Modified')
      fetchBands()
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

  const handleDeleteBand = async (id) => {
    try {
      const response = await api.delete('/OPSManager/bands/' + id)
      fetchBands()
    } catch (err) {
      if (!err?.response) {
        console.log('Server error')
      } else if (err.response?.status === 400) {
        console.log('Incorrect inputs')
      } else if (err.response?.status === 409) {
        console.log('Band already exists')
      } else {
        console.log('Operation failed')
      }
    }
  }

  /* Fetching functions */

  const fetchBands = async () => {
    try {
      const response = await api.get('/bands')
      setBands(response.data)
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
    await fetchBands()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [bands])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_band)
    }
  }, [modify_id])

  return (
    <div className='mt-16 ml-10 h-screen '>
      <div className='flex items-center gap-7'>
        <div className='text-2xl font-semibold text-gray-600'>Bands</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar
            searchTerm={searchBand}
            setSearchTerm={searchBand}
            placeholder={'Search by name or salary'}
          />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifyBands
          open={openAddModifyBands}
          setOpen={setOpenAddModifyBands}
          name={name}
          salary={salary}
          setSalary={setSalary}
          setName={setName}
          handleSubmit={
            modify_id === '' ? handleSubmitAddBand : handleSubmitModifyBand
          }
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenAddModifyBands(true)
              }}
            >
              <PlusCircleIcon className='flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {bands.map((data) => (
            <BandsCard
              key={data.id}
              band={data}
              setModify_band={setModify_band}
              setModify_id={setModify_id}
              setOpen={setOpenAddModifyBands}
              handleDelete={handleDeleteBand}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

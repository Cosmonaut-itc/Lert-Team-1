import { PlusCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import ModalAddModifySquad from './Components/ModalAddModifySquad'
import SquadCard from './Components/SquadCard'
import api from '../api/api'

export default function Squads() {
  // Data Fetched from back
  const [squads, setSquads] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // Delegate states
  const [searchSquad, setSearchSquad] = useState('')
  const [openSquadAddModify, setOpenSquadAddModify] = useState(false)
  const [name, setName] = useState('')
  const [modify_id, setModify_id] = useState('')
  const [modify_squad, setModify_squad] = useState('')

  /* Add-Modify delegate functions */
  const populateFormForModify = (squad) => {
    setName(squad.name)
  }

  const unpopulateForm = () => {
    setName('')
    setModify_id('')
    setModify_squad('')
  }

  const createSquadForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', name)

    return bodyFormData
  }

  const handleSubmitAddSquad = async (e) => {
    e.preventDefault()

    const bodyFormData = createSquadForm()

    try {
      const response = await api.post('manager/squads', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Delegate added')
      unpopulateForm()
      fetchSquads()
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

  const handleSubmitModifySquad = async (e) => {
    e.preventDefault()

    const bodyFormData = createSquadForm()

    try {
      const response = await api.put(
        '/manager/squads/' + modify_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Squad Modified')
      fetchSquads()
      unpopulateForm()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 404) {
        setOperationMessage('Squad does not exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleDeleteSquad = async (id) => {
    try {
      const response = await api.delete('/manager/squads/' + id)
      fetchSquads()
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

  const fetchSquads = async () => {
    try {
      const response = await api.get('/manager/squads')
      setSquads(response.data)
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
    await fetchSquads()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [squads])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_squad)
    }
  }, [modify_id])

  return (
    <div className='pl-10 h-screen '>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600 dark:text-gray-200'>
          Squads
        </div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar
            searchTerm={searchSquad}
            setSearchTerm={setSearchSquad}
            placeholder={'Search by name'}
          />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifySquad
          open={openSquadAddModify}
          setOpen={setOpenSquadAddModify}
          name={name}
          setName={setName}
          handleSubmit={
            modify_id === '' ? handleSubmitAddSquad : handleSubmitModifySquad
          }
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenSquadAddModify(true)
              }}
            >
              <PlusCircleIcon className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {squads.map((data) => (
            <SquadCard
              key={data.id}
              squad={data}
              setOpenSquadAdd={setOpenSquadAddModify}
              handleDeleteSquad={handleDeleteSquad}
              setModify_id={setModify_id}
              setModify_squad={setModify_squad}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

import { PlusCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import CountryCard from './Components/CountryCard'
import api from '../api/api'
import ModalAddModifyCountry from './Components/ModalAddModifyCountry'

export default function Countries() {
  // Fetch Data
  const [countries, setCountries] = useState([])
  const [countryRefs, setCountryRefs] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // Delegate states
  const [openAddModifyCountry, setOpenAddModifyCountry] = useState(false)
  const [searchCountry, setSearchCountry] = useState('')
  const [name, setName] = useState('')
  const [countryRef_id, setCountryRef_id] = useState('')
  const defaultSelection = { id: 0, name: 'Select' }
  const [countryRef_selection, setCountryRef_selection] =
    useState(defaultSelection)

  const [modify_id, setModify_id] = useState('')
  const [modify_Country, setModify_Country] = useState('')

  /* Add-Modify delegate functions */
  const populateFormForModify = (country) => {
    setName(country.name)
    setCountryRef_id(country.countryRef_id)
    setCountryRef_selection({
      id: country.countryRef_id,
      name: country.countryRef_name,
    })
  }

  const unpopulateForm = () => {
    setName('')
    setCountryRef_id('')
    setCountryRef_selection(defaultSelection)
    setModify_id('')
    setModify_Country('')
  }

  const createForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('countryRef_id', countryRef_id)

    return bodyFormData
  }

  const handleSubmitAdd = async (e) => {
    e.preventDefault()

    const bodyFormData = createForm()

    try {
      const response = await api.post('/admin/countries', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Country added')
      unpopulateForm()
      fetchCountries()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 409) {
        setOperationMessage('COuntry already exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleSubmitModify = async (e) => {
    e.preventDefault()

    const bodyFormData = createForm()

    try {
      const response = await api.put(
        '/admin/countries/' + modify_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('User Modified')
      fetchCountries()
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

  const handleDeleteCountry = async (id) => {
    try {
      const response = await api.delete('/admin/countries/' + id)
      fetchCountries()
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

  const fetchCountryRefs = async () => {
    try {
      const response = await api.get('/countryRefs')
      setCountryRefs(response.data)
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
    await fetchCountries()
    await fetchCountryRefs()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [countries])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_Country)
    }
  }, [modify_id])

  return (
    <div className='ml-10 h-screen '>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>Countries</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar
            searchTerm={searchCountry}
            setSearchTerm={setSearchCountry}
            placeholder={'Search by name, code or reference'}
          />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        {dataReady && (
          <ModalAddModifyCountry
            open={openAddModifyCountry}
            setOpen={setOpenAddModifyCountry}
            handleSubmit={
              modify_id === '' ? handleSubmitAdd : handleSubmitModify
            }
            countryRefs={countryRefs}
            name={name}
            countryRef_selection={countryRef_selection}
            setName={setName}
            setCountryRef_selection={setCountryRef_selection}
            setCountryRef_id={setCountryRef_id}
          />
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenAddModifyCountry(true)
              }}
            >
              <PlusCircleIcon
                className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center'
                onClick={() => {
                  setModify_id('')
                  setModify_Country('')
                  setOpenAddModifyCountry(true)
                }}
              />
            </button>
          </div>
          {countries
            .filter((data) => {
              if (searchCountry == '') {
                return data
              } else if (
                data.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
                data.countryRef_name
                  .toLowerCase()
                  .includes(searchCountry.toLowerCase()) ||
                data.code.toLowerCase().includes(searchCountry.toLowerCase())
              ) {
                return data
              }
            })
            .map((data) => (
              <CountryCard
                key={data.id}
                country={data}
                setOpenCountryAdd={setOpenAddModifyCountry}
                handleDeleteCountry={handleDeleteCountry}
                setModify_id={setModify_id}
                setModify_country={setModify_Country}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

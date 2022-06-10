import { useEffect, useRef, useState } from 'react'

import { PlusCircleIcon, ArrowDownIcon } from '@heroicons/react/solid'
import SearchBar from '../Shared/Components/SearchBar'
import ModalTypesOfEmployees from './Components/ModalTypesOfEmployees'
import ModalTypesOfExpenses from './Components/ModalTypesOfExpenses'
import ExpensesCard from './Components/ExpensesCard'
import EmployeesCard from './Components/TypesOfEmployeeCard'
import api from '../api/api'
// import '../../styles/Home.css'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

const EmployeesDD = [
  {
    id: 1,
    employee: 'Teacher',
  },
  {
    id: 2,
    employee: 'IT',
  },
  {
    id: 3,
    employee: 'Security',
  },
  {
    id: 4,
    employee: 'Human Resources',
  },
  {
    id: 5,
    employee: 'Teacher',
  },

]

const ExpensesDD = [
  {
    id: 1,
    expense: 'Supplies',
  },
  {
    id: 2,
    expense: 'Computers',
  },
  {
    id: 3,
    expense: 'Wellfare',
  },
  {
    id: 4,
    expense: 'Internet',
  },
  {
    id: 5,
    expense: 'Hard Drives',
  },
]


export default function Types() {
  // Data Fetched from back
  const [types, setTypes] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // Types states
  const [searchType, setSearchType] = useState('')
  const [openTypeAddModify, setOpenTypeAddModify] = useState(false)
  const [name, setName] = useState('')
  const [modify_id, setModify_id] = useState('')
  const [modify_type, setModify_type] = useState('')
  const [open_expense, setOpenExpensesAdd] = useState(false)

  /* Add-Modify type functions */
  const populateFormForModify = (type) => {
    setName(type.name)
  }

  const unpopulateForm = () => {
    setName('')
    setModify_id('')
    setModify_type('')
  }

  const createTypeForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', name)

    return bodyFormData
  }

  const handleSubmitAddType = async (e) => {
    e.preventDefault()

    const bodyFormData = createTypeForm()

    try {
      const response = await api.post('/typesOfEmployee', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Type of employee added')
      unpopulateForm()
      fetchType()
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

  const handleSubmitModifyType = async (e) => {
    e.preventDefault()

    const bodyFormData = createTypeForm()

    try {
      const response = await api.put(
          '/OPSManager/typesOfEmployee' + modify_id,
          bodyFormData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
      )
      setOperationMessage('Type of Employee Modified')
      fetchType()
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

  const handleDeleteType = async (id) => {
    try {
      const response = await api.delete('/OPSManager/typesOfEmployee' + id)
      fetchType()
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

  const fetchType = async () => {
    try {
      const response = await api.get('/typesOfEmployee')
      setTypes(response.data)
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
    await fetchType()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [types])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_type)
    }
  }, [modify_id])


  return (
    <div className='pt-4 pl-10 w-full'>
      <div></div>
      <div className='flex items-center justify-end pb-10 md:m-4 mr-6'>

      </div>
      <div className='flex flex-col justify-center h-3/4'>
        <div className='flex justify-around'>
          <div className='flex items-center gap-7 w-full'>
            <div className='text-2xl font-semibold text-gray-600'>Types of Employees</div>
            <div className='w-2/4 sm:w-6/12 lg:w-3/12'>
              <SearchBar
                searchTerm={searchType}
                setSearchTerm={setSearchType}
                placeholder={'Search by name'}
              />
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='items-center flex'>
            {dataReady && (
              <>
                {/* <ModalTypesOfEmployees
                  open={openTeamAdd}
                  setOpen={setOpenTeamAdd}
                  cancelButtonRef={cancelButtonRefTeam}
                  // countries={countries}
                  // bands={bands}
                  ICAS={ICAS}
                  squads={squads}
                  typesOfEmployee={typesOfEmployee}
                  isModify={modify_id !== ''}
                  first_name={first_name}
                  setFirst_name={setFirst_name}
                  last_name={last_name}
                  setLast_name={setLast_name}
                  email={email}
                  setEmail={setEmail}
                  setCountry_id={setCountry_id}
                  country_selection={country_selection}
                  setCountry_selection={setCountry_selection}
                  setTypeOfEmployee_id={setTypeOfEmployee_id}
                  typeOfEmployee_selection={typeOfEmployee_selection}
                  setTypeOfEmployee_selection={setTypeOfEmployee_selection}
                  setBand_id={setBand_id}
                  band_selection={band_selection}
                  setBand_selection={setBand_selection}
                  setICA_id={setICA_id}
                  ICA_selection={ICA_selection}
                  setICA_selection={setICA_selection}
                  setSquad_id={setSquad_id}
                  squad_selection={squad_selection}
                  setSquad_selection={setSquad_selection}
                  handleSubmit={
                    modify_id === ''
                      ? handleSubmitAddEmployee
                      : handleSubmitModifyEmployee
                  }
                /> */}
                {/* <ModalTypesOfExpenses
                  open={openEmployeeRecovery}
                  setOpen={setOpenEmployeeRecovery}
                  cancelButtonRef={cancelButtonRefEmployeeRecovery}
                  quarter={quarter}
                  first_name={first_name}
                  last_name={last_name}
                  email={email}
                  handleSubmit={handleSubmitModifyRecovery}
                  month1Band_id={month1Band_id}
                  setMonth1Band_id={setMonth1Band_id}
                  month1Band_selection={month1Band_selection}
                  setMonth1Band_selection={setMonth1Band_selection}
                  month2Band_id={month2Band_id}
                  setMonth2Band_id={setMonth2Band_id}
                  month2Band_selection={month2Band_selection}
                  setMonth2Band_selection={setMonth2Band_selection}
                  hour1={hour1}
                  setHour1={setHour1}
                  hour2={hour2}
                  setHour2={setHour2}
                  hour3={hour3}
                  setHour3={setHour3}
                  comment={comment}
                  setComment={setComment}
                /> */}
              </>
            )}
            <button>
              <PlusCircleIcon
                className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600'
                onClick={() => {
                  console.log('a')
                  setModify_id('')
                }}
              />
            </button>
          </div>
          <div className='flex app'>
            <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
              {types.map((data) => (
                <EmployeesCard
                  key={data.id}
                  typeOfEmployee={data}
                />
              ))}
            </ScrollMenu>
          </div>
        </div>
        <div className='flex items-center gap-7 pt-16'>
          <div className='text-2xl font-semibold text-gray-600'>Types of expenses</div>
          <div className='w-2/4 sm:w-6/12 lg:w-3/12'>
            <SearchBar />
          </div>
        </div>
        <div className='flex'>
          <div className='items-center flex'>
            {/* <ModalExpensesAdd
              open={openExpensesAdd}
              setOpen={setOpenExpensesAdd}
              cancelButtonRef={cancelButtonRefExpenses}
            /> */}
            <button>
              <PlusCircleIcon
                className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600'
                onClick={() => {
                  setOpenExpensesAdd(true)
                }}
              />
            </button>
          </div>

          <div className='flex'>
            <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
              {ExpensesDD.map((data) => (
                <ExpensesCard
                  key={data.id}
                  expense={data.expense}
                />
              ))}
            </ScrollMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

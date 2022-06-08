import { useEffect, useRef, useState } from 'react'

import { PlusCircleIcon, ArrowDownIcon } from '@heroicons/react/solid'
import SearchBar from '../Shared/Components/SearchBar'
import ModalTypesOfEmployees from './Components/ModalTypesOfEmployees'
import ModalTypesOfExpenses from './Components/ModalTypesOfExpenses'
import ExpensesCard from './Components/ExpensesCard'
import EmployeesCard from './Components/EmployeeCard'
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

const EMPLOYEES_URL = '/manager/employees'

export default function Types() {
  // Data fetched from DB states
  const [team, setTeam] = useState([])
  const [countries, setCountries] = useState([])
  const [quarter, setQuarter] = useState([])
  const [bands, setBands] = useState([])
  const [ICAS, setICAS] = useState([])
  const [squads, setSquads] = useState([])
  const [typesOfEmployee, setTypesOfEmployee] = useState([])
  const [dataReady, setDataReady] = useState(false)

  // Add-modify employee states
  const [openTeamAdd, setOpenTeamAdd] = useState(false)
  const cancelButtonRefTeam = useRef(null)

  const defaultSelection = { id: 0, name: 'Select' }
  const inProgressBar = { id: 0, name: "In Progress", color: "bg-orange-400" }

  const [operationMessage, setOperationMessage] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [country_id, setCountry_id] = useState('')
  const [country_selection, setCountry_selection] = useState(defaultSelection)
  const [typeOfEmployee_id, setTypeOfEmployee_id] = useState('')
  const [typeOfEmployee_selection, setTypeOfEmployee_selection] =
    useState(defaultSelection)
  const [ICA_id, setICA_id] = useState('')
  const [ICA_selection, setICA_selection] = useState({ id: 0, name: 'Select' })
  const [squad_id, setSquad_id] = useState('')
  const [squad_selection, setSquad_selection] = useState(defaultSelection)
  const [modify_id, setModify_id] = useState('')
  const [modify_employee, setModify_employee] = useState('')

  // Employees and recovery states
  const [band_id, setBand_id] = useState('')
  const [band_selection, setBand_selection] = useState(defaultSelection)

  // Recovery States
  const [openEmployeeRecovery, setOpenEmployeeRecovery] = useState(false)
  const cancelButtonRefEmployeeRecovery = useRef(null)

  const [month1Band_id, setMonth1Band_id] = useState('')
  const [month1Band_selection, setMonth1Band_selection] =
    useState(defaultSelection)
  const [month2Band_id, setMonth2Band_id] = useState('')
  const [month2Band_selection, setMonth2Band_selection] =
    useState(defaultSelection)
  const [hour1, setHour1] = useState(0)
  const [hour2, setHour2] = useState(0)
  const [hour3, setHour3] = useState(0)
  const [comment, setComment] = useState('')

  // Add-Modify expenses states
  const [openExpensesAdd, setOpenExpensesAdd] = useState(false)
  const cancelButtonRefExpenses = useRef(null)

  /* Add-Modify employee functions */

  // status states

  const [status, setStatus] = useState(inProgressBar)
  const [statusId, setStatusId] = useState(0) 

  const populateFormForModify = (employee) => {
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

    // Employee and recovery
    setBand_id(employee.band_id)
    setBand_selection({
      id: employee.band_id,
      name: employee.band_name,
    })

    // Recovery
    setMonth1Band_id(employee.month1_band_id)
    setMonth1Band_selection({
      id: employee.month1Band_id,
      name: employee.month1Band_name,
    })
    setMonth2Band_id(employee.month2_band_id)
    setMonth2Band_selection({
      id: employee.month2Band_id,
      name: employee.month2Band_name,
    })
    setComment(employee.comment)
    setHour1(employee.hour1)
    setHour2(employee.hour2)
    setHour3(employee.hour3)
  }

  const unpopulateForm = () => {
    setFirst_name('')
    setLast_name('')
    setEmail('')
    setCountry_id('')
    setCountry_selection(defaultSelection)
    setTypeOfEmployee_id('')
    setTypeOfEmployee_selection(defaultSelection)
    setBand_id('')
    setBand_selection(defaultSelection)
    setICA_id('')
    setICA_selection(defaultSelection)
    setSquad_id('')
    setSquad_selection(defaultSelection)
    setModify_id('')
    setModify_employee('')
  }

  const createEmployeeForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('first_name', first_name)
    bodyFormData.append('last_name', last_name)
    bodyFormData.append('email', email)
    bodyFormData.append('country_id', country_id)
    bodyFormData.append('typeOfEmployee_id', typeOfEmployee_id)
    bodyFormData.append('band_id', band_id)
    bodyFormData.append('ICA_id', ICA_id)
    bodyFormData.append('squad_id', squad_id)

    return bodyFormData
  }

  const createRecoveryForm = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('band_id', band_id)
    bodyFormData.append('month1Band_id', month1Band_id)
    bodyFormData.append('month2Band_id', month2Band_id)
    bodyFormData.append('hour1', hour1)
    bodyFormData.append('hour2', hour2)
    bodyFormData.append('hour3', hour3)
    bodyFormData.append('comment', comment)

    return bodyFormData
  }

  const handleSubmitAddEmployee = async (e) => {
    e.preventDefault()

    const bodyFormData = createEmployeeForm()

    try {
      const response = await api.post(EMPLOYEES_URL, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Employee added')
      unpopulateForm()
      fetchTeam()
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

  const handleSubmitModifyEmployee = async (e) => {
    e.preventDefault()

    const bodyFormData = createEmployeeForm()

    try {
      const response = await api.put(
        EMPLOYEES_URL + '/' + modify_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Employee Modified')
      fetchTeam()
      unpopulateForm()
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

  const handleDeleteEmployee = async (id) => {
    try {
      console.log(modify_id)
      const response = await api.delete(EMPLOYEES_URL + '/' + id)
      fetchTeam()
    } catch (err) {
      if (!err?.response) {
        console.log('Server error')
      } else if (err.response?.status === 400) {
        console.log('Incorrect inputs')
      } else if (err.response?.status === 409) {
        console.log('Employee already exists')
      } else {
        console.log('Operation failed')
      }
    }
  }

  const handleSubmitModifyRecovery = async (e) => {
    e.preventDefault()

    const bodyFormData = createRecoveryForm()

    try {
      const response = await api.put(
        EMPLOYEES_URL + '/' + modify_id + '/recovery',
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Recovery Modified')
      fetchTeam()
      unpopulateForm()
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

  /* Fetching functions */

  const fetchTeam = async () => {
    try {
      const response = await api.get('/manager/employees')
      setTeam(response.data)
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

  const fetchICAS = async () => {
    try {
      const response = await api.get('/ICAS')
      setICAS(response.data)
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

  const fetchSquads = async () => {
    try {
      const response = await api.get('/squads')
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

  const fetchTypesOfEmployee = async () => {
    try {
      const response = await api.get('/typesOfEmployee')
      setTypesOfEmployee(response.data)
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

  const fetchQuarter = async () => {
    try {
      const response = await api.get('/quarter')
      setQuarter(response.data)
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
    await fetchTeam()
    await fetchCountries()
    await fetchBands()
    await fetchICAS()
    await fetchTypesOfEmployee()
    await fetchSquads()
    await fetchQuarter()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
    console.log(dataReady)
  }, [])

  useEffect(() => {}, [team])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_employee)
    }
  }, [modify_id])


  return (
    <div className='pt-4 pl-10 w-full'>
      <div></div>
      <div className='flex items-center justify-end pb-10 md:m-4 mr-6'>
        
        {/* <div className='flex items-center align-middle pl-5 px-2 ml-5 text-white font-bold bg-orange-400 rounded-full whitespace-nowrap'> */}
        {/* <SelectMenu
          options={[
            {name: "Alexis"},
            {name: "Diego"}
          ]}
          selected={inProgressBar}
          border="border-none"
          onChange={(e) => {
            setTypeOfEmployee_selection(e)
            setTypeOfEmployee_id(e.id)
          }}
            /> */}

      </div>
      <div className='flex flex-col justify-center h-3/4'>
        <div className='flex justify-around'>
          <div className='flex items-center gap-7 w-full'>
            <div className='text-2xl font-semibold text-gray-600'>Types of Employees</div>
            <div className='w-2/4 sm:w-6/12 lg:w-3/12'>
              <SearchBar />
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
                  setModify_employee('')
                  setOpenTeamAdd(true)
                }}
              />
            </button>
          </div>
          <div className='flex app'>
            <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
              {EmployeesDD.map((data) => (
                <EmployeesCard
                  key={data.id}
                  employee={data.employee}
              
                  handleDeleteEmployee={handleDeleteEmployee}
                  
                  setModify_employee={setModify_employee}
                  setOpenEmployeeRecovery={setOpenEmployeeRecovery}
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

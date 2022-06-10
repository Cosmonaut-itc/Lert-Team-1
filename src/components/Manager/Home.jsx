import { useEffect, useRef, useState } from 'react'

import { PlusCircleIcon } from '@heroicons/react/solid'
import TeamCard from '../Shared/Components/TeamCard'
import SearchBar from '../Shared/Components/SearchBar'
import StatusDropdown from '../Shared/Components/StatusDropdown'
import ExpensesCard from './Components/ExpensesCard'
import ModalAddModifyEmployeeForm from './Components/ModalAddModifyEmployeeForm'
import ModalEmployeeRecoveryForm from './Components/ModalEmployeeRecoveryForm'
import ModalExpensesAdd from './Components/ModalExpensesAdd'
import api from '../api/api'
import '../../styles/Home.css'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

const EMPLOYEES_URL = '/manager/employees'

export default function Home() {
  // Data fetched from back states
  const [team, setTeam] = useState([])
  const [expenses, setExpenses] = useState([])
  const [countries, setCountries] = useState([])
  const [quarter, setQuarter] = useState([])
  const [bands, setBands] = useState([])
  const [ICAS, setICAS] = useState([])
  const [squads, setSquads] = useState([])
  const [typesOfEmployee, setTypesOfEmployee] = useState([])
  const [typesOfExpenses, setTypesOfExpenses] = useState([])
  const [dataReady, setDataReady] = useState(false)
  const [operationMessage, setOperationMessage] = useState('')

  // Status states
  const statusOptions = [
    { id: 0, name: 'Not started' },
    { id: 1, name: 'In progress' },
    { id: 2, name: 'Finished' },
  ]
  const [status, setStatus] = useState(statusOptions[0])
  const [statusId, setStatusId] = useState(0)

  // Employee states
  const [searchEmployee, setSearchEmployee] = useState('')
  const defaultSelection = { id: 0, name: 'Select' }
  const [openTeamAdd, setOpenTeamAdd] = useState(false)
  const cancelButtonRefTeam = useRef(null)
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [country_id, setCountry_id] = useState('')
  const [country_selection, setCountry_selection] = useState(defaultSelection)
  const [typeOfEmployee_id, setTypeOfEmployee_id] = useState('')
  const [typeOfEmployee_selection, setTypeOfEmployee_selection] =
    useState(defaultSelection)
  const [ICA_id, setICA_id] = useState('')
  const [ICA_selection, setICA_selection] = useState(defaultSelection)
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

  // Expenses states
  const [searchExpense, setSearchExpense] = useState('')
  const [openExpensesAdd, setOpenExpensesAdd] = useState(false)
  const cancelButtonRefExpenses = useRef(null)
  const [description, setDescription] = useState('')
  const [employee_email, setEmployee_email] = useState('')
  const [cost, setCost] = useState(0)
  const [typeOfExpense_id, setTypeOfExpense_id] = useState('')
  const [typeOfExpense_selection, setTypeOfExpense_selection] =
    useState(defaultSelection)
  const [expenseICA_id, setExpenseICA_id] = useState('')
  const [expenseICA_selection, setExpenseICA_selection] =
    useState(defaultSelection)
  const [ICA_email, setICA_email] = useState('')
  const [admin_email, setAdmin_email] = useState('')
  const [expenseComments, setExpenseComments] = useState('')
  const [modifyExpense_id, setModifyExpense_id] = useState('')
  const [modifyExpense_expense, setModifyExpense_expense] = useState('')
  const [user_email, setUser_email] = useState('')

  /* Modify status functions */
  const handleSubmitModifyStatus = async () => {
    const bodyFormData = new FormData()
    bodyFormData.append('status_id', statusId)

    try {
      const response = await api.put('/manager/status', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Status Modified')
      fetchStatus()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 404) {
        setOperationMessage('User does not exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  /* Add-Modify employee functions */
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
      salary: employee.month3_cost,
    })

    // Recovery
    setMonth1Band_id(employee.month1Band_id)
    setMonth1Band_selection({
      id: employee.month1Band_id,
      name: employee.month1Band_name,
      salary: employee.month1_cost,
    })
    setMonth2Band_id(employee.month2Band_id)
    setMonth2Band_selection({
      id: employee.month2Band_id,
      name: employee.month2Band_name,
      salary: employee.month2_cost,
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

  /* Add-Modify expense functions */
  const populateExpenseFormForModify = (expense) => {
    setDescription(expense.description)
    setEmployee_email(expense.employee_email)
    setCost(expense.cost)
    setTypeOfExpense_id(expense.typeOfExpense_id)
    setTypeOfExpense_selection({
      id: expense.typeOfExpense_id,
      name: expense.typeOfExpense_name,
    })
    setExpenseICA_id(expense.ICA_id)
    setExpenseICA_selection({
      id: expense.ICA_id,
      name: expense.ICA_name,
    })
    setICA_email(expense.ICA_email)
    setAdmin_email(expense.admin_email)
    setExpenseComments(expense.comments)
  }

  const unpopulateExpenseForm = (expense) => {
    setDescription('')
    setEmployee_email('')
    setCost(0)
    setTypeOfExpense_id('')
    setTypeOfExpense_selection(defaultSelection)
    setExpenseICA_id('')
    setExpenseICA_selection(defaultSelection)
    setICA_email(user_email)
    setAdmin_email(user_email)
    setExpenseComments('')
  }

  const createExpenseForm = () => {
    const bodyFormData = new FormData()

    bodyFormData.append('description', description)
    bodyFormData.append('employee_email', employee_email)
    bodyFormData.append('cost', cost)
    bodyFormData.append('typeOfExpense_id', typeOfExpense_id)
    bodyFormData.append('ICA_id', expenseICA_id)
    bodyFormData.append('ICA_email', ICA_email)
    bodyFormData.append('admin_email', admin_email)
    bodyFormData.append('comments', expenseComments)

    return bodyFormData
  }

  const handleSubmitAddExpense = async (e) => {
    e.preventDefault()

    const bodyFormData = createExpenseForm()

    console.log('Add')

    try {
      const response = await api.post('/manager/expenses', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setOperationMessage('Expense added')
      unpopulateExpenseForm()
      fetchExpenses()
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

  const handleSubmitModifyExpense = async (e) => {
    e.preventDefault()

    const bodyFormData = createExpenseForm()

    try {
      const response = await api.put(
        '/manager/expenses/' + modifyExpense_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Status Modified')
      fetchExpenses()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 404) {
        setOperationMessage('User does not exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  const handleDeleteExpense = async (id) => {
    try {
      const response = await api.delete('/manager/expenses/' + id)
      setOperationMessage('Expense deleted')
      fetchExpenses()
    } catch (err) {
      if (!err?.response) {
        setOperationMessage('Server error')
      } else if (err.response?.status === 400) {
        setOperationMessage('Incorrect inputs')
      } else if (err.response?.status === 404) {
        setOperationMessage('User does not exists')
      } else {
        setOperationMessage('Operation failed')
      }
    }
  }

  /* Fetching functions */

  const fetchStatus = async () => {
    try {
      const response = await api.get('/manager/status')
      setStatusId(response.data.status_id)
      setStatus(statusOptions[response.data.status_id])
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
      const response = await api.get('/ICAs')
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

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/manager/expenses')
      setExpenses(response.data)
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

  const fetchTypesOfExpenses = async () => {
    try {
      const response = await api.get('/typesOfExpenses')
      setTypesOfExpenses(response.data)
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

  const fetchEmail = async () => {
    try {
      const response = await api.get('/email')
      setUser_email(response.data.email)
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
    await fetchStatus()
    await fetchTeam()
    await fetchExpenses()
    await fetchCountries()
    await fetchBands()
    await fetchICAS()
    await fetchTypesOfEmployee()
    await fetchTypesOfExpenses()
    await fetchSquads()
    await fetchQuarter()
    await fetchEmail()

    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [team])

  useEffect(() => {
    setICA_email(user_email)
    setAdmin_email(user_email)
  }, [user_email])

  useEffect(() => {
    handleSubmitModifyStatus()
  }, [statusId])

  useEffect(() => {
    if (modify_id === '') {
      unpopulateForm()
    } else {
      populateFormForModify(modify_employee)
    }
  }, [modify_id])

  useEffect(() => {
    if (modifyExpense_id === '') {
      unpopulateExpenseForm()
    } else {
      populateExpenseFormForModify(modifyExpense_expense)
    }
  }, [modifyExpense_id])

  return (
    <div className='pt-4 pl-10 w-full'>
      {/* Modals for Employee form, recovery form and expenses form  */}
      <div>
        {dataReady && (
          <>
            <ModalAddModifyEmployeeForm
              open={openTeamAdd}
              setOpen={setOpenTeamAdd}
              cancelButtonRef={cancelButtonRefTeam}
              countries={countries}
              bands={bands}
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
            />
            <ModalEmployeeRecoveryForm
              open={openEmployeeRecovery}
              setOpen={setOpenEmployeeRecovery}
              cancelButtonRef={cancelButtonRefEmployeeRecovery}
              quarter={quarter}
              first_name={first_name}
              last_name={last_name}
              email={email}
              bands={bands}
              handleSubmit={handleSubmitModifyRecovery}
              setBand_id={setBand_id}
              band_selection={band_selection}
              setBand_selection={setBand_selection}
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
            />
            <ModalExpensesAdd
              open={openExpensesAdd}
              setOpen={setOpenExpensesAdd}
              cancelButtonRef={cancelButtonRefExpenses}
              handleSubmit={
                modifyExpense_id === ''
                  ? handleSubmitAddExpense
                  : handleSubmitModifyExpense
              }
              ICAS={ICAS}
              typeOfExpenses={typesOfExpenses}
              description={description}
              employee_email={employee_email}
              cost={cost}
              typeOfExpense_selection={typeOfExpense_selection}
              expenseICA_selection={expenseICA_selection}
              ICA_email={ICA_email}
              admin_email={admin_email}
              expenseComments={expenseComments}
              setDescription={setDescription}
              setEmployee_email={setEmployee_email}
              setCost={setCost}
              setTypeOfExpense_id={setTypeOfExpense_id}
              setTypeOfExpense_selection={setTypeOfExpense_selection}
              setExpenseICA_id={setExpenseICA_id}
              setExpenseICA_selection={setExpenseICA_selection}
              setICA_email={setICA_email}
              setAdmin_email={setAdmin_email}
              setExpenseComments={setExpenseComments}
            />
          </>
        )}
      </div>

      {/* Status Bar  */}
      <div className='flex items-center justify-end pb-10 md:m-4 mr-6'>
        <div className='text-xl font-semibold text-gray-600 invisible md:visible mr-4'>
          Status:{' '}
        </div>
        <StatusDropdown
          selected={status}
          options={statusOptions}
          onChange={(e) => {
            setStatus(e)
            setStatusId(e.id)
          }}
        />
      </div>

      {/* Employees and expenses */}
      <div className='flex flex-col justify-center h-3/4'>
        <div className='flex justify-around'>
          <div className='flex items-center gap-7 w-full'>
            <div className='text-2xl font-semibold text-gray-600'>Team</div>
            <div className='w-2/4 sm:w-6/12 lg:w-3/12'>
              <SearchBar
                searchTerm={searchEmployee}
                setSearchTerm={setSearchEmployee}
                placeholder={'Search by name, email or band '}
              />
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='items-center flex'>
            <button>
              <PlusCircleIcon
                className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600'
                onClick={() => {
                  setModify_id('')
                  setModify_employee('')
                  setOpenTeamAdd(true)
                }}
              />
            </button>
          </div>
          <div className='flex app'>
            <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
              {team
                .filter((data) => {
                  if (searchEmployee == '') {
                    return data
                  } else if (
                    data.first_name
                      .toLowerCase()
                      .includes(searchEmployee.toLowerCase()) ||
                    data.last_name
                      .toLowerCase()
                      .includes(searchEmployee.toLowerCase()) ||
                    data.email
                      .toLowerCase()
                      .includes(searchEmployee.toLowerCase()) ||
                    data.band_name
                      .toLowerCase()
                      .includes(searchEmployee.toLowerCase())
                  ) {
                    return data
                  }
                })
                .map((data) => (
                  <TeamCard
                    key={data.id}
                    employee={data}
                    setOpenTeamAdd={setOpenTeamAdd}
                    handleDeleteEmployee={handleDeleteEmployee}
                    setModify_id={setModify_id}
                    setModify_employee={setModify_employee}
                    setOpenEmployeeRecovery={setOpenEmployeeRecovery}
                  />
                ))}
            </ScrollMenu>
          </div>
        </div>
        <div className='flex items-center gap-7 pt-16'>
          <div className='text-2xl font-semibold text-gray-600'>Expenses</div>
          <div className='w-2/4 sm:w-6/12 lg:w-3/12'>
            <SearchBar
              searchTerm={searchExpense}
              setSearchTerm={setSearchExpense}
              placeholder={'Search by name, email, cost or type '}
            />
          </div>
        </div>
        <div className='flex'>
          <div className='items-center flex'>
            <button>
              <PlusCircleIcon
                className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600'
                onClick={() => {
                  setModifyExpense_id('')
                  setModifyExpense_expense('')
                  setOpenExpensesAdd(true)
                }}
              />
            </button>
          </div>

          <div className='flex'>
            <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
              {expenses
                .filter((data) => {
                  if (searchExpense == '') {
                    return data
                  } else if (
                    data.description
                      .toLowerCase()
                      .includes(searchExpense.toLowerCase()) ||
                    data.cost
                      .toLowerCase()
                      .includes(searchExpense.toLowerCase()) ||
                    data.employee_email
                      .toLowerCase()
                      .includes(searchExpense.toLowerCase()) ||
                    data.typeOfExpense_name
                      .toLowerCase()
                      .includes(searchExpense.toLowerCase())
                  ) {
                    return data
                  }
                })
                .map((data) => (
                  <ExpensesCard
                    key={data.id}
                    expense={data}
                    setOpenExpensesAdd={setOpenExpensesAdd}
                    handleDeleteExpense={handleDeleteExpense}
                    setModifyExpense_id={setModifyExpense_id}
                    setModifyExpense_expense={setModifyExpense_expense}
                  />
                ))}
            </ScrollMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

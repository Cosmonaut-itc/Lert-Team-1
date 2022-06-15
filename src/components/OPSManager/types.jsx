import { useEffect, useRef, useState } from 'react'

import { PlusCircleIcon, ArrowDownIcon } from '@heroicons/react/solid'
import SearchBar from '../Shared/Components/SearchBar'
import ExpensesCard from './Components/ExpensesCard'
import EmployeesCard from './Components/TypesOfEmployeeCard'
import api from '../api/api'
// import '../../styles/Home.css'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import ModalSingleField from './Components/ModalSingleField'

export default function Types() {
  // Data Fetched from back
  const [typesOfEmployees, setTypesOfEmployees] = useState([])
  const [typesOfExpenses, setTypesOfExpenses] = useState([])
  const [operationMessage, setOperationMessage] = useState('')
  const [dataReady, setDataReady] = useState(false)

  // Type of employees states
  const [searchTypeOfEmployee, setSearchTypeOfEmployee] = useState('')
  const [openTypeOfEmployee, setOpenTypeOfEmployee] = useState(false)
  const [nameTypeEmployee, setNameTypeEmployee] = useState('')
  const [modifyTypeEmployee_id, setModifyTypeEmployee_id] = useState('')
  const [modifyEmployee_type, setModifyEmployee_type] = useState('')

  // Type of expenses states
  const [searchTypeOfExpense, setSearchTypeOfExpense] = useState('')
  const [openTypeOfExpense, setOpenTypeOfExpense] = useState(false)
  const [nameTypeExpense, setNameTypeExpense] = useState('')
  const [modifyTypeExpense_id, setModifyTypeExpense_id] = useState('')
  const [modifyExpense_type, setModifyExpense_type] = useState('')

  /* Add-Modify type of employee functions */
  const populateFormForModifyEmployee = (type) => {
    setNameTypeEmployee(type.name)
  }

  const unpopulateFormEmployee = () => {
    setNameTypeEmployee('')
    setModifyTypeEmployee_id('')
    setModifyEmployee_type('')
  }

  const createTypeFormEmployee = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', nameTypeEmployee)

    return bodyFormData
  }

  const handleSubmitAddTypeEmployee = async (e) => {
    e.preventDefault()

    const bodyFormData = createTypeFormEmployee()

    try {
      const response = await api.post(
        '/OPSManager/typesOfEmployee',
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Type of employee added')
      unpopulateFormEmployee()
      fetchTypesOfEmployee()
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

  const handleSubmitModifyTypeEmployee = async (e) => {
    e.preventDefault()

    const bodyFormData = createTypeFormEmployee()

    try {
      const response = await api.put(
        '/OPSManager/typesOfEmployee/' + modifyTypeEmployee_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Type of Employee Modified')
      fetchTypesOfEmployee()
      unpopulateFormEmployee()
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

  const handleDeleteTypeEmployee = async (id) => {
    try {
      const response = await api.delete('/OPSManager/typesOfEmployee/' + id)
      fetchTypesOfEmployee()
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

  /* Add-Modify type of expense functions */
  const populateFormForModifyExpense = (type) => {
    setNameTypeExpense(type.name)
  }

  const unpopulateFormExpense = () => {
    setNameTypeExpense('')
    setModifyTypeExpense_id('')
    setModifyExpense_type('')
  }

  const createTypeFormExpense = () => {
    const bodyFormData = new FormData()
    bodyFormData.append('name', nameTypeExpense)

    return bodyFormData
  }

  const handleSubmitAddTypeExpense = async (e) => {
    e.preventDefault()

    const bodyFormData = createTypeFormExpense()

    try {
      const response = await api.post(
        '/OPSManager/typesOfExpense',
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Type of employee added')
      unpopulateFormExpense()
      fetchTypesOfExpenses()
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

  const handleSubmitModifyTypeExpense = async (e) => {
    e.preventDefault()

    const bodyFormData = createTypeFormExpense()

    try {
      const response = await api.put(
        '/OPSManager/typesOfExpense/' + modifyTypeExpense_id,
        bodyFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setOperationMessage('Type of Employee Modified')
      fetchTypesOfExpenses()
      unpopulateFormExpense()
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

  const handleDeleteTypeExpense = async (id) => {
    try {
      const response = await api.delete('/OPSManager/typesOfExpense/' + id)
      fetchTypesOfExpenses()
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

  const fetchTypesOfEmployee = async () => {
    try {
      const response = await api.get('/typesOfEmployee')
      setTypesOfEmployees(response.data)
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

  const fetchData = async () => {
    await fetchTypesOfEmployee()
    await fetchTypesOfExpenses()
    setDataReady(true)
  }

  /* Effects */
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {}, [typesOfEmployees, typesOfExpenses])

  useEffect(() => {
    if (modifyTypeEmployee_id === '') {
      unpopulateFormEmployee()
    } else {
      populateFormForModifyEmployee(modifyEmployee_type)
    }
  }, [modifyTypeEmployee_id])

  useEffect(() => {
    if (modifyTypeExpense_id === '') {
      unpopulateFormExpense()
    } else {
      populateFormForModifyExpense(modifyExpense_type)
    }
  }, [modifyTypeExpense_id])

  return (
    <div className='pt-4 pl-10 w-full'>
      <div></div>
      <div className='flex items-center justify-end pb-10 md:m-4 mr-6'></div>
      <div className='flex flex-col justify-center h-3/4'>
        <div className='flex justify-around'>
          <div className='flex items-center gap-7 w-full'>
            <div className='text-2xl font-semibold text-gray-600 dark:text-gray-200'>
              Types of Employees
            </div>
            <div className='w-2/4 sm:w-6/12 lg:w-3/12'>
              <SearchBar
                searchTerm={searchTypeOfEmployee}
                setSearchTerm={setSearchTypeOfEmployee}
                placeholder={'Search by name'}
              />
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='items-center flex'>
            {dataReady && (
              <>
                <ModalSingleField
                  open={openTypeOfEmployee}
                  setOpen={setOpenTypeOfEmployee}
                  modalTitle={'Type of employee'}
                  fieldPlaceHolder={'Employee type'}
                  handleSubmit={
                    modifyTypeEmployee_id === ''
                      ? handleSubmitAddTypeEmployee
                      : handleSubmitModifyTypeEmployee
                  }
                  name={nameTypeEmployee}
                  setName={setNameTypeEmployee}
                />
                <ModalSingleField
                  open={openTypeOfExpense}
                  setOpen={setOpenTypeOfExpense}
                  modalTitle={'Type of expense'}
                  fieldPlaceHolder={'Expense type'}
                  handleSubmit={
                    modifyTypeExpense_id === ''
                      ? handleSubmitAddTypeExpense
                      : handleSubmitModifyTypeExpense
                  }
                  name={nameTypeExpense}
                  setName={setNameTypeExpense}
                />
              </>
            )}
            <button
              onClick={() => {
                setOpenTypeOfEmployee(true)
                setModifyTypeEmployee_id('')
              }}
            >
              <PlusCircleIcon className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600' />
            </button>
          </div>
          <div className='flex app'>
            <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
              {typesOfEmployees
                .filter((data) => {
                  if (searchTypeOfEmployee == '') {
                    return data
                  } else if (
                    data.name
                      .toLowerCase()
                      .includes(searchTypeOfEmployee.toLowerCase())
                  ) {
                    return data
                  }
                })
                .map((data) => (
                  <EmployeesCard
                    key={data.id}
                    typeOfEmployee={data}
                    setOpenEmployeeAdd={setOpenTypeOfEmployee}
                    handleDeleteEmployee={handleDeleteTypeEmployee}
                    setModifyEmployee_employee={setModifyEmployee_type}
                    setModifyEmployee_id={setModifyTypeEmployee_id}
                  />
                ))}
            </ScrollMenu>
          </div>
        </div>
        <div className='flex items-center gap-7 pt-16'>
          <div className='text-2xl font-semibold text-gray-600 dark:text-gray-200'>
            Types of expenses
          </div>
          <div className='w-2/4 sm:w-6/12 lg:w-3/12'>
            <SearchBar
              searchTerm={searchTypeOfExpense}
              setSearchTerm={setSearchTypeOfExpense}
              placeholder={'Search by name'}
            />
          </div>
        </div>
        <div className='flex'>
          <div className='items-center flex'>
            <button
              onClick={() => {
                setModifyTypeExpense_id('')
                setOpenTypeOfExpense(true)
              }}
            >
              <PlusCircleIcon className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600' />
            </button>
          </div>

          <div className='flex'>
            <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
              {typesOfExpenses
                .filter((data) => {
                  if (searchTypeOfExpense == '') {
                    return data
                  } else if (
                    data.name
                      .toLowerCase()
                      .includes(searchTypeOfExpense.toLowerCase())
                  ) {
                    return data
                  }
                })
                .map((data) => (
                  <ExpensesCard
                    key={data.id}
                    expense={data}
                    setOpenExpensesAdd={setOpenTypeOfExpense}
                    handleDeleteExpense={handleDeleteTypeExpense}
                    setModifyExpense_expense={setModifyExpense_type}
                    setModifyExpense_id={setModifyTypeExpense_id}
                  />
                ))}
            </ScrollMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

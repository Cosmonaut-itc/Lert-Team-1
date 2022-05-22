import { useEffect, useRef, useState } from 'react'

import { PlusCircleIcon, ArrowDownIcon } from '@heroicons/react/solid'
import TeamCard from '../Shared/Components/TeamCard'
import SearchBar from '../Shared/Components/SearchBar'
import ExpensesCard from './Components/ExpensesCard'
import AddModifyEmployeeForm from './Components/AddModifyEmployeeForm'
import ModalExpensesAdd from './Components/ModalExpensesAdd'
import api from '../api/api'
import '../../styles/Home.css'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

const ExpensesDD = [
  {
    id: 1,
    item: 'Monitor',
    email: 'kenbauer@tec.mx',
    date: '14/03/2022',
    price: '200',
    section: 'Office Supplies',
  },
  {
    id: 2,
    item: 'Monitor',
    email: 'kenbauer@tec.mx',
    date: '14/03/2022',
    price: '200',
    section: 'Office Supplies',
  },
  {
    id: 3,
    item: 'Monitor',
    email: 'kenbauer@tec.mx',
    date: '14/03/2022',
    price: '200',
    section: 'Office Supplies',
  },
  {
    id: 4,
    item: 'Monitor',
    email: 'kenbauer@tec.mx',
    date: '14/03/2022',
    price: '200',
    section: 'Office Supplies',
  },
]

export default function Home() {
  const [openTeamAdd, setOpenTeamAdd] = useState(false)
  const cancelButtonRefTeam = useRef(null)
  const [openExpensesAdd, setOpenExpensesAdd] = useState(false)
  const cancelButtonRefExpenses = useRef(null)
  const [team, setTeam] = useState([])
  const [countries, setCountries] = useState([])
  const [bands, setBands] = useState([])
  const [ICAS, setICAS] = useState([])
  const [squads, setSquads] = useState([])
  const [typesOfEmployee, setTypesOfEmployee] = useState([])
  const [dataReady, setDataReady] = useState(false)

  // Fetch example with axios
  useEffect(() => {
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

    const fetchData = async () => {
      await fetchTeam()
      await fetchCountries()
      await fetchBands()
      await fetchICAS()
      await fetchTypesOfEmployee()
      await fetchSquads()
        setDataReady(true)
    }

    fetchData()
  }, [])

  return (
    <div className='pt-4 pl-10 w-full'>
      <div className='flex items-center justify-end mb-10 md:m-4 mr-6'>
        <div className='text-xl font-semibold text-gray-600 invisible md:visible'>
          Status:{' '}
        </div>
        <div className='flex items-center pl-5 px-2 ml-5 text-white font-bold bg-orange-400 rounded-full whitespace-nowrap'>
          <p>In progress</p>
          <ArrowDownIcon className='w-4 h-5 m-2' />
        </div>
      </div>
      <div className='flex justify-around'>
        <div className='flex items-center gap-7 w-full'>
          <div className='text-2xl font-semibold text-gray-600'>Team</div>
          <div className='w-2/4 sm:w-3/12'>
            <SearchBar />
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='items-center flex'>
          { dataReady &&
            <AddModifyEmployeeForm
              open={openTeamAdd}
              setOpen={setOpenTeamAdd}
              cancelButtonRef={cancelButtonRefTeam}
              countries={countries}
              bands={bands}
              ICAS={ICAS}
              squads={squads}
              typesOfEmployee={typesOfEmployee}
/*              isModify={true}
              employee={team[0]}*/
            />
          }
          <button>
            <PlusCircleIcon
              className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600'
              onClick={() => setOpenTeamAdd(true)}
            />
          </button>
        </div>

        <div className='flex app'>
          <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
            {team.map((data) => (
              <TeamCard
                key={data.id}
                employee={data}
                countries={countries}
                bands={bands}
                ICAS={ICAS}
                squads={squads}
                typesOfEmployee={typesOfEmployee}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>Expenses</div>
        <div className='w-2/4 sm:w-3/12'>
          <SearchBar />
        </div>
      </div>
      <div className='flex'>
        <div className='items-center flex'>
          <ModalExpensesAdd
            open={openExpensesAdd}
            setOpen={setOpenExpensesAdd}
            cancelButtonRef={cancelButtonRefExpenses}
          />
          <button>
            <PlusCircleIcon
              className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600'
              onClick={() => setOpenExpensesAdd(true)}
            />
          </button>
        </div>

        <div className='flex app'>
          <ScrollMenu className='react-horizontal-scrolling-menu--scroll-container'>
            {ExpensesDD.map((data) => (
              <ExpensesCard
                key={data.id}
                item={data.item}
                email={data.email}
                date={data.date}
                price={data.price}
                section={data.section}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </div>
  )
}

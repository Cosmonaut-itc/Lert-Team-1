import { useEffect, useRef, useState, ScrollView } from 'react'

import { PlusCircleIcon, ArrowDownIcon } from '@heroicons/react/solid'
import TeamCard from '../Shared/Components/TeamCard'
import SearchBar from '../Shared/Components/SearchBar'
import ExpensesCard from './Components/ExpensesCard'
import ModalTeamAdd from './Components/ModalTeamAdd'
import ModalExpensesAdd from './Components/ModalExpensesAdd'
import api from '../api/api'
import '../../styles/Home.css'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

const TeamDD = [
  {
    id: 1,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    status: 'Temp Down',
  },
  {
    id: 2,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    status: 'Temp Down',
  },
  {
    id: 3,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    status: 'Temp Down',
  },
]

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

  // Fetch example with axios
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get('/manager/team')
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

    fetchTeam()
  }, [])

  const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>
  }
  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' })
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' })

  return (
    <div className='pt-16 pl-10 h-screen app'>
      <div className='flex justify-around'>
        <div className='flex items-center gap-7 w-full'>
          <div className='text-2xl font-semibold text-gray-600'>Team</div>
          <div className='w-2/12'>
            <SearchBar />
          </div>
        </div>
        <div className='flex items-center'>
          <div className='text-xl font-semibold text-gray-600'>Status: </div>
          <div className='flex items-center pl-5 px-2 ml-5 text-white font-bold bg-orange-400 rounded-full whitespace-nowrap'>
            <p>In progress</p>
            <ArrowDownIcon className='w-4 h-5 m-2' />
          </div>
        </div>
      </div>
      <div className='flex pt-3'>
        <div className='items-center flex'>
          <ModalTeamAdd
            open={openTeamAdd}
            setOpen={setOpenTeamAdd}
            cancelButtonRef={cancelButtonRefTeam}
          />
          <button>
            <PlusCircleIcon
              className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600'
              onClick={() => setOpenTeamAdd(true)}
            />
          </button>
        </div>

        <div className='flex app'>
          <ScrollMenu
            style='width: 80vw;'
            className='react-horizontal-scrolling-menu--scroll-container'
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
          >
            {TeamDD.map((data) => (
              <TeamCard
                key={data.id}
                name={data.name}
                email={data.email}
                status={data.status}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>Expenses</div>
        <div className='w-2/12'>
          <SearchBar />
        </div>
      </div>
      <div className='flex pt-3'>
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
          <ScrollMenu
            style='width: 80vw;'
            className='react-horizontal-scrolling-menu--scroll-container'
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
          >
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

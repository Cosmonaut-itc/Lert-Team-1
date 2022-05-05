import { PlusCircleIcon } from '@heroicons/react/solid'
import TeamCard from '../components/TeamCard'
import SearchBar from '../components/SearchBar'
import ExpensesCard from '../components/ExpensesCard'

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
]

export default function Home() {
  return (
    <div className='pt-16 pl-10 h-screen'>
      <div className='flex items-center gap-7'>
        <div className='text-2xl font-semibold text-gray-600'>Team</div>
        <div className='px-12 lg:px-0'>
          <SearchBar />
        </div>
      </div>
      <div className='flex pt-3'>
        <div className='items-center flex'>
          <button>
            <PlusCircleIcon className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600' />
          </button>
        </div>
        <div className='flex'>
          {TeamDD.map((data) => (
            <TeamCard
              key={data.id}
              name={data.name}
              email={data.email}
              status={data.status}
            />
          ))}
        </div>
      </div>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>Expenses</div>
        <div className='px-12 lg:px-0'>
          <SearchBar />
        </div>
      </div>
      <div className='flex pt-3'>
        <div className='items-center flex'>
          <button>
            <PlusCircleIcon className='h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600' />
          </button>
        </div>
        <div className='flex'>
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
        </div>
      </div>
    </div>
  )
}

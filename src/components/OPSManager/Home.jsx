import { PlusCircleIcon } from '@heroicons/react/solid'
import SearchBar from '../Shared/Components/SearchBar'
import ManagerCard from './Components/ManagerCard'

import Button from '@mui/material/Button'

const TeamDD = [
  {
    id: 1,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    team: 'LERT',
    statusColor: 'red',
  },
  {
    id: 2,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    team: 'LERT',
    statusColor: 'green',
  },
  {
    id: 3,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    team: 'LERT',
    statusColor: 'green',
  },
  {
    id: 4,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    team: 'LERT',
    statusColor: 'orange',
  },
  {
    id: 5,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    team: 'LERT',
    statusColor: 'orange',
  },
  {
    id: 6,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    team: 'LERT',
    statusColor: 'green',
  },
  {
    id: 7,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    team: 'LERT',
    statusColor: 'orange',
  },
  {
    id: 8,
    name: 'Ken Bauer',
    email: 'kenbauer@tec.mx',
    team: 'LERT',
    statusColor: 'orange',
  },
]

export default function Home() {
  return (
    <div className='pt-16 pl-10 h-screen'>
      <div className='flex items-center gap-7 justify-between'>
        <div className='text-2xl font-semibold text-gray-600'>Managers</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar />
        </div>
        <Button
          className=''
          variant='contained'
          sx={{
            borderRadius: 16,
            px: 8,
            py: 0.2,
            mx: 5,
            textTransform: 'capitalize',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: 3,
          }}
        >
          Collective Download
        </Button>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          <div className='flex justify-center items-center'>
            <button>
              <PlusCircleIcon className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {TeamDD.map((data) => (
            <ManagerCard
              key={data.id}
              name={data.name}
              email={data.email}
              team={data.team}
              statusColor={data.statusColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

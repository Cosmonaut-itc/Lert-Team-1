import { PlusCircleIcon } from '@heroicons/react/solid'
import TeamCard from '../Shared/Components/TeamCard'
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
        <div className='px-52 lg:px-0'>
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
      <div className='flex pt-3'>
        <div className='grid grid-cols-3 gap-3'>
          <button className='flex justify-center items-center'>
            <PlusCircleIcon className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
          </button>
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

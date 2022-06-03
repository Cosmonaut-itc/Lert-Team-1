import { PlusCircleIcon } from '@heroicons/react/solid'
import SearchBar from '../Shared/Components/SearchBar'
import SquadCard from './Components/SquadCard'

const SquadsDD = [
  {
    id: 1,
    team: 'LERT',
  },
  {
    id: 2,
    team: 'LERT',
  },
  {
    id: 3,
    team: 'LERT',
  },
  {
    id: 4,
    team: 'LERT',
  },
  {
    id: 5,
    team: 'LERT',
  },
  {
    id: 6,
    team: 'LERT',
  },
  {
    id: 7,
    team: 'LERT',
  },
  {
    id: 8,
    team: 'LERT',
  },
]

export default function Squads() {
  return (
    <div className='pl-10 h-screen '>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>Squads</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          <button className='flex justify-center items-center'>
            <PlusCircleIcon className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
          </button>
          {SquadsDD.map((data) => (
            <SquadCard
              key={data.id}
              name={data.name}
              email={data.email}
              team={data.team}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

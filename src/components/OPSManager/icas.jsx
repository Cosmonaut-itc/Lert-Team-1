import { PlusCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import ModalAddModifyIcas from './Components/ModalAddModifyIcas'
import IcasCard from './Components/IcasCard'

const IcasDD = [
  {
    id: 1,
    team: 'DMT',
  },
  {
    id: 2,
    team: 'VARAM',
  },
  {
    id: 3,
    team: 'Man Eating Squirrels',
  },
  {
    id: 4,
    team: 'AFK',
  },
  {
    id: 5,
    team: 'ITESM DEV',
  },
  {
    id: 6,
    team: 'Avengers',
  },
  {
    id: 7,
    team: 'DMT',
  },
  {
    id: 8,
    team: 'DMT',
  },
]

export default function Icas() {
  const [openIcasAddModify, setOpenIcasAddModify] = useState(false)

  return (
    <div className='pl-10 h-screen '>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>ICAS</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar />
          
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifyIcas
          open={openIcasAddModify}
          setOpen={setOpenIcasAddModify}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenIcasAddModify(true)
              }}
            >
              <PlusCircleIcon className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {IcasDD.map((data) => (
            <IcasCard
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

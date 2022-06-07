import { PlusCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import ModalAddModifySquad from './Components/ModalAddModifySquad'
import CountryCard from './Components/CountryCard'

const CountriesDD = [
  {
    id: 1,
    country: 'México 🇲🇽',
  },
  {
    id: 2,
    country: 'México 🇲🇽',
  },
  {
    id: 3,
    country: 'México 🇲🇽',
  },
  {
    id: 4,
    country: 'México 🇲🇽',
  },
  {
    id: 5,
    country: 'México 🇲🇽',
  },
  {
    id: 6,
    country: 'México 🇲🇽',
  },
  {
    id: 7,
    country: 'México 🇲🇽',
  },
  {
    id: 8,
    country: 'México 🇲🇽',
  },
]

export default function Countries() {
  const [openAddModifyCountry, setOpenAddModifyCountry] = useState(false)

  return (
    <div className='ml-10 h-screen '>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>Countries</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifySquad
          open={openAddModifyCountry}
          setOpen={setOpenAddModifyCountry}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenAddModifyCountry(true)
              }}
            >
              <PlusCircleIcon className=' flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {CountriesDD.map((data) => (
            <CountryCard key={data.id} country={data.country} />
          ))}
        </div>
      </div>
    </div>
  )
}

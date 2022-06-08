import { PlusCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import BandsCard from './Components/BandsCard'
import ModalAddModifyBands from './Components/ModalAddModifyBands'

const BandsDD = [
  {
    id: 1,
    name: 'Band 1',
    prices: "200"

  },
  {
    id: 2,
    name: 'Band 1',
    prices: "200"

  },
  {
    id: 3,
    name: 'Band 1',
    prices: "200"

  },
  {
    id: 4,
    name: 'Band 1',
    prices: "200"

  },
  {
    id: 5,
    name: 'Band 1',
    prices: "200"

  },
  {
    id: 6,
    name: 'Band 1',
    prices: "200"

  },
  {
    id: 7,
    name: 'Band 1',
    prices: "200"

  },
  {
    id: 8,
    name: 'Band 1',
    prices: "200"

  },
]

export default function Home() {
  const [openAddModifyBands, setOpenAddModifyBands] = useState(false)

  return (
    <div className='mt-16 ml-10 h-screen '>
      <div className='flex items-center gap-7'>
        <div className='text-2xl font-semibold text-gray-600'>Bands</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifyBands
          open={openAddModifyBands}
          setOpen={setOpenAddModifyBands}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenAddModifyBands(true)
              }}
            >
              <PlusCircleIcon className='flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {BandsDD.map((data) => (
            <BandsCard
              key={data.id}
              name={data.name}
              prices={data.prices}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

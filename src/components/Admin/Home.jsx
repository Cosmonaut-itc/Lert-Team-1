import { PlusCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import OpsManagerCard from './Components/OpsManagerCard'
import ModalAddModifyOpsManager from './Components/ModalAddModifyOpsManager'

const OpsManagersDD = [
  {
    id: 1,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
    country: 'USA',
  },
  {
    id: 2,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
    country: 'USA',
  },
  {
    id: 3,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
    country: 'USA',
  },
  {
    id: 4,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
    country: 'USA',
  },
  {
    id: 5,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
    country: 'USA',
  },
  {
    id: 6,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
    country: 'MX',
  },
  {
    id: 7,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
    country: 'MX',
  },
  {
    id: 8,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
    country: 'MX',
  },
]

export default function Home() {
  const [openAddModifyOpsManager, setOpenAddModifyOpsManager] = useState(false)

  return (
    <div className='mt-16 ml-10 h-screen '>
      <div className='flex items-center gap-7'>
        <div className='text-2xl font-semibold text-gray-600'>Ops Managers</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifyOpsManager
          open={openAddModifyOpsManager}
          setOpen={setOpenAddModifyOpsManager}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenAddModifyOpsManager(true)
              }}
            >
              <PlusCircleIcon className='flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {OpsManagersDD.map((data) => (
            <OpsManagerCard
              key={data.id}
              name={data.name}
              email={data.email}
              country={data.country}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

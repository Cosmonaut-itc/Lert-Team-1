import { PlusCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import SearchBar from '../Shared/Components/SearchBar'
import ModalAddModifyDelegate from './Components/ModalAddModifyDelegate'
import DelegateCard from './Components/DelegateCard'

const delegateDD = [
  {
    id: 1,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
  },
  {
    id: 2,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
  },
  {
    id: 3,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
  },
  {
    id: 4,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
  },
  {
    id: 5,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
  },
  {
    id: 6,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
  },
  {
    id: 7,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
  },
  {
    id: 8,
    name: 'Ken Bauer',
    email: 'kenbauer@ibm.com',
  },
]

export default function Delegate() {
  const [openDelegateAddModify, setOpenDelegateAddModify] = useState(false)

  return (
    <div className='pl-10 h-screen '>
      <div className='flex items-center gap-7 pt-16'>
        <div className='text-2xl font-semibold text-gray-600'>Delegates</div>
        <div className='w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12'>
          <SearchBar />
        </div>
      </div>
      <div className='flex justify-center md:justify-start pt-3'>
        <ModalAddModifyDelegate
          open={openDelegateAddModify}
          setOpen={setOpenDelegateAddModify}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => {
                setOpenDelegateAddModify(true)
              }}
            >
              <PlusCircleIcon className='flex h-16 w-16 text-blue-400 hover:text-blue-500 active:text-blue-600 justify-center' />
            </button>
          </div>
          {delegateDD.map((data) => (
            <DelegateCard key={data.id} name={data.name} email={data.email} />
          ))}
        </div>
      </div>
    </div>
  )
}

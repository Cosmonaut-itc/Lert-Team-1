import { SearchIcon } from '@heroicons/react/solid'

export default function SearchBar() {
  return (
    <div className='max-w-xs mx-auto w-full lg:max-w-md'>
      <label htmlFor='search' className='sr-only'>
        Search by name
      </label>
      <div className='relative text-gray-600 focus-within:text-gray-600'>
        <div className='pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center'>
          <SearchIcon className='h-5 w-5' aria-hidden='true' />
        </div>
        <input
          id='search'
          className='block w-full text-gray-600 bg-white py-2 pl-10 pr-3 border rounded-full leading-5 focus:text-gray-900 focus:placeholder-black focus:outline-none  focus:border-transparent placeholder-gray-500 focus:ring-0 sm:text-sm'
          placeholder='Search by name'
          type='search'
          name='search'
        />
      </div>
    </div>
  )
}

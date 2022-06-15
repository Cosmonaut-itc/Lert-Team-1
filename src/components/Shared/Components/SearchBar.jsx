import { SearchIcon } from '@heroicons/react/solid'

export default function SearchBar({ searchTerm, setSearchTerm, placeholder }) {
  return (
    <div className='mx-auto w-full lg:max-w-md'>
      <label htmlFor='search' className='sr-only'>
        Search by name
      </label>
      <div className='relative text-gray-600 dark:text-gray-200 focus-within:text-gray-600'>
        <div className='pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center'>
          <SearchIcon className='h-5 w-5' aria-hidden='true' />
        </div>
        <input
          id='search'
          className='block w-full text-gray-600 dark:text-gray-200 bg-white dark:bg-black py-2 pl-10 pr-3 border rounded-full leading-5 focus:text-gray-900 focus:placeholder-black focus:outline-none  border-transparent focus:border placeholder-gray-500 focus:ring-0 sm:text-sm'
          placeholder={placeholder}
          type='search'
          name='search'
          defaultValue={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

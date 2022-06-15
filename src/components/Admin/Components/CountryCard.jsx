import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import Flag from 'react-world-flags'

export default function CountryCard({
  country,
  setOpenCountryAdd,
  handleDeleteCountry,
  setModify_id,
  setModify_country,
}) {
  return (
    <Card
      sx={{ borderRadius: 3 }}
      variant='outlined'
      className='m-4 pt-1 relative shadow-lg bg-white dark:bg-black '
      key={country.id}
    >
      <div className='text-left p-5'>
        <p className='text-gray-500 text-sm'>Country: </p>
        <div className='flex flex-row'>
          <p className='text-black dark:text-white font-bold mt-2'>
            {country.name}
          </p>
          <div className=' flex w-12 pl-2 items-center'>
            <Flag className='rounded-sm drop-shadow' code={country.code} />
          </div>
        </div>
      </div>

      <CardActions className='flex justify-center p-4'>
        <button
          className='border rounded-md mx-10 px-4 py-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm'
          onClick={() => {
            handleDeleteCountry(country.id)
          }}
        >
          <div className='flex items-center'>
            <TrashIcon className='h-4 w-4 text-white' />
            <span className='ml-1'>Delete</span>
          </div>
        </button>

        <button
          className='border border-blue-400 rounded-md mx-10 px-4 py-1 text-blue-600 hover:opacity-70 active:opacity-50 active:bg-blue-50 text-sm'
          onClick={() => {
            setModify_id(country.id)
            setModify_country(country)
            setOpenCountryAdd(true)
          }}
        >
          <div className='flex items-center'>
            <PencilAltIcon className='h-4 w-4 text-blue-500' />
            <span className='ml-1'>Modify</span>
          </div>
        </button>
      </CardActions>
    </Card>
  )
}

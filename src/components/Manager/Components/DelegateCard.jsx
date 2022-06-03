import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'

export default function DelegateCard({ id, name, email }) {
  return (
    <Card
      sx={{ borderRadius: 3 }}
      variant='outlined'
      className='m-4 pt-1 relative shadow-lg  '
      key={id}
    >
      <div className='text-left pb-10 pl-4'>
        <h4 className='font-bold text-lg pt-2'>{name}</h4>
        <p className='underline text-gray-500 text-sm'>{email}</p>
      </div>

      <CardActions className='flex justify-center'>
        <button className='border rounded-md mx-10 px-4 py-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm'>
          <div className='flex items-center'>
            <TrashIcon className='h-4 w-4 text-white' />
            <span className='ml-1'>Delete</span>
          </div>
        </button>

        <button className='border border-blue-400 rounded-md mx-10 px-4 py-1 text-blue-600 hover:opacity-70 active:opacity-50 active:bg-blue-50 text-sm'>
          <div className='flex items-center'>
            <PencilAltIcon className='h-4 w-4 text-blue-500' />
            <span className='ml-1'>Modify</span>
          </div>
        </button>
      </CardActions>
    </Card>
  )
}

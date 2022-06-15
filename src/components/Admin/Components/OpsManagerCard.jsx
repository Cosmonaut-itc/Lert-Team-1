import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import Flag from 'react-world-flags'

export default function OpsManagerCard({
  OPSManager,
  setOpenAddModifyOpsManager,
  handleDeleteOPSManager,
  setModify_id,
  setModify_OPSManager,
}) {
  return (
    <Card
      sx={{ borderRadius: 3 }}
      variant='outlined'
      className='m-4 pt-1 relative shadow-lg bg-white dark:bg-black  '
      key={OPSManager.id}
    >
      <div className='text-left pb-10 pl-4  '>
        <h4 className='text-black dark:text-white font-bold text-lg pt-2'>
          {OPSManager.first_name + ' ' + OPSManager.last_name}
        </h4>
        <p className='underline text-gray-500 text-sm'>{OPSManager.email}</p>
        <div className='flex flex-row'>
          <p className='text-gray-500 dark:text-gray-600 text-sm'>
            Country: &nbsp;{' '}
          </p>
          <p className='text-sm dark:text-white'> {OPSManager.country_name} </p>
          <div className='w-10 h-5 pl-2'>
            <Flag
              className='rounded-sm drop-shadow'
              code={OPSManager.country_code}
            />
          </div>
        </div>
      </div>

      <CardActions className='flex justify-center'>
        <button
          className='border rounded-md mx-10 px-4 py-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm'
          onClick={() => {
            handleDeleteOPSManager(OPSManager.id)
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
            setModify_id(OPSManager.id)
            setModify_OPSManager(OPSManager)
            setOpenAddModifyOpsManager(true)
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

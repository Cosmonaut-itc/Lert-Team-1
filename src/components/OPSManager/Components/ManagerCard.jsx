import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import DeleteModal from '../../Shared/Components/DeleteModal'

export default function ManagerCard({
  manager,
  setOpenManagerAdd,
  handleDeleteManager,
  setModify_id,
  setModify_manager,
}) {
  const colorOfStatus = (id) => {
    const colors = {
      0: 'bg-gradient-to-r from-[#e52d27] to-[#b31217]',
      1: 'bg-gradient-to-b from-orange-400 to-yellow-300',
      2: 'bg-gradient-to-r from-emerald-500 to-lime-600',
    }
    return colors[id] ? colors[id] : ''
  }

  return (
    <div
      className='m-4 pt-1 pl-2 relative shadow-lg  overflow-visible bg-white dark:bg-black rounded-xl'
      key={manager.id}
    >
      <div
        className={
          'rounded-full absolute pin-t pin-r p-4 -top-2 -right-2 ' +
          colorOfStatus(manager.status)
        }
      />
      <div className='flex justify-between'>
        <div className='text-left pb-10 pl-4'>
          <h4 className='font-bold text-lg text-black dark:text-white pt-2'>
            {manager.first_name + ' ' + manager.last_name}
          </h4>
          <p className='underline text-gray-500 text-sm'>{manager.email}</p>
        </div>
        <div className='pt-4 pr-4'>
          <button>
            <PencilAltIcon
              className='h-6 w-6 text-blue-400 hover:text-blue-500 active:text-blue-600 mr-1'
              onClick={() => {
                setModify_id(manager.id)
                setModify_manager(manager)
                setOpenManagerAdd(true)
              }}
            />
          </button>
          <DeleteModal
            isIcon
            handleDelete={() => handleDeleteManager(manager.id)}
          />
        </div>
      </div>

      <CardActions className='flex justify-center'>
        <Button
          variant='contained'
          sx={{
            borderRadius: 16,
            px: 8,
            py: 0.1,
            mx: 5,
            textTransform: 'capitalize',
            fontWeight: 700,
            fontSize: 18,
            mb: 2,
            boxShadow: 3,
          }}
        >
          Download
        </Button>
      </CardActions>
    </div>
  )
}

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import DeleteModal from '../../Shared/Components/DeleteModal'

export default function TypesOfEmployeeCard({
  typeOfEmployee,
  setOpenEmployeeAdd,
  handleDeleteEmployee,
  setModifyEmployee_id,
  setModifyEmployee_employee,
}) {
  return (
    <Card
      sx={{ borderRadius: 3 }}
      variant='outlined'
      className='m-4 pt-1 relative shadow-lg bg-white dark:bg-black  '
      key={typeOfEmployee.id}
    >
      <div className='text-left mb-10 pl-4'>
        <h4 className='text-gray-500 text-md mt-2'>Type of employee:</h4>
        <p className='text-gray-500 text-md font-medium mt-2'>
          <span className='capitalize font-bold text-black dark:text-white'>
            {typeOfEmployee.name}
          </span>
        </p>
      </div>

      <CardActions className='flex justify-center'>
        <DeleteModal
          handleDelete={() => handleDeleteEmployee(typeOfEmployee.id)}
        />

        <button
          className='border border-blue-400 rounded-md mx-10 px-4 py-1 text-blue-600 hover:opacity-70 active:opacity-50 active:bg-blue-50 text-sm'
          onClick={() => {
            setModifyEmployee_id(typeOfEmployee.id)
            setModifyEmployee_employee(typeOfEmployee)
            setOpenEmployeeAdd(true)
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

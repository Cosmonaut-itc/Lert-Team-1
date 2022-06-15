import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import DeleteModal from '../../Shared/Components/DeleteModal'

export default function ExpensesCard({
  expense,
  setOpenExpensesAdd,
  handleDeleteExpense,
  setModifyExpense_id,
  setModifyExpense_expense,
}) {
  return (
    <Card
      sx={{ borderRadius: 3 }}
      variant='outlined'
      className='m-4 pt-1 relative shadow-lg bg-white dark:bg-black '
      key={expense.id}
    >
      <div className='text-left mb-10 pl-4'>
        <h4 className='text-gray-500 text-md mt-2'>Types of expense:</h4>
        <p className='text-gray-500 text-md font-medium mt-4'>
          <span className='capitalize font-bold text-black dark:text-white'>
            {expense.name}
          </span>
        </p>
      </div>

      <CardActions className='flex justify-center'>
        <DeleteModal handleDelete={() => handleDeleteExpense(expense.id)} />

        <button
          className='border border-blue-400 rounded-md mx-10 px-4 py-1 text-blue-600 hover:opacity-70 active:opacity-50 active:bg-blue-50 text-sm'
          onClick={() => {
            setModifyExpense_id(expense.id)
            setModifyExpense_expense(expense)
            setOpenExpensesAdd(true)
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

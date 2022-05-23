import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import AddModifyEmployeeForm from '../../Manager/Components/AddModifyEmployeeForm'
import { useRef, useState } from 'react'
import api from '../../api/api'

const EMPLOYEES_URL = '/manager/employees'

export default function TeamCard({
  employee,
  countries,
  bands,
  ICAS,
  squads,
  typesOfEmployee,
}) {
  const [openTeamAdd, setOpenTeamAdd] = useState(false)
  const cancelButtonRefTeam = useRef(null)

  const deleteEmployee = async () => {
    try {
      const response = await api.delete(EMPLOYEES_URL + '/' + employee.id)
      console.log('Employee deleted')
    } catch (err) {
      if (!err?.response) {
        console.log('Server error')
      } else if (err.response?.status === 400) {
        console.log('Incorrect inputs')
      } else if (err.response?.status === 409) {
        console.log('Employee already exists')
      } else {
        console.log('Operation failed')
      }
    }
  }

  return (
    <Card
      sx={{ borderRadius: 3 }}
      variant='outlined'
      className='m-4 pt-1 relative shadow-lg overflow-visible'
      key={employee.id}
    >
      <div className='flex justify-between'>
        <div className='text-left pl-6 pt-2'>
          <h4 className='font-bold text-lg'>
            {employee.first_name + ' ' + employee.last_name}
          </h4>
          <p className='text-gray-500 text-sm'>{employee.email}</p>
          <p className='text-gray-500 text-xs pt-5'>Modify band/status</p>
        </div>
        <div className='p-2'>
          <AddModifyEmployeeForm
            open={openTeamAdd}
            setOpen={setOpenTeamAdd}
            cancelButtonRef={cancelButtonRefTeam}
            countries={countries}
            bands={bands}
            ICAS={ICAS}
            squads={squads}
            typesOfEmployee={typesOfEmployee}
            isModify={true}
            employee={employee}
          />
          <button>
            <PencilAltIcon
              className='h-6 w-6 text-blue-400 hover:text-blue-500 active:text-blue-600 mr-1'
              onClick={() => setOpenTeamAdd(true)}
            />
          </button>
          <button>
            <TrashIcon
              className='h-6 w-6 text-red-400 hover:text-red-500 active:text-red-600 ml-1'
              onClick={deleteEmployee}
            />
          </button>
        </div>
      </div>

      <CardActions>
        <Button
          variant='contained'
          sx={{
            borderRadius: 2,
            px: 8,
            py: 0.1,
            mx: 5,
            textTransform: 'capitalize',
            fontWeight: 700,
            fontSize: 18,
            mb: 2,
            boxShadow: 3,
            whiteSpace: 'nowrap',
          }}
        >
          {employee.band_name}
        </Button>
      </CardActions>
    </Card>
  )
}

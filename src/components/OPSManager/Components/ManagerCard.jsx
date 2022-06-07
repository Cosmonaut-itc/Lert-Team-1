import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

export default function ManagerCard({ id, name, email, team, statusColor }) {
  console.log(statusColor)
  return (
    <Card
      sx={{ borderRadius: 3 }}
      variant='outlined'
      className='m-4 pt-1 pl-6 relative shadow-lg overflow-visible'
      key={id}
    >
      <div
        className='rounded-full absolute p-4 shadow-sm -top-2 -right-2'
        style={{ backgroundColor: statusColor }}
      ></div>
      <div className='text-left pb-10'>
        <h4 className='font-bold text-lg pt-2'>{name}</h4>
        <p className='underline text-gray-500 text-sm'>{email}</p>
        <p className='text-gray-500 text-sm font-medium'>
          Team: <span className='uppercase text-sm text-black'>{team}</span>
        </p>
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
    </Card>
  )
}

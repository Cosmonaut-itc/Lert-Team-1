import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';



export default function ManagerCard() {
  return (

    <div className="flex justify-center">
        <Card sx={{ borderRadius: 3}}  variant="outlined" className="m-4 pt-1 pl-6 relative shadow-lg overflow-visible">
            <div className="rounded-full absolute p-4 bg-gradient-to-b from-yellow-500 to-yellow-400 shadow-sm -top-2 -right-2">

            </div>
                <div className="text-left pb-10">
                    <h4 className="font-bold text-lg">Ken Bauer</h4>
                    <p className="underline text-gray-500 text-sm">kenbauer@tec.mx</p>
                    <p className="text-gray-500 text-sm font-medium">Team: <span className="uppercase text-sm text-black">LERT</span></p>
                </div>
            
        <CardActions>
        <Button variant="contained" sx={{ borderRadius: 16, px: 8, py: 0.1, mx: 5, textTransform: 'capitalize', fontWeight: 700, fontSize: 18, mb: 2, boxShadow: 3 }}>Download</Button>
        </CardActions>
        </Card>
    </div>
  );
}

import SideMenu from './SideMenu'
import LandingPage from './LandingPage'
import axios from "axios";
import { useState } from 'react'

function App() {
  
  const [profileData, setProfileData] = useState(null)


  function getData() {    // Esto es para conseguir la data de flask 
    axios({
      method: "GET",
      url:"/DMT",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <div className='bg-slate-100 h-max'>
      <div className='flex'>
        <div className='h-screen'>
          <SideMenu />
        </div>
        <LandingPage />
        <div>
        <p>Prueba del backend, pulsale: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
        </div>
      </div>
    </div>
    
  )
}

export default App

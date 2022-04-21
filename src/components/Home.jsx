import React from 'react'
import SideMenu from './SideMenu'
import LandingPage from './LandingPage'

function Home() {
  function ChangeWindow() {
    if (window.location.pathname === '/home') {
      console.log(window.location.pathname)
      return <LandingPage />
    } else if (window.location.pathname === '/team') {
      console.log(window.location.pathname)
      return 'Pantalla de Team'
    } else if (window.location.pathname === '/reports') {
      console.log(window.location.pathname)
      return 'Pantalla de Reports'
    } else if (window.location.pathname === '/') {
      console.log(window.location.pathname)
      return <LandingPage />
    }
  }

  return (
    <div className='flex'>
      <div className='h-screen'>
        <SideMenu />
      </div>

      {ChangeWindow()}

      <div></div>
    </div>
  )
}
export default Home

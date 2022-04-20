import React from 'react'
import SideMenu from './SideMenu'
import LandingPage from './LandingPage'

function Home() {
  return (
    <div className='flex'>
      <div className='h-screen'>
        <SideMenu />
      </div>
      <LandingPage />
      <div></div>
    </div>
  )
}
export default Home

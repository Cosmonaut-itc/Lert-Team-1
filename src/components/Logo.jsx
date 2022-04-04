import React from 'react'
import IBM_LOGO from '../assets/icons/ibm_BW.png'

function Logo() {
  return (
    <img
      className='bg-blue-700 w-16 sm:py-4 py-4 px-2 rounded-2xl'
      src={IBM_LOGO}
      alt='IBM_LOGO'
    ></img>
  )
}

export default Logo

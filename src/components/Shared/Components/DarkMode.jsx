import UseDarkMode from '../hook/UseDarkMode.js'
import { IoMoon, IoSunnyOutline } from 'react-icons/io5'

function DarkMode({ isSideMenuClose }) {
  const [colorTheme, setTheme] = UseDarkMode()

  return (
    <div
      className={'flex justify-center px-2'}
      // className={`flex px-2 ${
      //   isSideMenuClose ? 'justify-center' : 'text-left'
      // }`}
    >
      <button onClick={() => setTheme(colorTheme)}>
        {colorTheme === 'light' ? (
          <IoSunnyOutline className='text-white  h-6 w-6' />
        ) : (
          <IoMoon className='text-blue-500 hover:opacity-80 h-6 w-6' />
        )}
      </button>
      {/* {!isSideMenuClose ? (
        colorTheme === 'light' ? (
          <div className='text-black dark:text-white font-medium pl-2'>
            Light mode
          </div>
        ) : (
          <div className='text-black dark:text-white font-medium pl-2'>
            Dark mode
          </div>
        )
      ) : null} */}
    </div>
  )
}

export default DarkMode

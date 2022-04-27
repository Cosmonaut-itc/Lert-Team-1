import SideMenu from './SideMenu'
// import ManagerCard from './ManagerCard'
import LandingPage from './LandingPage'
import Login from './Login'

function App() {
  return (
    <div className='bg-slate-100 h-max'>
      <div className='flex'>
        <SideMenu />
        <LandingPage />
      </div>
    </div>
  )
}

export default App

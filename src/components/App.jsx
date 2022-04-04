import SideMenu from './SideMenu'
import LandingPage from './LandingPage'

function App() {
  return (
    <div className='bg-slate-100'>
      <div className='flex'>
        <div className='h-full'>
          <SideMenu />
        </div>
        <LandingPage />
      </div>
    </div>
  )
}

export default App

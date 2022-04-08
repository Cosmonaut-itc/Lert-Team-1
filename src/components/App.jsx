import SideMenu from './SideMenu'
import LandingPage from './LandingPage'


function App() {
  

  return (
    <div className='bg-slate-100 h-max'>
      <div className='flex'>
        <div className='h-screen'>
          <SideMenu />
        </div>
        <LandingPage />
        <div>
        </div>
      </div>
    </div>
    
  )
}

export default App

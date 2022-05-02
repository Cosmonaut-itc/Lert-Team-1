import SideMenu from './SideMenu'
import LandingPage from './LandingPage'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Reports from '../routes/reports'
import Home from '../routes/home'
import Team from '../routes/team'

function App() {
  return (
    <BrowserRouter>
      <div className='flex bg-slate-100 h-max'>
        <SideMenu />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='home' element={<Home />} />
          <Route path='reports' element={<Reports />} />
          <Route path='team' element={<Team />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

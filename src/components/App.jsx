import LandingPage from './LandingPage'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SidebarLayout from './SidebarLayout'
import Reports from '../routes/reports'
import Home from '../routes/manager'
import Team from '../routes/team'
import Login from '../routes/login'

function App() {
  return (
    <BrowserRouter>
      <div className='flex bg-slate-100 h-screen'>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/team' element={<Team />} />
          </Route>
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

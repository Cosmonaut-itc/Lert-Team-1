import LandingPage from './Shared/LandingPage'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SidebarLayout from './Shared/Components/SidebarLayout'
import Reports from './Manager/reports'
import Home from './Manager/Home'
import Team from './Manager/team'
import Login from './Shared/Login'

function App() {
  return (
    <BrowserRouter>
      <div className='flex bg-slate-100 h-screen'>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/manager/home' element={<Home />} />
            <Route path='/manager/reports' element={<Reports />} />
            <Route path='manager/team' element={<Team />} />
          </Route>
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

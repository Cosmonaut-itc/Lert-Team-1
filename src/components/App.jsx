import LandingPage from './LandingPage'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SidebarLayout from './SidebarLayout'
import Reports from '../routes/reports'
import Home from '../routes/home'
import OpsManager from '../routes/OpsManager'
import Team from '../routes/team'
import Login from '../routes/login'
import ExpensesCard from './ExpensesCard'
import ManagerCard from './ManagerCard'

function App() {
  return (
    <BrowserRouter>
      <div className='flex bg-slate-100 h-max'>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='home' element={<Home />} />
            <Route path='reports' element={<Reports />} />
            <Route path='team' element={<Team />} />
          </Route>
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <div className='flex bg-slate-100 h-max'>
    //   <SidebarLayout/>
    //   {/* <LandingPage/> */}
    //   <OpsManager/>
      
    // </div>
  )
}

export default App

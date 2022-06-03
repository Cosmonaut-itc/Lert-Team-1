import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/authProvider'
import RequireAuth from './Shared/RequireAuth'

import LandingPage from './Shared/LandingPage'
import SidebarLayout from './Shared/Components/SidebarLayout'
import Delegate from './Manager/delegate'
import Home from './Manager/Home'
import Squad from './Manager/squad'
import Login from './Shared/Login'
import OPSManager from './OPSManager/Home'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='md:flex bg-slate-100'>
          <Routes>
            {/* Public routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/landingpage' element={<LandingPage />} />

            {/* Manager routes */}
            <Route /* element={<RequireAuth allowedRole={0} />} */>
              <Route element={<SidebarLayout role='manager' />}>
                <Route path='/manager/home' element={<Home />} />
                <Route path='/manager/delegate' element={<Delegate />} />
                <Route path='manager/squad' element={<Squad />} />
              </Route>
            </Route>

            {/* OPSManager routes */}
            <Route /* element={<RequireAuth allowedRole={1} />} */>
              <Route element={<SidebarLayout role='opsmanager' />}>
                <Route path='/OPSManager/home' element={<OPSManager />} />
              </Route>
            </Route>
            {/* Admin routes */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/authProvider'
import RequireAuth from './Shared/RequireAuth'

import LandingPage from './Shared/LandingPage'
import SidebarLayout from './Shared/Components/SidebarLayout'
import ManagerDelegate from './Manager/delegate'
import ManagerHome from './Manager/Home'
import ManagerSquad from './Manager/squad'
import Login from './Shared/Login'
import OPSManagerHome from './OPSManager/Home'
import AdminHome from './Admin/Home'
import AdminCountries from './Admin/countries'

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
                <Route path='/manager/home' element={<ManagerHome />} />
                <Route path='/manager/delegate' element={<ManagerDelegate />} />
                <Route path='manager/squad' element={<ManagerSquad />} />
              </Route>
            </Route>

            {/* OPSManager routes */}
            <Route /* element={<RequireAuth allowedRole={1} />} */>
              <Route element={<SidebarLayout role='opsmanager' />}>
                <Route path='/OPSManager/home' element={<OPSManagerHome />} />
              </Route>
            </Route>
            {/* Admin routes */}
            <Route /* element={<RequireAuth allowedRole={2} />} */>
              <Route element={<SidebarLayout role='admin' />}>
                <Route path='/admin/home' element={<AdminHome />} />
                <Route path='/admin/countries' element={<AdminCountries />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NotFound from './Shared/NotFound'

import { AuthProvider } from './context/authProvider'

import Login from './Shared/Login'
import RequireAuth from './Shared/RequireAuth'
import LandingPage from './Shared/LandingPage'
import SidebarLayout from './Shared/Components/SidebarLayout'
import Forgot from './Shared/Forgot'
import Register from './Shared/Register'

import ManagerDelegate from './Manager/delegate'
import ManagerHome from './Manager/Home'
import ManagerSquads from './Manager/squads'

import OPSManagerHome from './OPSManager/Home'
import OPSManagerBands from './OPSManager/bands'
import OPSManagerIcas from './OPSManager/icas'
import OPSManagerTypes from './OPSManager/types'

import AdminHome from './Admin/Home'
import AdminCountries from './Admin/countries'

import DelegateHome from './Delegate/Home'
import DelegateSquads from './Delegate/squads'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='md:flex bg-slate-100 h-screen'>
          <Routes>
            {/* Public routes */}
            <Route path='*' element={<NotFound />} />
            <Route path='/login' element={<Login />} />
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/register' element={<Register />} />

            {/* Manager routes */}
            <Route element={<RequireAuth allowedRole={0} />}>
              <Route element={<SidebarLayout role='manager' />}>
                <Route path='/manager/home' element={<ManagerHome />} />
                <Route path='/manager/delegate' element={<ManagerDelegate />} />
                <Route path='manager/squads' element={<ManagerSquads />} />
              </Route>
            </Route>

            {/* OPSManager routes */}
            <Route element={<RequireAuth allowedRole={1} />}>
              <Route element={<SidebarLayout role='opsmanager' />}>
                <Route path='/opsmanager/home' element={<OPSManagerHome />} />
                <Route path='/opsmanager/types' element={<OPSManagerTypes />} />
                <Route path='/opsmanager/bands' element={<OPSManagerBands />} />
                <Route path='/opsmanager/icas' element={<OPSManagerIcas />} />
              </Route>
            </Route>

            {/* Admin routes */}
            {/*<Route element={<RequireAuth allowedRole={2} />}>*/}
            <Route>
              <Route element={<SidebarLayout role='admin' />}>
                <Route path='/admin/home' element={<AdminHome />} />
                <Route path='/admin/countries' element={<AdminCountries />} />
              </Route>
            </Route>

            {/* Delegate routes */}
            <Route element={<RequireAuth allowedRole={3} />}>
              <Route element={<SidebarLayout role='delegate' />}>
                <Route path='/delegate/home' element={<DelegateHome />} />
                <Route path='/delegate/squads' element={<DelegateSquads />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

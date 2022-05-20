import SideMenu from './SideMenu'
import { Outlet } from 'react-router-dom'

function SidebarLayout({ role }) {
  return (
    <>
      <SideMenu role={role} />
      <Outlet />
    </>
  )
}

export default SidebarLayout

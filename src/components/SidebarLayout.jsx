import SideMenu from './SideMenu'
import { Outlet } from 'react-router-dom'

function SidebarLayout() {
  return (
    <>
      <SideMenu />
      <Outlet />
    </>
  )
}

export default SidebarLayout

import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRole }) => {
  const { auth, isLoad } = useAuth()
  const location = useLocation()

  if (!isLoad) return <h1>Loading</h1>
  return auth.role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  )
}

export default RequireAuth

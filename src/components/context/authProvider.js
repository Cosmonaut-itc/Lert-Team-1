import { createContext, useEffect, useState } from 'react'
import api from '../api/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/isAuth')
        const role = response?.data?.role
        setAuth({ role })
      } catch (err) {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(err.message)
        }
      }
    }
    const fetchUserAndLoad = async () => {
      await fetchUser()
      setIsLoad(true)
    }
    fetchUserAndLoad()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoad }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

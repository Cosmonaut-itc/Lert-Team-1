import React, { useState, useRef, useEffect } from 'react'
import httpClients from '../api/api'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import api from '../api/api'

const LOGIN_URL = '/login'

// import { LockClosedIcon } from '@heroicons/react/solid'

export default function Login() {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append('email', email)
    bodyFormData.append('password', password)

    try {
      const response = await api.post(LOGIN_URL, bodyFormData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      const role = response?.data?.role
      console.log(role)
      setAuth({ email, password, role })
      setEmail('')
      setPassword('')
      navigate("/landingpage", { replace: true })
      /*navigate(from, { replace: true })*/
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server repsonse')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing user name or password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <section className='min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-left text-3xl font-base text-gray-900'>
            Log in to IBM
          </h2>
        </div>
        <form
          className='mt-2 space-y-6'
          action='src/components/Shared/login#Login.jsx'
          method='POST'
          onSubmit={handleSubmit}
        >
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <p className='flex flex-row-reverse font-base text-sm text-indigo-600 cursor-pointer'>
              Forgot IBMid?
            </p>
            <div>
              <label htmlFor='email-address' className='text-sm text-gray-600'>
                IBMid
              </label>
              <input
                id='email-address'
                ref={userRef}
                name='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-300 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>
            <div className='pt-4'>
              <label htmlFor='password' className='text-sm text-gray-600'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-300 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-sm'>
              <a
                href='src/components/Shared/login#Login.jsx'
                className='font-base text-indigo-600 cursor-pointer'
              />
              <a
                href='/register'
                className='font-base text-indigo-600 cursor-pointer'
              >
                Create new account
              </a>
            </div>
            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                /*onClick={logInUser}*/
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
                </span>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

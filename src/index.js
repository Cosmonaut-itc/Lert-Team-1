import React from 'react'
import './styles/index.css'
import App from './components/App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reportWebVitals from './tests/reportWebVitals'
import { createRoot } from 'react-dom/client'

import Reports from './routes/reports'
import Home from './routes/home'
import Team from './routes/team'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='home' element={<Home />} />
      <Route path='reports' element={<Reports />} />
      <Route path='team' element={<Team />} />
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

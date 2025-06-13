import React from 'react'
import BarakaMathApp from './pages/HomePage'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import AuthPage from './pages/Auth'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BarakaMathApp/>}/>
        <Route path='/auth-page' element={<AuthPage/>}/>
      </Routes>
    </Router>
  )
}

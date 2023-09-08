import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
  return <Routes>
    <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
  </Routes>
}

export default AllRoutes
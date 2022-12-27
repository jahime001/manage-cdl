import React from 'react'
import Home from './Components/Home/Home'
import Sidenav from './Components/Sidenav/Sidenav'
import './Dashboard.css'
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContext';


export default function Dashboard() {
  return (
    <div className='Dashboard'>
      <AuthContextProvider>
        <Sidenav/>
        <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      </AuthContextProvider>
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router'
import { UserAuth } from '../../../../context/AuthContext'
import Sidenav from '../Sidenav/Sidenav'
import './Home.css'

export default function Home() {
    const {user, logout} = UserAuth()
    const navigate = useNavigate()
async function handleLogout(){
    try {
        await logout()
        navigate('/')
        console.log('you logged out')
    } catch (error) {
        console.log(error.message)
    }
}


  return (
    <div className='home'>
         This is my Home
         email: {user && user.email}
        </div>
  )
}

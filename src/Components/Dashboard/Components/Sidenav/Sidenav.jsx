import React from 'react'
import './Sidenav.css'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineSchedule } from 'react-icons/ai'
import { HiOutlineUsers } from 'react-icons/hi'
import { RiBus2Line } from 'react-icons/ri'
import { CiSettings } from 'react-icons/ci'
import { FiLogOut } from 'react-icons/fi'

export default function Sidenav() {
  return (
    <div className='Sidenav'>
        <div className='nav-header'>
            <p>Company Name</p>
        </div>
        <div className='upper-nav'>
            <div><RxDashboard className='dash-icon icon'/> <p>Dashboard</p></div>
            <div><AiOutlineSchedule className='schedule-icon icon'/><p>Schedule</p></div>
            <div><HiOutlineUsers className='user-icon icon'/><p>Employees</p></div>
            <div><RiBus2Line className='bus-icon icon'/> <p>Vans</p></div>
        </div>
        <div className='lower-nav'>
            <div><p>Settings</p><CiSettings className='dash-icon icon'/></div>
            <div><p>Log Out</p><FiLogOut className='dash-icon icon'/></div>
        </div>
    </div>
  )
}

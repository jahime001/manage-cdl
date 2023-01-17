import React, { useState } from 'react'
import './Sidenav.css'
import { RxDashboard, RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineSchedule, AiOutlineClose } from 'react-icons/ai'
import { HiOutlineUsers } from 'react-icons/hi'
import { RiBus2Line } from 'react-icons/ri'
import { CiSettings } from 'react-icons/ci'
import { FiLogOut } from 'react-icons/fi'
import { UserAuth } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'

export default function Sidenav() {
    const {logout} = UserAuth()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    function handleNav(){
        if (isOpen == false){
            setIsOpen(true)
        }else{
            setIsOpen(false)
        }
    }
    function closeNav() {
      if (isOpen == false) {
          return;
      } else {
        setIsOpen(false);
      }
    }

    async function handleLogout(){
    try {
        await logout()
        navigate('/signin')
        console.log('you logged out')
    } catch (error) {
        console.log(error.message)
    }
}

  return (
    <div className='Sidenav' style={{width: isOpen ? "20%" : "60px"}}>
        <div className='nav-header'>
            {(isOpen == false)? <RxHamburgerMenu className='nav-icon icon' onClick={handleNav}/>: <AiOutlineClose className='nav-icon icon' onClick={handleNav}/>}
            <p style={{display: isOpen ? "" : "none"}}></p>
        </div>
        <div className='upper-nav'>
            <NavLink to='/dashboard/'><div className='nav-item' activeClassName="active" onClick={closeNav}><RxDashboard className='dash-icon icon'/> <p style={{display: isOpen ? "block" : "none"}}>Dashboard</p></div></NavLink>
            <NavLink to='/dashboard/schedule'><div className='nav-item' activeClassName="active" onClick={closeNav}><AiOutlineSchedule className='schedule-icon icon'/><p style={{display: isOpen ? "block" : "none"}}>Schedule</p></div></NavLink>
            <NavLink to='/dashboard/employees'><div className='nav-item' activeClassName="active" onClick={closeNav}><HiOutlineUsers className='user-icon icon'/><p style={{display: isOpen ? "block" : "none"}}>Employees</p></div></NavLink>
            <NavLink to='/dashboard/vans'><div className='nav-item'  activeClassName="active" onClick={closeNav}><RiBus2Line className='bus-icon icon'/> <p style={{display: isOpen ? "block" : "none"}}>Vans</p></div></NavLink>
        </div>
        <div className='lower-nav'>
            <div><p style={{display: isOpen ? "" : "none"}}>Settings</p><CiSettings className='dash-icon icon' onClick={closeNav}/></div>
            <div><p style={{display: isOpen ? "" : "none"}}>Log Out</p><FiLogOut className='dash-icon icon' onClick={handleLogout}/></div>
        </div>
    </div>
  )
}

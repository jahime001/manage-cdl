import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className='Nav'>
        <div className='logo'>
            <h1>7DNinja</h1>
        </div>
            <div className='action'>
             <Link to="/signin" className='signin-button'>Log In</Link>
             <Link  to="/signup" className='signup-button'>Sign Up</Link>
            </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import './Signin.css'
import landing from '../Signup/landing.jpeg'

export default function Signin() {
     const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()
    const {signIn} = UserAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        try {
            await signIn (email, password)
            navigate('/dashboard')
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
    }
  return (
    <div className='signin'>
        <div className='signin-floater'>
            <div className='signup-left' style={{ backgroundImage: `url(${landing})`, backgroundPosition: "center", objectFit: "fill"}}>

            </div>
            <div className='signin-right'>
                <div className='signin-form'>
                    <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className='forms'>
                <input 
                type='email' 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type='password' 
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Sign In</button>
            </form>
            <p>Don't have an account yet? 
                <Link to='/signup'>Sign up</Link>
            </p>
                </div>
            </div>
        </div>
    </div>
  )
}

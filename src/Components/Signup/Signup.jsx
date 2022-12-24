import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import landing from './landing.jpeg'
export default function Signup() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()
    const {createUser} = UserAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password)
            navigate('/home')
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
    }
  return (
    <div className='signup'>
        <div className='signup-floater'>
            <div className='signup-left' style={{ backgroundImage: `url(${landing})`, backgroundPosition: "center", objectFit: "fill"}}>

            </div>
            <div className='signup-right'>
                <div className='signup-form'>
                    <h1>Create An Account!</h1>
            <form onSubmit={handleSubmit} className='form'>
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
                <button type='submit'>Sign Up</button>
            </form>
            <p>Already have an account? 
                <Link to='/signin'>Sign In</Link>
            </p>
                </div>
            </div>
        </div>
    </div>
  )
}

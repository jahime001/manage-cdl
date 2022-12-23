import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'


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
            navigate('/home')
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
    }
  return (
    <div className='signin'>
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input type='email' 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                />
                <input type='password' 
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Sign In</button>
            </form>
            <p>Don't have an account yet? 
                <Link to='/signup'>Sign Up</Link>
            </p>
        </div>
    </div>
  )
}

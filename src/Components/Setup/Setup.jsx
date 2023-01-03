import React, { useState } from 'react'
import './Setup.css'
import { Carousel } from 'react-responsive-carousel';
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'

export default function Setup() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [companyName, setCompanyName] = useState()
    const [companyEmail, setCompanyEmail] = useState()
    const [hide, setHide] = useState()
    const [show, setShow] = useState()
    const [one, setOne] = useState('setup-box show')
    const {user} = UserAuth()
    const navigate = useNavigate()

        let currentView = 0
   async function handleSubmit(e){
        e.preventDefault()
        await setDoc(doc(db, 'users', `${user.uid}`, 'userInfo', 'info'), {
            firstName: firstName,
            lastName: lastName,
            companyName: companyName
        })
        navigate('/dashboard')  
    }
console.log(user.uid)
  return (
    <div className='Setup'>
        <div className='setup-header'>
            <h1>Welcome</h1>
        </div>
        <div className='setup-container'>
                    <div className={`${one}`} style={{transition: "all 1s"}}>
                        <div className='box-header'>
                            <h1>Lets setup your account!</h1>
                        </div>
                        <div className='box-form'>
                            <form onSubmit={handleSubmit}>
                            <input
                                className='setup-input'
                                type="text"
                                placeholder='First Name'
                                onChange={(e) => setFirstName(e.target.value)}
                             />
                             <input
                                className='setup-input'
                                type="text"
                                placeholder='Last Name'
                                onChange={(e) => setLastName(e.target.value)}
                             />
                             <input
                                className='setup-input'
                                type="text"
                                placeholder='Company Name'
                                onChange={(e) => setCompanyName(e.target.value)}
                             />
                             <button type='submit' className='setup-button'>Next</button>
                        </form>
                        </div>
                    </div>
        </div>
    </div>
    )
}                                                                                                                                                                           
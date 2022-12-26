import React, { useState } from 'react'
import './Setup.css'
import { Carousel } from 'react-responsive-carousel';

export default function Setup() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [companyName, setCompanyName] = useState()
    const [companyEmail, setCompanyEmail] = useState()
    const [hide, setHide] = useState()
    const [show, setShow] = useState()
    const [one, setOne] = useState('setup-box show')

        let currentView = 0
    function handleNext(e){
        e.preventDefault()
        setOne('setup-box hide')
    }

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
                            <form action="">
                            <input
                                className='setup-input'
                                type="text"
                                placeholder='First Name'
                             />
                             <input
                                className='setup-input'
                                type="text"
                                placeholder='Last Name'
                             />
                             <input
                                className='setup-input'
                                type="text"
                                placeholder='Company Name'
                             />
                             <input
                                className='setup-input'
                                type="text"
                                placeholder='Company Email'
                             />
                             <button onClick={handleNext} className='setup-button'>Next</button>
                        </form>
                        </div>
                    </div>
        </div>
    </div>
    )
}                                                                                                                                                                           
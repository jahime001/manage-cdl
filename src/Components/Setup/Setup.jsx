import React, { useState } from 'react'
import './Setup.css'

export default function Setup() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [companyName, setCompanyName] = useState()
    const [companyEmail, setCompanyEmail] = useState()

  return (
    <div className='Setup'>
        <div className='setup-header'>
            <h1>Welcome</h1>
        </div>
        <div className='setup-container'>
                    <div className='setup-box one'>
                        <div className='box-header'>
                            <h1>Lets start with some info about you.</h1>
                        </div>
                        <div className='box-form'>
                            <form action="">
                            <input
                                type="text"
                                placeholder='First Name'
                             />
                             <input
                                type="text"
                                placeholder='Last Name'
                             />
                             <button>Next</button>
                        </form>
                        </div>
                    </div>
        </div>
    </div>
    )
}                                                                                                                                                                           